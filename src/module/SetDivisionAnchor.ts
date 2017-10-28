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

module im.sush.catspaw{
    export function SetDivisionAnchor(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            not    : null,
            force  : true,
            eq     : 0,
            active : 'act',
            over   : null,
            out    : null,
            is_ro  : true,
            off    : '_off.',
            on     : '_on.'
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Setdivanchor'

        // Apply specified filter
        const _parent = $target.filter(function() {
            if(_set.not && $(this).filter(_set.not).length > 0) {
                return false
            } else {
                return true
            }
        })

        _parent.each(function() {
            const _tgt = $(this),
                  _a   = _tgt.find('a').eq(_set.eq)

            // If there is no link
            if(_a.length <= 0) {
                return
            }
            // Stop event for target anchor
            _a.bind('click'+e_name, function(e) {
                e.stopPropagation()
            })

            if(_set.is_ro) {
                // Stop RO event for target img
                _tgt.find('img')
                    .off(im.sush.catspaw.Util.me)
                    .off(im.sush.catspaw.Util.ml)
            }

            // Create Event for setDivAnchor
            _tgt.css( 'cursor', 'pointer' )
                .on(im.sush.catspaw.Util.me+e_name, function(e) {
                    $(this).addClass(_set.active)

                    if(_set.is_ro) {
                        var img = $(this).find('img[src*="'+_set.off+'"]')
                        if( img.length > 0 ) {
                            img.each( function() {
                                $(this).attr('src', $(this).attr('src')
                                    .replace(_set.off, _set.on))
                            })
                        }
                    }

                    if($.isFunction(_set.over)) {
                        _set.over($(this))
                    }
                })
                .on(im.sush.catspaw.Util.ml+e_name, function(e) {
                    $(this).removeClass(_set.active)

                    if(_set.is_ro) {
                        var img = $(this).find('img[src*="'+_set.on+'"]')
                        if(img.length>0) {
                            img.each( function() {
                                $(this).attr('src', $(this).attr('src')
                                    .replace(_set.on, _set.off))
                            })
                        }
                    }

                    if($.isFunction(_set.out)) {
                        _set.out($(this))
                    }
                })
                .on('click'+e_name, function(e) {
                    if(_set.force) {
                        if(_a.attr('target') == '_blank') {
                            window.open(_a.attr('href'))
                        } else {
                            window.location.href = _a.attr('href')
                        }
                    }

                    _a.trigger('click')
                })
        })

        return $target
    }
}