<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">栽培信息</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-zhongzhixinxi-zaipeixinxi" class="page page-zhuisuxinxi-zhongzhixinxi-zaipeixinxi">
    <div class="page-content">
      <div class="content">
        <?if(@_.length > 0 && @_[0]) {
            var data = @data[0];
            data.forEach(function(item){
        ?>
            <div class="content-title"><?=item.key?></div>
            <div class="content-detail">
              <?if(item.type === 'list') {?>
                <div class="list-block">
                  <ul>
                    <?item.value.forEach(function(v){?>
                      <li>
                        <div class="item-content">
                          <div class="item-inner"><?=v?></div>
                        </div>
                      </li>
                    <?});?>
                  </ul>
                </div>
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