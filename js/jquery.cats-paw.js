/**
 * jquery.cats-paw.js
 * 
 * @version 1.0.0
 * @author SUSH <sush@sus-happy.ner>
 * https://github.com/sus-happy/jquery.cats-paw.js
 */

;(function($) {
    /**
     * 共通利用関数の設定
     */
    $.extend( {
        cats: {
            // イベント名前空間の接頭語
            _namespace: '.catsEvent',
            // カーソル判定イベント
            _me: 'mouseenter',
            _ml: 'mouseleave',
            // モバイル端末判定結果
            _isMobileParam: null,
            // スクロール位置の取得
            getScrollPosition: function() {
                return ( document.documentElement.scrollTop || document.body.scrollTop );
            },
            // ウィンドウ表示サイズを取得
            getInnerHeight: function() {
                return ( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight );
            },
            // コンテンツ要素サイズを取得
            getContentsHeight: function() {
                var h = Math.max( document.body.clientHeight ,document.body.scrollHeight );
                    h = Math.max( h, document.documentElement.scrollHeight );
                    h = Math.max( h, document.documentElement.clientHeight );
                return h;
            },
            // モバイル端末判定
            isMobile: function() {
                if( $.cats._isMobileParam !== null ) {
                    return $.cats._isMobileParam;
                }

                var ua = navigator.userAgent.toLowerCase();
                if( ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0 ){
                    $.cats._isMobileParam = 'sp';
                } else if( ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0 ){
                    $.cats._isMobileParam = 'tab';
                } else {
                    $.cats._isMobileParam = 'other';
                }

                if( $.cats._isMobileParam !== 'other' ) {
                    $.cats._me = 'touchstart';
                    $.cats._ml = 'touchend';
                }

                return $.cats._isMobileParam;
            }
        }
    } );

    // モバイル端末判定を実行
    $.cats.isMobile();

    /**
     * jQuery拡張関数の設定
     */
    $.fn.extend( {

        /**
         * ロールオーバー ( rollOver )
         * 画像のロールオーバーを設定する関数
         * イベント名前空間: .catsEventRollover
         *
         * @param object opt { find: string, off: string, on: string }
         */
        rollOver: function( opt ) {
            // 初期値の上書き
            var _set = {
                find : null,
                off  : '_off.',
                on   : '_on.'
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Rollover';

            // ターゲットの存在判定
            var image = $(this);
            if( _set.find !== null ) {
                image = image.find( _set.find );
            }
            // ターゲットがなければ終了
            if(! image.length ) {
                return $(this);
            }

            // 画像のプリロード
            image.each( function( e ) {
                if( $(this).attr( 'src' ) ) {
                    $( '<img>' ).attr( 'src', $(this).attr( 'src' ).replace( _set.off, _set.on ) );
                }
            } );

            // イベント設定
            $(this)
                .bind( $.cats._me+e_name, rov )
                .bind( $.cats._ml+e_name, rot );

            // マウスオン
            function rov( e ) {
                var tgt = changeTgt( $(this) );
                tgt.each( function() {
                    if( $(this).attr( 'src' ) ) {
                        $(this).attr( 'src', tgt.attr( 'src' ).replace( _set.off, _set.on ) );
                    }
                } );
            }

            // マウスアウト
            function rot( e ) {
                var tgt = changeTgt( $(this) );
                tgt.each( function() {
                    if( $(this).attr( 'src' ) ) {
                        $(this).attr( 'src', tgt.attr( 'src' ).replace( _set.on, _set.off ) );
                    }
                } );
            }

            // ターゲット変更
            function changeTgt( obj ) {
                return ( _set.find ) ? obj.find( _set.find ) : obj;
            }

            return $(this);
        },

        /**
         * アルファロールオーバー ( alphaRo )
         * 透明度の変化によるロールオーバーを設定する関数
         * イベント名前空間: .catsEventAlpharo
         *
         * @param object opt { from: number, to: number, fade: boolean, speed: number, group: boolean }
         */
        alphaRo: function( opt ) {
            // 初期値の上書き
            var _set = {
                from  : 1,
                to    : 0.8,
                fade  : false,
                speed : 700
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Alpharo';

            // イベント設定
            $(this)
                .css( { 'opacity': _set.from } )
                .bind( $.cats._me+e_name, { toNum: _set.to },   toOpacity )
                .bind( $.cats._ml+e_name, { toNum: _set.from }, toOpacity );

            // IE対応
            if( $(this).css( 'display' ) == 'inline' ) {
                $(this).css( { display:'inline-block' } );
            }

            // 透明度変更
            function toOpacity( e ) {
                if( _set.fade ) {
                    $(this).stop( true, false ).animate( { 'opacity': e.data.toNum }, { duration: _set.speed } );
                } else {
                    $(this).css( 'opacity', e.data.toNum );
                }
            }

            return $(this);
        },

        /**
         * スムーススクロール ( smScroll )
         * ページ内リンクをスクロールによって移動する関数
         * イベント名前空間: .catsEventSmscroll
         *
         * @param object opt { speed: number, easing: string, hash: boolean }
         */
        smScroll: function( opt ) {
            // 初期値の上書き
            var _set = {
                speed  : 700,
                easing : '',
                hash   : true
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Smscroll';

            // 関数内変数の初期値指定
            var _hash, _h, _inH, _flag = true;
            var _scrTgt = ( navigator.userAgent.toLowerCase().indexOf('safari') !=-1 ) ? $('body') : $('html');

            // イベント設定
            $(this).filter( '[href^="#"]' ).bind( 'click'+e_name, function() {
                _h   = $.cats.getContentsHeight();
                _inH = $.cats.getInnerHeight();
                toPos( $(this).attr('href').substr(1) );
                return false;
            } );

            // アンカー監視
            if( _set.hash ) {
                setInterval( function() {
                    toPosBrowse( getHash() );
                }, 200 );
            }

            // スクロール位置にアニメーション
            function toPos( gHash ) {
                if( _flag ) {
                    _hash=gHash;
                    _flag=false;
                    _scrTgt.stop( true, false ).animate( { scrollTop: toGetPoint() }, _set.speed, _set.easing, setHash );
                }
            }

            // スクロール位置に移動
            function toPosBrowse( gHash ) {
                if( _hash !== gHash && _flag ) {
                    _hash = gHash;
                    _scrTgt.stop( true, false ).scrollTop( toGetPoint() );
                    setHash();
                }
            }

            // スクロール終了点を取得
            function toGetPoint() {
                var result = 0;
                if( _hash != '' ) {
                    var tgt = $('#'+_hash);
                    if(! tgt.length ) {
                        tgt = $('*[name="'+_hash+'"]').eq(0);
                    }
                    if( tgt.length ) {
                        result = tgt.offset().top;
                        if( result + _inH > _h ) {
                            result = _h-_inH;
                        }
                    }
                }
                return result;
            }

            // ハッシュ値を取得
            function getHash() {
                if (typeof window.location.hash !=='undefined') {
                    return window.location.hash.substr(1);
                } else {
                    return location.hash.substr(1);
                }
            }

            // ハッシュ値を指定
            function setHash() {
                if(_set.hash) {
                    if (typeof window.location.hash !=='undefined') {
                        if (window.location.hash !==_hash) {
                            window.location.hash=_hash;
                        }
                    } else if(location.hash !==_hash) {
                        location.hash=_hash;
                    }
                }
                _flag=true;
            }

            return $(this);
        },

        /**
         * サブウィンドウ表示 ( anotherWin )
         * サブウィンドウを表示する関数
         * イベント名前空間: .catsEventAnotherwin
         *
         * @param object opt { width: number, height: number, name: string, scrollbars: string, resizable: string, menubar: string, attr: boolean }
         */
        anotherWin: function( opt ) {
            // 初期値の上書き
            var _set = {
                width      : 500,
                height     : false,
                name       : 'subWindow',
                scrollbars : 'yes',
                resizable  : 'yes',
                menubar    : 'yes',
                attr       : false
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Anotherwin';

            $(this).bind( 'click'+e_name, function( e ) {
                var url = $(this).attr('href');

                // サイズ取得
                var w = ~~_set.width;
                var h = ~~_set.height;
                if( _set.attr ) {
                    var size = checkAttrSize( this );
                    w = size.width;
                    h = size.height;
                }
                if(! h ) {
                    h = $.cats.getInnerHeight();
                }

                // yes/no判定処理
                _set.scrollbars = _set.scrollbars === 'yes' ? 'yes' : 'no';
                _set.resizable  = _set.resizable  === 'yes' ? 'yes' : 'no';
                _set.menubar    = _set.menubar    === 'yes' ? 'yes' : 'no';

                // window.openのルール生成
                var rule = 'width='+w+',height='+h+',scrollbars='+_set.scrollbars+',resizable='+_set.resizable+',menubar='+_set.menubar;
                window.open( url, _set.name, rule );

                return false;
            } );

            // data-sizeからサイズを取得
            function checkAttrSize( tgt ) {
                var param = $(tgt).attr( 'data-size' )+'';
                var size  = param.split( ',' );
                return { width: ~~size[0], height: ~~size[1] };
            }

            return $(this);
        },

        /**
         * 高さ揃え ( setHeight )
         * 指定要素の内、一番大きい高さの要素に合わせる関数
         *
         * @param object opt { parent: string, outer: boolean, step: number }
         */
        setHeight: function( opt ) {
            // 初期値の上書き
            var _set = {
                outer : false,
                step  : 0
            };
            if( opt ) $.extend( _set, opt );

            // 基準値
            var sHeight = 0;

            // ステップ数が指定してあるか？
            if( _set.step === 0 ) {
                // 0の場合は全体のサイズから指定
                $(this).each( getHeight ).each( setHeight );
            } else {
                // 指定のある場合はステップ数の要素のサイズから指定
                for( var i=0, l=$(this).length; i<l; i+=_set.step ) {
                    sHeight = 0;
                    $(this).slice( i, i+_set.step ).each( getHeight ).each( setHeight );
                }
            }

            // 高さ取得
            function getHeight() {
                $(this).css( 'height', 'auto' );
                var gH = _set.outer ? $(this).outerHeight() : $(this).height();
                if( sHeight < gH ) {
                    sHeight = gH;
                }
            }

            // 高さ指定
            function setHeight() {
                var lHeight = _set.outer ? sHeight - $(this).outerHeight() + $(this).height() : sHeight;
                $(this).height( lHeight );
            }

            return $(this);
        },

        /**
         * 範囲リンク ( setDivAnchor )
         * 対象の要素をリンク要素と偽装し、包括するリンク要素の範囲を広げる
         * イベント名前空間: .catsEventSetdivanchor
         *
         * @param object opt { not: string, force: boolean, eq: number, active: string, over: function, out: function, is_ro: boolean, off: string, on: string }
         */
        setDivAnchor: function( opt ) {
            // 初期値の上書き
            var _set = {
                not    : false,
                force  : true,
                eq     : 0,
                active : 'act',
                over   : null,
                out    : null,
                is_ro  : true,
                off    : '_off.',
                on     : '_on.'
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Setdivanchor';

            // 適用外指定フィルタの適用
            var _parent = $(this).filter( function() {
                if( _set.not && $(this).filter( _set.not ).length > 0 ) {
                    return false;
                } else {
                    return true;
                }
            } );

            _parent.each( function() {
                var _tgt = $(this),
                    _a   = _tgt.find('a').eq( _set.eq );

                // リンクが存在していなければ終了
                if(! _a.length > 0 ) {
                    return;
                }
                // 指定リンク要素のイベントを停止
                _a.bind( 'click'+e_name, function(e) {
                    e.stopPropagation();
                } );

                if( _set.is_ro ) {
                    // 対象要素内のROを停止
                    _tgt.find( 'img' ).unbind( $.cats._me ).unbind( $.cats._ml );
                }

                // setDivAnchor用のROを作成
                _tgt.css( 'cursor', 'pointer' ).bind( $.cats._me+e_name, function( e ) {
                    $(this).addClass( _set.active );

                    if( _set.is_ro ) {
                        var img = $(this).find( 'img[src*="'+_set.off+'"]' );
                        if( img.length > 0 ) {
                            img.each( function() {
                                $(this).attr( 'src', $(this).attr( 'src' ).replace( _set.off, _set.on ) );
                            } );
                        }
                    }

                    if( $.isFunction( _set.over ) ) {
                        _set.over( $(this) );
                    }
                } ).bind( $.cats._ml+e_name, function( e ) {
                    $(this).removeClass( _set.active );

                    if( _set.is_ro ) {
                        var img = $(this).find( 'img[src*="'+_set.on+'"]' );
                        if(img.length>0) {
                            img.each( function() {
                                $(this).attr( 'src', $(this).attr( 'src' ).replace( _set.on, _set.off ) );
                            } );
                        }
                    }

                    if( $.isFunction( _set.out ) ) {
                        _set.out( $(this) );
                    }
                } ).bind( 'click'+e_name, function( e ) {
                    if( _set.force ) {
                        if( _a.attr('target') == '_blank' ) {
                            window.open( _a.attr('href') );
                        } else {
                            window.location.href = _a.attr( 'href' );
                        }
                    }

                    _a.trigger( 'click' );
                } );
            } );

            return $(this);
        },

        /**
         * 例文表示 ( inputDefault )
         * placeHolderが実装されていないブラウザでも例文を表示させる
         * input / textareaのtitle属性が例文として扱われる
         * イベント名前空間: .catsEventInputdefault
         *
         * @param object opt { form: string, toColor: color, fromColor: color }
         */
        inputDefault: function( opt ) {
            // 初期値の上書き
            var _set = {
                form      : 'form',
                toColor   : '#999999',
                fromColor : '#333333',
                attr      : 'title'
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Inputdefault';

            // 対象の入力エリア
            var target=$(this);

            // 入力内容が空であれば例文を入れる
            $(this).each( function() {
                if( $(this).val() == '' ) {
                    $(this)
                        .data( 'catsInputDefaultFlag', 'false' )
                        .val( $(this).attr( _set.attr ) )
                        .css( 'color', _set.toColor )
                        .bind( 'focus'+e_name, inpFocus )
                        .bind( 'blur' +e_name, inpBlur  );
                }
            } );

            // 送信前実行処理
            $( _set.form ).bind( 'submit'+e_name, function() {
                target.each( function() {
                    // 入力内容のフラグがfalseで、対象属性と入力値が同じ場合は空にする
                    if(
                        $(this).val() == $(this).attr( _set.attr ) &&
                        $(this).data( 'catsInputDefaultFlag' )=='false'
                    ) {
                        $(this).val('');
                    }
                } );
            } );

            // 入力エリアにフォーカス
            function inpFocus() {
                $(this)
                    .css( 'color', _set.fromColor )
                    .val( '' )
                    .data( 'catsInputDefaultFlag', 'true' );
            }

            // 入力エリアから外れた
            function inpBlur() {
                // 外れた時に内容が入力されているか？
                if($(this).val()=='') {
                    // 入力内容が空だった場合はフォーカスイベントを追加
                    $(this).val( $(this).attr( _set.attr ) ).css( 'color', _set.toColor );
                    $(this).bind( 'focus'+e_name, inpFocus ).data( 'catsInputDefaultFlag', 'false' );
                } else {
                    // 内容が入力されていればフォーカスイベントを削除
                    $(this).unbind( 'focus'+e_name );
                }
            }

            return $(this);
        },

        /**
         * ストーカーメニュー ( stokerMenu )
         * スクロールに合わせて、少し遅れて付いてくるメニューを実装する
         * イベント名前空間: .catsEventStokermenu
         *
         * @param object opt { child: string, toPos: number, delay: number, speed: number }
         */
        stokerMenu: function( opt ) {
            // 初期値の上書き
            var _set = {
                parent:'body',
                toPos:20,
                delay:700,
                speed:5
            };
            if( opt ) $.extend( _set, opt );

            // イベント名前空間の指定
            var e_name = $.cats._namespace + 'Stokermenu';

            // 変数指定
            var cBox = $( _set.parent );
            var lBox = $(this);
            var nowP=0;
            var scrInterval, chkInterval;

            cBox.css( { 'position': 'relative', 'zoom': 1 } );
            lBox.css( { 'position': 'absolute', 'top' : 0 } );

            // 初期位置を設定
            // toPosが数値じゃない場合
            switch( _set.toPos ) {
                case 'rb':
                    lBox.css( { 'right': 0 } );
                case 'b':
                    $( window ).bind( 'resize'+e_name, function() {
                        _set.toPos = $.cats.getInnerHeight() - lBox.outerHeight( true );
                    } ).trigger( 'resize' );
                    var h       = $.cats.getInnerHeight();
                    var lHeight = lBox.outerHeight( true );
                    var cHeight = cBox.outerHeight( true );

                    if( h >= cHeight ) {
                        nowP = h-lHeight;
                    } else {
                        nowP = cHeight-lHeight;
                    }

                    lBox.css( { 'top': nowP } );
                break;
            }
            var dTop=lBox.offset().top;
            goMoving();

            /**
             * 移動しているか確認
             */
            function chkMoving() {
                chkInterval = setInterval( function() {
                    var sabun = getTargetPos()-nowP;
                    if( Math.abs( sabun ) > 5) {
                        clearInterval( chkInterval );
                        goMoving();
                    }
                }, _set.delay );
            }

            /**
             * 指定位置に移動
             */
            function goMoving() {
                scrInterval = setInterval( function() {
                    var goalpos = getTargetPos();
                    var sabun   = ( goalpos-nowP ) / _set.speed;
                    nowP = nowP+sabun;

                    if( Math.abs( sabun ) < 0.5 ) {
                        clearInterval( scrInterval );
                        nowP = goalpos;
                        lBox.css( 'top', nowP );
                        chkMoving();
                    } else {
                        lBox.css( 'top', nowP );
                    }
                }, 10 );
            }

            /**
             * 移動指定位置を取得
             */
            function getTargetPos() {
                var nHeight = lBox.outerHeight(true);
                var cHeight = cBox.outerHeight(true);
                var scr = $.cats.getScrollPosition()+_set.toPos;
                if( scr < 0 ) {
                    scr = 0;
                } else if( scr+nHeight>cHeight ) {
                    scr = cHeight - nHeight;
                }
                return scr;
            }

            return $(this);
        }
    } );
})(jQuery);