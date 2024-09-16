/* animation */

function animateListItems() {
  const animatedBlock = document.querySelector(".block1.block-anim");
  if (!animatedBlock) return;

  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger === animatedBlock) st.kill();
  });

  gsap.killTweensOf(animatedBlock);

  const trigger = {
    trigger: ".block1.block-anim",
    start: "top 80%",
    toggleActions: "play none none none",
  };
  const triggerSettings = {
    scrollTrigger: trigger,
    repeat: -1, // Бесконечное повторение
    repeatDelay: 0, // Задержка перед повтором
  };
  const title = document.querySelector(".block-anim__title-wrap");
  const footer = document.querySelector(".block-anim__footer");

  if (window.innerWidth >= 1024) {
    const tl = gsap.timeline(trigger);
    const tlList = gsap.timeline(trigger);
    // const tl = gsap.timeline(triggerSettings);
    // const tlList = gsap.timeline(triggerSettings);

    tl.fromTo(
      [title, footer],
      {opacity: 0},
      {opacity: 1, duration: 1.5, delay: 0.5, ease: "ease-in"}
    );

    tl.fromTo(
      ".block-anim__line",
      {opacity: 0},
      {opacity: 1, duration: 0.3, ease: "ease-in"},
      "-=1.2"
    );

    tl.fromTo(
      ".block-anim__line .line",
      {x: "-100%"},
      {x: "100%", duration: 4},
      "-=1.2"
    );
    // // Задержка перед исчезновением
    // tl.to([title, footer],
    //   { opacity: 0, duration: 1,
    // ease: "ease-out", }, "+=3.4"
    // );

    tlList.fromTo(
      ".block-anim__list li",
      {opacity: 0, x: -60},
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.6,
        delay: 1.2,
        ease: "ease-in",
      }
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
      toggleActions: "play none none none",
    };

    const tlList = gsap.timeline(trigger);
    const tl = gsap.timeline(trigger);

    tl.fromTo(
      [title, footer],
      {opacity: 0},
      {opacity: 1, duration: 1.5, delay: 0.5, ease: "ease-in"}
    );

    tl.fromTo(
      ".block-anim__line",
      {opacity: 0},
      {opacity: 1, duration: 0.3, ease: "ease-in"},
      "-=1.2"
    );

    tl.to(".block-anim__line .line", {x: "100%", duration: 4}, "-=1.2");

    tlList.fromTo(
      ".block-anim__list li",
      {opacity: 0, x: -60},
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.6,
        delay: 1.2,
        ease: "ease-in",
      }
    );
  } else {
    const tla = gsap.timeline({
      scrollTrigger: {
        trigger: ".block1.block-anim",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      repeat: -1, // Бесконечное повторение
      repeatDelay: 0, // Задержка перед повтором
    });

    tla.set([".block-anim__list li", title], {opacity: 0});

    tla.fromTo(
      [title, footer],
      {opacity: 0},
      {opacity: 1, duration: 1, delay: 0.5, ease: "ease-in"}
    );

    tla.fromTo(
      ".block-anim__list li",
      {opacity: 0},
      {opacity: 1, duration: 1, stagger: 1, ease: "ease-in"},
      "-=0.5"
    );

    tla.to(
      [title, footer, ".block-anim__list li"],
      {opacity: 0, duration: 1, delay: 2, ease: "ease-out"},
      "-=0"
    );
  }
}

