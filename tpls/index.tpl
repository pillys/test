<!-- Top Navbar-->
<div class="navbar">
  <div class="navbar-inner">
    <div class="center sliding">葵花籽溯源系统</div>
  </div>
</div>
<div class="pages navbar-through">
  <div data-page="index" class="page">
    <div class="page-content">
      <!-- search bar -->
      <form class="searchbar" method="get" action="/tpls/zhuisu.tpl|<?=@apiRoot?>/traceSummarize.action">
        <div class="searchbar-input">
          <input type="search" name="traceNum" placeholder="在此输入产品编码">
          <a href="#" class="searchbar-clear"></a>
        </div>
        <a href="#" class="searchbar-cancel">Cancel</a>
      </form>
      <?if(@data.length > 0 && @data[0]) {
          var data = @data[0];
      ?>
      <!-- Slider container -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <?data.forEach(function(banner) {?>
            <div class="swiper-slide"><img src="<?=banner.url?>"></div>
          <?});?>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <?}?>
      <div class="row icon-menu">
        <div class="col-33">
          <a href="./tpls/fagui.tpl|<?=@apiRoot?>/policyList.action">
            <div class="fa-box"><i class="fa fa-balance-scale"></i></div>
            <p>政策法规</p>
          </a>
        </div>
        <div class="col-33">
          <a href="./tpls/news.tpl|<?=@apiRoot?>/newsList.action">
            <div class="fa-box"><i class="fa fa-file-movie-o"></i></div>
            <p>新闻动态</p>
          </a>
        </div>
        <div class="col-33">
          <a href="./tpls/jiamengqiye.tpl|<?=@apiRoot?>/compList.action">
            <div class="fa-box"><i class="fa fa-flag-checkered"></i></div>
            <p>加盟企业</p>
          </a>
        </div>
      </div>

    </div>
  </div>
</div>