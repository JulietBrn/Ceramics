"use strict";

import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
import JSCCommon from "./JSCCommon.js";

const $ = jQuery;

function eventHandler() {
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const swiper4 = new Swiper(".sBanners__slider--js", {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: "auto",
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	const swiperBricklayers = new Swiper(".sContent__slider--js", {
		...defaultSl,
		slidesPerView: 1,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		// freeModeMomentum: true,
	});
  const swiperTabs = new Swiper('.tabs-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

  const swiperFilters = new Swiper('.filters-slider--js', {
		spaceBetween: 8,
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
    breakpoints: {
      768: {
        spaceBetween: 0,
      }
    }
	});

  /* nav location mobile */
  const location = document.querySelector('.icon-wrap--mobile')
	const mobileNavLocation = document.querySelector('.mobile-location')
	const navLinks = document.querySelectorAll('.mobile-location a')
	const backDrop = document.querySelector('.backdrop')

  let startY;
  let currentY;

  // function touchStart(e) {
  //   startY = e.touches[0].clientY;
  //   currentY = startY;
  // }

  // function touchMove(e) {
  //   currentY = e.touches[0].clientY;
  //   const distance = currentY - startY;

  //   if (distance > 10) {
  //     closeNavWidow();
  //   }
  // }

	function openNavWidow() {
		mobileNavLocation.classList.add('show');
		backDrop.classList.add('show');
    backDrop.style = 'z-index: 20;'
	}

	function closeNavWidow() {
		mobileNavLocation.classList.remove('show');
		backDrop.classList.remove('show');
    backDrop.style = 'z-index: -1;'
	}


	location.addEventListener('click', openNavWidow);
	backDrop.addEventListener('click', closeNavWidow);
	mobileNavLocation.addEventListener('click', closeNavWidow);
  navLinks.forEach((link) => {
    link.addEventListener('click', closeNavWidow)
  })

  mobileNavLocation.addEventListener('touchstart', touchStart);
  mobileNavLocation.addEventListener('touchmove', touchMove);

  /* search */
  const topNav = document.querySelector('.top-nav__row')
  const phone = document.querySelector('.top-nav__tel')
  const searchBtn = document.querySelector('.icon-wrap .icon-search')
	const navSearch = document.querySelector('.container-search')
  const iconsDesktop = document.querySelectorAll('.top-nav__row .icon-wrap, .top-nav__row .icon')

	function openSearchWidow() {
		navSearch.classList.add('show');

    if (window.innerWidth > 768) {
      iconsDesktop.forEach(icon => {
          icon.classList.add('hidden');
      });
      phone.classList.add('hidden');
    } else {
      topNav.classList.add('d-none');
    }
		backDrop.classList.add('show');
	}

	function closeSearchWidow() {
		navSearch.classList.remove('show');
		topNav.classList.remove('d-none');
    if (window.innerWidth > 768) {
      iconsDesktop.forEach(icon => {
          icon.classList.remove('hidden');
      });
    }
    phone.classList.remove('hidden');
		backDrop.classList.remove('show');
	}

	searchBtn.addEventListener('click', openSearchWidow);
	backDrop.addEventListener('click', closeSearchWidow);
  

  /* brands mobile */
	const openBrandsBtn = document.querySelectorAll('.open-modal--brands')
	const brands = document.querySelector('#brands')
  const applyBtn = document.querySelector('#apply')

	function openBrandsWidow() {
		brands.classList.add('show');
		backDrop.classList.add('show');
    backDrop.style = 'z-index: 20;'
	}

	function closeBrandsWidow() {
		brands.classList.remove('show');
		backDrop.classList.remove('show');
    backDrop.style = 'z-index: -1;'
	}

  function touchStart(e) {
    startY = e.touches[0].clientY;
    currentY = startY;
  }

  function touchMove(e) {
    currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 10) {
      closeNavWidow();
    }
    if (distance > 10 && brands) {
      closeBrandsWidow()
    }
    if (distance > 10 && filters) {
      closeFiltersWidow()
    }
  }

  openBrandsBtn.forEach((btn) => {
    btn.addEventListener('click', openBrandsWidow);
  })

	backDrop.addEventListener('click', closeBrandsWidow);
	applyBtn.addEventListener('click', closeBrandsWidow);

  brands.addEventListener('touchstart', touchStart);
  brands.addEventListener('touchmove', touchMove);


  /* photo filters mobile */
	const openFiltersBtn = document.querySelectorAll('.open-modal--filters')
	const filters = document.querySelector('#photo-filters')

	function openFiltersWidow() {
		filters.classList.add('show');
		backDrop.classList.add('show');
    backDrop.style = 'z-index: 20;'
	}

	function closeFiltersWidow() {
		filters.classList.remove('show');
		backDrop.classList.remove('show');
    backDrop.style = 'z-index: -1;'
	}

  openFiltersBtn.forEach((btn) => {
    btn.addEventListener('click', openFiltersWidow);
  })

	backDrop.addEventListener('click', closeFiltersWidow);

  filters.addEventListener('touchstart', touchStart);
  filters.addEventListener('touchmove', touchMove);

  /* video filter mobile */
	const openVideoFilterBtn = document.querySelectorAll('.open-modal--video')
	const videoFilter = document.querySelector('#video-filters')

	function openVideoFiltersWidow() {
		videoFilter.classList.add('show');
		backDrop.classList.add('show');
    backDrop.style = 'z-index: 20;'
	}

	function closeVideoFiltersWidow() {
		videoFilter.classList.remove('show');
		backDrop.classList.remove('show');
    backDrop.style = 'z-index: -1;'
	}

  openVideoFilterBtn.forEach((btn) => {
    btn.addEventListener('click', openVideoFiltersWidow);
  })

	backDrop.addEventListener('click', closeVideoFiltersWidow);

  videoFilter.addEventListener('touchstart', touchStart);
  videoFilter.addEventListener('touchmove', touchMove);

  const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
	);

  const closeButton = document.querySelector('.btn-close');
  const warningText = document.querySelector('.warning-text');

  if (closeButton) {
    closeButton.addEventListener('click', function() {
      warningText.classList.add('d-none');
    });
  }

  $('#photo-filters .filter').on('click', function() {
    var title = $(this).find('.filter__title').text();
    setTimeout(function() {
      $('#photo-filters .filters-wrapper__title').text(title);
    }, 200);
  });

  $('.btn-back').on('click', function() {
    $('#photo-filters .filters-wrapper__title').text('Фильтры');
    $('#photo-filters .filter').removeClass('show');
    $(this).addClass('d-none');
  });

$('#photo-filters .filter__title').on('click', function() {
  $(this).parent('.filter').addClass('show');
  setTimeout(function() {
    $('.btn-back').removeClass('d-none');
  }, 200);
});

  var sectionTitle = document.querySelector(".headerBlock .section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("loaded");
  }

	$(".form-wrap__input-wrap").each(function () {
    let self = $(this);
    let floatLabel;
    // let placeholderName = $(this)[0].querySelector("select").getAttribute('data-placeholder');
    // let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';
    const tags = self.find("select").data("tags");
    let select = self.find("select").select2({
      dropdownParent: self,
      language: "ru",
    });

    select.one("select2:open", function (e) {
      // console.log(self.find("select")[0].dataset);

      $("input.select2-search__field").prop(
        "placeholder",
        tags === true ? "Поиск или введите свой вариант ответа" : " Поиск"
      );
    });
    // console.log(select2);
  });

  const tabs = document.querySelectorAll('.sGallery .tabs__btn')
  tabs.forEach((tab) => {
    if (tab) {
      tab.addEventListener('click', () => {
        const dataContent = tab.getAttribute('data-content')
        if (dataContent === "photo") {
          filters.classList.remove('d-none')
          videoFilter.classList.add('d-none')
        }
        if (dataContent === "video") {
          filters.classList.add('d-none')
          videoFilter.classList.remove('d-none')
        }
      })
    }
  })
}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
