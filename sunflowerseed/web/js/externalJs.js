/* polyfills */
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


var ExternalJs = {};
ExternalJs.cache = {},
ExternalJs.load = function(url, callback) {
  var count = 0;
  if(Object.prototype.toString.call(url) === '[object Array]') {
    for(var i = 0; i < url.length; i++) {
      ExternalJs.load(url[i], function() {
        count++;
        if(count === url.length) {
          callback();
        }
      });
    }
    return;
  }
  if(ExternalJs.cache[url] === true) {
    callback && callback.call(that);
    return true;
  }
  var that = this;
  var ele;
  if(/\.css(\?|$)/.test(url)) {
    ele = document.createElement('link');
    ele.setAttribute('rel', 'stylesheet');
    ele.setAttribute('type', 'text/css');
    ele.setAttribute('href', url);
    document.documentElement.appendChild(ele);
    ExternalJs.cache[url] = true;
    callback && callback.call(that);
  } else {
    ele = document.createElement('script');
    ele.type = 'text/javascript';
    if (ele.readyState) {
      ele.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          this.onreadystatechange = null;
          ExternalJs.cache[url] = true;
          callback && callback.call(that);
        }
      };
    } else {
      ele.onload = function() {
        ExternalJs.cache[url] = true;
        callback && callback.call(that);
      };
    }
    ele.src = url;
    (document.head || document.body).appendChild(ele);
  }
  return this;
};
ExternalJs.printPageAutoSize = function(page) {
  var iframe = document.getElementById(page);
  var idocument = iframe.contentWindow.document;
  var width = idocument.documentElement.scrollWidth || idocument.body.scrollWidth;
  var height = idocument.documentElement.scrollHeight || idocument.body.scrollHeight;
  iframe.style.height = height + 'px';
  iframe.style.width = Math.max(600, width) + 'px';
  vdialog.top.position();
};
ExternalJs.printPage = function(url) {
  var frameId = 'fr_' + Math.random();
  window.vdialog && vdialog({
    title: '打印',
    content: '<iframe id="' + frameId + '" frameborder="0" scrolling="auto" src="' + url + '" onload="ExternalJs.printPageAutoSize(\'' + frameId + '\')"></iframe>',
    ok: function() {
      this.content().find('iframe').get(0).contentWindow.print();
      return false;
    },
    okValue: '立即打印',
    cancel: true
  }).showModal();
};
/*
  {
    text: '打印',
    icon: 'icon-print',
    action: 'ExternalJs.printGuapaizhang(\'url\')'
  }
*/
ExternalJs.addButtonToTopDialog = function() {
  var buttonHtml;
  var topDialog = {
    zIndex: 0,
    dialog: null
  };
  $('.panel.window:visible').each(function() {
    var zIndex = $(this).css('z-index');
    if(topDialog.zIndex < zIndex) {
      topDialog.zIndex = zIndex;
      topDialog.dialog = $(this);
    }
  });
  if(topDialog.zIndex !== 0) {
    for(var i = 0; i < arguments.length; i++) {
      buttonHtml = '<a class="l-btn" href="javascript:void(0)" onclick="' + arguments[i].action + '"><span class="l-btn-left"><span class="l-btn-text ' + arguments[i].icon + ' l-btn-icon-left">' + arguments[i].text + '</span></span></a>';
      topDialog = topDialog.dialog;
      topDialog.find('.dialog-button').prepend(buttonHtml);
    }
  }
};
ExternalJs.scan = function(callback) {
  var scanner = $('<div class="scanner">' +
      '  <div class="scan-main">' +
      '    <a class="close">&times;</a>' +
      '    <div class="scan-box">' +
      '      <div class="line"></div>' + 
      '      <p class="scan-text">等待扫描二维码...</p>' +
      '    </div>' +
      '    <input size="30" style="font-size:20px;" />' +
      '  </div>' +
      '</div>').appendTo('body');
  var scanText = scanner.find('.scan-text');
  scanner.find('a.close').on('click', function() {
    scanner.remove();
  });
  scanner.find('input').on('blur', function() {
    $(this).focus();
  }).on('keydown', function(event) {
    if(event.keyCode === 13) {
      var inputer = $(this);
      var originalTraceNum = inputer.val();
      if(!originalTraceNum) {
        return false;
      }
      scanText.text('已扫描，正在处理...');
      originalTraceNum = originalTraceNum.replace(/^.*traceView\/([^.\/]+).*$/, '$1');
      inputer.val('').focus();
      callback.call({
        scanner: scanner,
        inputer: inputer,
        text: scanText
      }, originalTraceNum);
    }
  }).focus();
};

