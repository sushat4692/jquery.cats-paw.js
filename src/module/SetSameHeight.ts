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

module im.sush.catspaw{
    export function SetSameHeight(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            outer : false,
            step  : 0,
            resize: false
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'SetHeight'

        // Check Height
        let sHeight = 0

        // Resize Height
        const resizeHeight = function(): void
        {
            $target.height('auto')

            // Check step number
            if(_set.step === 0) {
                // If step number is 0, check from all sizes
                $target.each(getHeight).each(setHeight)
            } else {
                // If step number is specified, check each steps
                for(let i=0, l=$target.length; i<l; i+=_set.step) {
                    sHeight = 0
                    $target.slice(i, i+_set.step)
                        .each(getHeight)
                        .each(setHeight)
                }
            }
        }

        // Get Height
        const getHeight = function(): void
        {
            $(this).css('height', 'auto')
            let gH = _set.outer ? $(this).outerHeight() : $(this).height()
            if(sHeight < gH) {
                sHeight = gH
            }
        }

        // Set Height
        const setHeight = function(): void
        {
            let lHeight =
                _set.outer
                    ? sHeight - $(this).outerHeight() + $(this).height()
                    : sHeight
            $(this).height(lHeight)
        }

        resizeHeight();
        // If resize flag is true
        if(_set.resize) {
            $(window).on('resize'+e_name, resizeHeight);
        }

        return $target
    }
}