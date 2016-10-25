<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">新闻动态</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhengcefagui" class="page page-zhengcefagui">
    <div class="page-content">
      <div class="content">
        <div class="list-block">
          <?if(@data.length > 0 && @data[0]) {
              var data = @data[0];
          ?>
            <ul>
              <?data.forEach(function(item) {
                  var subdata = JSON.stringify({
                    title: item.title
                  });
              ?>
                <li>
                  <a href="/tpls/news/detail.tpl|<?=subdata?>|<?=@apiRoot?>/detailInfo.action?id=<?=item.id?>&category=<?=item.category?>" class="item-link">
                    <div class="item-content">
                      <div class="item-inner"><?=item.title?></div>
                    </div>
                  </a>
                </li>
              <?});?>
            </ul>
          <?}?>
        </div>
      </div>
    </div>
  </div>
</div>