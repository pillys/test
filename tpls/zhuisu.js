(function(root, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    if (typeof callback === 'function' && typeof iife !== 'undefined' && iife === true) {
      var module_id = 'nodetpl_' + Math.random();
      define(module_id, factory);
      if (define.amd) {
        require([module_id], callback);
      } else if (define.cmd) {
        seajs.use([module_id], callback);
      } else {
        throw new Error('nodetpl cannot guess what the define means.');
      }
    } else {
      define(factory);
    }
  } else if (typeof require === 'function' && typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    if (root.nodetpl) {
      var result = factory();
      if (typeof callback === 'function' && typeof iife !== 'undefined' && iife === true) {
        callback(result);
      } else {
        var url = root.nodetpl.getCurrentScript();
        if (url) {
          root.nodetpl.cache[url] = result;
        }
      }
      return result;
    } else {
      throw new Error('nodetpl not found.');
    }
  }
}(this, function(require, exports, module) {
  'use strict';

  function NodeTpl() {
    this.version = '4.7.0';
    this.tpls = {};
    this.scripts = {};
    this.datas = {};
    this._initTpls()._initScripts();
    return this;
  }
  NodeTpl.prototype._generate = function() {
    return Math.random().toString().replace('.', '');
  };
  NodeTpl.prototype._initTpls = function() {
    var $NODETPL = this;
    this.tpls = {
      "main": function($DATA, guid) {
        var _ = '';
        var duid = $NODETPL.duid();
        guid = guid || $NODETPL.guid();
        try {
          var traceNum = decodeURIComponent($DATA.url[0].replace(/.*traceNum=([^&]*)/, '$1'));

          _ += '\n<div class="navbar">\n  <div class="navbar-inner">\n    <div class="left">\n      <a href="/tpls/index.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/banner.action" class="link back icon-only">\n        <i class="fa fa-angle-left"></i>\n      </a>\n    </div>\n    <div class="center sliding">追溯信息</div>\n    <div class="right"></div>\n    \n    <div class="subnavbar">\n      <div class="buttons-row">\n        <a href="#" class="button active">追溯信息</a>\n        <a href="/tpls/chanpin.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/traceGoods.action?traceNum=';
          if (typeof traceNum !== 'undefined') {
            _ += $NODETPL.escapeHtml(traceNum);
          }

          _ += '" class="button">产品信息</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="pages navbar-through">\n  <div data-page="zhuisuxinxi" class="page page-zhuisu">\n    <div class="page-content">\n      <div class="content-block">\n        ';
          if ($DATA.data.length > 0 && $DATA.data[0]) {
            var data = $DATA.data[0];
            var traceNum = decodeURIComponent($DATA.url[0].replace(/.*traceNum=([^&]*)/, '$1'));

            _ += '\n          ';
            data.forEach(function(item) {
              var url = '';
              var thumb = JSON.stringify({
                thumb: item.thumb,
                traceNum: traceNum
              });

              _ += '\n            ';
              switch (item.name) {
                case 'planting':
                  url = '/tpls/zhuisuxinxi/zhongzhixinxi.tpl|' + thumb;
                  break;
                case 'production':
                  url = '/tpls/zhuisuxinxi/shengchanxinxi.tpl|' + thumb + '|' + $DATA.apiRoot + '/traceProduction.action?traceNum=' + traceNum;
                  break;
                case 'logistics':
                  url = '/tpls/zhuisuxinxi/wuliuxinxi.tpl|' + thumb + '|' + $DATA.apiRoot + '/traceLogistics.action?traceNum=' + traceNum;
                  break;
                case 'retail':
                  url = '/tpls/zhuisuxinxi/lingshouxinxi.tpl|' + thumb + '|' + $DATA.apiRoot + '/traceRetail.action?traceNum=' + traceNum;
                  break;
                case 'consumers':
                  break;
              }

              _ += '\n            <div class="row">\n              <div class="col-33">';
              if (typeof item.title !== 'undefined') {
                _ += $NODETPL.escapeHtml(item.title);
              }

              _ += '</div>\n              <div class="col-33 col-thumb">\n                ';
              if (url !== '') {
                _ += '\n                  <a href="';
                if (typeof url !== 'undefined') {
                  _ += $NODETPL.escapeHtml(url);
                }

                _ += '"><img src="';
                if (typeof item.thumb !== 'undefined') {
                  _ += $NODETPL.escapeHtml(item.thumb);
                }

                _ += '"></a>\n                ';
              } else {
                _ += '\n                  <img src="';
                if (typeof item.thumb !== 'undefined') {
                  _ += $NODETPL.escapeHtml(item.thumb);
                }

                _ += '">\n                ';
              }
              _ += '\n                </div>\n              <div class="col-33">';
              if (typeof item.time !== 'undefined') {
                _ += $NODETPL.escapeHtml(item.time);
              }

              _ += '</div>\n            </div>\n          ';
            });
            _ += '\n        ';
          }
          _ += '\n      </div>\n    </div>\n  </div>\n</div>';
        } catch (e) {
          console.log(e, e.stack);
        }
        if ($DATA) {
          $NODETPL.datas[duid] = $DATA;
        }
        return _;
      }
    };
    return $NODETPL;
  };
  NodeTpl.prototype._initScripts = function() {
    var $NODETPL = this;
    this.scripts = {

    };
    return $NODETPL;
  };
  NodeTpl.prototype.duid = function() {
    return 'nodetpl_d_' + this._generate();
  };
  NodeTpl.prototype.guid = function() {
    return 'nodetpl_g_' + this._generate();
  };
  NodeTpl.prototype.escapeHtml = function(html) {
    return html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  NodeTpl.prototype.render = function(data, guid) {
    return this.tpls.main(data, guid || this.guid());
  };
  return {
    render: function(data) {
      return new NodeTpl().render(data);
    }
  };
}));