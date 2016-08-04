<style>
$ROOT {
  height: 100%;
  overflow: auto;
}
.content-title {
  background-color: #daedf5;
  border-bottom: 1px solid #aed1eb;
  line-height: 30px;
  padding: 0 1em;
}
.content-detail {
  padding: 1em;
}
.info-basic {
  height: 200px;
}
</style>
<div id="$ROOT" class="easyui-layout">
  <?if(@data.length > 0) {?>
    <?@data.forEach(function(item) {?>
      <div class="item-box">
        <h2><?=item.title?></h2>
        <?item.detail.forEach(function(subitem) {?>
          <div class="content-title"><?=subitem.time?></div>
          <div class="content-detail">
            <?=subitem.context?>
          </div>
        <?});?>
      </div>
    <?});?>
  <?} else {?>
    <p>未找到相关数据。</p>
  <?}?>
</div>