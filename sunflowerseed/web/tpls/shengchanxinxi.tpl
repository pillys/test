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
.content-detail ul li {
  line-height: 30px;
}
.content-detail ul li a {
  color: #333;
}
</style>
<div id="$ROOT" class="easyui-layout">
  <?if(@data.length > 0) {?>
    <?@data.forEach(function(item) {?>
      <div class="content-title"><?=item.key?></div>
      <div class="content-detail">
        <ul>
          <li><a href="<?=item.url?>" title="<?=item.key?>"><?=item.value?></a></li>
        </ul>
      </div>
    <?});?>
  <?} else {?>
    <p>未找到相关数据。</p>
  <?}?>
</div>
<script>
$(ROOT).find('.content-detail a').on('click', function(){
  $dialog({
    title: $(this).attr('title'),
    url: $(this).attr('href'),
    width: 890,
    height: 570
  });
  return false;
});
</script>