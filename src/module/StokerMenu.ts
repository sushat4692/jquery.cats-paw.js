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

module im.sush.catspaw {
    export function StokerMenu(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            parent : 'body',
            toPos  : '20',
            delay  : 700,
            speed  : 5
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Stokermenu'

        // 変数指定
        const cBox = $(_set.parent)
        const lBox = $(this)
        let nowP = 0
        let scrInterval, chkInterval

        cBox.css({'position': 'relative', 'zoom': 1})
        lBox.css({'position': 'absolute', 'top' : 0})

        // Set initial position
        // If toPos is not number
        let _tgtToPos = 0;
        switch(_set.toPos) {
            case 'rb':
                lBox.css({'right': 0})
            case 'b':
                $(window).bind('resize'+e_name, function() {
                    _tgtToPos =
                        im.sush.catspaw.Util.getInnerHeight()
                        - lBox.outerHeight( true )
                }).trigger('resize')
                let h       = im.sush.catspaw.Util.getInnerHeight()
                let lHeight = lBox.outerHeight( true )
                let cHeight = cBox.outerHeight( true )

                if(h >= cHeight) {
                    nowP = h-lHeight
                } else {
                    nowP = cHeight-lHeight
                }

                lBox.css({'top': nowP})
                break
            default:
                _tgtToPos = ~~_set.toPos
                break
        }
        let dTop=lBox.offset().top
        goMoving()

        /**
         * Check moving or not
         */
        function chkMoving() {
            chkInterval = setInterval( function() {
                let sabun = getTargetPos()-nowP
                if(Math.abs(sabun) > 5) {
                    clearInterval(chkInterval)
                    goMoving()
                }
            }, _set.delay )
        }

        /**
         * Move to target position
         */
        function goMoving() {
            scrInterval = setInterval(function() {
                let goalpos = getTargetPos()
                let sabun   = (goalpos-nowP) / _set.speed
                nowP = nowP+sabun

                if(Math.abs(sabun) < 0.5) {
                    clearInterval(scrInterval)
                    nowP = goalpos
                    lBox.css('top', nowP)
                    chkMoving()
                } else {
                    lBox.css('top', nowP)
                }
            }, 10)
        }

        /**
         * Get target position
         */
        function getTargetPos() {
            let nHeight = lBox.outerHeight(true)
            let cHeight = cBox.outerHeight(true)
            let scr = im.sush.catspaw.Util.getScrollPosition()+_tgtToPos
            if(scr < 0) {
                scr = 0
            } else if(scr+nHeight>cHeight) {
                scr = cHeight - nHeight
            }
            return scr
        }

        return $target
    }
}