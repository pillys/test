<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">物流信息</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-wuliuxinxi" class="page page-zhuisuxinxi-wuliuxinxi">
    <div class="page-content">
      <?if(@_.length > 0 && @_[0]) {?>
        <div class="content thumb">
          <img src="<?=@_[0].thumb?>">
        </div>
      <?}?>
      <div class="content">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            data.forEach(function(item) {
        ?>
            <h2><?=item.title?></h2>
            <?item.detail.forEach(function(subitem){?>
                <div class="content-title"><?=subitem.time?></div>
                <div class="content-detail">
                  <?=subitem.context?>
                </div>
        <?    });
            });
          }
        ?>
      </div>
    </div>
  </div>
</div>