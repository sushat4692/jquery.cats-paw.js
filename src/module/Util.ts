/**
 * CatsPaw Class
 */
module im.sush.catspaw {
    export class Util
    {
        // Prefix for Event name
        static namespace: string = '.catsEvent'

        // Click or Tap event
        static me: string = 'mouseenter'
        static ml: string = 'mouseleave'

        // Judge Mobile Param
        static isMobileParam: string = null

        // Get Scroll Position
        static getScrollPosition(): number
        {
            return (
                document.documentElement.scrollTop
                || document.body.scrollTop
            )
        }

        // Get Window Height
        static getInnerHeight(): number
        {
            return (
                window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight
            )
        }

        // Get Contents Height
        static getContentsHeight(): number
        {
            let h = Math.max(
                    document.body.clientHeight,
                    document.body.scrollHeight
                )
                h = Math.max(h, document.documentElement.scrollHeight)
                h = Math.max(h, document.documentElement.clientHeight)
            return h
        }

        // Judge Mobile Function
        static isMobile(): string
        {
            if(Util.isMobileParam !== null) {
                return Util.isMobileParam
            }

            var ua = navigator.userAgent.toLowerCase()
            if(
                ua.indexOf('iphone') > 0
                || ua.indexOf('ipod') > 0
                || ua.indexOf('android') > 0
                && ua.indexOf('mobile') > 0
            ){
                Util.isMobileParam = 'sp'
            } else if(ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0){
                Util.isMobileParam = 'tab'
            } else {
                Util.isMobileParam = 'other'
            }

            if(Util.isMobileParam !== 'other') {
                Util.me = 'touchstart'
                Util.ml = 'touchend'
            }

            return Util.isMobileParam
        }
    }
}
