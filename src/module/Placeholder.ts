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

module im.sush.catspaw {
    export function Placeholder(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            form      : 'form',
            toColor   : '#999999',
            fromColor : '#333333',
            attr      : 'title'
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Inputdefault'

        // Focus input area
        function inpFocus() {
            $(this)
                .css('color', _set.fromColor)
                .val('')
                .data('catsInputDefaultFlag', 'true')
        }

        // Blur input area
        function inpBlur() {
            // When blured checking value is empty
            if($(this).val() == '') {
                // If value is empty
                $(this)
                    .val($(this).attr(_set.attr))
                    .css('color', _set.toColor)
                $(this)
                    .on('focus'+e_name, inpFocus)
                    .data('catsInputDefaultFlag', 'false')
            } else {
                // If value is not empty, remove focus event
                $(this).off('focus'+e_name)
            }
        }

        // If input value is empty, insert example text
        $(this).each(function() {
            if($(this).val() == '') {
                $(this)
                    .data('catsInputDefaultFlag', 'false')
                    .val($(this).attr(_set.attr))
                    .css('color', _set.toColor)
                    .on('focus'+e_name, inpFocus)
                    .on('blur' +e_name, inpBlur )
            }
        })

        // Before submit function
        $(_set.form).on('submit'+e_name, function() {
            $target.each( function() {
                // If flag is false and value is same with label, change empty
                if(
                    $(this).val() == $(this).attr(_set.attr) &&
                    $(this).data('catsInputDefaultFlag') == 'false'
                ) {
                    $(this).val('')
                }
            })
        })

        return $target
    }
}