<?
  var traceNum = decodeURIComponent(@url[0].replace(/.*traceNum=([^&]*)/, '$1'));
?>
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="/tpls/index.tpl|<?=@apiRoot?>/banner.action" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">追溯信息</div>
    <div class="right"></div>
    <!-- Sub navbar -->
    <div class="subnavbar">
      <div class="buttons-row">
        <a href="#" class="button active">追溯信息</a>
        <a href="/tpls/chanpin.tpl|<?=@apiRoot?>/traceGoods.action?traceNum=<?=traceNum?>" class="button">产品信息</a>
      </div>
    </div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi" class="page page-zhuisu">
    <div class="page-content">
      <div class="content-block">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            var traceNum = decodeURIComponent(@url[0].replace(/.*traceNum=([^&]*)/, '$1'));
        ?>
          <?data.forEach(function(item) {
              var url = '';
              var thumb = JSON.stringify({ thumb: item.thumb, traceNum: traceNum });
          ?>
            <?switch(item.name) {
                case 'planting':
                  url = '/tpls/zhuisuxinxi/zhongzhixinxi.tpl|'+ thumb;
                  break;
                case 'production':
                  url = '/tpls/zhuisuxinxi/shengchanxinxi.tpl|'+ thumb + '|'+ @apiRoot + '/traceProduction.action?traceNum='+ traceNum;
                  break;
                case 'logistics':
                  url = '/tpls/zhuisuxinxi/wuliuxinxi.tpl|'+ thumb + '|'+ @apiRoot + '/traceLogistics.action?traceNum='+ traceNum;
                  break;
                case 'retail':
                  url = '/tpls/zhuisuxinxi/lingshouxinxi.tpl|'+ thumb + '|'+ @apiRoot + '/traceRetail.action?traceNum='+ traceNum;
                  break;
                case 'consumers':
                  break;
              }
            ?>
            <div class="row">
              <div class="col-33"><?=item.title?></div>
              <div class="col-33 col-thumb">
                <?if(url !== '') {?>
                  <a href="<?=url?>"><img src="<?=item.thumb?>"></a>
                <?} else {?>
                  <img src="<?=item.thumb?>">
                <?}?>
                </div>
              <div class="col-33"><?=item.time?></div>
            </div>
          <?});?>
        <?}?>
      </div>
    </div>
  </div>
</div>