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
.text-center {
  text-align: center;
}
</style>
<div id="$ROOT">
<?@data.forEach(function(item) {?>
  <div class="content-title"><?=item.key?></div>
  <div class="content-detail">
    <?if(item.type === 'video') {?>
      <div class="text-center">
        <video width="320" height="240" controls="controls">  
          <source src="<?=item.value?>" type="video/mp4"></source>  
        </video>
      </div>
    <?} else {?>
      <?=item.value?>
    <?}?>
  </div>
<?});?>
</div>