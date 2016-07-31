<style>
.content-title {
  background-color: #daedf5;
  border-bottom: 1px solid #aed1eb;
  line-height: 30px;
  padding: 0 1em;
}
.content-detail {
  padding: 1em;
  text-align: center;
}
.content-detail img {
  max-height: 400px;
}
</style>
<div id="$ROOT">
<?@data.forEach(function(item) {?>
  <div class="content-title"><?=item.key?></div>
  <div class="content-detail">
    <a href="<?=item.value?>" target="_blank"><img src="<?=item.value?>"></a>
  </div>
<?});?>
</div>