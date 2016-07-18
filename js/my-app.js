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
});

if (location.pathname === '/') {
  mainView.router.loadPage('/');
}