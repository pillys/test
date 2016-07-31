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
</style>
<div id="$ROOT">
<?console.log(@data);?>
<?@data.forEach(function(item) {?>
  <div class="content-title"><?=item.key?></div>
  <div class="content-detail">
    <?=item.value?>
  </div>
<?});?>
</div>