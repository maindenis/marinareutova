function getRespParams() {
    if($(document).scrollTop() > 100) {
        $(".header_site").addClass("scroll");
    } else {
        $(".header_site").removeClass("scroll");
    }
}

function getScrollbarParams() {
    if($(window).width() <= 900) {
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
        documentScroll = $(".header_site").offset().top + ($(window).height() / 2) - $("#titleCoord").height() - 30;
        if(articleCoord < documentScroll) {
            $("#titleCoord").offset({top: documentScroll});
        } else {
            $(".article_2").addClass("bootmAlign");
            $("#titleCoord").offset({top: false});
            $("#titleCoord").attr("style", "");  
        }
        if(documentScroll > articleCoord + $(".article_2").height() - $("#titleCoord").height()) {
            $(".article_2").addClass("bootmAlign");
            $("#titleCoord").offset({top: false});
            $("#titleCoord").attr("style", "");        
        } else {
            $(".article_2").removeClass("bootmAlign");
        }
        $(".item").each(function() {
            if($("#titleCoord").offset().top > $(this).offset().top - 30 ) {
                $(this).prev(".item").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    } else {
        $("#titleCoord").attr("style", "");
    }
}

function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}

var sections = $('.screen')
  , nav = $('.resp_nav')
  , nav_height = nav.outerHeight();

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
    getAnimation();
});

$(document).scroll(function() {
    getRespParams();
    getScrollParams();
    getAnimation();
    var cur_pos = $(this).scrollTop();      
    sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
    });
});

$(window).on('load', function(){
    getScrollbarParams();
    getAnimation();
});

$(document).ready(function() {
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getRespParams();
    getScrollParams();
    // --------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#respNav").is(":hidden") ) {
          $("#respNav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#respNav").fadeOut(300);
          $(this).removeClass("active");
      }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#respNav").is(":visible") &&
            bodyWidth <= 767) {
                $("#respNav").fadeOut(300);
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

    $('.resp_nav a[href^="#"], .blue_pill, .white_pill').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      $(".resp_nav li a").removeClass("active");
      $(this).addClass("active");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
          $('html, body').stop().animate({
              'scrollTop': $(hrefAttr).offset().top-$(".header_site").height()+20
          }, 500);
      }
      if($(window).width() <= 900) {
        $("#respNav").fadeOut(300);
        $(".respmenubtn").removeClass("active");
      }
    });

    // -------------

    $(".item a").on("mouseover", function() {
        tooltip = $(this).find(".tooltip");
        if(tooltip.offset().left + tooltip.width() > $(window).width()) {
            tooltip.addClass("right");
        } else {
            tooltip.removeClass("right");
        }
    });

    // -------------

    Fancybox.bind("[data-fancybox]", {});

    // -------------

    var text = $(".prTextTempl").text();
    var typed = new Typed('#resultText', {
      strings: [text],
      typeSpeed: 40,
    });

});