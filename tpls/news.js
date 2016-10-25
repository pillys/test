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
          _ += '<div class="navbar">\n  <div class="navbar-inner">\n    <div class="left">\n      <a href="#" class="link back icon-only">\n        <i class="fa fa-angle-left"></i>\n      </a>\n    </div>\n    <div class="center sliding">新闻动态</div>\n    <div class="right"></div>\n  </div>\n</div>\n\n<div class="pages navbar-through">\n  <div data-page="zhengcefagui" class="page page-zhengcefagui">\n    <div class="page-content">\n      <div class="content">\n        <div class="list-block">\n          ';
          if ($DATA.data.length > 0 && $DATA.data[0]) {
            var data = $DATA.data[0];

            _ += '\n            <ul>\n              ';
            data.forEach(function(item) {
              var subdata = JSON.stringify({
                title: item.title
              });

              _ += '\n                <li>\n                  <a href="/tpls/news/detail.tpl|';
              if (typeof subdata !== 'undefined') {
                _ += $NODETPL.escapeHtml(subdata);
              }

              _ += '|';
              if (typeof $DATA.apiRoot !== 'undefined') {
                _ += $NODETPL.escapeHtml($DATA.apiRoot);
              }

              _ += '/detailInfo.action?id=';
              if (typeof item.id !== 'undefined') {
                _ += $NODETPL.escapeHtml(item.id);
              }

              _ += '&category=';
              if (typeof item.category !== 'undefined') {
                _ += $NODETPL.escapeHtml(item.category);
              }

              _ += '" class="item-link">\n                    <div class="item-content">\n                      <div class="item-inner">';
              if (typeof item.title !== 'undefined') {
                _ += $NODETPL.escapeHtml(item.title);
              }

              _ += '</div>\n                    </div>\n                  </a>\n                </li>\n              ';
            });
            _ += '\n            </ul>\n          ';
          }
          _ += '\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';
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