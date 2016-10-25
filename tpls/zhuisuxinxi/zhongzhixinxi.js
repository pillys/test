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
          _ += '<div class="navbar">\n  <div class="navbar-inner">\n    <div class="left">\n      <a href="#" class="link back icon-only">\n        <i class="fa fa-angle-left"></i>\n      </a>\n    </div>\n    <div class="center sliding">种植信息</div>\n    <div class="right"></div>\n  </div>\n</div>\n\n<div class="pages navbar-through">\n  <div data-page="zhuisuxinxi-zhongzhixinxi" class="page page-zhuisuxinxi-zhongzhixinxi">\n    <div class="page-content">\n      <div class="content">\n        ';
          if ($DATA._.length > 0 && $DATA._[0]) {
            var traceNum = $DATA._[0].traceNum;
            var subdata = JSON.stringify({
              traceNum: traceNum
            });

            _ += '\n          <div class="content thumb">\n            <img src="';
            if (typeof $DATA._ !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA._[0].thumb);
            }

            _ += '">\n          </div>\n          <div class="list-block">\n            <ul>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/nonghujieshao.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/traceFarmer.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-group"></i></div>\n                    <div class="item-inner">农户介绍</div>\n                  </div>\n                </a>\n              </li>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/turangxinxi.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/traceSoil.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-braille"></i></div>\n                    <div class="item-inner">土壤信息</div>\n                  </div>\n                </a>\n              </li>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/zhongzixinxi.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/traceSeed.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-tty"></i></div>\n                    <div class="item-inner">种子信息</div>\n                  </div>\n                </a>\n              </li>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/zaipeixinxi.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/tracePlant.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-area-chart"></i></div>\n                    <div class="item-inner">栽培信息</div>\n                  </div>\n                </a>\n              </li>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/jianyanbaogao.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/traceInspect.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-file-archive-o"></i></div>\n                    <div class="item-inner">检验报告</div>\n                  </div>\n                </a>\n              </li>\n              <li>\n                <a href="/tpls/zhuisuxinxi/zhongzhixinxi/shengzhanghuanjing.tpl|';
            if (typeof subdata !== 'undefined') {
              _ += $NODETPL.escapeHtml(subdata);
            }

            _ += '|';
            if (typeof $DATA.apiRoot !== 'undefined') {
              _ += $NODETPL.escapeHtml($DATA.apiRoot);
            }

            _ += '/traceEnv.action?traceNum=';
            if (typeof traceNum !== 'undefined') {
              _ += $NODETPL.escapeHtml(traceNum);
            }

            _ += '" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media"><i class="icon fa fa-envira"></i></div>\n                    <div class="item-inner">生长环境</div>\n                  </div>\n                </a>\n              </li>\n            </ul>\n          </div>\n        ';
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