function animateListItems2() {
  const animatedBlock = document.querySelector(".block1.block-anim2");
  if (!animatedBlock) return;
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger === animatedBlock) st.kill();
  });

  gsap.killTweensOf(animatedBlock);

  const tla = gsap.timeline({
    scrollTrigger: {
      trigger: ".block1.block-anim2",
      start: "top 80%",
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    },
    repeat: -1,
    repeatDelay: 0,
  });

  if (
    window.innerWidth >= 1024 &&
    window.matchMedia("(orientation: landscape)").matches
  ) {
    tla.set(
      [".block-anim2 li", ".block-anim2 .line", ".block-anim2 .bg-gr"],
      {opacity: 0}
    );

    tla.set(".block-anim2__list", {opacity: 1});

    tla.fromTo(
      ".block-anim2 .line",
      {opacity: 0, x: -500},
      {opacity: 1, x: 0, duration: 1.5, delay: 1, ease: "ease-in"}
    );
    tla.fromTo(
      ".block-anim2 .bg-gr",
      {opacity: 0},
      {opacity: 1, duration: 1, ease: "ease-in"},
      "-=1"
    );
    tla.fromTo(
      ".block-anim2 li",
      {opacity: 0, x: -100},
      {opacity: 1, x: 0, duration: 1, ease: "ease-in"},
      "-=1"
    );
    tla.to({}, {duration: 2}); // Пауза на 2 секунды

    tla.fromTo(
      [".block-anim2 li", ".block-anim2 .line", ".block-anim2 .bg-gr"],
      {opacity: 1, x: 0},
      {opacity: 0, x: 100, duration: 1, ease: "ease-in"}
    );
  } else {
    tla.set(".block-anim2__list", {opacity: 0, x: -20, y: "-50%"});

    tla.set(
      [".block-anim2 li", ".block-anim2 .line", ".block-anim2 .bg-gr"],
      {opacity: 1, x: 0}
    );

    tla.fromTo(
      ".block-anim2__list.list-1",
      {opacity: 0, x: -20},
      {opacity: 1, x: 0, duration: 1, ease: "ease-in"},
      "0"
    );
    tla.fromTo(
      ".block-anim2__list.list-2",
      {opacity: 1, x: 0},
      {opacity: 0, x: 20, duration: 1, ease: "ease-out"},
      "0"
    );

    // Задержка в 2 секунды, пока первый список остаётся видимым
    tla.to({}, {duration: 2}); // Пауза на 2 секунды

    // Появление второго списка и одновременное исчезновение первого
    tla.fromTo(
      ".block-anim2__list.list-2",
      {opacity: 0, x: -20},
      {opacity: 1, x: 0, duration: 1, ease: "ease-in"},
      "+=0"
    );
    tla.fromTo(
      ".block-anim2__list.list-1",
      {opacity: 1, x: 0},
      {opacity: 0, x: 20, duration: 1, ease: "ease-out"},
      "-=1"
    );

    // Задержка в 2 секунды, пока второй список остаётся видимым
    tla.to({}, {duration: 2}); // Пауза на 2 секунды
  }
}

function animateEdelhaus1() {
  const animatedBlock = document.querySelector(".block-anim-edelhaus-1");
  if (!animatedBlock) return;

  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger === animatedBlock) st.kill();
  });

  gsap.killTweensOf(animatedBlock);

  const triggerSettings = {
    trigger: ".block-anim-edelhaus-1",
    start: "top 90%",
    toggleActions: "play none none none",
  };

  const titlewrap = document.querySelector(
    ".block-anim-edelhaus-1__title-wrap"
  );

  const title1 = document.querySelector(
    ".block-anim-edelhaus-1 .title_top"
  );
  const title2 = document.querySelector(
    ".block-anim-edelhaus-1 .title_bottom"
  );
  const footer = document.querySelector(".block-anim-edelhaus-1 .brand");

  const content = document.querySelector(
    ".block-anim-edelhaus-1__content-wrap"
  );
  const text = document.querySelector(
    ".block-anim-edelhaus-1__content-wrap .text"
  );

  if (window.innerWidth >= 768) {
    gsap.set([footer], {opacity: 1, x: "-50%"});
    gsap.set([content], {opacity: 1, x: "-50%", y: "-50%"});
    gsap.set(titlewrap, {opacity: 1});

    gsap.set(title1, {x: "-50%", y: "-0%"});
    gsap.set(title2, {x: "-50%", y: "-0%"});
    const tl = gsap.timeline({
      scrollTrigger: triggerSettings,
    });

    tl.fromTo(
      [footer],
      {opacity: 0, y: 60},
      {opacity: 1, y: 0, duration: 1, delay: 1, ease: "ease-in"}
    );
    tl.fromTo(
      title1,
      {opacity: 0, y: "-0%"},
      {opacity: 1, y: "-30%", duration: 1, ease: "ease-in"},
      "-=0.5"
    );

    tl.fromTo(
      title2,
      {opacity: 0, y: "0%"},
      {opacity: 1, y: "30%", duration: 1, ease: "ease-in"},
      "-=1"
    );

    tl.fromTo(
      content,
      {opacity: 0},
      {opacity: 1, duration: 1, delay: 1, ease: "ease-in"},
      "-=1"
    );
    tl.fromTo(
      text,
      {opacity: 0, y: 40},
      {opacity: 1, y: 0, duration: 1, ease: "ease-in"},
      "-=1.5"
    );
  } else {
    gsap.set([title1, title2, content], {opacity: 1, y: 0, x: 0});
    gsap.set(title2, {x: 0});
    gsap.set(footer, {x: 0});
    const tl = gsap.timeline({
      scrollTrigger: triggerSettings,
    });

    tl.fromTo(
      [titlewrap, text, footer],
      {opacity: 0, y: -30},
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.8,
        delay: 0.5,
        ease: "ease-in",
      }
    );
  }
}

