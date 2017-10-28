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

module im.sush.catspaw {
    export function AlphaRollOver(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            from  : 1,
            to    : 0.8,
            fade  : false,
            speed : 700
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Alpharo'

        // Change Opacity
        const toOpacity = function(e)
        {
            if(_set.fade) {
                $(this).stop(true, false).animate({'opacity': e.data.toNum}, {duration: _set.speed})
            } else {
                $(this).css('opacity', e.data.toNum)
            }
        }

        // Attach Event
        $target
            .css({'opacity': _set.from})
            .on(im.sush.catspaw.Util.me+e_name, {toNum: _set.to},   toOpacity)
            .on(im.sush.catspaw.Util.ml+e_name, {toNum: _set.from}, toOpacity)

        return $target
    }
}