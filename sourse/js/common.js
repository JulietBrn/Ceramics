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
  }

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
  const wrapFilterPhoto = document.querySelector('.wrap-filter--photo')
  const wrapFilterVideo = document.querySelector('.wrap-filter--video')
  const tabs = document.querySelectorAll('.sGallery .tabs__btn')
  tabs.forEach((tab) => {
    if (tab) {
      tab.addEventListener('click', () => {
        const dataContent = tab.getAttribute('data-content')
        if (dataContent === "photo") {
          wrapFilterPhoto.classList.remove('d-none')
          wrapFilterVideo.classList.add('d-none')
        }
        if (dataContent === "video") {
          wrapFilterPhoto.classList.add('d-none')
          wrapFilterVideo.classList.remove('d-none')
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