ExternalJs.rfidAdd = function(pvListId) {
  var count = 0;
  var codes = [];
  this.scan(function(v) {
    var codebetch = '';
    var textLabel = this.text;
    count++;
    codes.push(v);
    textLabel.html(codes.join('<br />'));
    if(codes.length === 5) {
      codebetch = codes.join(',');
      textLabel.html(codes.join('<br />') + '<br />正在保存...');
      codes.length = 0;
      $.ajax({
        url: '/rfidAdd.action?ajax=11&traceNumStr='+ encodeURIComponent(codebetch),
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          if(data.rfidList) {
            for(var i=0; i<data.rfidList.length; i++) {
              $('#'+ pvListId).datagrid('insertRow', {
                row: data.rfidList[i]
              });
            }
            textLabel.html(textLabel.html().replace('正在保存...', '保存成功！'));
          }
        }
      });
    }
  });
};

ExternalJs.DataGrid = {};
ExternalJs.DataGrid.AppendRow = function(jqid, url) {
  ExternalJs.scan(function(num) {
    var scanner = this;
    $.ajax({
      url: url,
      type: 'get',
      data: {
        originalTraceNum: num
      },
      dataType: 'jsonp',
      success: function(data) {
        if(data.flag === 1) {
          $(jqid).datagrid('l_appendRow', data.data);
          //scanner.remove();
          scanner.text.text('等待扫描二维码');
        } else {
          scanner.text.text(data.msg);
        }
      }
    });
  });
};

ExternalJs.outboundScan = function(listId) {
  ExternalJs.scan(function(v) {
    v = decodeURIComponent(v.replace(/^PILE_/i, ''));
    //v = 'id_挂牌账name|id_仓库name|id_品类name';
    this.inputer.val('');
    this.text.text(v);
    $.ajax({
      url: '/pileEdit.action',
      type: 'get',
      data: {
        ajax: 11,
        'pile.id': v
      },
      dataType: 'json',
      cache: false,
      success: function(data) {
        if(data.statusCode === 200) {
          var layOutBody = $('.panel.window .layout-body');
          var seedId = layOutBody.find('input[name$="StockOut.seed.id"]');
          var seedName = layOutBody.find('input[name$="StockOut.hi_seed.name"]');
          var storageId = layOutBody.find('input[name$="StockOut.storage.id"]');
          var storageName = layOutBody.find('input[name$="StockOut.hi_storage.name"]');
          var currentData = $('#'+ listId).datagrid('getData');
          var exists = currentData.rows.find(function(v) {
            return v.pile.id == data.pile.id;
          });
          if(seedId.val() !== '' && seedId.val() !== data.pile.seed.id.toString()) {
            alert('出库信息与先期扫描不符('+ seedId.val() + '!='+ data.pile.seed.id + ')。');
            return false;
          }
          if(!data.pile || !data.pile.seed || !data.pile.storage) {
            alert('找不到对应的信息。');
            return false;
          }
          seedId.val(data.pile.seed.id);
          seedName.val(data.pile.seed.name);
          storageId.val(data.pile.storage.id);
          storageName.val(data.pile.storage.name);
          if(exists) {
            alert('数据已存在，不可重复录入！');
            return false;
          }
          $('#'+ listId).datagrid('l_appendRow', {
            pile: {
              id: data.pile.id,
              pileName: data.pile.pileName
            }
          });
        }
      }
    });
  });
};

