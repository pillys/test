<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">零售信息</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-lingshouxinxi" class="page page-zhuisuxinxi-lingshouxinxi">
    <div class="page-content">
      <?if(@_.length > 0 && @_[0]) {?>
        <div class="content thumb">
          <img src="<?=@_[0].thumb?>">
        </div>
      <?}?>
      <div class="content">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            data.forEach(function(item){
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