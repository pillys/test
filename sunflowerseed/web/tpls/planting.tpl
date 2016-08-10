<style>
.content-title {
  background-color: #daedf5;
  border-bottom: 1px solid #aed1eb;
  line-height: 30px;
  padding: 0 1em;
}
.planting-tree {
  width: 120px;
}
.planting-tree ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.planting-tree ul li {
  padding: 0;
  margin: 5px 0;
}
.planting-tree ul li a {
  display: block;
  color: #333;
  line-height: 30px;
  padding-left: 20px;
  text-decoration: none;
  position: relative;
}
.planting-tree ul li a .fa {
  vertical-align: middle;
  margin-right: 5px;
}
.planting-tree ul li.active a,
.planting-tree ul li a:hover {
  background-color: #eaf2ff;
}
.planting-tree ul li.active a:after {
  position: absolute;
  content: "";
  display: block;
  border: 5px solid transparent;
  width: 0;
  height: 0;
  overflow: hidden;
  border-left-color: #333;
  right: 0;
  top: 10px;
}
.planting-details {
  padding: 5px;
}
</style>
<div id="$ROOT" class="easyui-layout" style="height:100%">
  <div class="planting-tree" data-options="region:'west',title:'种植信息',split:true">
    <ul>
      <li data-name="nonghujieshao"><a href="javascript:;"><i class="fa fa-group"></i>农户介绍</a></li>
      <li data-name="turangxinxi"><a href="javascript:;"><i class="fa fa-braille"></i>土壤信息</a></li>
      <li data-name="zhongzixinxi"><a href="javascript:;"><i class="fa fa-tty"></i>种子信息</a></li>
      <li data-name="zaipeixinxi"><a href="javascript:;"><i class="fa fa-area-chart"></i>栽培信息</a></li>
      <li data-name="jianyanbaogao"><a href="javascript:;"><i class="fa fa-file-archive-o"></i>检验报告</a></li>
      <li data-name="shengzhanghuanjing"><a href="javascript:;"><i class="fa fa-envira"></i>生长环境</a></li>
    </ul>
  </div>
  <div class="planting-details" data-options="region:'center',title:'详细'"></div>
</div>
<script>
$(ROOT).layout({
  fit: true
});
var detailPanel = $('.planting-details', ROOT);
$('.planting-tree ul li', ROOT).on('click', function() {
  $(this).addClass('active').siblings('.active').removeClass('active');
  switch($(this).data('name')) {
    case 'nonghujieshao':
      $.ajax({
        url: 'http://202.85.222.47:8083/traceFarmer.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/nonghujieshao.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
    case 'turangxinxi':
      $.ajax({
        url: 'http://202.85.222.47:8083/traceSoil.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/turangxinxi.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
    case 'zhongzixinxi':
      $.ajax({
        url: 'http://202.85.222.47:8083/traceSeed.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/zhongzixinxi.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
    case 'zaipeixinxi':
      $.ajax({
        url: 'http://202.85.222.47:8083/tracePlant.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/zaipeixinxi.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
    case 'jianyanbaogao':
      $.ajax({
        url: 'http://202.85.222.47:8083/traceInspect.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/jianyanbaogao.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
    case 'shengzhanghuanjing':
      $.ajax({
        url: 'http://202.85.222.47:8083/traceEnv.action',
        type: 'GET',
        data: {
          traceNum: $DATA.traceNum
        },
        dataType: 'jsonp',
        success: function(data) {
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/shengzhanghuanjing.js', data, function(d) {
            detailPanel.html(d);
          });
        }
      });
      break;
  }
}).first().trigger('click');
</script>