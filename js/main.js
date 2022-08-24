$(window).on("load", function () {
  $("#pre-loading").fadeOut(1000);
  fixedMenu();
  toggleMenuInMobile();
  validateFormFooter();
  backToTop();
  projectDetailPage();
  studioDetailPage();
  studioRetalPage();
  cafePage();

  //REPLACE SVG
  $(".svg").svgToInline();
  //AOS Animation JS
  AOS.init({
    anchorPlacement: "top-bottom",
    easing: "easy-in-out",
    once: false,
    duration: 1000,
  });


  //filter featured
  $('.featured__controls li').on('click', function () {
    $('.featured__controls li').removeClass('active');
    $(this).addClass('active');
  });
  if ($('.featured__filter').length > 0) {
    var containerEl = document.querySelector('.featured__filter');
    mixitup(containerEl);
  }
});

//Lazy loading
let lazyLoadInstance = new LazyLoad({
  unobserve_entered: true,
});

//Toggle menu Mobile
function toggleMenuInMobile() {
  const hamburger = $(".hamburgers");
  const navMobile = $(".navigators__mobile");
  function closeMenuMobile() {
    navMobile.removeClass("active");
    hamburger.removeClass("clicked");
    $("body").removeClass("noScroll");
  }
  navMobile.on("click", closeMenuMobile);
  $("header").on("click", closeMenuMobile);

  hamburger.on("click", function (e) {
    e.stopPropagation();
    navMobile.toggleClass("active");
    hamburger.toggleClass("clicked");
    $("body").toggleClass("noScroll");
  });
}

//Fixed menu tablet => desktop
function fixedMenu() {
  window.addEventListener("scroll", function () {
    let $scrollTop = $(window).scrollTop();
    let $heightHeader = $("header").height();
    if ($scrollTop > $heightHeader) {
      $(".navigators").addClass("fixtop");
    } else {
      $(".navigators").removeClass("fixtop");
    }
  });
}

//Back To Top
function backToTop() {
  $("footer .backtotop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
}

//Validate form Rental Page
function studioRetalPage() {
  Validator({
    form: "#rental_form",
    formGroup: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(
        "#company-name",
        "Company Name cannot be left blank"
      ),
      Validator.isRequired(
        "#contact-name",
        "Contact Name cannot be left blank"
      ),
      Validator.isRequired("#phone", "Phone number cannot be left blank"),
      Validator.isPhoneNumber("#phone", "Phone number is invalid"),
      Validator.isRequired("#email", "Email cannot be left blank"),
      Validator.isEmail("#email", "Email is invalid"),
      Validator.isRequired(
        "#payable",
        "Accounts payable contact cannot be left blank"
      ),
      Validator.isRequired(
        "#company-address",
        "Company Address cannot be left blank"
      ),
    ],
    onSubmit: function (data) {
      //Call API
      console.log(data);
      alert("Booking success. We will contact with your nearly!");
    },
  });

  function selectStudio() {
    let $studioNumber = $(".studio__list-number");

    $studioNumber.on("click", function () {
      $studioNumber.removeClass("select");
      $(this).toggleClass("select");
    });
  }
  selectStudio();

  //Custom Input Type Date
  function customInputTypeDate() {
    $(document).ready(function () {
      $(".t-datepicker").tDatePicker({
        autoClose: true,
        dateRangesHover: true,
        numCalendar: 1,
        iconDate: "",
        titleCheckIn: "DD/MM/YYYY",
        titleCheckOut: "DD/MM/YYYY",
        titleDateRange: "day",
        titleDateRanges: "days",
      });
    });
  }
  customInputTypeDate();
}

//Validate form footer
function validateFormFooter() {
  Validator({
    form: "#form-footer",
    formGroup: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#fullname", "Fullname cannot be left blank"),
      Validator.isRequired("#phone", "Phone number cannot be left blank"),
      Validator.isPhoneNumber("#phone", "Phone number is invalid"),
      Validator.isRequired("#email", "Email cannot be left blank"),
      Validator.isEmail("#email", "Email is invalid"),
      Validator.isRequired("#subject", "Subject cannot be left blank"),
    ],
    onSubmit: function (data) {
      //Call API
      console.log(data);
      alert("Send message success. We will contact with your nearly!");
    },
  });
}

function cafePage() {
  //Gallery List Image
  let galleryList = $(".gallery__list");
  let currentIndex = 0;
  function galleryTo(to) {
    galleryList[currentIndex].classList.remove("active");
    galleryList[to].classList.add("active");
    currentIndex = to;
  }

  $(".btn-control .next").on("click", function () {
    if (currentIndex < galleryList.length - 1) {
      galleryTo(currentIndex + 1);
    } else {
      galleryTo(currentIndex - (galleryList.length - 1));
    }
  });
  $(".btn-control .previous").on("click", function () {
    if (currentIndex > 0) {
      galleryTo(currentIndex - 1);
    } else {
      galleryTo(currentIndex + (galleryList.length - 1));
    }
  });
}

function studioDetailPage() {
  let mainCarousel = $(".main-carousel");

  mainCarousel.flickity({
    // options
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    draggable: false,
    prevNextButtons: false,
    pageDots: false,
    autoPlay: true,
    autoPlay: 5000
  });
  $(".flickity-prev").on("click", function () {
    mainCarousel.flickity("previous");
  });
  $(".flickity-next").on("click", function () {
    mainCarousel.flickity("next");
  });
}

function projectDetailPage() {
  var $carousel = $(".project__details-image").flickity({
    contain: true,
    wrapAround: false,
    freeScroll: false,
    prevNextButtons: true,
    pageDots: false,
    cellAlign: 'left',
  })
}

var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

$(window).load(function () {
  initPhotoSwipeFromDOM(".gallery__list");
  initPhotoSwipeFromDOM(".project__details-image");
  initPhotoSwipeFromDOM(".main-carousel");
});