(function() {
  var _load = function(url, callback) {
    var count = 0;
    if(Object.prototype.toString.call(url) === '[object Array]') {
      for(var i = 0; i < url.length; i++) {
        _load(url[i], function() {
          count++;
          if(count === url.length) {
            callback();
          }
        });
      }
      return;
    }
    var that = this,
      s = document.getElementsByTagName('script')[0],
      ele = document.createElement('script');
    ele.type = 'text/javascript';
    if (ele.readyState) {
      ele.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          this.onreadystatechange = null;
          callback && callback.call(that);
        }
      };
    } else {
      ele.onload = function() {
        callback && callback.call(that);
      };
    }
    ele.src = url;
    s.parentNode.insertBefore(ele, s);
    return this;
  };

  _load([
    'http://api.map.baidu.com/getscript?v=2.0&ak=sQnBbFYNEFNDt0gw7OaDB2V09TOwjp4N&services=&t=20160623234740',
    'http://test.qque.com/sunflowerseed/web/js/vdialog.js',
  ], function() {
    var userPoint = '';
    var content = `
      <form method="get" style="margin-bottom:10px;">
        <input type="text" class="map-keywords" size="30" />
        <input type="submit" class="vd-btn map-button" value="搜索位置" />
      </form>
      <div id="l-map" style="height:400px;width:600px;"></div>
    `;
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'http://test.qque.com/sunflowerseed/web/css/vdialog.css');
    document.documentElement.appendChild(link);

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
          var map = new BMap.Map('l-map');
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