ExternalJs.startPackage = function() {
  //startPackage.action?ajac=11&traceNumStr=
  var count = 0;
  var nums = [];
  ExternalJs.scan(function(num) {
    var scanner = this;
    if(nums.indexOf(num) !== -1) {
      scanner.text.html('第' + (count+1) + '组<br/><br/>' + nums.join('<br/>'));
      return;
    }
    nums.push(num);
    scanner.text.html('第' + (count+1) + '组<br/><br/>' + nums.join('<br/>'));
    if(nums.length === 5) {
      var traceNumStr = nums.join(',');
      scanner.inputer.readOnly = true;
      $.ajax({
        url: '/startPackage.action?ajax=11',
        type: 'get',
        data: {
          traceNumStr: traceNumStr
        },
        dataType: 'json',
        success: function(data) {
          scanner.inputer.readOnly = false;
          if(data.flag === 1) {
            count++;
            nums.length = 0;
            scanner.text.html('第 '+ count + ' 组装箱完成<br/><br/>继续装箱请扫码<br/>结束装箱请关闭');
          } else {
            scanner.text.html(data.error);
          }
        },
        error: function(){
          alert('网络错误，数据传输失败，该组请重新扫描！');
          nums.length = 0;
          scanner.inputer.focus();
        }
      });
    }
  });
};

ExternalJs.pcPageScan = function(input) {
  input = $(input);
  this.scan(function(num) {
    input.val(num);
    this.scanner.remove();
    input.focus();
    showTraceInfo();
  });
};

ExternalJs.initPcPageIndex = function(id) {
  var items = $('.pc-page-index .tab-item', '#'+ id);
  var namelist = items.map(function() {
    return $(this).data('name');
  });
  var traceNum = $('.pc-page-index', '#'+ id).data('trace-num');
  $('.pc-page-index', '#'+ id).on('click', '.tabs-header>.tabs-wrap>ul.tabs li', function() {
    var index = $(this).index();
    var apiname = namelist[index];
    var panel = $('.pc-page-index>.tabs-panels>.panel:eq('+ index + ')>.panel-body', '#'+ id);
    if(panel.html().trim() === '') {
      switch(apiname) {
        case 'product':
          $.ajax({
            url: 'http://202.85.222.47:8083/traceGoods.action',
            type: 'get',
            data: {
              traceNum: traceNum
            },
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
              if(data.flag === 1) {
                nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/product.js', data, function(d) {
                  $(d).appendTo(panel);
                });
              }
            }
          });
          break;
        case 'planting':
          nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/planting.js', {
            traceNum: traceNum
          }, function(d) {
            $(d).appendTo(panel);
          });
          break;
        case 'production':
          $.ajax({
            url: 'http://202.85.222.47:8083/traceProduction.action',
            type: 'get',
            data: {
              traceNum: traceNum
            },
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
              if(data.flag === 1) {
                nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/shengchanxinxi.js', data, function(d) {
                  $(d).appendTo(panel);
                });
              }
            }
          });
          break;
        case 'logistics':
          $.ajax({
            url: 'http://202.85.222.47:8083/traceLogistics.action',
            type: 'get',
            data: {
              traceNum: traceNum
            },
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
              if(data.flag === 1) {
                nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/wuliuxinxi.js', data, function(d) {
                  $(d).appendTo(panel);
                });
              }
            }
          });
          break;
        case 'retail':
          $.ajax({
            url: 'http://202.85.222.47:8083/traceRetail.action',
            type: 'get',
            data: {
              traceNum: traceNum
            },
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
              if(data.flag === 1) {
                nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/lingshouxinxi.js', data, function(d) {
                  $(d).appendTo(panel);
                });
              }
            }
          });
          break;
      }
    }
  });
  setTimeout(function(){
    $('.pc-page-index ul.tabs li:first', '#'+ id).trigger('click');
  }, 500);
};

