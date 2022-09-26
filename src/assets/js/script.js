$(document).ready(function () {
    $('body').on('click', '.toggleMenu', function () {
        console.log("active");
        $('.toggleMenu').toggleClass('active')
        $('.sideBar').toggleClass('closed');
        $('body').toggleClass('sideBarClosed');

    });
    $('body').on('click', '.sidebar_layer', function () {
        console.log("active");
        $('.toggleMenu').toggleClass('active')
        $('.sideBar').toggleClass('closed');
        $('body').toggleClass('sideBarClosed');

    });

    if ($(window).width() < 1400) {
        /* $('.toggleMenu').addClass('active'); */
        $('.sideBar').addClass('closed');
        $('body').addClass('sideBarClosed');
    }


    $('body').on('click', '.menuListing .navItem', function () {
        console.log("i have clicked this link");

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).closest('.hasChild').find('.subMenu').slideUp();
        }
        else {
            $('.navItem').removeClass('active')
            $('.navItem>a').removeClass('active');
            $('.navItem').closest('.hasChild').find('.subMenu').slideUp();

            $(this).addClass('active');
            console.log("active")
            $(this).find('a').first().removeClass('active');
            $(this).closest('.hasChild').find('.subMenu').slideDown();
        };
    });

    $('body').on('click', '.toogleCard', function () {
        $(this).toggleClass('open');
        $(this).closest('.contentCard').find('.cardBody').slideToggle();
    });
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            $('.topBar').addClass('stickTop');
        }
        else {
            $('.topBar').removeClass('stickTop');
        }
    };



    $('.circleProgress').each(function () {
        let range = $(this).attr("value"),
            len = 2 * Math.PI * 90,
            value = len - (range / 100) * len;
        $(this).find('span').text(range + '%');
        $(this).append('<svg viewBox="0 0 200 200"><circle class="bg" cx="100" cy="100" r="90"></circle><circle class="inCircle" cx="100" cy="100" r="90" style="stroke-dasharray: ' + len + '; stroke-dashoffset: ' + len + '"></circle></svg>');
        $(this).find(".inCircle").animate({ strokeDashoffset: value });
    });


    $('body').on('click', '.chat_pop', function () {
        $(this).siblings('.chatWrapper').toggleClass('active');

    })
});