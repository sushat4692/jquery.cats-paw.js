/**
 * CatsPaw Class
 */
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            var Util = /** @class */ (function () {
                function Util() {
                }
                // Get Scroll Position
                Util.getScrollPosition = function () {
                    return (document.documentElement.scrollTop
                        || document.body.scrollTop);
                };
                // Get Window Height
                Util.getInnerHeight = function () {
                    return (window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight);
                };
                // Get Contents Height
                Util.getContentsHeight = function () {
                    var h = Math.max(document.body.clientHeight, document.body.scrollHeight);
                    h = Math.max(h, document.documentElement.scrollHeight);
                    h = Math.max(h, document.documentElement.clientHeight);
                    return h;
                };
                // Judge Mobile Function
                Util.isMobile = function () {
                    if (Util.isMobileParam !== null) {
                        return Util.isMobileParam;
                    }
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.indexOf('iphone') > 0
                        || ua.indexOf('ipod') > 0
                        || ua.indexOf('android') > 0
                            && ua.indexOf('mobile') > 0) {
                        Util.isMobileParam = 'sp';
                    }
                    else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
                        Util.isMobileParam = 'tab';
                    }
                    else {
                        Util.isMobileParam = 'other';
                    }
                    if (Util.isMobileParam !== 'other') {
                        Util.me = 'touchstart';
                        Util.ml = 'touchend';
                    }
                    return Util.isMobileParam;
                };
                // Prefix for Event name
                Util.namespace = '.catsEvent';
                // Click or Tap event
                Util.me = 'mouseenter';
                Util.ml = 'mouseleave';
                // Judge Mobile Param
                Util.isMobileParam = null;
                return Util;
            }());
            catspaw.Util = Util;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * RollOver image module
 *
 * @EventName Rollover
 * @param opt {
 *   find: string,
 *   off: string,
 *   on: string
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function RollOver(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    find: null,
                    off: '_off.',
                    on: '_on.'
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Rollover';
                // Get Target Exists
                var image = $target;
                if (_set.find !== null) {
                    image = image.find(_set.find);
                }
                // If not exists, finish
                if (!image.length) {
                    return $target;
                }
                // Preload images
                image.each(function (e) {
                    if ($(this).attr('src')) {
                        $('<img>')
                            .attr('src', $(this).attr('src').replace(_set.off, _set.on));
                    }
                });
                // Change Target DOM
                var changeTgt = function (obj) {
                    return (_set.find) ? obj.find(_set.find) : obj;
                };
                // Mouse On
                var rov = function () {
                    var tgt = changeTgt($(this));
                    tgt.each(function () {
                        if ($(this).attr('src')) {
                            $(this).attr('src', tgt.attr('src').replace(_set.off, _set.on));
                        }
                    });
                };
                // Mouse Off
                var rot = function () {
                    var tgt = changeTgt($(this));
                    tgt.each(function () {
                        if ($(this).attr('src')) {
                            $(this).attr('src', tgt.attr('src').replace(_set.on, _set.off));
                        }
                    });
                };
                // Attach Event
                $target
                    .on(im.sush.catspaw.Util.me + e_name, rov)
                    .on(im.sush.catspaw.Util.ml + e_name, rot);
                return $target;
            }
            catspaw.RollOver = RollOver;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Alpha RollOver module
 *
 * @EventName Alpharo
 * @param opt {
 *   speed: number,
 *   easing: string,
 *   hash: boolean
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function AlphaRollOver(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    from: 1,
                    to: 0.8,
                    fade: false,
                    speed: 700
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Alpharo';
                // Change Opacity
                var toOpacity = function (e) {
                    if (_set.fade) {
                        $(this).stop(true, false).animate({ 'opacity': e.data.toNum }, { duration: _set.speed });
                    }
                    else {
                        $(this).css('opacity', e.data.toNum);
                    }
                };
                // Attach Event
                $target
                    .css({ 'opacity': _set.from })
                    .on(im.sush.catspaw.Util.me + e_name, { toNum: _set.to }, toOpacity)
                    .on(im.sush.catspaw.Util.ml + e_name, { toNum: _set.from }, toOpacity);
                return $target;
            }
            catspaw.AlphaRollOver = AlphaRollOver;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Smooth Scroll module
 *
 * @EventName Smscroll
 * @param opt {
 *   speed: number,
 *   easing: string,
 *   hash: boolean
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function SmoothScroll(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    speed: 700,
                    easing: '',
                    hash: true
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Smscroll';
                // Set Initial parameter
                var _hash, _h, _inH, _flag = true;
                var strUA = navigator.userAgent.toLowerCase();
                var $scrTgt = (strUA.indexOf("chrome") === -1 && strUA.indexOf("safari") != -1)
                    ? $('body')
                    : $('html');
                // スクロール位置にアニメーション
                var toPos = function (gHash) {
                    if (_flag) {
                        _hash = gHash;
                        _flag = false;
                        $scrTgt
                            .stop(true, false)
                            .animate({ scrollTop: toGetPoint() }, _set.speed, _set.easing, setHash);
                    }
                };
                // スクロール位置に移動
                var toPosBrowse = function (gHash) {
                    if (_hash !== gHash && _flag) {
                        _hash = gHash;
                        $scrTgt.stop(true, false).scrollTop(toGetPoint());
                        setHash();
                    }
                };
                // スクロール終了点を取得
                var toGetPoint = function () {
                    var result = 0;
                    if (_hash != '') {
                        var tgt = $('#' + _hash);
                        if (!tgt.length) {
                            tgt = $('*[name="' + _hash + '"]').eq(0);
                        }
                        if (tgt.length) {
                            result = tgt.offset().top;
                            if (result + _inH > _h) {
                                result = _h - _inH;
                            }
                        }
                    }
                    return result;
                };
                // Get Hash Parameter
                var getHash = function () {
                    if (typeof window.location.hash !== 'undefined') {
                        return window.location.hash.substr(1);
                    }
                    else {
                        return location.hash.substr(1);
                    }
                };
                // Set Hash Parameter
                var setHash = function () {
                    if (_set.hash) {
                        if (typeof window.location.hash !== 'undefined') {
                            if (window.location.hash !== _hash) {
                                window.location.hash = _hash;
                            }
                        }
                        else if (location.hash !== _hash) {
                            location.hash = _hash;
                        }
                    }
                    _flag = true;
                };
                // Check Anchor
                if (_set.hash) {
                    setInterval(function () {
                        toPosBrowse(getHash());
                    }, 200);
                }
                // Attach Event
                $target
                    .filter('[href^="#"]')
                    .on('click' + e_name, function (e) {
                    e.preventDefault();
                    _h = im.sush.catspaw.Util.getContentsHeight();
                    _inH = im.sush.catspaw.Util.getInnerHeight();
                    toPos($(this).attr('href').substr(1));
                });
                return $target;
            }
            catspaw.SmoothScroll = SmoothScroll;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Open Another Sub Window module
 *
 * @EventName Anotherwin
 * @param opt {
 *     width: number,
 *     height: number,
 *     name: string,
 *     scrollbars: string,
 *     resizable: string,
 *     menubar: string,
 *     attr: boolean
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function AnotherWindow(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    width: 500,
                    height: false,
                    name: 'subWindow',
                    scrollbars: 'yes',
                    resizable: 'yes',
                    menubar: 'yes',
                    attr: false
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Anotherwin';
                // Get Size from "data-size" attribute
                var checkAttrSize = function (tgt) {
                    var param = $(tgt).attr('data-size') + '';
                    var size = param.split(',');
                    return { width: ~~size[0], height: ~~size[1] };
                };
                // Display Another Window
                var openAnotherWindow = function (e) {
                    e.preventDefault();
                    var url = $(this).attr('href');
                    // サイズ取得
                    var w = ~~_set.width;
                    var h = ~~_set.height;
                    if (_set.attr) {
                        var size = checkAttrSize(this);
                        w = size.width;
                        h = size.height;
                    }
                    if (!h) {
                        h = im.sush.catspaw.Util.getInnerHeight();
                    }
                    // yes/no判定処理
                    _set.scrollbars = _set.scrollbars === 'yes' ? 'yes' : 'no';
                    _set.resizable = _set.resizable === 'yes' ? 'yes' : 'no';
                    _set.menubar = _set.menubar === 'yes' ? 'yes' : 'no';
                    // window.openのルール生成
                    var rule = 'width=' + w
                        + ',height=' + h
                        + ',scrollbars=' + _set.scrollbars
                        + ',resizable=' + _set.resizable
                        + ',menubar=' + _set.menubar;
                    window.open(url, _set.name, rule);
                };
                // Attach Event
                $target.on('click' + e_name, openAnotherWindow);
                return $target;
            }
            catspaw.AnotherWindow = AnotherWindow;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Adjust same height module
 *
 * @EventName SetHeight
 * @param opt {
 *   outer: boolean,
 *   step: number,
 *   resize: boolean
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function SetSameHeight(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    outer: false,
                    step: 0,
                    resize: false
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'SetHeight';
                // Check Height
                var sHeight = 0;
                // Resize Height
                var resizeHeight = function () {
                    $target.height('auto');
                    // Check step number
                    if (_set.step === 0) {
                        // If step number is 0, check from all sizes
                        $target.each(getHeight).each(setHeight);
                    }
                    else {
                        // If step number is specified, check each steps
                        for (var i = 0, l = $target.length; i < l; i += _set.step) {
                            sHeight = 0;
                            $target.slice(i, i + _set.step)
                                .each(getHeight)
                                .each(setHeight);
                        }
                    }
                };
                // Get Height
                var getHeight = function () {
                    $(this).css('height', 'auto');
                    var gH = _set.outer ? $(this).outerHeight() : $(this).height();
                    if (sHeight < gH) {
                        sHeight = gH;
                    }
                };
                // Set Height
                var setHeight = function () {
                    var lHeight = _set.outer
                        ? sHeight - $(this).outerHeight() + $(this).height()
                        : sHeight;
                    $(this).height(lHeight);
                };
                resizeHeight();
                // If resize flag is true
                if (_set.resize) {
                    $(window).on('resize' + e_name, resizeHeight);
                }
                return $target;
            }
            catspaw.SetSameHeight = SetSameHeight;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Set Division Anchor module
 *
 * @EventName SetDivisionAnchor
 * @param opt {
 *   not: string,
 *   force: boolean,
 *   eq: number,
 *   active: string,
 *   over: function,
 *   out: function,
 *   is_ro: boolean,
 *   off: string,
 *   on: string
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function SetDivisionAnchor(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    not: null,
                    force: true,
                    eq: 0,
                    active: 'act',
                    over: null,
                    out: null,
                    is_ro: true,
                    off: '_off.',
                    on: '_on.'
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Setdivanchor';
                // Apply specified filter
                var _parent = $target.filter(function () {
                    if (_set.not && $(this).filter(_set.not).length > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
                _parent.each(function () {
                    var _tgt = $(this), _a = _tgt.find('a').eq(_set.eq);
                    // If there is no link
                    if (_a.length <= 0) {
                        return;
                    }
                    // Stop event for target anchor
                    _a.bind('click' + e_name, function (e) {
                        e.stopPropagation();
                    });
                    if (_set.is_ro) {
                        // Stop RO event for target img
                        _tgt.find('img')
                            .off(im.sush.catspaw.Util.me)
                            .off(im.sush.catspaw.Util.ml);
                    }
                    // Create Event for setDivAnchor
                    _tgt.css('cursor', 'pointer')
                        .on(im.sush.catspaw.Util.me + e_name, function (e) {
                        $(this).addClass(_set.active);
                        if (_set.is_ro) {
                            var img = $(this).find('img[src*="' + _set.off + '"]');
                            if (img.length > 0) {
                                img.each(function () {
                                    $(this).attr('src', $(this).attr('src')
                                        .replace(_set.off, _set.on));
                                });
                            }
                        }
                        if ($.isFunction(_set.over)) {
                            _set.over($(this));
                        }
                    })
                        .on(im.sush.catspaw.Util.ml + e_name, function (e) {
                        $(this).removeClass(_set.active);
                        if (_set.is_ro) {
                            var img = $(this).find('img[src*="' + _set.on + '"]');
                            if (img.length > 0) {
                                img.each(function () {
                                    $(this).attr('src', $(this).attr('src')
                                        .replace(_set.on, _set.off));
                                });
                            }
                        }
                        if ($.isFunction(_set.out)) {
                            _set.out($(this));
                        }
                    })
                        .on('click' + e_name, function (e) {
                        if (_set.force) {
                            if (_a.attr('target') == '_blank') {
                                window.open(_a.attr('href'));
                            }
                            else {
                                window.location.href = _a.attr('href');
                            }
                        }
                        _a.trigger('click');
                    });
                });
                return $target;
            }
            catspaw.SetDivisionAnchor = SetDivisionAnchor;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Stoker Menu module
 *
 * @EventName Stokermenu
 * @param opt {
 *   child: string,
 *   toPos: number,
 *   delay: number,
 *   speed: number
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function StokerMenu(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    parent: 'body',
                    toPos: '20',
                    delay: 700,
                    speed: 5
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Stokermenu';
                // 変数指定
                var cBox = $(_set.parent);
                var lBox = $(this);
                var nowP = 0;
                var scrInterval, chkInterval;
                cBox.css({ 'position': 'relative', 'zoom': 1 });
                lBox.css({ 'position': 'absolute', 'top': 0 });
                // Set initial position
                // If toPos is not number
                var _tgtToPos = 0;
                switch (_set.toPos) {
                    case 'rb':
                        lBox.css({ 'right': 0 });
                    case 'b':
                        $(window).bind('resize' + e_name, function () {
                            _tgtToPos =
                                im.sush.catspaw.Util.getInnerHeight()
                                    - lBox.outerHeight(true);
                        }).trigger('resize');
                        var h = im.sush.catspaw.Util.getInnerHeight();
                        var lHeight = lBox.outerHeight(true);
                        var cHeight = cBox.outerHeight(true);
                        if (h >= cHeight) {
                            nowP = h - lHeight;
                        }
                        else {
                            nowP = cHeight - lHeight;
                        }
                        lBox.css({ 'top': nowP });
                        break;
                    default:
                        _tgtToPos = ~~_set.toPos;
                        break;
                }
                var dTop = lBox.offset().top;
                goMoving();
                /**
                 * Check moving or not
                 */
                function chkMoving() {
                    chkInterval = setInterval(function () {
                        var sabun = getTargetPos() - nowP;
                        if (Math.abs(sabun) > 5) {
                            clearInterval(chkInterval);
                            goMoving();
                        }
                    }, _set.delay);
                }
                /**
                 * Move to target position
                 */
                function goMoving() {
                    scrInterval = setInterval(function () {
                        var goalpos = getTargetPos();
                        var sabun = (goalpos - nowP) / _set.speed;
                        nowP = nowP + sabun;
                        if (Math.abs(sabun) < 0.5) {
                            clearInterval(scrInterval);
                            nowP = goalpos;
                            lBox.css('top', nowP);
                            chkMoving();
                        }
                        else {
                            lBox.css('top', nowP);
                        }
                    }, 10);
                }
                /**
                 * Get target position
                 */
                function getTargetPos() {
                    var nHeight = lBox.outerHeight(true);
                    var cHeight = cBox.outerHeight(true);
                    var scr = im.sush.catspaw.Util.getScrollPosition() + _tgtToPos;
                    if (scr < 0) {
                        scr = 0;
                    }
                    else if (scr + nHeight > cHeight) {
                        scr = cHeight - nHeight;
                    }
                    return scr;
                }
                return $target;
            }
            catspaw.StokerMenu = StokerMenu;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * Placeholder polyfill module
 *
 * @EventName Inputdefault
 * @param opt {
 *   form: string,
 *   toColor: color,
 *   fromColor: color,
 *   attr: string
 * }
 */
/// <reference path="../module/Util.ts" />
var im;
(function (im) {
    var sush;
    (function (sush) {
        var catspaw;
        (function (catspaw) {
            function Placeholder(opt) {
                var $target = $(this);
                // Overwrite Initial Parameter
                var _set = {
                    form: 'form',
                    toColor: '#999999',
                    fromColor: '#333333',
                    attr: 'title'
                };
                if (opt)
                    $.extend(_set, opt);
                // Get Event Name
                var e_name = im.sush.catspaw.Util.namespace + 'Inputdefault';
                // Focus input area
                function inpFocus() {
                    $(this)
                        .css('color', _set.fromColor)
                        .val('')
                        .data('catsInputDefaultFlag', 'true');
                }
                // Blur input area
                function inpBlur() {
                    // When blured checking value is empty
                    if ($(this).val() == '') {
                        // If value is empty
                        $(this)
                            .val($(this).attr(_set.attr))
                            .css('color', _set.toColor);
                        $(this)
                            .on('focus' + e_name, inpFocus)
                            .data('catsInputDefaultFlag', 'false');
                    }
                    else {
                        // If value is not empty, remove focus event
                        $(this).off('focus' + e_name);
                    }
                }
                // If input value is empty, insert example text
                $(this).each(function () {
                    if ($(this).val() == '') {
                        $(this)
                            .data('catsInputDefaultFlag', 'false')
                            .val($(this).attr(_set.attr))
                            .css('color', _set.toColor)
                            .on('focus' + e_name, inpFocus)
                            .on('blur' + e_name, inpBlur);
                    }
                });
                // Before submit function
                $(_set.form).on('submit' + e_name, function () {
                    $target.each(function () {
                        // If flag is false and value is same with label, change empty
                        if ($(this).val() == $(this).attr(_set.attr) &&
                            $(this).data('catsInputDefaultFlag') == 'false') {
                            $(this).val('');
                        }
                    });
                });
                return $target;
            }
            catspaw.Placeholder = Placeholder;
        })(catspaw = sush.catspaw || (sush.catspaw = {}));
    })(sush = im.sush || (im.sush = {}));
})(im || (im = {}));
/**
 * jquery.cats-paw.js
 *
 * @version 2.0.0
 * @author SUSH <sush@sus-happy.ner>
 * @license MIT
 * https://github.com/sus-happy/jquery.cats-paw.js
 */
/// <reference path="./module/Util.ts" />
/// <reference path="./module/RollOver.ts" />
/// <reference path="./module/AlphaRollOver.ts" />
/// <reference path="./module/SmoothScroll.ts" />
/// <reference path="./module/AnotherWindow.ts" />
/// <reference path="./module/SetSameHeight.ts" />
/// <reference path="./module/SetDivisionAnchor.ts" />
/// <reference path="./module/StokerMenu.ts" />
/// <reference path="./module/Placeholder.ts" />
im.sush.catspaw.Util.isMobile();
$.fn.extend({
    rollOver: im.sush.catspaw.RollOver,
    alphaRo: im.sush.catspaw.AlphaRollOver,
    smScroll: im.sush.catspaw.SmoothScroll,
    anotherWin: im.sush.catspaw.AnotherWindow,
    setHeight: im.sush.catspaw.SetSameHeight,
    setDivAnchor: im.sush.catspaw.SetDivisionAnchor,
    stokerMenu: im.sush.catspaw.StokerMenu,
    inputDefault: im.sush.catspaw.Placeholder,
    placeholder: im.sush.catspaw.Placeholder
});
