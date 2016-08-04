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
</style>
<div id="$ROOT" class="easyui-layout">
<?@data.forEach(function(item) {?>
  <div class="content-title"><?=item.key?></div>
  <div class="content-detail">
    <?if(item.type === 'map'){?>
      <iframe width="100%" height="400" frameborder="0" src="http://test.qque.com/sunflowerseed/app/map.html?q=<?=item.value.join(',')?>"></iframe>
    <?} else {?>
      <?=item.value?>
    <?}?>
  </div>
<?});?>
</div>