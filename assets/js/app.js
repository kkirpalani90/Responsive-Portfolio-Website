/* --------------- Grab elements from DOM --------------- */

const header = document.querySelector("header");

const firstSkill = document.querySelector(".skill:first-child");
const skCounter = document.querySelectorAll(".counter span");
const progressBar = document.querySelectorAll(".skills svg circle");

const mlSection = document.querySelector(".milestones");
const mlCount = document.querySelectorAll(".number span");

const prtSection = document.querySelector(".portfolio");
const zoomIcons = document.querySelectorAll(".zoom-icon");
const modalOverlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;
  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- Skills Progress Bar Animation --------------- */

function hasReached(e) {
  let topPosition = e.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + e.offsetHeight) return true;
  return false;
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(firstSkill)) return;

  skillsPlayed = true;

  skCounter.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);
    progressBar[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progressBar.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

/* --------------- Services Counter Animation --------------- */

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(mlSection)) return;
  mlPlayed = true;
  mlCount.forEach((e) => {
    let target = +e.dataset.target;

    setTimeout(() => {
      updateCount(e, target);
    }, 400);
  });
}

/* --------------- Portfolio Filter Animation --------------- */

var mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Modal Pop Up Animation --------------- */

let currentIndex = 0;

zoomIcons.forEach((e, i) =>
  e.addEventListener("click", () => {
    prtSection.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  })
);

modalOverlay.addEventListener("click", () => {
  prtSection.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

/* --------------- Modal Pop Up Animation --------------- */

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);
  let currSectionID = passedSections.at(-1).id;
  links.forEach((i) => i.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

/* --------------- Change Page Theme --------------- */

/* --------------- Open & Close Navbar Menu --------------- */
