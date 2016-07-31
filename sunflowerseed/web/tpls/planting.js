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
    this.version = '4.6.0';
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
        _ += '<style>#' + guid + ' .content-title {  background-color: #daedf5;  border-bottom: 1px solid #aed1eb;  line-height: 30px;  padding: 0 1em;}#' + guid + ' .planting-tree {  width: 120px;}#' + guid + ' .planting-details {  padding: 5px;}</style>';
        try {
          _ += '<div id="' + guid + '" class="easyui-layout" style="height:100%">\n  <div class="planting-tree" data-options="region:\'west\',title:\'种植信息\',split:true">\n    <ul>\n      <li data-name="nonghujieshao"><a href="javascript:;">农户介绍</a></li>\n      <li data-name="turangxinxi"><a href="javascript:;">土壤信息</a></li>\n      <li data-name="zhongzixinxi"><a href="javascript:;">种子信息</a></li>\n      <li data-name="zaipeixinxi"><a href="javascript:;">栽培信息</a></li>\n      <li data-name="jianyanbaogao"><a href="javascript:;">检验报告</a></li>\n      <li data-name="shengzhanghuanjing"><a href="javascript:;">生长环境</a></li>\n    </ul>\n  </div>\n  <div class="planting-details" data-options="region:\'center\',title:\'详细\'"></div>\n</div>';
        } catch (e) {
          console.log(e, e.stack);
        }
        if ($DATA) {
          $NODETPL.datas[duid] = $DATA;
        }
        (function(scripts) {
          var cache = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
          cache._nodetpl_ = cache._nodetpl_ || {};
          cache._nodetpl_[guid + '-' + duid] = scripts['main'];
        })($NODETPL.scripts);
        _ += '<script>\n';
        _ += '(function(){\n';
        _ += '  var cache = typeof window !== \'undefined\' ? window : typeof global !== \'undefined\' ? global : {};\n';
        _ += '  cache._nodetpl_[\'' + guid + '-' + duid + '\'](\'' + guid + '\', \'' + duid + '\');\n';
        _ += '  delete cache._nodetpl_[\'' + guid + '-' + duid + '\'];\n';
        _ += '})();\n';
        _ += '</script>\n';
        return _;
      }
    };
    return $NODETPL;
  };
  NodeTpl.prototype._initScripts = function() {
    var $NODETPL = this;
    this.scripts = {
      "main": function(guid, duid) {
        var ROOT = document.getElementById(guid);
        var SUBROOT = document.getElementById(guid + duid);
        var $TPLS = $NODETPL.tpls;
        var $DATA = $NODETPL.datas[duid];
        $(ROOT).layout({
          fit: true
        });
        var detailPanel = $('.planting-details', ROOT);
        $('.planting-tree ul li', ROOT).on('click', function() {
          switch ($(this).data('name')) {
            case 'nonghujieshao':
              $.ajax({
                url: 'http://202.85.222.47:8083/traceFarmer.action',
                type: 'GET',
                data: {
                  traceNum: $DATA.traceNum
                },
                dataType: 'json',
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
                dataType: 'json',
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
                dataType: 'json',
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
                dataType: 'json',
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
                dataType: 'json',
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
                dataType: 'json',
                success: function(data) {
                  nodetpl.get('http://test.qque.com/sunflowerseed/web/tpls/zhongzhixinxi/shengzhanghuanjing.js', data, function(d) {
                    detailPanel.html(d);
                  });
                }
              });
              break;
          }
        });
      }
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