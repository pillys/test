<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">检验报告</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-zhongzhixinxi-jianyanbaogao-view" class="page page-zhuisuxinxi-zhongzhixinxi-jianyanbaogao-view">
    <div class="page-content">
      <div class="content">
        <?if(@_.length > 0 && @_[0]) {
            var data = @_[0];
        ?>
          <img src="<?=data.thumb?>">
        <?}?>
      </div>
    </div>
  </div>
</div>