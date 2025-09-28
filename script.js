"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn, i) => btn.addEventListener("click", openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// //window scroll to
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function (e) {
//   // const s1coords = section1.getBoundingClientRect();
//   // console.log(e.target.getBoundingClientRect());

//   // window.scrollTo({
//   //   left :s1coords.left+window.pageXOffset,
//   //   top: s1coords.top+window.pageYOffset,
//   //   behavior :'smooth'
//   // })
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//////////////////////////////////
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children); //direct children
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'red';

// //going upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = ' var(--gradient-secondary)';
// h1.closest('h1').style.background = ' var(--gradient-primary)';

// //going sideways :siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children); //all sibling and it self
// [...h1.parentElement.children].forEach(el=>{
//   if(el!==h1){
//     el.style.transform ='scale(0.5)'
//   }
// })

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScroll.addEventListener("click", (e) => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

const navLinks = document.querySelector(".nav__links");
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
const header = document.querySelector(".header");
const revealNav = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) return;
  nav.classList.add("sticky");
};
const navObserver = new IntersectionObserver(revealNav, {
  root: null,
  threshold: 0.1,
  rootMargin: "-90px",
});
navObserver.observe(header);

const images = document.querySelector(".features").querySelectorAll("img");
const revealImages = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    console.log(entry.target.src);
    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  }
};
const imageObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshold: 0.15,
  rootMargin: "100px",
});
images.forEach((img) => {
  imageObserver.observe(img);
});

const handelhover = (e, opacity) => {
  e.preventDefault();
  const link = e.target;
  if (link.classList.contains("nav__link")) {
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener("mouseover", (e) => handelhover(e, 0.5));
nav.addEventListener("mouseout", (e) => handelhover(e, 1));

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  if (clicked) {
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add(`operations__content--active`);
    console.log(clicked.dataset.tab);
  }
});
//0 100 200 300
//-100 0 100 200

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

let positions = {
  Shirts: 0,
  Baggy: 0
};

function showCategory(category) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".slider-container").forEach(sec => sec.classList.add("hidden"));
  
  document.getElementById(category).classList.remove("hidden");
  
  if (category === "Shirts") {
    document.querySelector(".tab:nth-child(1)").classList.add("active");
  } else {
    document.querySelector(".tab:nth-child(2)").classList.add("active");
  }
}

function moveSlide(category, direction) {
  const container = document.getElementById(category);
  const slider = container.querySelector(".slider");
  const cards = container.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20; // include margin
  const visibleCards = Math.floor(container.offsetWidth / cardWidth);

  const maxPosition = cards.length - visibleCards;

  positions[category] += direction;
  if (positions[category] < 0) positions[category] = 0;
  if (positions[category] > maxPosition) positions[category] = maxPosition;

  slider.style.transform = `translateX(-${positions[category] * cardWidth}px)`;
}


