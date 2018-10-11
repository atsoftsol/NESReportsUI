$(document).ready(function (e) {

    // banner-slider
    /* $('.banner-slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
    }); */
    // Add caret for submenu
    if ($(window).width() < 768) {
        $('.menu-bar ul li a + ul').prev('a').append('<small class="sub-icon"></small>');
        $('.menu-bar ul li a').click(function (e) {
            if ($(this).next().is('ul')) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
                $(this).next().slideToggle();
            }
        });
    }
    $('.c-hamburger').click(function () {
        $(this).toggleClass('open');
        $('.main-header').slideToggle();
    })
    // Accordions
    $('.accordion-head').click(function () {
        if (!$(this).hasClass('active')) {
            $('.accordion-head').removeClass('active');
            $('.accordion-content').slideUp();
            $(this).addClass('active');
            $(this).next('.accordion-content').slideDown();
        } else {
            $(this).removeClass('active');
            $('.accordion-content').slideUp();
        }
    });
    // Tabs
    $('.tabs-links li a').click(function (e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('active')) {
            var liIndex = $(this).parent().index();
            $(this).parent().siblings().removeClass('active');
            $(this).parents('.tabs-wrap').find('.tabs-text').hide();
            $(this).parent().addClass('active');
            $(this).parents('.tabs-wrap').find('.tabs-text').eq(liIndex).fadeIn();
        }
    });




});
