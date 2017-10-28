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

module im.sush.catspaw {
    export function SmoothScroll(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            speed  : 700,
            easing : '',
            hash   : true
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Smscroll'

        // Set Initial parameter
        let _hash, _h, _inH, _flag = true
        const strUA   = navigator.userAgent.toLowerCase()
        const $scrTgt =
            (strUA.indexOf("chrome")===-1 && strUA.indexOf("safari")!=-1)
                ? $('body')
                : $('html')

        // スクロール位置にアニメーション
        const toPos = function(gHash)
        {
            if(_flag) {
                _hash=gHash
                _flag=false
                $scrTgt
                    .stop( true, false )
                    .animate(
                        {scrollTop: toGetPoint()},
                        _set.speed,
                        _set.easing,
                        setHash
                    )
            }
        }

        // スクロール位置に移動
        const toPosBrowse = function(gHash)
        {
            if( _hash !== gHash && _flag ) {
                _hash = gHash
                $scrTgt.stop( true, false ).scrollTop( toGetPoint() )
                setHash()
            }
        }

        // スクロール終了点を取得
        const toGetPoint = function()
        {
            let result = 0
            if(_hash != '') {
                let tgt = $('#'+_hash)
                if(! tgt.length) {
                    tgt = $('*[name="'+_hash+'"]').eq(0)
                }
                if(tgt.length) {
                    result = tgt.offset().top
                    if(result + _inH > _h) {
                        result = _h-_inH
                    }
                }
            }
            return result
        }

        // Get Hash Parameter
        const getHash = function()
        {
            if (typeof window.location.hash !=='undefined') {
                return window.location.hash.substr(1)
            } else {
                return location.hash.substr(1)
            }
        }

        // Set Hash Parameter
        const setHash = function()
        {
            if(_set.hash) {
                if (typeof window.location.hash !=='undefined') {
                    if (window.location.hash !==_hash) {
                        window.location.hash=_hash
                    }
                } else if(location.hash !==_hash) {
                    location.hash=_hash
                }
            }
            _flag=true
        }

        // Check Anchor
        if(_set.hash) {
            setInterval(function() {
                toPosBrowse(getHash())
            }, 200)
        }

        // Attach Event
        $target
            .filter('[href^="#"]')
            .on('click'+e_name, function(e) {
                e.preventDefault()

                _h   = im.sush.catspaw.Util.getContentsHeight()
                _inH = im.sush.catspaw.Util.getInnerHeight()
                toPos($(this).attr('href').substr(1))
            })
        
        return $target
    }
}