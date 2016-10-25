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
          _ += '<div class="navbar">\n  <div class="navbar-inner">\n    <div class="center sliding">葵花籽溯源系统</div>\n  </div>\n</div>\n<div class="pages navbar-through">\n  <div data-page="index" class="page">\n    <div class="page-content">\n      \n      <form class="searchbar" method="get" action="/tpls/zhuisu.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/traceSummarize.action">\n        <div class="searchbar-input">\n          <input type="search" name="traceNum" placeholder="在此输入产品编码">\n          <a href="#" class="searchbar-clear"></a>\n        </div>\n        <a href="#" class="searchbar-cancel">Cancel</a>\n      </form>\n      ';
          if ($DATA.data.length > 0 && $DATA.data[0]) {
            var data = $DATA.data[0];

            _ += '\n      \n      <div class="swiper-container">\n        <div class="swiper-wrapper">\n          ';
            data.forEach(function(banner) {
              _ += '\n            <div class="swiper-slide"><img src="';
              if (typeof banner.url !== 'undefined') {
                _ += $NODETPL.escapeHtml(banner.url);
              }

              _ += '"></div>\n          ';
            });
            _ += '\n        </div>\n        <div class="swiper-pagination"></div>\n      </div>\n      ';
          }
          _ += '\n      <div class="row icon-menu">\n        <div class="col-33">\n          <a href="./tpls/fagui.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/policyList.action">\n            <div class="fa-box"><i class="fa fa-balance-scale"></i></div>\n            <p>政策法规</p>\n          </a>\n        </div>\n        <div class="col-33">\n          <a href="./tpls/news.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/newsList.action">\n            <div class="fa-box"><i class="fa fa-file-movie-o"></i></div>\n            <p>新闻动态</p>\n          </a>\n        </div>\n        <div class="col-33">\n          <a href="./tpls/jiamengqiye.tpl|';
          if (typeof $DATA.apiRoot !== 'undefined') {
            _ += $NODETPL.escapeHtml($DATA.apiRoot);
          }

          _ += '/compList.action">\n            <div class="fa-box"><i class="fa fa-flag-checkered"></i></div>\n            <p>加盟企业</p>\n          </a>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>';
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