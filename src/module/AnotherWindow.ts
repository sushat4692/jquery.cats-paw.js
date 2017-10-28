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

module im.sush.catspaw{
    export function AnotherWindow(opt: Object)
    {
        const $target = $(this)

        // Overwrite Initial Parameter
        let _set = {
            width      : 500,
            height     : false,
            name       : 'subWindow',
            scrollbars : 'yes',
            resizable  : 'yes',
            menubar    : 'yes',
            attr       : false
        }
        if(opt) $.extend(_set, opt)

        // Get Event Name
        const e_name = im.sush.catspaw.Util.namespace + 'Anotherwin'

        // Get Size from "data-size" attribute
        const checkAttrSize = function(tgt)
        {
            var param = $(tgt).attr('data-size')+''
            var size  = param.split(',')
            return {width: ~~size[0], height: ~~size[1]}
        }

        // Display Another Window
        const openAnotherWindow = function(e) 
        {
            e.preventDefault()

            var url = $(this).attr('href')

            // サイズ取得
            var w = ~~_set.width
            var h = ~~_set.height
            if( _set.attr ) {
                var size = checkAttrSize(this)
                w = size.width
                h = size.height
            }
            if(! h ) {
                h = im.sush.catspaw.Util.getInnerHeight()
            }

            // yes/no判定処理
            _set.scrollbars = _set.scrollbars === 'yes' ? 'yes' : 'no'
            _set.resizable  = _set.resizable  === 'yes' ? 'yes' : 'no'
            _set.menubar    = _set.menubar    === 'yes' ? 'yes' : 'no'

            // window.openのルール生成
            var rule =
                'width=' + w
                + ',height=' + h
                + ',scrollbars=' + _set.scrollbars
                + ',resizable='+_set.resizable
                + ',menubar='+_set.menubar
            window.open(url, _set.name, rule)
        }

        // Attach Event
        $target.on('click'+e_name, openAnotherWindow)

        return $target
    }
}