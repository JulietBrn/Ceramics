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
