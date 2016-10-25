<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding"><?=@_[0].title?></div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhengcefagui-detail" class="page page-zhengcefagui-detail">
    <div class="page-content">
      <div class="content-block">
        <div class="content-detail">
          <?if(@data.length > 0 && @data[0]) {?>
            <?==@data[0].content?>
          <?}?>
        </div>
      </div>
    </div>
  </div>
</div>