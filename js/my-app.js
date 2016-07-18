var myApp = new Framework7({
  pushState: true
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

if(isWeixin) {
  mainView.hideNavbar();
  $$('.navbar-through').removeClass('navbar-through').addClass('no-navbar');
}

if (location.pathname === '/') {
  mainView.router.loadPage('/');
}
