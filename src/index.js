/**
 * @author ydr.me
 * @ref https://github.com/kujian/simple-flexible/blob/master/flexible.js
 */
;(function (designWidth, maxWidth, baseFontSize) {
    'use strict';

    var doc = document;
    var win = window;
    var htmlEl = doc.documentElement;
    var headEl = doc.head;
    var styleEl = doc.createElement('style');
    var viewportEl = doc.querySelector('meta[name="viewport"]');
    var refreshREMTimeid;
    var onChangeListeners = [];
    var change = function () {
        onChangeListeners.forEach(function (fn) {
            fn.call(exports);
        });
    };
    var dpr = 1;
    var rem = 16;
    var scale = 1;
    // 分割数量
    var grids = 100;
    var exports = {
        onChange: function (fn) {
            if (typeof fn === 'function') {
                onChangeListeners.push(fn);
            }
        },
        px2rem: function (_px) {
            return _px / rem;
        },
        rem2px: function (_rem) {
            return _rem * rem;
        }
    };
    var visible = false;

    htmlEl.style.opacity = '0';
    headEl.appendChild(styleEl);


    /**
     * 计算 DPR
     */
    var computeDPR = function () {
        var devicePixelRatio = win.devicePixelRatio || 1;

        if (devicePixelRatio > 2) {
            dpr = 3;
        } else if (devicePixelRatio > 1) {
            dpr = 2;
        } else {
            dpr = 1;
        }

        exports.dpr = dpr;
        exports.scale = scale = 1 * (1 / dpr).toFixed(2);
        htmlEl.classList.add('dpr' + dpr);
    };


    /**
     * 计算 REM
     */
    var computeREM = function computeREM() {
        var deviceWidth = htmlEl.clientWidth;

        if (deviceWidth > maxWidth) {
            deviceWidth = maxWidth;
        }

        rem = deviceWidth * grids / designWidth;
        var remStyleText = 'html{' +
            'font-size:' + rem + 'px !important;' +
            'background-color:#fff;' +
            // '-webkit-transition: opacity 0.5s cubic-bezier(.075,.82,.165,1);' +
            'transition: opacity 0.5s linear;' +
            '}';

        if (styleEl.styleSheet) {
            styleEl.styleSheet.cssText = remStyleText;
        } else {
            try {
                styleEl.innerHTML = remStyleText
            } catch (f) {
                styleEl.innerText = remStyleText
            }
        }

        htmlEl.style.fontSize = rem + 'px';
        exports.rem = rem;

        if (!visible) {
            visible = true;
            doc.body.style.fontSize = baseFontSize * dpr + 'px';
            viewportEl.setAttribute(
                'content',
                'user-scalable=no,' +
                'initial-scale=' + scale + ',' +
                'maximum-scale=' + scale + ',' +
                'minimum-scale=' + scale
            );
            setTimeout(function () {
                htmlEl.style.opacity = '1';
            }, 456);
        }

        change();
    };


    /**
     * 刷新 REM
     */
    var refreshREM = function refreshREM() {
        clearTimeout(refreshREMTimeid);
        refreshREMTimeid = setTimeout(computeREM, 300);
    };

    win.addEventListener('resize', refreshREM);

    win.addEventListener('pageshow', function (ev) {
        // true: 网页来自浏览器缓存
        // false: 网页不是来自浏览器缓存（来自服务器）
        if (ev.persisted) {
            refreshREM();
        }
    });


    computeDPR();
    refreshREM();
    win.flexible = exports;
}(750, 1024, 16));