<!-- navbar -->
<div class="navbar">
  <div class="navbar-inner">
    <div class="left">
      <a href="#" class="link back icon-only">
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    <div class="center sliding">生长环境</div>
    <div class="right"></div>
  </div>
</div>

<div class="pages navbar-through">
  <div data-page="zhuisuxinxi-zhongzhixinxi-shengzhanghuanjing" class="page page-zhuisuxinxi-zhongzhixinxi-shengzhanghuanjing">
    <div class="page-content">
      <div class="content">
        <?if(@data.length > 0 && @data[0]) {
            var data = @data[0];
            data.forEach(function(item){
        ?>
            <div class="content-title"><?=item.key?></div>
            <div class="content-detail">
              <?if(item.type === 'video') {?>
                <div class="video-box">
                  <video width="320" height="240" controls="controls">  
                    <source src="<?=item.value?>" type="video/mp4"></source>  
                  </video>
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