/* 地图扩展 */
(function() {
  ExternalJs.load([
    'http://api.map.baidu.com/getscript?v=2.0&ak=sQnBbFYNEFNDt0gw7OaDB2V09TOwjp4N&services=&t=20160623234740'
  ], function() {
    var userPoint = '';
    var content = '' +
      '<form method="get" style="margin-bottom:10px;">' +
      '  <input type="text" class="map-keywords" size="30" />' +
      '  <input type="submit" class="vd-btn map-button" value="搜索位置" />' +
      '</form>' +
      '<div id="l-map" style="height:400px;width:600px;"></div>';
    $('body').on('click', 'input[name="plough.coordinates"]', function() {
      var coordinates = $(this);
      var userPointArr, apoint, bpoint;
      var defaultPoint = false;
      if(!coordinates.val()) {
        defaultPoint = true;
      }
      userPoint = coordinates.val() || '111.680216,40.86103';
      userPointArr = userPoint.split(',');
      apoint = Number(userPointArr[0]);
      bpoint = Number(userPointArr[1]);
      vdialog({
        title: '标注地理位置',
        content: content,
        init: function() {
          var marker;
          var content = this.content();
          var map = new BMap.Map('l-map', {
            enableMapClick: false
          });
          var point = new BMap.Point(apoint, bpoint);
          map.centerAndZoom(point, 12);
          var top_left_control = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_TOP_LEFT
          });// 左上角，添加比例尺
          var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
          var top_right_navigation = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
          }); //右上角，仅包含平移和缩放按钮
          /*缩放控件type有四种类型:
          BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
          //添加控件和比例尺
          map.addControl(top_left_control);
          map.addControl(top_left_navigation);
          map.addControl(top_right_navigation);
          if(defaultPoint) {
            marker = new BMap.Marker(point);// 创建标注
            map.addOverlay(marker);             // 将标注添加到地图中
            marker.enableDragging();           // 拖拽
            marker.addEventListener('dragend', function(e) {
              userPoint = e.point.lng + ',' + e.point.lat;
            });
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(e){
              if(this.getStatus() == BMAP_STATUS_SUCCESS){
                userPoint = e.point.lng + ',' + e.point.lat;
                marker.setPosition(e.point);
                map.panTo(e.point);
              }
            }, {
              enableHighAccuracy: true
            });
          } else {
            marker = new BMap.Marker(point);// 创建标注
            map.addOverlay(marker);             // 将标注添加到地图中
            marker.enableDragging();           // 拖拽
            marker.addEventListener('dragend', function(e) {
              userPoint = e.point.lng + ',' + e.point.lat;
            });
          }
          content.find('form').on('submit', function(event){
            var keywords = $(this).find('.map-keywords').val();
            var options = {      
              onSearchComplete: function(results){      
                if (local.getStatus() == BMAP_STATUS_SUCCESS){      
                  if(results.getCurrentNumPois() > 0) {
                    point = results.getPoi(0).point;
                    userPoint = point.lng + ',' + point.lat;
                    if(marker) {
                      marker.setPosition(point);
                      map.panTo(point);
                    } else {
                      marker = new BMap.Marker(point);
                      map.addOverlay(marker);
                      marker.enableDragging();
                      marker.addEventListener('dragend', function(e) {
                        userPoint = e.point.lng + ',' + e.point.lat;
                      });
                    }
                  }
                }
              }      
            };
            var local = new BMap.LocalSearch(map, options);
            local.search(keywords);
            event.preventDefault();
          });
        },
        ok: function() {
          coordinates.val(userPoint);
        },
        cancel: true
      }).showModal();
    });
  });
})();