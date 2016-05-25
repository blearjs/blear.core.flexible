/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

require('../src/index.js');
var flexible = window.flexible;

describe('测试文件', function () {
    it('exports', function (done) {
        var rem = flexible.px2rem(100);
        var px = flexible.rem2px(rem);

        flexible.onChange(function () {
            done();
        });

        expect(px).toEqual(100);
    });
});
