"use strict";

// import {speed} from "jquery";
// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
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

	FilePond.registerPlugin(
		// encodes the file as base64 data
		FilePondPluginFileEncode,

		// validates the size of the file
		FilePondPluginFileValidateSize,

		// corrects mobile image orientation
		FilePondPluginImageExifOrientation,

		FilePondPluginImagePreview
	);

	FilePond.create(document.querySelector(".filepond"), {
		labelIdle: `Прикрепить файл`,
		labelFileLoading: `Загрузка`,
		labelTapToCancel: `Нажмите для отмены`,
		labelFileProcessingComplete: "Загрузка завершена",
		styleButtonRemoveItemPosition: "right",
		labelTapToUndo: "Нажмите для отмены",
	});
	/* preloader */
	const pagePreloader = document.querySelector("#preloader");

	if (pagePreloader) {
		pagePreloader.classList.add("d-none");
	}

	/* backgr-attachment height */

	// function setContainerHeight() {
	//   const vh = window.innerHeight * 0.01;
	//   document.documentElement.style.setProperty('--vh', `${vh}px`);
	// }
	// setContainerHeight();
	// window.addEventListener('resize', setContainerHeight);

	//
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

	var swiper3 = new Swiper(".slider-auto--js", {
		effect: "creative",
		grabCursor: false,
		simulateTouch: false,
		allowTouchMove: false,
		keyboard: {
			enabled: false,
		},
		autoplay: {
			delay: 15000,
			disableOnInteraction: false,
		},
		speed: 900,
		loop: true,
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
		breakpoints: {
			768: {
				creativeEffect: {
					prev: {
						shadow: true,
						translate: ["+20%", 0, -1],
					},
					next: {
						translate: ["-100%", 0, 0],
					},
				},
			},
		},
	});

	const isDateSlider = document.querySelector(".sAbout__date-swiper--js");
	let initSlide;
	if (isDateSlider) {
		initSlide = document
			.querySelector(".sAbout__date-swiper--js ")
			.getAttribute("data-initialSlide");
	}
	if (initSlide) {
		const sProdSlider = new Swiper(".sAbout__date-swiper--js", {
			spaceBetween: 32,
			watchOverflow: true,
			direction: "horizontal",
			freeMode: true,
			touchRatio: 0.4,
			slideToClickedSlide: true,
			slidesPerView: "auto",
			freeMode: true,
			watchOverflow: true,
			// loop: true,
			slideToClickedSlide: true,
			centerInsufficientSlides: true,
			centeredSlides: true,
			initialSlide: initSlide,
			breakpoints: {
				768: {
					spaceBetween: 30,
					direction: "vertical",
					slidesPerView: 7,
					// watchOverflow: false,
				},
			},
		});
	}

	const mainSlider = new Swiper(".main-slider--js", {
		spaceBetween: 0,
		watchOverflow: true,
		loop: true,
		speed: 1000,
		allowTouchMove: false,

		navigation: {
			nextEl: ".arrow-container .swiper-button-next",
			prevEl: ".arrow-container .swiper-button-prev",
		},
		on: {
			slideChangeTransitionEnd: function (swiper) {
				const slides = swiper.slidesEl.querySelectorAll(
					".swiper-slide:not(.swiper-slide-active)"
				);
				slides.forEach(el => {
					if (
						el.classList.contains("swiper-slide-prev") ||
						el.classList.contains("swiper-slide-next")
					) {
						const inner = el.querySelector(".main-slider__slider-inner");
						if (inner) {
							inner.scrollTo(0, 0);
						}
					}
				});
			},
		},
	});

	const triggerSlide = document.querySelectorAll(
		".sAbout__date-swiper--js .swiper-slide"
	);
	if (triggerSlide) {
		updateSlideOpacity(3);
		triggerSlide.forEach((elem, i) =>
			elem.addEventListener("click", () => {
				updateSlideOpacity(i);
			})
		);
	}

	function updateSlideOpacity(i) {
		triggerSlide.forEach(slide => {
			slide.classList.remove("opacity-05", "opacity-02", "opacity-1");
		});

		if (triggerSlide) {
			triggerSlide.forEach((slide, index) => {
				if (Math.abs(index - i) === 1) {
					slide.classList.add("opacity-1");
				} else if (Math.abs(index - i) === 2) {
					slide.classList.add("opacity-05");
				} else if (Math.abs(index - i) >= 3) {
					slide.classList.add("opacity-02");
				}
			});
		}
	}

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
	const swiperProductCard = new Swiper(".sProductCard__slider--js", {
		...defaultSl,
		slidesPerView: 1,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		// freeModeMomentum: true,
	});

	const swiperAbout = new Swiper(".sAbout__slider--js", {
		// ...defaultSl,
		navigation: {
			nextEl: ".sAbout__slider--js .swiper-button-next",
			prevEl: ".sAbout__slider--js .swiper-button-prev",
		},
		slidesPerView: 1,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		// freeModeMomentum: true,
	});
	const swiperTabs = new Swiper(".tabs-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
		// spaceBetween: 24,
	});

	const swiperFilters = new Swiper(".filters-slider--js", {
		spaceBetween: 8,
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
		breakpoints: {
			768: {
				spaceBetween: 0,
			},
		},
	});
	const swiperMainPage = new Swiper(".main-page-slider--js", {
		spaceBetween: 8,
		slidesPerView: 1,
		// freeMode: true,
		// watchOverflow: true,
		navigation: {
			nextEl: ".main-page-slider--js .swiper-button-next",
			prevEl: ".main-page-slider--js .swiper-button-prev",
		},
		breakpoints: {
			768: {
				spaceBetween: 0,
				slidesPerView: 5,
			},
		},
	});

	function getSlideTitles() {
		const titles = [];
		document.querySelectorAll(".swiper-slide h4").forEach(element => {
			titles.push(element.innerText);
		});
		return titles;
	}

	const slideTitles = getSlideTitles();

	const swiper = new Swiper(".sAbout .slider-tab", {
		...defaultSl,
		navigation: {
			nextEl: ".sAbout .slider-arrs .swiper-button-next",
			prevEl: ".sAbout .slider-arrs .swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return (
					'<span class="' +
					className +
					' small">' +
					slideTitles[index] +
					"</span>"
				);
			},
		},
	});

	/* cookie */
	let cookie = document.querySelector(".cookie");
	let cookieClose = document.querySelector(".cookie .close");
	if (cookieClose) {
		cookieClose.addEventListener("click", () => cookie.classList.add("closed"));
	}

	/* dropdown */
	const regionLinks = document.querySelectorAll(
		".dropdown-cities .region-link"
	);

	const dropdownToggle = document.querySelector(
		".dropdown-cities .dropdown-toggle"
	);

	if (regionLinks && dropdownToggle) {
		regionLinks.forEach(link => {
			link.addEventListener("click", function (event) {
				event.preventDefault();

				dropdownToggle.textContent = this.textContent;
			});
		});
	}
	/* dropdown */
	const profLinks = document.querySelectorAll(".dropdown-prof .region-link");

	const dropdownTogglePfor = document.querySelector(
		".dropdown-prof .dropdown-toggle"
	);

	if (profLinks && dropdownTogglePfor) {
		profLinks.forEach(link => {
			link.addEventListener("click", function (event) {
				event.preventDefault();

				dropdownTogglePfor.textContent = this.textContent;
			});
		});
	}
	/* order -> to basket */
	const btnOrder = document.querySelector(".sFeatures .btn--order-js");
	const btnToBasket = document.querySelector(".sFeatures .btn--basket-js");

	if (btnOrder) {
		btnOrder.addEventListener("click", () => {
			btnOrder.classList.add("d-none");
			btnToBasket.classList.remove("d-none");
		});
	}

	/* nav location mobile */
	const location = document.querySelector(".icon-wrap--mobile");
	const mobileNavLocation = document.querySelector(".mobile-location");
	const navLinks = document.querySelectorAll(".mobile-location a");
	const backDrop = document.querySelector(".backdrop");

	let startY;
	let currentY;

	if (backDrop) {
		backDrop.addEventListener("click", () => {
			document.querySelectorAll(".white-bg-modal").forEach(modal => {
				modal.classList.remove("show");
			});
		});
		backDrop.addEventListener("click", closeNavWidow);
	}

	document.querySelectorAll(".white-bg-modal").forEach(modal => {
		modal.addEventListener("touchstart", touchStart);
		modal.addEventListener("touchmove", touchMove);
	});

	function openNavWidow() {
		mobileNavLocation.classList.add("show");
		backDrop.classList.add("show");
	}

	function closeNavWidow() {
		mobileNavLocation.classList.remove("show");
		backDrop.classList.remove("show");
	}

	if (location) {
		location.addEventListener("click", openNavWidow);
		mobileNavLocation.addEventListener("click", closeNavWidow);
		navLinks.forEach(link => {
			link.addEventListener("click", closeNavWidow);
		});
	}

	/* search */
	const topNav = document.querySelector(".top-nav__row");
	const phone = document.querySelector(".top-nav__tel");
	const searchBtn = document.querySelector(".icon-wrap .icon-search");
	const navSearch = document.querySelector(".container-search");
	const iconsDesktop = document.querySelectorAll(
		".top-nav__row .icon-wrap, .top-nav__row .icon"
	);

	function openSearchWidow() {
		navSearch.classList.add("show");

		if (window.innerWidth > 768) {
			iconsDesktop.forEach(icon => {
				icon.classList.add("hidden");
			});
			phone.classList.add("hidden");
		} else {
			topNav.classList.add("d-none");
		}
		backDrop.classList.add("show");
	}

	function closeSearchWidow() {
		navSearch.classList.remove("show");
		topNav.classList.remove("d-none");
		if (window.innerWidth > 768) {
			iconsDesktop.forEach(icon => {
				icon.classList.remove("hidden");
			});
		}
		phone.classList.remove("hidden");
		backDrop.classList.remove("show");
	}

	if (searchBtn) {
		searchBtn.addEventListener("click", openSearchWidow);
		backDrop.addEventListener("click", closeSearchWidow);
	}

	/* brands mobile */
	const openBrandsBtn = document.querySelectorAll(".open-modal--brands");
	const brands = document.querySelector("#brands");
	const applyBtns = document.querySelectorAll(".btn-apply--js");

	function openBrandsWidow() {
		brands.classList.add("show");
		backDrop.classList.add("show");
	}

	function touchStart(e) {
		startY = e.touches[0].clientY;
		currentY = startY;
	}

	function touchMove(e) {
		currentY = e.touches[0].clientY;
		const distance = currentY - startY;

		if (distance > 10) {
			backDrop.classList.remove("show");
			document.querySelectorAll(".white-bg-modal").forEach(modal => {
				modal.classList.remove("show");
			});
		}
	}

	openBrandsBtn.forEach(btn => {
		btn.addEventListener("click", openBrandsWidow);
	});

	applyBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			btn.closest(".white-bg-modal").classList.remove("show");
			backDrop.classList.remove("show");
		});
	});

	/* photo filters mobile */
	const openFiltersBtn = document.querySelector(".open-modal--filters--js");
	const filters = document.querySelector("#photo-filters");

	function openFiltersWidow() {
		filters.classList.add("show");
		backDrop.classList.add("show");
	}

	if (openFiltersBtn && filters) {
		openFiltersBtn.addEventListener("click", openFiltersWidow);
	}

	/* video filter mobile */
	const openVideoFilterBtn = document.querySelectorAll(".open-modal--video");
	const videoFilter = document.querySelector("#video-filters");

	function openVideoFiltersWidow() {
		videoFilter.classList.add("show");
		backDrop.classList.add("show");
	}

	if (openVideoFilterBtn && videoFilter) {
		openVideoFilterBtn.forEach(btn => {
			btn.addEventListener("click", openVideoFiltersWidow);
		});
	}

	const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
	);
	document.addEventListener("click", function (e) {
		if (popoverList.length < 1) return;
		popoverList.forEach(popover => {
			const target = e.target;
			const popoverElement = popover._element;
			const popoverContent = document.querySelector(".popover");

			if (
				(popoverContent &&
					!popoverElement.contains(target) &&
					!popoverContent.contains(target)) ||
				target instanceof HTMLAnchorElement
			) {
				popover.hide();
			}
		});
	});

	const closeButton = document.querySelector(".btn-close");
	const warningText = document.querySelector(".warning-text");

	if (closeButton) {
		closeButton.addEventListener("click", function () {
			warningText.classList.add("d-none");
		});
	}
	/* catalog */

	const btnOpenModal = document.querySelector(".open-modal-catalog--js");
	if (btnOpenModal) {
		btnOpenModal.addEventListener("click", () => {
			document.querySelector(".modal-catalog--js").classList.add("show");
			backDrop.classList.add("show");
		});
	}

	$("#photo-filters .filter").on("click", function () {
		var title = $(this).find(".filter__title").text();
		setTimeout(function () {
			$("#photo-filters .filters-wrapper__title").text(title);
		}, 200);
	});

	$(".sGallery .btn-back").on("click", function () {
		$("#photo-filters .filters-wrapper__title").text("Фильтры");
		$("#photo-filters .filter").removeClass("show");
		$(this).addClass("d-none");
	});

	$("#photo-filters .filter__title").on("click", function () {
		if (window.innerWidth < 768) {
			$(this).parent(".filter").addClass("show");
			setTimeout(function () {
				$(".btn-back").removeClass("d-none");
			}, 200);
		} else {
			$(this).parent(".filter").toggleClass("show");
		}
	});

	$("#video-filters .filters-wrapper__title").on("click", function () {
		if (window.innerWidth < 768) {
			$(this).addClass("show");
		} else {
			$(this).toggleClass("show");
		}
	});

	$("#product-filter .filter__title:not(.empty)").on("click", function () {
		$(this).toggleClass("show");
	});

	$("#product-filter .custom-input").on("click", function () {
		$("#product-filter .filter__title:not(.empty)").removeClass("show");
	});

	const menuMobile = document.querySelector(".menu-mobile");
	const menu = document.querySelector(".menu");

	const menuItems = document.querySelectorAll(".menu-item-has-children > a");
	const iconBack = document.querySelector(".toggle-menu-mobile .icon-wrap");

	if (iconBack) {
		iconBack.addEventListener("click", e => {
			e.stopPropagation();
			const subMenuVisible = document.querySelector(".sub-menu_visible");
			iconBack.classList.add("icon-wrap_hidden");
			iconBack.classList.remove("icon-wrap_visible");

			menu.style.visibility = "visible";
			if (subMenuVisible) {
				subMenuVisible.classList.remove("sub-menu_visible");
				subMenuVisible.classList.add("sub-menu_hidden");
			}
		});
	}

	const allMenuItems = document.querySelectorAll(".menu-item_main");
	const bgImageElement = document.querySelector(".div-bg img");

	if (menuItems) {
		menuItems.forEach(item => {
			item.addEventListener("click", function (event) {
				const subMenu = item.nextElementSibling;
				if (window.innerWidth < 768) {
					menu.style.visibility = "hidden";
				}
				iconBack.classList.remove("icon-wrap_hidden");
				iconBack.classList.add("icon-wrap_visible");

				menuMobile.classList.add("sub-menu-active");

				showSubmenu(subMenu);
			});
		});

		allMenuItems.forEach(item => {
			item.addEventListener("mouseenter", function () {
				const bgImage = item.getAttribute("data-bg-image");
				bgImageElement.src = bgImage;
			});

			if (window.innerWidth > 768) {
				item.addEventListener("mouseenter", function () {
					menuMobile.classList.remove("sub-menu-active");

					const subMenus = document.querySelectorAll(".sub-menu");
					subMenus.forEach(subMenu => {
						hideSubmenu(subMenu);
					});
				});
			}
		});

		function showSubmenu(menu) {
			if (menu.classList.contains("sub-menu_hidden")) {
				menu.classList.remove("sub-menu_hidden");
				menu.classList.add("sub-menu_visible");
			}
		}
		function hideSubmenu(menu) {
			if (menu.classList.contains("sub-menu_visible")) {
				menu.classList.remove("sub-menu_visible");
				menu.classList.add("sub-menu_hidden");
			}
		}

	document.addEventListener("click", function (event) {
		let filters = document.querySelectorAll("#product-filter .filter");
		filters.forEach(filter => {
			if (!filter.contains(event.target)) {
				const filterTitle = filter.querySelector(".filter__title");
				filterTitle.classList.remove("show");
			}
		});
	});

	const productFilters = document.querySelectorAll(
		"#product-filter .filter--img"
	);

	productFilters.forEach(filter => {
		const filterTitleImg = filter.querySelector(".filter__title img");
		const filterTitleText = filter.querySelector(".filter__title .title__text");
		const labels = filter.querySelectorAll(".filter__wrap label");

		const updateTitle = () => {
			const checkedInput = filter.querySelector(".filter__wrap input:checked");
			if (checkedInput) {
				const label = checkedInput.closest("label");
				const newImgSrc = label.querySelector("img").src;
				const newText = label.querySelector(".custom-input__text").innerText;
				filterTitleImg.src = newImgSrc;
				filterTitleText.innerText = newText;
			}
		};

		// Initialize title on page load
		updateTitle();

		labels.forEach(label => {
			label.addEventListener("click", function () {
				updateTitle();
			});
		});
	});

	const productFiltersColor = document.querySelectorAll(
		"#product-filter .filter--colors"
	);

	productFiltersColor.forEach(filter => {
		const filterTitleImg = filter.querySelector(
			".filter__title .custom-input__img"
		);
		const filterTitleText = filter.querySelector(".custom-input__text");
		const labels = filter.querySelectorAll(".filter__wrap label");

		const updateTitle = () => {
			const checkedInput = filter.querySelector(".filter__wrap input:checked");
			if (checkedInput) {
				const label = checkedInput.closest("label");
				const newImgSrc =
					label.querySelector(".custom-input__img").style.backgroundColor;
				const newText = label.querySelector(".custom-input__text").innerText;
				filterTitleImg.style.backgroundColor = newImgSrc;
				filterTitleText.innerText = newText;
			}
		};

		// Initialize title on page load
		updateTitle();

		labels.forEach(label => {
			label.addEventListener("click", function () {
				updateTitle();
			});
		});
	});

	var sectionTitle = document.querySelector(".headerBlock .section-title");
	if (sectionTitle) {
		sectionTitle.classList.add("loaded");
	}

	/* close all filters except current */
	document.addEventListener("click", function (event) {
		let filterElements = document.querySelectorAll(".filter");
		if (!filterElements) return;
		filterElements.forEach(function (element) {
			if (!element.contains(event.target)) {
				element.classList.remove("show");
			}
		});
	});

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

	const selectAllBtn = document.querySelector(".btn-select-all--js input");
	const removeBtn = document.querySelector(".btn-remove--js .small");

	function updateRemoveButtonText() {
		if (selectAllBtn.checked) {
			removeBtn.textContent = "Удалить все";
		} else {
			removeBtn.textContent = "Удалить выбранные";
		}
	}

	if (selectAllBtn) {
		updateRemoveButtonText();
		selectAllBtn.addEventListener("change", updateRemoveButtonText);
	}

	const coordinationElements = document.querySelectorAll(".coordination");

	if (coordinationElements) {
		coordinationElements.forEach(function (coordinationElement) {
			const coordinates = coordinationElement.textContent.trim().split(": ")[1];

			coordinationElement.addEventListener("click", function () {
				const textarea = document.createElement("textarea");
				textarea.value = coordinates;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			});
		});
	}

	const tabs = document.querySelectorAll(".sGallery .tabs__btn");
	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			const dataContent = tab.getAttribute("data-content");
			if (window.innerWidth >= 768) {
				if (dataContent === "photo") {
					filters.classList.remove("d-md-none");
					videoFilter.classList.add("d-md-none");
				}
				if (dataContent === "video") {
					filters.classList.add("d-md-none");
					videoFilter.classList.remove("d-md-none");
				}
			}
		});
	});

	gsap.registerPlugin(ScrollTrigger);

  /* animation */
  // const trigger = {
  //   trigger: ".block1.block-anim",
  //   start: "top 80%",
  //   toggleActions: "play none none none"
  // }
  // const triggerSettings = {
  //   scrollTrigger: trigger,
  //   repeat: -1, // Бесконечное повторение
  //   repeatDelay: 0 // Задержка перед повтором
  // }

  function animateListItems() {
    const animatedBlock = document.querySelector('.block1.block-anim')
    if (!animatedBlock) return
    
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const trigger = {
      trigger: ".block1.block-anim",
      start: "top 80%",
      toggleActions: "play none none none"
    }
    const triggerSettings = {
      scrollTrigger: trigger,
      repeat: -1, // Бесконечное повторение
      repeatDelay: 0 // Задержка перед повтором
    }
    const title = document.querySelector(".block-anim__title-wrap")
    const footer = document.querySelector(".block-anim__footer")

    if (window.innerWidth >= 1024) {
      const tl = gsap.timeline(trigger);
      const tlList = gsap.timeline(trigger);
      // const tl = gsap.timeline(triggerSettings);
      // const tlList = gsap.timeline(triggerSettings);

      tl.fromTo([title, footer], 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, delay: .5,
          ease: "ease-in",
        }
      );

      tl.fromTo(".block-anim__line", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3,
          ease: "ease-in",
        },
        "-=1.2"
      );

      tl.fromTo(".block-anim__line .line", 
        { x: "-100%", }, 
        { x: "100%", duration: 4,
        },
        "-=1.2"
      );
      // // Задержка перед исчезновением
      // tl.to([title, footer], 
      //   { opacity: 0, duration: 1,
          // ease: "ease-out", }, "+=3.4"
      // );

      tlList.fromTo(".block-anim__list li",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, stagger: .6, delay: 1.2,
          ease: "ease-in", }
      );

      // Исчезновение элементов списка
      // tlList.to(".block-anim__list li",
      //   { opacity: 0, duration: 1,
          // ease: "ease-out", }, "+=2"
      // );

    } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {


    const trigger = {
      trigger: ".block1.block-anim",
      start: "top 80%",
      toggleActions: "play none none none"
    }

      const tlList = gsap.timeline(trigger);
      const tl = gsap.timeline(trigger);

      tl.fromTo([title, footer], 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, delay: .5,
          ease: "ease-in",
        }
      );

      tl.fromTo(".block-anim__line", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3,
          ease: "ease-in",
        },
        "-=1.2"
      );

      tl.to(".block-anim__line .line", 
        { x: "100%", duration: 4,
        },
        "-=1.2"
      );

      tlList.fromTo(".block-anim__list li",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, stagger: .6, delay: 1.2,
          ease: "ease-in", }
      );
    } else {
      const tla = gsap.timeline({
        scrollTrigger: {
          trigger: ".block1.block-anim",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        repeat: -1, // Бесконечное повторение
        repeatDelay: 0 // Задержка перед повтором
      });

      tla.set(".block-anim__list li", { opacity: 0 });

      tla.fromTo([title, footer],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5, ease: "ease-in", }
      );

      tla.fromTo(".block-anim__list li",
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 1, ease: "ease-in",  },
        "-=0.5"
      );

      tla.to([title, footer, ".block-anim__list li"],
        { opacity: 0, duration: 1, delay:2, ease: "ease-out" }, "-=0"
      );
    }
  }

  function animateListItems2() {
    const animatedBlock = document.querySelector('.block1.block-anim2')
    if (!animatedBlock) return
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const tla = gsap.timeline({
      scrollTrigger: {
        trigger: ".block1.block-anim2",
        start: "top 80%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true 
      },
      repeat: -1,
      repeatDelay: 0
    });

    if (window.innerWidth >= 1024 && window.matchMedia("(orientation: landscape)").matches) {

        tla.set([
          ".block-anim2 li",
          ".block-anim2 .line",
          ".block-anim2 .bg-gr"
        ], { opacity: 0});
        
        tla.set(".block-anim2__list", { opacity: 1,});

        tla.fromTo(".block-anim2 .line",
          { opacity: 0, x: -500 },
          { opacity: 1, x: 0, duration: 1.5, delay: 1, ease: "ease-in" },
        );
        tla.fromTo(".block-anim2 .bg-gr",
          { opacity: 0, },
          { opacity: 1, duration: 1, ease: "ease-in" }, "-=1"
        );
        tla.fromTo(".block-anim2 li",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, ease: "ease-in" }, "-=1"
        );
        tla.to({}, { duration: 2 }); // Пауза на 2 секунды

        tla.fromTo([".block-anim2 li", ".block-anim2 .line", ".block-anim2 .bg-gr"],
          { opacity: 1, x: 0 },
          { opacity: 0, x: 100, duration: 1, ease: "ease-in" }, 
        );

    } else {

      tla.set(".block-anim2__list", { opacity: 0, x: -20, y: '-50%' });
      
      tla.set([
        ".block-anim2 li",
        ".block-anim2 .line",
        ".block-anim2 .bg-gr"
      ], { opacity: 1, x:0});
      

      tla.fromTo(".block-anim2__list.list-1",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "ease-in" }, "0"
      );
      tla.fromTo(".block-anim2__list.list-2",
        { opacity: 1, x: 0 },
        { opacity: 0, x: 20, duration: 1, ease: "ease-out" }, "0"
      );
  
      // Задержка в 2 секунды, пока первый список остаётся видимым
      tla.to({}, { duration: 2 }); // Пауза на 2 секунды

      // Появление второго списка и одновременное исчезновение первого
      tla.fromTo(".block-anim2__list.list-2",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "ease-in" }, "+=0"
      );
      tla.fromTo(".block-anim2__list.list-1",
        { opacity: 1, x: 0 },
        { opacity: 0, x: 20, duration: 1, ease: "ease-out" }, "-=1"
      );
    
      // Задержка в 2 секунды, пока второй список остаётся видимым
      tla.to({}, { duration: 2 }); // Пауза на 2 секунды
    }
  }

  function animateEdelhaus1() {
    const animatedBlock = document.querySelector('.block-anim-edelhaus-1')
    if (!animatedBlock) return
    
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-edelhaus-1",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    const titlewrap = document.querySelector(".block-anim-edelhaus-1__title-wrap")

    const title1 = document.querySelector(".block-anim-edelhaus-1 .title_top")
    const title2 = document.querySelector(".block-anim-edelhaus-1 .title_bottom")
    const footer = document.querySelector(".block-anim-edelhaus-1 .brand")

    const content = document.querySelector(".block-anim-edelhaus-1__content-wrap")
    const text = document.querySelector(".block-anim-edelhaus-1__content-wrap .text")

    if (window.innerWidth >= 768) {
      gsap.set([footer], { opacity: 1, x: '-50%', });
      gsap.set([ content], { opacity: 1, x: '-50%', y: '-50%'});
      gsap.set(titlewrap, { opacity: 1, });
      
      gsap.set(title1, { x: '-50%', y: '-0%' });
      gsap.set(title2, { x: '-50%', y: '-0%' });
      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });

      tl.fromTo([footer],
        { opacity: 0, y: 60, },
        { opacity: 1, y: 0, duration: 1, delay: 1,
          ease: "ease-in", }
      );
      tl.fromTo(
        title1,
        { opacity: 0, y: '-0%' },
        { opacity: 1, y: '-30%', duration: 1, ease: "ease-in" },
        "-=0.5"
      );

      tl.fromTo(
        title2,
        { opacity: 0, y: '0%' },
        { opacity: 1, y: '30%', duration: 1, ease: "ease-in" },
        "-=1"
      );

      tl.fromTo(content,
        { opacity: 0, },
        { opacity: 1, duration: 1, delay: 1,
          ease: "ease-in", },
        "-=1"
      );
      tl.fromTo(text,
        { opacity: 0, y: 40,  },
        { opacity: 1, y: 0,  duration: 1,
          ease: "ease-in", },
        "-=1.5"
      );
    } else {
      gsap.set([title1, title2, content], { opacity: 1, y: 0, x:0});
      gsap.set(title2, { x:0});
      gsap.set(footer, { x:0});
      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });

      tl.fromTo([titlewrap, text, footer ],
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, stagger: .8, delay: .5,
          ease: "ease-in", }
      );
    }
  }

  function animateEdelhaus2() {
    const animatedBlock = document.querySelector('.block-anim-edelhaus-2')
    if (!animatedBlock) return

    const triggerSettings = {
      trigger: ".block-anim-edelhaus-2",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    const tl = gsap.timeline({
      scrollTrigger: triggerSettings
    });

    const title = document.querySelector(".block-anim-edelhaus-2__title")
    const footer = document.querySelector(".block-anim-edelhaus-2__footer")

    tl.fromTo([title, footer],
      { opacity: 0, y: 60, },
      { opacity: 1, y: 0, duration: 1, stagger: 1, delay: 1.5,
        ease: "ease-in", }
    );
  }

  function animateMK() {
    const animatedBlock = document.querySelector('.block-anim-mk-1')
    if (!animatedBlock) return
    
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-mk-1",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    const tl = gsap.timeline({
      scrollTrigger: triggerSettings
    });

    tl.fromTo('.block-anim-mk-1 .up-down',
      { opacity: 0, y: -30, },
      { opacity: 1, y: 0, duration: .8, stagger: 1, delay: 1,
        ease: "ease-in", }
    );

  }

  function animateMK2() {
    const animatedBlock = document.querySelector('.block-anim-mk-2')
    if (!animatedBlock) return
    
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-mk-2",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    const tl = gsap.timeline({
      scrollTrigger: triggerSettings
    });

    if (window.innerWidth >= 768) {
      tl.set('.block-anim-mk-2 .block-anim-mk-2__title-wrap',
        { opacity: 1, y: 0, },
      )
      tl.fromTo('.block-anim-mk-2__title',
        { opacity: 0, y: -20, },
        { opacity: 1, y: 0, duration: .8, stagger: .3, delay: 1,
          ease: "ease-in", }
      );

      tl.fromTo('.block-anim-mk-2 .text_left',
        { opacity: 0, x: 20,  },
        { opacity: 1, x: 0,  duration: 1,
          ease: "ease-in", },
        "-=0"
      );
      tl.fromTo('.block-anim-mk-2 .text_right',
        { opacity: 0, x: -20,  },
        { opacity: 1, x: 0,  duration: 1,
          ease: "ease-in", },
        "-=1"
      );
      tl.fromTo('.block-anim-mk-2 .brand',
        { opacity: 0, y: -20, },
        { opacity: 1, y: 0, duration: .8,
          ease: "ease-in", },
        "-=0"
      );

    } else {
      tl.set('.block-anim-mk-2__title',
        { opacity: 1, y: 0, },
      )
      tl.set('.block-anim-mk-2__content-wrap .text',
        { opacity: 0, x: 0, },
      )
      tl.fromTo('.block-anim-mk-2 .up-down',
        { opacity: 0, y: -30, },
        { opacity: 1, y: 0, duration: .8, stagger: .6, delay: 1,
          ease: "ease-in", }
      );
    }
  }

  function animateKonig() {
    const animatedBlock = document.querySelector('.block-anim-konig-1')
    if (!animatedBlock) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-konig-1",
      start: "top 90%",
      toggleActions: "play none none none",
      invalidateOnRefresh: true
    };

    if (window.innerWidth >= 768) {
      gsap.set('.block-anim-konig-1 .left-to-right', { opacity: 0, x: -60 });
      gsap.set('.block-anim-konig-1 .up-down', { opacity: 1, y: 0 });

      const tl1 = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl1.fromTo('.block-anim-konig-1 .left-to-right',
        { opacity: 0, x: -60, },
        { opacity: 1, x: 0, duration: .6, stagger: .4, delay: 1,
          ease: "ease-in", }
      );

    } else {
      gsap.set('.block-anim-konig-1 .up-down', { opacity: 0, y: -20 });
      gsap.set('.block-anim-konig-1 .left-to-right', { opacity: 1, x: 0 });

      const tl2 = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl2.fromTo('.block-anim-konig-1 .up-down',
        { opacity: 0, y: -20, },
        { opacity: 1, y: 0, duration: .6, stagger: .4, delay: 1,
          ease: "ease-in", }
      );
    }
  }

  function animateKonig2() {
    const animatedBlock = document.querySelector('.block-anim-konig-2')
    if (!animatedBlock) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-konig-2",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    if (window.innerWidth >= 768) {

      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl.set('.block-anim-konig-2 .up-down',
        { opacity: 1, y: 0, },
      )
      tl.set('.block-anim-konig-2 .brand.left-to-right',
        { opacity: 0, x: 0, },
      )

      tl.fromTo([
        '.block-anim-konig-2 .lg-after_left.left-to-right',
        '.block-anim-konig-2 .block-anim-konig-2__title-wrap.left-to-right',
        '.block-anim-konig-2 .brand.left-to-right',
        '.block-anim-konig-2 .block-anim-konig-2__content-wrap.left-to-right',
        '.block-anim-konig-2 .lg-after_right.left-to-right',
      ],
        { opacity: 0, x: -60, },
        { opacity: 1, x: 0, duration: .6, stagger: .1, delay: 1,
          ease: "ease-in", }
      );

      tl.fromTo(
        '.block-anim-konig-2 .lg-before',
        { opacity: 0, x: -60, },
        { opacity: 1, x: 0, duration: .6, stagger: .6,
          ease: "ease-in", },
        "-=1.3"
      );

    } else {

      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl.set([
        '.block-anim-konig-2 .lg-after_left.left-to-right',
        '.block-anim-konig-2 .block-anim-konig-2__title-wrap.left-to-right',
        '.block-anim-konig-2 .block-anim-konig-2__content-wrap.left-to-right',
        '.block-anim-konig-2 .lg-after_right.left-to-right',
      ],
        { opacity: 1, x: 0, },
      )

      tl.set('.block-anim-konig-2 .brand.left-to-right',
        { opacity: 0, x: 0, },
      )
      tl.fromTo('.block-anim-konig-2 .up-down',
        { opacity: 0, y: -20, },
        { opacity: 1, y: 0, duration: .6, stagger: .4, delay: 1,
          ease: "ease-in", }
      );
    }
  }

  function animateMF() {
    const animatedBlock = document.querySelector('.block-anim-mf-1')
    if (!animatedBlock) return
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-mf-1",
      start: "top 90%",
      toggleActions: "play none none none",
    };


    if (window.innerWidth >= 768) {
      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl.set('.block-anim-mf-1 .block-anim-mf__title-wrap',
        { opacity: 1, y: 0, rotate: -90 },
      )
      tl.set('.block-anim-mf-1 .block-anim-mf__content-wrap',
        { opacity: 0, y: 0, },
      )

      tl.fromTo(
        '.block-anim-mf-1 .block-anim-mf__title',
        { opacity: 0, x: -20, },
        { opacity: 1, x: 0, duration: .8, stagger: .6, delay: 1,
          ease: "ease-in", }
      );

      tl.fromTo(
        '.block-anim-mf-1 .block-anim-mf__content-wrap',
        { opacity: 0, x: -30, },
        { opacity: 1, x: 0, duration: .8,
          ease: "ease-in", },
        // "-=2"
      );

    } else {
      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl.set('.block-anim-mf-1 .block-anim-mf__content-wrap',
        { opacity: 0, y: 0, x: 0 },
      )

      tl.set(['.block-anim-mf-1 .block-anim-mf__title'],
        { opacity: 1, x: 0, },
      )
      tl.set(['.block-anim-mf-1 .block-anim-mf__title-wrap.down-up'],
        { opacity: 0, x: 0, rotate: 0, y: 20 },
      )
      
      // tl.set('.block-anim-mf-1 .block-anim-mf__content-wrap',
      //   { opacity: 0, y: 0, },
      // )

      tl.fromTo('.block-anim-mf-1 .down-up',
        { opacity: 0, y: 20, },
        { opacity: 1, y: 0, duration: .6, stagger: .6, delay: 1,
          ease: "ease-in", }
      );
    }
  }

  function animateMF2() {
    const animatedBlock = document.querySelector('.block-anim-mf-2')
    if (!animatedBlock) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === animatedBlock) st.kill();
    });

    gsap.killTweensOf(animatedBlock);

    const triggerSettings = {
      trigger: ".block-anim-mf-2",
      start: "top 90%",
      toggleActions: "play none none none",
    };

    if (window.innerWidth >= 768) {

      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });

      tl.fromTo([
        '.block-anim-mf-2 .block-anim-mf__title',
      ],
        { opacity: 0, y: -20, },
        { opacity: 1, y: 0, duration: .8, stagger: .6, delay: 1,
          ease: "ease-in", }
      );

      tl.fromTo([
        '.block-anim-mf-2 .block-anim-mf__content-wrap',
        '.block-anim-mf-2 .brand-wrap',
      ],
        { opacity: 0, x: -30, },
        { opacity: 1, x: 0, duration: .8, stagger: .3,
          ease: "ease-in", },
        // "-=2.5"
      );

    } else {

      const tl = gsap.timeline({
        scrollTrigger: triggerSettings
      });
      tl.set('.block-anim-mf-2 .block-anim-mf__content-wrap',
        { opacity: 0, x: 0, },
      )
      tl.set('.block-anim-mf-2 .brand-wrap',
        { opacity: 1, x: '-40%', },
      )

      tl.fromTo('.block-anim-mf-2 .down-up',
        { opacity: 0, y: 20, },
        { opacity: 1, y: 0, duration: .6, stagger: .4, delay: 1,
          ease: "ease-in", }
      );
    }
  }

  window.addEventListener("load", function() {
    const animatedBlock = document.querySelector('.block1-anim')
    if (!animatedBlock) return

    animateListItems();
    animateListItems2()
    animateEdelhaus1();
    animateEdelhaus2();
    animateMK();
    animateMK2();
    animateKonig();
    animateKonig2();
    animateMF()
    animateMF2()
  });

  window.addEventListener("resize", function() {
    const animatedBlock = document.querySelector('.block1-anim')
    if (!animatedBlock) return
    // ScrollTrigger.killAll( );

    animateListItems();
    animateListItems2()
    animateEdelhaus1();
    animateEdelhaus2();
    animateMK();
    animateMK2();
    animateKonig();
    animateKonig2();
    animateMF()
    animateMF2()
  });

	gsap.to(".container-wrapper", {
		opacity: 1,
		x: "-50%",
		duration: 1,
		scrollTrigger: {
			trigger: ".parallax-container",
			start: "bottom bottom",
			toggleActions: "play none none reverse",
		},
	});

	gsap.utils.toArray("#sContentOven .card-square-item").forEach(container => {
		const textCenters = container.querySelectorAll(".text-center");

		textCenters.forEach(textCenter => {
			gsap.to(textCenter, {
				opacity: 1,
				x: "-50%",
				duration: 1,
				ease: "ease-in",
				scrollTrigger: {
					trigger: container,
					start: "bottom bottom",
					toggleActions: "play none none reverse",
				},
			});
		});
	});

	gsap.utils.toArray("#sAbout .card-square-item").forEach(container => {
		const textCenters = container.querySelectorAll(".text-center");

		textCenters.forEach(textCenter => {
			gsap.to(textCenter, {
				opacity: 1,
				x: "-50%",
				duration: 1,
				ease: "ease-in",
				scrollTrigger: {
					trigger: container,
					start: "bottom bottom",
					toggleActions: "play none none reverse",
				},
			});
		});
	});

	gsap.utils.toArray("#sBrand .card-square-item").forEach(container => {
		const textCenters = container.querySelectorAll(".text-wrapper");

		textCenters.forEach(textCenter => {
			gsap.to(textCenter, {
				opacity: 1,
				x: "-50%",
				duration: 1,
				ease: "ease-in",
				scrollTrigger: {
					trigger: container,
					start: "bottom bottom",
					toggleActions: "play none none reverse",
				},
			});
		});
	});

	gsap.utils
		.toArray("#sCareer .design-block--1 .card-square-item")
		.forEach(container => {
			const textCenters = container.querySelectorAll(".text-center");

			textCenters.forEach(textCenter => {
				gsap.to(textCenter, {
					opacity: 1,
					x: "-50%",
					duration: 1,
					ease: "ease-in",
					scrollTrigger: {
						trigger: container,
						start: "bottom bottom",
						toggleActions: "play none none reverse",
					},
				});
			});
		});

	gsap.utils
		.toArray("#sCareer .design-block--2 .card-square-item")
		.forEach(container => {
			const textCenters = container.querySelectorAll(".text-wrapper");

			textCenters.forEach(textCenter => {
				gsap.to(textCenter, {
					opacity: 1,
					x: "-50%",
					duration: 1,
					ease: "ease-in",
					scrollTrigger: {
						trigger: container,
						start: "bottom bottom",
						toggleActions: "play none none reverse",
					},
				});
			});
		});

	/* change top nav bg */
	const nav = document.querySelector(".top-nav");

	if (nav) {
		let scrollerGSAP = document.querySelector("body");
		let sections = document.querySelectorAll(".white-section");
		if (sections.length) {
			let headerHeight = nav.offsetHeight;
			sections.forEach(section => {
				// let className = "onWhiteBg "; // default color

				// if (section.classList.contains("white-section")) {
				//   className = "onWhiteBg";
				// } else {
				//   className = " ";
				// }
				ScrollTrigger.create({
					trigger: section,
					scroller: scrollerGSAP,
					start: `top-=${headerHeight / 2}   top`,
					end: "bottom top",
					onEnter: () => nav.classList.add("dark--js"),
					onEnterBack: () => nav.classList.add("dark--js"),
					onLeaveBack: () => nav.classList.remove("dark--js"),
					onLeave: () => nav.classList.remove("dark--js"),
					// toggleActions: "play none reverse none",
				});
			});
		}
	}

	const arrowsMainPage = document.querySelectorAll(
		".main-page-slider--js .swiper-button-hand"
	);

	if (arrowsMainPage.length) {
		let scrollerGSAP = document.querySelector("body");
		const footer = document.querySelector("footer");
		arrowsMainPage.forEach(arrow => {
			ScrollTrigger.create({
				trigger: footer,
				scroller: scrollerGSAP,
				start: `top  top`,
				end: " top bottom",
				onEnter: () => arrow.classList.add("d-none"),
				onLeave: () => arrow.classList.remove("d-none"),
				onEnterBack: () => arrow.classList.add("d-none"),
				onLeaveBack: () => arrow.classList.remove("d-none"),
				// toggleActions: "play none reverse none",
			});
		});
	}
}
}

if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

