var myApp = new Framework7({
  pushState: true
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

myApp.onPageInit('about', function (page) {
  $$('.create-page').on('click', function () {
    createContentPage();
  });
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

if (location.pathname === '/') {
  mainView.router.loadPage('/');
}