function animateEdelhaus2() {
  const animatedBlock = document.querySelector(".block-anim-edelhaus-2");
  if (!animatedBlock) return;

  const triggerSettings = {
    trigger: ".block-anim-edelhaus-2",
    start: "top 90%",
    toggleActions: "play none none none",
  };

  const tl = gsap.timeline({
    scrollTrigger: triggerSettings,
  });

  const title = document.querySelector(".block-anim-edelhaus-2__title");
  const footer = document.querySelector(".block-anim-edelhaus-2__footer");

  tl.fromTo(
    [title, footer],
    {opacity: 0, y: 60},
    {opacity: 1, y: 0, duration: 1, stagger: 1, delay: 1.5, ease: "ease-in"}
  );
}

function animateMK() {
  const animatedBlock = document.querySelector(".block-anim-mk-1");
  if (!animatedBlock) return;

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
    scrollTrigger: triggerSettings,
  });

  tl.fromTo(
    ".block-anim-mk-1 .up-down",
    {opacity: 0, y: -30},
    {opacity: 1, y: 0, duration: 0.8, stagger: 1, delay: 1, ease: "ease-in"}
  );
}

function animateMK2() {
  const animatedBlock = document.querySelector(".block-anim-mk-2");
  if (!animatedBlock) return;

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
    scrollTrigger: triggerSettings,
  });

  if (window.innerWidth >= 768) {
    tl.set(".block-anim-mk-2 .block-anim-mk-2__title-wrap", {
      opacity: 1,
      y: 0,
    });
    tl.fromTo(
      ".block-anim-mk-2__title",
      {opacity: 0, y: -20},
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        delay: 1,
        ease: "ease-in",
      }
    );

    tl.fromTo(
      ".block-anim-mk-2 .text_left",
      {opacity: 0, x: 20},
      {opacity: 1, x: 0, duration: 1, ease: "ease-in"},
      "-=0"
    );
    tl.fromTo(
      ".block-anim-mk-2 .text_right",
      {opacity: 0, x: -20},
      {opacity: 1, x: 0, duration: 1, ease: "ease-in"},
      "-=1"
    );
    tl.fromTo(
      ".block-anim-mk-2 .brand",
      {opacity: 0, y: -20},
      {opacity: 1, y: 0, duration: 0.8, ease: "ease-in"},
      "-=0"
    );
  } else {
    tl.set(".block-anim-mk-2__title", {opacity: 1, y: 0});
    tl.set(".block-anim-mk-2__content-wrap .text", {opacity: 0, x: 0});
    tl.fromTo(
      ".block-anim-mk-2 .up-down",
      {opacity: 0, y: -30},
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.6,
        delay: 1,
        ease: "ease-in",
      }
    );
  }
}

function animateKonig() {
  const animatedBlock = document.querySelector(".block-anim-konig-1");
  if (!animatedBlock) return;

  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger === animatedBlock) st.kill();
  });

  gsap.killTweensOf(animatedBlock);

  const triggerSettings = {
    trigger: ".block-anim-konig-1",
    start: "top 90%",
    toggleActions: "play none none none",
    invalidateOnRefresh: true,
  };

  if (window.innerWidth >= 768) {
    gsap.set(".block-anim-konig-1 .left-to-right", {opacity: 0, x: -60});
    gsap.set(".block-anim-konig-1 .up-down", {opacity: 1, y: 0});

    const tl1 = gsap.timeline({
      scrollTrigger: triggerSettings,
    });
    tl1.fromTo(
      ".block-anim-konig-1 .left-to-right",
      {opacity: 0, x: -60},
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.4,
        delay: 1,
        ease: "ease-in",
      }
    );
  } else {
    gsap.set(".block-anim-konig-1 .inner-container", {x: "-50%", y: "-50%"});
    gsap.set(".block-anim-konig-1 .up-down", {opacity: 0, y: -20});
    gsap.set(".block-anim-konig-1 .left-to-right", {opacity: 1, x: 0});

    const tl2 = gsap.timeline({
      scrollTrigger: triggerSettings,
    });
    tl2.fromTo(
      ".block-anim-konig-1 .up-down",
      {opacity: 0, y: -20},
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.4,
        delay: 1,
        ease: "ease-in",
      }
    );
  }
}

