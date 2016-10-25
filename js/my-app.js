var apiRoot = 'http://202.85.222.47:8083';
var webRoot = 'http://test.qque.com';
var indexPageUrl = '/tpls/index.tpl|'+ apiRoot + '/banner.action';
var myApp = new Framework7({
  pushState: true,
  animateNavBackIcon: true,
  preroute: function (view, options) {
    if(/\.tpl\|/.test(options.url)) {
      view.router.loadPage(options.url.replace(/(\.tpl)\|/, '$1?'));
      return false;
    } else {
      return true;
    }
  },
  preprocess: function(content, url, next) {
    if(/\.tpl\?/.test(url)) {
      var datas = url.replace(/^.*\.tpl\?([\s|\S]+)$/, '$1').split('|');
      var apis = datas.filter(function(v) {
        return v.indexOf('{') !== 0;
      });
      var options = datas.filter(function(v) {
        return v.indexOf('{') === 0;
      }).map(function(v) {
        return JSON.parse(v);
      });
      var result = {
        _: options,
        data: [],
        url: [],
        apiRoot: apiRoot,
        webRoot: webRoot
      };
      var i = apis.length;
      (function async() {
        if(i === 0) {
          nodetpl.render(content, result, function(d) {
            next(d);
          });
        } else {
          i--;
          var api = apis[i];
          $$.ajax({
            url: api,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
              if(data.flag === 1) {
                result.data.push(data.data);
              } else {
                result.data.push(null);
              }
              result.url.push(api);
              async();
            },
            error: function() {
              result.data.push(null);
              result.url.push(api);
              async();
            }
          });
        }
      })();
    } else {
      nodetpl.render(content, {}, function(d) {
        next(d);
      });
    }
  }
});

var $$ = Dom7;
var ua = window.navigator.userAgent.toLowerCase();
var isWeixin = /MicroMessenger/i.test(navigator.userAgent);
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});

myApp.onPageInit('about', function (page) {
  mainView.hideNavbar();
});

myApp.onPageInit('index', function (page) {
  myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination',
    spaceBetween: 100
  });
  $$('form.searchbar').on('submit', function(e) {
    var action = $$(this).attr('action'),
      input = $$(this).find('input');
    mainView.router.loadPage(action + '?' + input.attr('name') + '=' + encodeURIComponent(input.val()));
    e.preventDefault();
  });
});

myApp.onPageInit('zhuisu', function (page) {
  
});

/*if(isWeixin) {
  mainView.hideNavbar();
  $$('.navbar-through').removeClass('navbar-through').addClass('no-navbar');
}*/
if (location.hash === '') {
  mainView.router.loadPage(indexPageUrl);
}
