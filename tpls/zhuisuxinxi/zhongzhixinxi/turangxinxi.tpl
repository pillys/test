<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">土壤信息</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-zhongzhixinxi-turangxinxi" class="page page-zhuisuxinxi-zhongzhixinxi-turangxinxi">
    <div class="page-content">
      <div class="content">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            data.forEach(function(item){
        ?>
            <div class="content-title"><?=item.key?></div>
            <div class="content-detail">
              <?if(item.type === 'map') {?>
                <a href="<?=@webRoot?>/sunflowerseed/app/map.html?q=<?=item.value?>" class="external"><i class="fa fa-map-marker"></i> 查看地图</a>
              <?} else {?>
                <?=item.value?>
              <?}?>
            </div>
        <?  });
          }
        ?>
      </div>
    </div>
  </div>
</div>