function animateKonig2() {
  const animatedBlock = document.querySelector(".block-anim-konig-2");
  if (!animatedBlock) return;

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
      scrollTrigger: triggerSettings,
    });
    tl.set(".block-anim-konig-2 .up-down", {opacity: 1, y: 0});
    tl.set(".block-anim-konig-2 .brand.left-to-right", {opacity: 0, x: 0});

    tl.fromTo(
      [
        ".block-anim-konig-2 .lg-after_left.left-to-right",
        ".block-anim-konig-2 .block-anim-konig-2__title-wrap.left-to-right",
        ".block-anim-konig-2 .brand.left-to-right",
        ".block-anim-konig-2 .block-anim-konig-2__content-wrap.left-to-right",
        ".block-anim-konig-2 .lg-after_right.left-to-right",
      ],
      {opacity: 0, x: -60},
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1,
        ease: "ease-in",
      }
    );

    tl.fromTo(
      ".block-anim-konig-2 .lg-before",
      {opacity: 0, x: -60},
      {opacity: 1, x: 0, duration: 0.6, stagger: 0.6, ease: "ease-in"},
      "-=1.3"
    );
  } else {
    const tl = gsap.timeline({
      scrollTrigger: triggerSettings,
    });
    tl.set(
      [
        ".block-anim-konig-2 .lg-after_left.left-to-right",
        ".block-anim-konig-2 .block-anim-konig-2__title-wrap.left-to-right",
        ".block-anim-konig-2 .block-anim-konig-2__content-wrap.left-to-right",
        ".block-anim-konig-2 .lg-after_right.left-to-right",
      ],
      {opacity: 1, x: 0}
    );

    tl.set(".block-anim-konig-2 .brand.left-to-right", {opacity: 0, x: 0});
    tl.fromTo(
      ".block-anim-konig-2 .up-down",
      {opacity: 0, y: -20},
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.4,
        delay: 1,
        ease: "ease-in",
      }
    );
  }
}

function animateMF() {
  const animatedBlock = document.querySelector(".block-anim-mf-1");
  if (!animatedBlock) return;
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
      scrollTrigger: triggerSettings,
    });
    tl.set(".block-anim-mf-1 .block-anim-mf__title-wrap", {
      opacity: 1,
      y: 0,
      rotate: -90,
    });
    tl.set(".block-anim-mf-1 .block-anim-mf__content-wrap", {
      opacity: 0,
      y: 0,
    });

    tl.fromTo(
      ".block-anim-mf-1 .block-anim-mf__title",
      {opacity: 0, x: -20},
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.6,
        delay: 1,
        ease: "ease-in",
      }
    );

    tl.fromTo(
      ".block-anim-mf-1 .block-anim-mf__content-wrap",
      {opacity: 0, x: -30},
      {opacity: 1, x: 0, duration: 0.8, ease: "ease-in"}
      // "-=2"
    );
  } else {
    const tl = gsap.timeline({
      scrollTrigger: triggerSettings,
    });
    tl.set(".block-anim-mf-1 .block-anim-mf__content-wrap", {
      opacity: 0,
      y: 0,
      x: 0,
    });

    tl.set([".block-anim-mf-1 .block-anim-mf__title"], {opacity: 1, x: 0});
    tl.set([".block-anim-mf-1 .block-anim-mf__title-wrap.down-up"], {
      opacity: 0,
      x: 0,
      rotate: 0,
      y: 20,
    });

    // tl.set('.block-anim-mf-1 .block-anim-mf__content-wrap',
    //   { opacity: 0, y: 0, },
    // )

    tl.fromTo(
      ".block-anim-mf-1 .down-up",
      {opacity: 0, y: 20},
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.6,
        delay: 1,
        ease: "ease-in",
      }
    );
  }
}

function animateMF2() {
  const animatedBlock = document.querySelector(".block-anim-mf-2");
  if (!animatedBlock) return;

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
      scrollTrigger: triggerSettings,
    });

    tl.fromTo(
      [".block-anim-mf-2 .block-anim-mf__title"],
      {opacity: 0, y: -20},
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.6,
        delay: 1,
        ease: "ease-in",
      }
    );

    tl.fromTo(
      [
        ".block-anim-mf-2 .block-anim-mf__content-wrap",
        ".block-anim-mf-2 .brand-wrap",
      ],
      {opacity: 0, x: -30},
      {opacity: 1, x: 0, duration: 0.8, stagger: 0.3, ease: "ease-in"}
      // "-=2.5"
    );
  } else {
    const tl = gsap.timeline({
      scrollTrigger: triggerSettings,
    });
    tl.set(".block-anim-mf-2 .block-anim-mf__content-wrap", {
      opacity: 0,
      x: 0,
    });
    tl.set(".block-anim-mf-2 .brand-wrap", {opacity: 1, x: "-40%"});

    tl.fromTo(
      ".block-anim-mf-2 .down-up",
      {opacity: 0, y: 20},
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.4,
        delay: 1,
        ease: "ease-in",
      }
    );
  }
}

export {
  animateListItems,
  animateListItems2,
  animateEdelhaus1,
  animateEdelhaus2,
  animateMK,
  animateMK2,
  animateKonig,
  animateKonig2,
  animateMF,
  animateMF2,
}
