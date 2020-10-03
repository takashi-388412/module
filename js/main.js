var menuState = false;
var dropState = false;

$(document).ready(function() {
  // 初期化
  sNavOut('.header__nav');

  // スライダー（slick）
  $('.mainSlider').slick({
    dots: true,
    arrow: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  });

});

// ハンバーガーメニュー展開
$(document).on('click', '.menuToggle', function() {
  $('#drawer').toggleClass('open');
  $('#overlay').toggleClass('open');
  $('body').toggleClass('open');
  return false;
});

$(document).on('click', '.menuClose', function() {
  $('#drawer').removeClass('open');
  $('#overlay').removeClass('open');
  $('body').removeClass('open');
  return false;
});

// SPのみアコーディオン
$(document).on('click', '.sp-toggle', function() {
  var windowWidth = $(window).width();
  console.log(windowWidth);
  if (windowWidth < 768) {
    $(this).next('ul').slideToggle();
    $(this).toggleClass('open');
  }
});

$(document).on('click', '.hdrSearch--toggle > span,.hdrSearch--toggle > a', function() {
  $(this).next().slideToggle();
});


// ナビゲーション　子要素展開
$('.hasChildren').hover(function() {
  $(this).children('a').addClass('open');
  $(this).children('ul,.megaMenu').addClass('open');
}, function() {
  $(this).children('a').removeClass('open');
  $(this).children('ul,.megaMenu').removeClass('open');
});

$(document).on('click', '.hasChildren--click > a,.hasChildren--click > span', function() {
  if (dropState == false) {
    $(this).addClass('open');
    $(this).next('ul').addClass('open');
    $(this).next('ul').slideDown();
    dropState = true;
  } else {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).next('ul').removeClass('open');
      $(this).next('ul').slideUp();
    } else {
      $(this).parents('li').parents('ul').parents('.gNav').find('.hasChilds > span').removeClass('open');
      $(this).parents('li').parents('ul').parents('.gNav').find('.hasChilds > span').next('ul').removeClass('open');
      $(this).parents('li').parents('ul').parents('.gNav').find('.hasChilds > span').next('ul').slideUp(0);
      $(this).addClass('open');
      $(this).next('ul').addClass('open');
      $(this).next('ul').slideDown();
    }
  }
  return false;
});


// ナビ固定
$(function() {
  var target = $(".hdrFixed");
  var h = target.height();
  var h_top = target.offset().top;
  target.after('<div class="h_box"></div>');
  $(".h_box").height("0");
  $(window).on('load scroll', function(event) {
    var scroll = $(window).scrollTop();
    if (scroll >= h_top) {
      target.css({
        position: 'fixed',
        top: '0px',
        width: '100%',
        'z-index': '999999'
      });
      $(".h_box").height(h);
    } else {
      target.css({
        position: ''
      });
      $(".h_box").height("0");
    }
  });
});


function sNavIn(_this) {
  var windowWidthMinus = document.documentElement.clientWidth * -1;
  $(_this).addClass('open');
  $('.menuBg--close').addClass('open');
  $(_this).css({
    'left': 0
  });
}

function sNavOut(_this) {
  var windowWidthMinus = document.documentElement.clientWidth * -1;
  $(_this).removeClass('open');
  $('.menuBg--close').removeClass('open');
  $(_this).css({
    'left': windowWidthMinus
  });
}

// タブ切り替え
$(function() {
  $(".tabSwitch > li ").click(function() {
    if (!$(this).hasClass('active')) {
      $(this).parents('.tabSwitch').find('li').removeClass('active');
      $(this).addClass('active');

      var tabNum = $(this).index();
      $(this).parents(".tab").find(".tabContents").find(".tabContent").hide();
      $(this).parents(".tab").find(".tabContents").find(".tabContent").eq(tabNum).fadeIn("500");
    }
  });
});

// スクロールボタン
$(window).load(function() {
  if ($('.mainSliderSec').length) {
    var position = $(".mainSliderSec + * ").offset().top;
    $(".hdrFixed").outerHeight(); //最初の要素の、ドキュメント上での表示位置[y軸]を返す
    $("#scrollBtn").click(function() {
      console.log(position);
      $("html,body").animate({
        scrollTop: position // さっき変数に入れた位置まで
      }, {
        queue: false // どれくらい経過してから、アニメーションを始めるか。キュー[待ち行列]。falseを指定すると、キューに追加されずに即座にアニメーションを実行。
      });
      return false;
    });
  }
});

// テキスト横スクロール
var spSwiperDone = false;
$(window).on('load resize', function(event) {
  if (window.innerWidth < 992 && spSwiperDone == false) {
    $('.spSwiper').slick({
      autoplay: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      variableWidth: true,
      touchMove: true,
      swipeToSlide: true,
      infinite: false
    });

    spSwiperDone= true;
  }
});




// コマクリの商品カルーセル解除
$('.fs-c-productListCarousel__list__itemTrack').each(function() {
  // 商品表示パーツのクラスを付与
  $(this).addClass('itemList itemList--typeC itemList-pc--4 itemList-sp--2');

  $(this).parents('.fs-c-productListCarousel__list').removeClass('fs-c-productListCarousel__list').addClass('ccItemListContainer');

  $(this).removeClass('fs-c-productListCarousel__list__itemTrack');

  $(this).find('article.fs-c-productListCarousel__list__item.fs-c-productListItem').each(function() {
    $(this).removeClass('fs-c-productListCarousel__list__item fs-c-productListItem').addClass('itemList__unit');

    // 商品名
    var name = $(this).find('.fs-c-productListItem__productName .fs-c-productName__name').text();

    // 画像をdataLazyから抽出してパース
    var dataLazy = '';
    var img = '';
    $(this).find('img.fs-c-productImage__image').each(function() {
      dataLazy = $(this).attr('data-lazy');
      $(this).attr('src', dataLazy);
    });
    if (dataLazy != '') {
      img = '<img src="' + dataLazy + '" alt="' + name + '" class="itemImg" />';
    }

    // 商品URL
    var url = $(this).find('.fs-c-productListItem__productName a').attr('href');

    // 価格
    var price = $(this).find('.fs-c-productListItem__prices.fs-c-productPrices').html();

    // 在庫表示
    var stockClass = $(this).find('.fs-c-productListItem__lowInStock.fs-c-productListItem__notice.fs-c-productStock').attr('class');
    console.log(stockClass);
    var stock = $(this).find('.fs-c-productListItem__lowInStock.fs-c-productListItem__notice.fs-c-productStock').html();
    if (stock != undefined) {
      stock = '<div class="' + stockClass + '">' + stock + '</div>';
    } else {
      stock = '';
    }

    // ボタン＆お気に入り
    var btn = $(this).find('.fs-c-productListItem__control.fs-c-buttonContainer');

    // パース
    var html = '<a class="itemWrap" href="' + url + '">' + img + '<p class="itemName">' + name + '</p>' + price + stock + '</a>';

    $(this).html(html);

    $('.fs-c-productListCarousel__ctrl').hide();
  });

  $('.fs-c-button--carousel').hide();


});
