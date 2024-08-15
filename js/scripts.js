function getRespParams() {
    if($(document).scrollTop() > 100) {
        $(".header_site").addClass("scroll");
    } else {
        $(".header_site").removeClass("scroll");
    }
}

function getScrollbarParams() {
    if(bodyWidth <= 900) {
        $(".thumbs_scroll").mCustomScrollbar({
            axis:"x",
            theme:"rounded"
        });
    } else {
        $(".thumbs_scroll").mCustomScrollbar("destroy");
        $(".thumbs_scroll .mCSB_container").attr("style", "");
    }
}

function  getScrollParams() {
    if(bodyWidth > 900) {
        articleCoord = $(".article_2").offset().top;
        documentScroll = $(".header_site").offset().top + $(".header_site").outerHeight();
        if(articleCoord < documentScroll) {
            $("#titleCoord").offset({top: documentScroll});
        } else {
            $(".article_2").addClass("bootmAlign");
            $("#titleCoord").offset({top: false});
            $("#titleCoord").attr("style", "");  
        }
        if(documentScroll > articleCoord + $(".article_2").height()) {
            $(".article_2").addClass("bootmAlign");
            $("#titleCoord").offset({top: false});
            $("#titleCoord").attr("style", "");        
        } else {
            $(".article_2").removeClass("bootmAlign");
        }
        $(".item").each(function() {
            if($("#titleCoord").offset().top > $(this).offset().top - 10) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    } else {
        $("#titleCoord").attr("style", "");
    }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).resize(function() {
    getRespParams();
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getScrollbarParams();
    getScrollParams();
});

$(document).scroll(function() {
    getRespParams();
    getScrollParams();
});

$(window).on('load', function(){
    getScrollbarParams();
});

$(document).ready(function() {

    getRespParams();
    getScrollParams();

    if( $(".slider").length > 0 ) {
        $(".slider").not(".slick-initialized").slick({
            dots: true,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 2000,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            appendDots: $(".slider_dots"),
            appendArrows: $(".slider_arrows"),
            // fade: true,
            responsive: [
                {
                  breakpoint: 1125,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                // {
                //   breakpoint: 540,
                //   settings: {
                //     slidesToShow: 1,
                //     slidesToScroll: 1
                //   }
                // }
              ]
        });
    }

    // --------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#resp_nav").fadeOut(300);
          $(this).removeClass("active");
      }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 767) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

    // --------------

    $(".dr").each(function() {
      drContent = $(this).find(".dr_content");
      if($(this).hasClass("active")) {      
        drContent.slideDown(300);
      } else {
        drContent.slideUp(300);
      }
    });

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dr");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        parent.addClass("active");
        sl.slideDown(300);
      } else {
        parent.removeClass("active");
        sl.slideUp(300);
      }
    });

    // ------------

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      $(".resp_nav li a").removeClass("active");
      $(this).addClass("active");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
          $('html, body').stop().animate({
              'scrollTop': $(hrefAttr).offset().top+2
          }, 500);
      }
    });

    // ------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#respNav").is(":hidden") ) {
          $("#respNav").fadeIn(300);
          $(this).addClass("active");
        div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        topCoord = $(document).scrollTop();
        $("body").addClass("fixed");
        $("body").css({
        "top" :  -1 * topCoord + "px",
        "padding-right" : scrollWidth + "px"
        });
      } else {
          $("#respNav").fadeOut(300);
          $(this).removeClass("active");
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
        $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");
      }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#respNav").is(":visible") &&
            bodyWidth <= 900) {
                $("#respNav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
                curTop = $("body").css("top");
                curTop = Math.abs(parseInt(curTop, 10));
                $("body").removeClass("fixed");
                if (curTop !== 0) {
                $("html").scrollTop(curTop);
                }
                $("body").attr("style", "");
        }
    });

    // -------------

    $(".item a").on("mouseover", function() {
        console.log("dsdsd");
        tooltip = $(this).find(".tooltip");
        if(tooltip.offset().left + tooltip.width() > $(window).width()) {
            tooltip.addClass("right");
        } else {
            tooltip.remoeClass("right");
        }
    });



});