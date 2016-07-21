<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="/tpls/index.tpl|/api/index.json" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">商品名 / 序列号</div>
    <div class="right"></div>
    <!-- Sub navbar -->
    <div class="subnavbar">
      <div class="buttons-row">
        <a href="/tpls/zhuisu.tpl|/api/zhuisu.json" class="button">追溯信息</a>
        <a href="#" class="button active">产品信息</a>
      </div>
    </div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="chanpinxinxi" class="page page-chanpin">
    <div class="page-content">
      <div class="content">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            data.forEach(function(item) {
        ?>
              <div class="content-title"><?=item.key?></div>
              <div class="content-detail">
                <?=item.value?>
              </div>
        <?  });
          }
        ?>
      </div>
    </div>
  </div>
</div>