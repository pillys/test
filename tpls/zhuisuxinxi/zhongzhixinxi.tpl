<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">种植信息</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-zhongzhixinxi" class="page page-zhuisuxinxi-zhongzhixinxi">
    <div class="page-content">
      <div class="content">
        <?if(@_.length > 0 && @_[0]) {?>
          <div class="content thumb">
            <img src="<?=@_[0].thumb?>">
          </div>
        <?}?>
        <div class="list-block">
          <ul>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/nonghujieshao.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-group"></i></div>
                  <div class="item-inner">农户介绍</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/turangxinxi.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-braille"></i></div>
                  <div class="item-inner">土壤信息</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/zhongzixinxi.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-tty"></i></div>
                  <div class="item-inner">种子信息</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/zaipeixinxi.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-area-chart"></i></div>
                  <div class="item-inner">栽培信息</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/jianyanbaogao.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-file-archive-o"></i></div>
                  <div class="item-inner">检验报告</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/tpls/zhuisuxinxi/zhongzhixinxi/shengzhanghuanjing.tpl" class="item-link">
                <div class="item-content">
                  <div class="item-media"><i class="icon fa fa-envira"></i></div>
                  <div class="item-inner">生长环境</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>