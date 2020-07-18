$(function () {
    $("[data-toggle='tooltip']").tooltip()

    $("table").wrap("<div class='table-responsive'></div>"), $("table").addClass("table")

    if ($(window).width() > 1170) {
        var c = $(".navbar-custom").height();
        $(window).on("scroll", {previousTop: 0}, function () {
            var b = $(window).scrollTop();
            if (b < this.previousTop) {
                if (b > 0 && $(".navbar-custom").hasClass("is-fixed")) {
                    $(".navbar-custom").addClass("is-visible")
                } else {
                    $(".navbar-custom").removeClass("is-visible is-fixed")
                }
            } else {
                $(".navbar-custom").removeClass("is-visible"),
                b > c && !$(".navbar-custom").hasClass("is-fixed") && $(".navbar-custom").addClass("is-fixed")
            }
            this.previousTop = b
        })
    }

    // 移动端时, 导航栏点击事件
    let $navbar = $('#epsblog_navbar');
    let $collapse = $('.navbar-collapse');
    $('.navbar-toggle').click(function () {
        if ($navbar.hasClass('in')) {
            $navbar.removeClass('in');
            // 动画展开
            setTimeout(function () {
                if (!$navbar.hasClass('in')) {
                    $collapse.css('height', 0);
                }
            }, 400)
        } else {
            $navbar.addClass('in');
            $collapse.css('height', 'auto');
        }
    })

    // 加载fastClick
    $.getScript("http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js", function () {
        let $nav = $('nav');
        if ($nav.length == 0) {
            return;
        }
        FastClick.attch($nav);
    });

});

