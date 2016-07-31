<style>
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
<div id="$ROOT" class="easyui-layout" style="height:100%">
  <div class="info-basic" data-options="region:'north',title:'基本信息',split:true">
    <?@data.baseInfo.forEach(function(item) {?>
      <div class="content-title"><?=item.key?></div>
      <div class="content-detail">
        <?=item.value?>
      </div>
    <?});?>
  </div>
  <div class="info-details" data-options="region:'center',title:'生产过程'">
    <?@data.productionInfo.forEach(function(item) {?>
      <div class="content-title"><?=item.key?></div>
      <div class="content-detail">
        <?=item.value?>
      </div>
    <?});?>
  </div>
</div>
<script>
$(ROOT).layout({
  fit: true
});
</script>