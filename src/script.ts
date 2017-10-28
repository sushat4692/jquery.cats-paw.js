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
})