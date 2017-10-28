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

module im.sush.catspaw {
    export function RollOver(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            find: null,
            off:  '_off.',
            on:   '_on.'
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Rollover'

        // Get Target Exists
        let image = $target
        if(_set.find !== null) {
            image = image.find( _set.find )
        }
        // If not exists, finish
        if(! image.length) {
            return $target
        }

        // Preload images
        image.each(function(e)
        {
            if($(this).attr('src')) {
                $('<img>')
                    .attr(
                        'src',
                        $(this).attr('src').replace(_set.off, _set.on)
                    )
            }
        })

        // Change Target DOM
        const changeTgt = function(obj)
        {
            return (_set.find) ? obj.find(_set.find) : obj
        }

        // Mouse On
        const rov = function(): void
        {
            var tgt = changeTgt($(this))
            tgt.each(function() {
                if($(this).attr('src')) {
                    $(this).attr(
                        'src',
                        tgt.attr('src').replace(_set.off, _set.on)
                    )
                }
            })
        }

        // Mouse Off
        const rot = function(): void
        {
            var tgt = changeTgt($(this))
            tgt.each(function() {
                if($(this).attr('src')) {
                    $(this).attr(
                        'src',
                        tgt.attr('src').replace(_set.on, _set.off)
                    )
                }
            })
        }

        // Attach Event
        $target
            .on(im.sush.catspaw.Util.me+e_name, rov)
            .on(im.sush.catspaw.Util.ml+e_name, rot)
        
        return $target
    }
}