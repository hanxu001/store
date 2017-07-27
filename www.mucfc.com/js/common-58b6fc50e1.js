$(document).ready(function () {

    var isIE8 = isIE8()
    var supportSVG = hasSVG()
    var autoScrolling = $(window).height() > 620
    var fitToSection = $(window).height() > 620
    var currentPage = 0
    var hasSmallNavShowed = false
    var firstLoaded = true
    var timeCounting = 0
    var timer = null
    var hasScrolled = false
    var part1Loaded = false
    var part2Loaded = false
    var part3Loaded = false
    var part4Loaded = false
    var hasScrolled = false
    var banner = $('.main__banner__container__img')
    var imgs_product = new Array('../images/mucfc-img.png', '../images/haoqidai-img.png', '../images/xinyongfu-img.png')

    function onlineJudge_SW() {
        if (navigator.onLine) {
            // console.info("Internet is OnLine!");
            if (!isIE8 && !(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.")) {
                try {
                    H2O.config('https://ff54668fbcd44bc4a62179f5f9c3e8d5@sentry.mucfc.com/16', { channelCode: '0OWS' }).start();
                } catch(e) {}
            }

            if (navigator.serviceWorker) {
                // console.info('enter serviceworker');
                // register service worker
                try {
                    navigator.serviceWorker.register('../service-worker.js')
                        .then(function (registration) {
                            // console.info("Service Worker 注册成功!");
                        })
                } catch (err) {
                    // console.info("Service Worker 注册失败!");
                }
            } else {
                // console.info("当前浏览器不支持 Service Worker!");
            }
        } else {
            // console.info("Internet is OffLine!");
            // load script to populate offline page list
            if (document.getElementById('cachedpagelist') && 'caches' in window) {
                var scr = document.createElement('script');
                scr.src = '../js/offlinepage.js'; //相对于offline文件夹里网页的路径
                scr.async = 1;
                document.head.appendChild(scr);
            }
        }
    }
    onlineJudge_SW();

    // 页面滚动，导航栏状态改变
    var top = 0,
        navBar = $('.header'),
        navLinks = $('.header__nav__link'),
        bodyType = $('body').attr('class'),
        logo_svg = $('#mucfc-logo-svg'),
        logo_png = $('#mucfc-logo-png'),
        href1 = location.href;

    /*  if (bodyType === 'page__products' || bodyType === 'page__about') {
          var p = 0,
              t = 0;

          $(window).scroll(function (e) {
              p = $(this).scrollTop();

              var header = $('.header.header-bg');
              if (t <= p) {

                  header.css('position', 'relative');
                  header.css('display', 'none');
                  //$('.header.header-bg').addClass('animated fadeOut');
                  $('.main__banner').css('padding-top', '0px');
              } else {

                  header.css('position', 'fixed');
                  header.css('display', 'block');
                  header.addClass('animated fadeIn');
                  $('.main__banner').css('padding-top', '64px');
                  //$('.header').css('position','fixed');
              }
              setTimeout(function () { t = p; }, 0);
          });
      }*/
    if (bodyType === 'page__home') {
        var header_dropdown_menu = $('.header__nav__dropdown__menu'),
            part1_body = $('.main__part--1'),
            part1_slogan = $('.main__part--1__slogan'),
            part1_anchor = $('.main__part--1__layout'),
            part2_title_long = $('.content--left__title--long'),
            part2_title_middle = $('.content--left__title--middle'),
            part2_slogan = $('.content--left__slogan'),
            part2_icon = $('.content--left__square img'),
            part2_right = $('.content--right'),
            part2_phone = $('.content--right--phone'),
            part2_number = $('.content--right__number'),
            part3_left_phone = $('.content__billboard--left'),
            part3_right_icon = $('.content__billboard--right img'),
            part3_right_text = $('.content__billboard--right p'),
            part4_logo1 = $('.main__part--4__logo--1 img'),
            part4_intro = $('.main__part--4__intro'),
            part4_logo2 = $('.main__part--4__logo--2 img'),
            part4_QRlink = $('.main__part--4__QR-link'),
            part4_QR = $('.main__part--4__QR'),
            part4_FQ = $('.main__part--4__FQ'),
            part4_LINK = $('.main__part--4__LINK'),
            part4_mask = $('.main__part--4__mask')

        if (!autoScrolling) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 10) {
                    changeLogoToBlue()
                } else if (!hasSmallNavShowed) {
                    changeLogeToWhite()
                }
            })
        }

        function changeScrollStatus() {
            var width = $(window).width()
            var height = $(window).height()
            if (width <= 901 && height > 620 && height <= 900) {
                $.fn.fullpage.setAutoScrolling(false)
                $.fn.fullpage.setFitToSection(false)
                autoScrolling = false
            } else if (height > 620 && !autoScrolling) {
                autoScrolling = true
                $.fn.fullpage.setAutoScrolling(true)
            }
        }

        /**
         * 根据窗口大小，首页的文字内容
         * @return {[type]} [description]
         */
        function changeText() {
            var winWidth = $(window).width()

            // 隐藏右侧小圆点
            if (winWidth < 375) {
                $('#fp-nav').hide()
            } else if (winWidth < 440) {
                $('#fp-nav').show().css("right", "2px")
            } else {
                $('#fp-nav').show().css("right", "17px")
            }

            if (winWidth <= 600) {
                // 改变 page 1 的 slogan
                $('.main__part--1__title--zh').html("微金融</br>新互联")
                $('.main__part--1__title--en').html("U-FINANCE&nbsp;MORE&nbsp;CONNECTION")

                // 改变 page 3 的广告词
                $('[data-order="1"] .content__billboard--right__detail')
                    .html('全线上申请<br>无需抵押<br>极速审批<br>额度最高<strong class="font-blue"> 20万</strong> &nbsp<br> &nbsp<br>')
                $('[data-order="2"] .content__billboard--right__detail')
                    .html("秒速放款<br>日利率低至<strong class='font-orange'>0.029%</strong><br>按日计息<br>随借随还<br>不使用无任何费用")
                $('[data-order="3"] .content__billboard--right__detail')
                    .html("先消费后还款<br>最长40天<br><strong class='font-pink'>免息免手续费</strong><br>涵盖3C/<br>医美/家装/<br>教育/出行等领域")

                // 隐藏 page 3 的背景纹理
                $('.content__background-img').hide()
            } else {
                $('[data-order="1"] .content__billboard--right__detail')
                    .html('全线上申请<br>无需抵押<br>极速审批<br>额度最高<strong class="font-blue"> 20万</strong>')
                $('[data-order="2"] .content__billboard--right__detail')
                    .html('秒速放款<br>日利率低至<strong class="font-orange">0.029%</strong><br>按日计息，随借随还<br>不使用无任何费用')
                $('[data-order="3"] .content__billboard--right__detail')
                    .html('先消费后还款<br>最长40天<strong class="font-pink">免息免手续费</strong><br>涵盖3C/医美/家装/<br>教育/出行等领域')
                $('.main__part--1__title--zh').html("微金融·新互联")
                $('.main__part--1__title--en').html("U-FINANCE&nbsp;&nbsp;&nbsp;&nbsp;MORE&nbsp;&nbsp;CONNECTION")
            }
        }

        function changePage2Title() {
            if ($(window).width() > 1600) {
                $('.content--left__title--long').css('display', 'block')
                $('.content--left__title--middle').css('display', 'none')
            } else {
                $('.content--left__title--long').css('display', 'none')
                $('.content--left__title--middle').css('display', 'block')
            }
        }
        changePage2Title()

        $(window).resize(function () {
            // 隐藏右侧小圆点，并修改第二页slogan内容
            changeText()
            changePage2Title()
            changeScrollStatus()
            changeByRatio()
        })

        $('.next-arrow').click(function () {
            $.fn.fullpage.moveSectionDown()
        })

        $('.FQ__header__close, .main__part--4__QR__wrapper__close, .LINK__header__close').hover(function () {
            $('.FQ__header__close, .main__part--4__QR__wrapper__close, .LINK__header__close').attr("src", "../images/close-btn-QR-hover@2.png")
        }, function () {
            $('.FQ__header__close, .main__part--4__QR__wrapper__close, .LINK__header__close').attr("src", "../images/close-btn-QR@2.png")
        })

        // 根据 isIE8 改变圆角矩形的样式
        if (isIE8) {
            $('.content__nav').addClass('content__nav--ie8')
            $('.content--left').addClass('content--left--ie8')
            $('.content--right').addClass('content--right--ie8')
            $('.border-blue').removeClass('border-blue').addClass('border-blue--ie8')
            $('.border-orange').removeClass('border-orange').addClass('border-orange--ie8')
            $('.border-pink').removeClass('border-pink').addClass('border-pink--ie8')
            $('.content__background-img.top').hide()
            $('.main__part--4__mask').removeClass('main__part--4__mask')
            $('.content__nav a').html("")
        }

        //TODO 背景图加载,加载完替换和展示
        function part1Load() {
            if (!part1Loaded) {
                part1_body.css({
                    'background': '#3489ca url(../images/bg-big1-low.jpg) no-repeat',
                    'background-position': '55% bottom'
                });
                part1_anchor.attr('src', '../images/blue-arc.png');
                part1_anchor.css('display', 'inline-block');
                var img = new Image();
                img.src = "../images/bg-big1.jpg";
                img.onload = function () {
                    part1_slogan.attr('src', '../images/slogan.png');
                    part1_slogan.attr('data-rjs', '../images/slogan@2.png')
                    part1_slogan.addClass('animated-short fadeInUp');
                    part1_slogan.css('display', 'inline-block');
                
                    part1_body.css({
                        'background': '#3489ca url(' + img.src + ') no-repeat',
                        'background-position': '55% bottom'
                    });
                    scrollAuto();
                }
                part1Loaded = true;
            }
        }

        //TODO 延迟自页面滚动
        function scrollAuto() {
            var href = location.href
                // 如果加载首页后停留在第一页超过一段 time 后，则自动滚到下一页，如果用户有手动滚动过，就不自动滚
            if (href.indexOf('index.html#firstPage') > -1 || href.indexOf('index.html#') == -1) {
                setTimeout(function () {
                    if (!hasScrolled) {
                        $.fn.fullpage.moveSectionDown()
                    }
                }, 7000)
            }
        }

        //TODO 模块二加载,加载完替换和展示
        function part2Load() {
            if (!part2Loaded) {
                var img = new Image();
                if ($(window).width() > 900) img.src = "../images/phone1.png";
                else img.src = "../images/phone1_static.png";
                img.onload = function () {
                    part2_phone.attr('src', img.src);
                    part2_phone.attr('data-rjs', '../images/phone1@2.png');
                    part2_title_long.attr('src', '../images/part2-title-long.png');
                    part2_title_long.attr('data-rjs', '../images/part2-title-long@2.png');
                    part2_title_middle.attr('src', '../images/part2-title-middle.png');
                    part2_title_middle.attr('data-rjs', '../images/part2-title-middle@2.png');
                    part2_icon.attr('src', '../images/banner2-icon.png');
                    part2_icon.attr('data-rjs', '../images/banner2-icon@2.png');
                    part2_right.css('display', 'inline-block');
                    $('.content--left').css('display', 'inline-block');
                }
                part2Loaded = true;
            }
        }

        // 控制“额度”从10，000增加到200，000.00的动效
        function increaseNumber() {
            setTimeout(function () {
                var i = 10000
                var addNumTimer = setInterval(function (argument) {
                    if (i <= 200000) {
                        var str = '' + i
                        var num = '' + str.substring(str.length - 6, str.length - 3) + ',' + str.substring(str.length - 3) + '.00'
                        part2_number.html(num)
                        i += 3211
                    } else {
                        part2_number.html('200,000.00')
                        clearInterval(addNumTimer)
                    }
                }, 20)
            }, 1550)
        }

        //添加动画
        function slideAddAnimate() {
            part3_left_phone.addClass('animated-short myfadeInLeft')
            part3_right_icon.addClass('animated-short myrotateIn fadeIn')
            part3_right_text.addClass('animated-short myfadeInRight')
        }
        //删除动画
        function slideCancelAnimate() {
            part3_left_phone.removeClass('animated-short myfadeInLeft')
            part3_right_icon.removeClass('animated-short myrotateIn fadeIn')
            part3_right_text.removeClass('animated-short myfadeInRight')
        }

        //TODO 模块四加载,加载完替换和展示
        function part3Load() {
            if (!part3Loaded) {
                var img = new Image();
                img.src = "../images/screen3-phone1.png";
                img.onload = function () {
                    $('[data-order="1"] .content__billboard--left img').attr('src', img.src);
                    $('[data-order="2"] .content__billboard--left img').attr('src', '../images/screen3-phone2.png');
                    $('[data-order="3"] .content__billboard--left img').attr('src', '../images/screen3-phone3.png');
                }
                part3Loaded = true;
            }
        }

        //TODO 模块四加载,加载完替换和展示
        function part4Load() {
            if (!part4Loaded) {
                var img = new Image();
                img.src = "../images/bottom-img-p.png";
                img.onload = function () {
                    part4_logo1.attr('src', '../images/logo-big.png');
                    part4_logo1.attr('data-rjs', '../images/logo-big@2.png');
                    part4_logo2.attr('src', '../images/cmb_unicom.png');
                    part4_logo2.attr('data-rjs', '../images/cmb_unicom@2.png');
                    part4_logo1.css('visibility', 'visible');
                    part4_logo2.css('visibility', 'visible');
                    $('.main__part--4').css({
                        'background': '#4976d1 url(' + img.src + ') no-repeat',
                        'background-position': 'center bottom',
                        'background-size': 'cover'
                    });
                }
                part4Loaded = true;
            }
        }

        // fullPage 的相关配置
        $('#mucfc-main').fullpage({
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'forthPage'],
            navigation: true,
            navigationColor: '#FFF',
            scrollOverflow: false,

            autoScrolling: autoScrolling,
            fitToSection: fitToSection,

            fixedElements: '.header',
            keyboardScrolling: true,
            animateAnchor: true,
            lockAnchors: false,

            // 某个页面加载后，调用该方法
            afterLoad: function (anchorLink, index) {
                currentPage = index
                changeText()
                $('.content__nav').show()

                // 根据页面滚动，修改导航栏样式
                if (index == 1 && !hasSmallNavShowed) {
                    changeLogeToWhite()
                    part1Load()
                } else {
                    changeLogoToBlue()
                }
                // 根据页面滚动，修改右边小圆点和底部箭头的颜色
                if (index == 3) {
                    $('#fp-nav span').css('background', '#3489ca')
                    $('.next-arrow img').attr('src', '../images/arrow-blue.png')
                    timer = setInterval(function () {
                        // switch(timeCounting++ > 3)
                        if (++timeCounting % 3 == 0) {
                            $.fn.fullpage.moveSlideRight();
                            slideAddAnimate();
                        } else {
                            slideCancelAnimate();
                        }
                    }, 2000)
                } else {
                    $('#fp-nav span').css('background', '#fff')
                    $('.next-arrow img').attr('src', '../images/arrow.png')
                }

                // 控制第 3 页的背景 texture
                if (index == 3 && $(window).width() > 600) {
                    $('.content__background-img.left').show()
                    $('.content__background-img.right').show()
                    if (!isIE8) {
                        $('.content__background-img.top').show()
                    }
                }

                // 控制箭头的显示
                if (index == 4) {
                    $('.next-arrow').hide()
                } else {
                    $('.next-arrow').show()
                }
            },

            // 离开某页时调用该方法
            onLeave: function (index, nextIndex, direction) {
                hasScrolled = true;
                switch (index) {
                    case 1:
                        part1_slogan.removeClass('animated-short fadeInUp');
                        break;
                    case 2:
                        $('.content--left__title').removeClass('animated fadeIn');
                        part2_icon.removeClass('animated-short fadeInUp');
                        part2_right.removeClass('animated-short myfadeInRight');
                        part2_number.text('1,000.00');
                        break;
                    case 3:
                        $('.content__background-img').hide();
                        clearInterval(timer);
                        slideCancelAnimate();
                        break;
                }
                switch (nextIndex) {
                    case 1:
                        part1_slogan.addClass('animated-short fadeInUp');
                        break;
                    case 2:
                        part2Load();
                        $('.content--left__title').addClass('animated fadeIn');
                        part2_icon.addClass('animated-short fadeInUp');
                        part2_right.addClass('animated-short myfadeInRight');
                        if ($(window).width() > 900) {
                            part2_phone.attr('scr', '../images/phone1.png');
                            part2_number.css("display", "inline-block");
                            if (!$('.content--right__number').hasClass('animated-short')) {
                                increaseNumber()
                            }
                        } else {
                            part2_number.css("display", "none");
                            part2_phone.attr('src', '../images/phone1_static.png');
                        }
                        break;
                    case 3:
                        // $('.main__part--3 .content__background-img').css('background', "url(../images/screen3-texture1.png) no-repeat");
                        part3Load();
                        slideAddAnimate();
                        $('.content__billboard').css('display', 'block');
                        if ($(window).width() > 600) {
                            $('.content__background-img.left').show()
                            $('.content__background-img.right').show()
                            if (!isIE8) {
                                $('.content__background-img.top').show()
                            }
                        }
                        break;
                    case 4:
                        part4Load();
                        break;
                }
            }
        })

        $('.content__nav a').click(function (e) {
            timeCounting = 0
        })
        changeScrollStatus()
        var href = location.href

        // 初始化 fullpage 后，把 body 的 overflow-x 改为 hidden
        $('body').css("overflow-x", "hidden")

        // 控制首页 page4 二维码的显示和隐藏
        part4_QRlink.click(function () {
            $('.main__part--4__QR-wrapper__img').attr('src', '../images/wechat-QR.png');
            part4_QR.show()
            part4_mask.show()
        })
        $('.main__part--4__mask, .main__part--4__QR__wrapper__close.popup__form__close').click(function () {
            part4_QR.hide()
            part4_FQ.hide()
            part4_LINK.hide()
            part4_mask.hide()
        })
        part4_QR.click(function (e) {
            if ($(e.target).parent('.main__part--4__QR__wrapper').length == 0) {
                part4_QR.hide()
                part4_mask.hide()
                part4_LINK.hide()
            }
        })

        // 控制“投诉建议”弹框的显示和隐藏
        $('.footer__item__FQ').click(function (e) {
            e.preventDefault()
            part4_FQ.show()
            part4_mask.show()
        })

        $('.FQ__header__close').click(function () {
            part4_FQ.hide()
            part4_mask.hide()
        })

        // 控制“友情链接”弹框的显示和隐藏
        $('.footer__item__LINK').click(function (e) {
            e.preventDefault()
            part4_LINK.show()
            part4_mask.show()
        })

        $('.LINK__header__close').click(function () {
            part4_LINK.hide()
            part4_mask.hide()
        })



        // 需要按高度比例变小的图片元素
        var elementsSize = [{
            elementName: '.main__part--1__slogan',
            width: 597,
            height: 205
        }, {
            elementName: '.content--left__title',
            width: 1009,
            height: 74
        }, {
            elementName: '.content--left__square img',
            width: 389,
            height: 121
        }, {
            elementName: '.main__part--2__content .content--right img',
            width: 536,
            height: 622
        }, {
            elementName: '.content--right__number',
            width: 170,
            height: 34,
            fontSize: 30,
            lineHeight: 34,
            top: 143,
            left: 288
        }, {
            elementName: '.content__billboard--left img',
            width: 294
        }, {
            elementName: 'img.billboard--left__phone-screen',
            width: 229
        }, {
            elementName: '.screen-wrapper',
            width: 229,
            marginTop: 71,
            marginLeft: 27
        }, {
            elementName: 'img.billboard--left__phone',
            width: 294
        }, {
            elementName: '.content__billboard--right',
            width: 330
        }, {
            elementName: '.content__billboard--right img',
            width: 81,
            height: 80
        }, {
            elementName: '.main__part--4__logo--1 img',
            width: 207,
            height: 101
        }, {
            elementName: '.main__part--4__logo--2 img',
            width: 266,
            height: 42
        }]


        // 根据高度比例 ratio 逐渐改变图片元素的大小
        function changeByRatio() {
            var height = $(window).height();
            var width = $(window).width();
            if ((height < 1080 && height > 620 && width < 992) || (height < 1080) || isIE8) {
                var ratio = (height / 1080)
                if (ratio < 0.7) ratio = 0.7;
                // 等比变化字号大小
                part2_slogan.css('font-size', ratio * 19 + 'px')
                part3_right_text.css('font-size', ratio * 26 + 'px')
                part4_intro.css('font-size', ratio * 18 + 'px')

                // 等比变化边距
                $('.content--left__title').css('margin-bottom', ratio * 20 + 'px')
                part2_slogan.css('margin-bottom', ratio * 30 + 'px')
                for (var i = 0; i < elementsSize.length; i++) {
                    var element = elementsSize[i]
                    if (element.elementName == '.content--left__title' && width <= 1600) {
                        $(element.elementName).width((560 * ratio) + 'px')
                        if (element.height) {
                            $(element.elementName).height((154 * ratio) + 'px')
                        }
                    } else {
                        $(element.elementName).width((element.width * ratio) + 'px')
                        if (element.height) {
                            $(element.elementName).height((element.height * ratio) + 'px')
                        }
                    }

                    if (element.elementName == '.screen-wrapper') {
                        $(element.elementName).css({
                            "margin-top": element.marginTop * ratio,
                            "margin-left": element.marginLeft * ratio
                        })
                    }
                    // 设置变化数字的大小
                    if (element.elementName == '.content--right__number') {
                        // 特殊情况
                        if (width > 900) {
                            $(element.elementName).css({
                                "font-size": element.fontSize * ratio,
                                "top": element.top * ratio,
                                "left": element.left * ratio
                            })
                            if (part2Loaded) {
                                part2_phone.attr('src', '../images/phone1.png');
                                $(element.elementName).html('200,000.00').css("display", "inline-block");
                            }
                        } else {
                            $(element.elementName).css("display", "none");
                            if (part2Loaded) part2_phone.attr('src', '../images/phone1_static.png');
                        }
                    }
                }
            }
        }
        changeByRatio();
    }

    // 弹窗
    var registBtn = $('.header__nav__btn'),
        layout = $('.popup'),
        registWrapper = $('.popup__form'),
        registForm1 = $('#popup__form__item--1'),
        registForm2 = $('#popup__form__item--2'),
        registForm3 = $('#popup__form__item--3'),
        wechatQRLink = $('.main__part--3__QR-link'),
        wechatQR = $('.main__part--3__QR'),
        closeBtn = $('.popup__form__close')

    registBtn.click(function () {
        layout.show()
        registWrapper.show()
        registForm1.show()
    })

    closeBtn.click(function () {
        hideAll()
    })

    wechatQRLink.click(function () {
        wechatQR.show()
    })

    function hideAll() {
        layout.hide()
        registWrapper.hide()
        registForm1.hide()
        registForm2.hide()
        registForm3.hide()
        wechatQR.hide()
    }

    // tap栏目
    var tapList = $('.main__wrapper__detail__menu__item--link'),
        contentList = $('.main__wrapper__detail__'),
        tapMenu = $('.main__wrapper__detail__menu'),
        tapDetail = $('.main__wrapper__detail'),
        address = $('.main__wrapper__detail__detail__p strong'),
        imgsList = $('.main__wrapper__detail__illustration__img')
    if (bodyType === 'page__products') {
        for (var i = 0; i < 3; i++) {
            if (!imgsList.eq(i).attr('src')) {
                imgsList.eq(i).attr('src', imgs_product[i]);
            }
        }

    }
    if ($(window).width() > 600) {
        tapMenu.css('height', ($('.main__wrapper__detail__:first').height() + 90) + 'px')
    }

    tapList.each(function (index, el) {
        $(this).click(function (e) {
            tapList.removeClass('selected')
            contentList.removeClass('selected')
            $(this).addClass('selected')
            $(contentList[index]).addClass('selected')
            if ($(window).width() > 600) {
                tapMenu.css('height', ($('.main__wrapper__detail__.selected').height() + 90) + 'px')
            }

        })
    })

    $(window).resize(function () {
        if ($(window).width() > 600) {
            tapMenu.css('height', ($('.main__wrapper__detail__.selected').height() + 90) + 'px')

            // 控制 about.html 等页面的 banner
            banner.css({
                width: '2560px',
                height: '450px'
            })
        } else {
            tapMenu.css('height', '166px')

            // 控制 about.html 等页面的 banner
            banner.css({
                width: '1280px',
                height: '225px'
            })
        }
    })

    if ($(window).width() > 600) {
        tapMenu.css('height', ($('.main__wrapper__detail__.selected').height() + 90) + 'px')
    }

    changeNavigator()

    function isIE8() {
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
            return true
        } else {
            return false
        }
    }


    /**
     * 判断是否支持 svg
     * @return {Boolean} 支持：true；不支持：false
     */
    function hasSVG() {　　
        var SVG_NS = 'http://www.w3.org/2000/svg';　　
        return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;　
    }


    /**
     * 把导航栏样式改为白底蓝logo
     * 
     */
    function changeLogoToBlue() {
        // 把导航栏样式改成白色
        navBar.addClass('header-bg')
        if (supportSVG) {
            logo_svg.attr("src", "../images/mucfc-logo-blue.svg").show()
            logo_png.hide()
        } else {
            logo_svg.hide()
            logo_png.attr("src", "../images/mucfc-logo-blue.png").show()
        }
    }


    /**
     * 把导航栏样式改为透明底白logo
     * 
     */
    function changeLogeToWhite() {
        navBar.removeClass('header-bg')
        if (supportSVG) {
            logo_svg.attr("src", "../images/mucfc-logo-white.svg").show()
            logo_png.hide()
        } else {
            logo_svg.hide()
            logo_png.attr("src", "../images/mucfc-logo-white.png").show()
        }
    }


    /**
     * 控制导航栏的样式和动效
     * 
     */
    function changeNavigator() {

        // 控制点击三条横线的事件
        $('.header__burger').click(function () {
            if (!hasSmallNavShowed) {
                showSmallNav()
            } else {
                hideSmallNav()
            }
        })

        // 控制二级菜单的显示和隐藏
        $('.header__nav__dropdown__trigger, .header__nav__dropdown__menu, header__nav__dropdown__menu__item').hover(function () {
            $('.header__nav__dropdown__menu').show()
        }, function () {
            $('.header__nav__dropdown__menu').hide()
        })

        //  
        $('.header__nav__dropdown__menu__item').hover(function () {
            $('.header__nav__qrcode').show()
        }, function () {
            $('.header__nav__qrcode').hide()
        })

        // 控制点击“常用功能”的事件
        $('#commonFunction .header__nav__link').click(function (argument) {
            if ($(window).width() <= 992) {
                if ($('#commonFunction ul').css("display") == 'none') {
                    $('#commonFunction ul').slideDown(300)
                    $('.icon-triangle-down').css("transform", "rotate(180deg)")
                } else {
                    $('#commonFunction ul').slideUp(300)
                    $('.icon-triangle-down').css("transform", "rotate(360deg)")
                    $('.icon-triangle-down').css("transform", "rotate(0deg)")
                }
            }
        })
    }

    $('.main__mask').click(function () {
        hideSmallNav()
    });

    /**
     * 显示导航栏时需要触发的操作
     *
     */
    function showSmallNav() {
        if ($(window).width() <= 992) {
            // 改变 menu logo 
            $('.header__burger .icon').addClass('close').removeClass('menu')
            $('.header__nav__dropdown--s > ul').slideDown(300)
            $('.main__banner__page1').hide()

            changeLogoToBlue()

            // 判断是否支持半透明蒙板
            if (true) {
                $('.main__mask').show()
            }
            hasSmallNavShowed = true
        }
    }


    /**
     * 收起导航栏时需要触发的操作
     * 
     */
    function hideSmallNav() {
        // 收起导航栏
        $('.header__nav__dropdown--s > ul').slideUp(300)
        $('#commonFunction ul').slideUp(300)
            // 旋转小三角形
        $('.icon-triangle-down').css("transform", "rotate(0deg)")
            // 隐藏蒙板
        $('.main__mask').hide()
            // 改变 menu logo 
        $('.header__burger .icon').addClass('menu').removeClass('close')

        if ($(window).scrollTop() <= 10 && currentPage == 1) {
            changeLogeToWhite()
        }

        hasSmallNavShowed = false

        setTimeout(function () {
            $('.main__banner__page1').show()
        }, 300)
    }
})
