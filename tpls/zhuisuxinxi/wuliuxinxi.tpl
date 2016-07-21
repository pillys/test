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
        <h2>基本信息</h2>
        <div class="content-title">aaa</div>
        <div class="content-detail">
          bbb
        </div>
      </div>
    </div>
  </div>
</div>