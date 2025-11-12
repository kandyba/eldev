import "./index.pug";
import "./index.scss";

import { throttle, validateEmail } from "./scripts/helpers";

const body = document.body;
const hamburger = document.querySelector(".nav__hamburger");
const mobNav = document.querySelector(".nav__links");
const btnNav = document.querySelector(".nav__action");
const links = document.querySelectorAll(".link_to");
const sidebarDots = document.querySelectorAll(".sidebar__dot");
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const input = document.querySelector(".form__input input");
const formInput = document.querySelector(".form__input");
const formButton = document.querySelector(".form__btn");
const formMessage = document.querySelector(".form__input-message");

let isMobile;
let currentSections = "main";
const sectionPos = {};
const sectionName = {};

document.addEventListener("DOMContentLoaded", function (event) {
  isMobile = window.innerWidth < 848;

  document.addEventListener("scroll", scrollListener);
  window.addEventListener("resize", checkResize);
  input.addEventListener("input", inputListener);
  formButton.addEventListener("click", formButtonListener);
  const darkBtnSections = ["main", "reviews"];

  try {
    links.forEach(moveTo);
    sidebarDots.forEach(moveTo);
  } catch (error) {
    console.log(error);
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobNav.classList.toggle("active");
    body.classList.toggle("overflow");
  });

  try {
    setTimeout(() => {
      sections.forEach((section) => {
        sectionPos[section.id] = section.offsetTop;
        sectionName[section.id] = section.id;
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }

  function scrollListener() {
    throttle(() => {
      const scrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;

      scrollPos > 50
        ? header.classList.add("active")
        : header.classList.remove("active");

      for (let id in sectionPos) {
        if (sectionPos[id] <= scrollPos + 50) {
          currentSections = sectionName[id];
        }
      }
      console.log(currentSections);
      if (currentSections) {
        links.forEach((l) => {
          l.classList.remove("active");
          if (currentSections === l.dataset.id) {
            l.classList.add("active");
          }
        });
        sidebarDots.forEach((d) => {
          d.classList.remove("active");
          if (currentSections === d.dataset.id) {
            d.classList.add("active");
          }
        });
        darkBtnSections.includes(currentSections)
          ? btnNav.classList.remove("light")
          : btnNav.classList.add("light");
      }
    });
  }
  function moveTo(el) {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const id = el.dataset.id;
      const section = Array.from(sections).find((s) => s.id == id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
      if (isMobile) {
        hamburger.classList.remove("active");
        mobNav.classList.remove("active");
        body.classList.remove("overflow");
      }
    });
  }
  function inputListener(e) {
    if (e.target.value.trim() == "") {
      formInput.classList.remove("error");
      formInput.classList.remove("success");
      formInput.classList.remove("active");
      formButton.disabled = true;
      return;
    }

    formInput.classList.add("active");

    if (validateEmail(e.target.value)) {
      formInput.classList.remove("error");
      formInput.classList.add("success");
      formButton.disabled = false;
    } else {
      formInput.classList.remove("success");
      formInput.classList.add("error");
      formButton.disabled = true;
    }
  }
  function formButtonListener(e) {
    e.preventDefault();
    if (input.value) {
      // send data

      //show message & clear input
      formMessage.style.opacity = 1;
      formInput.classList.remove("success");
      formInput.classList.remove("error");
      input.value = "";
      formButton.disabled = true;

      setTimeout(() => {
        formMessage.style.opacity = 0;
      }, 3000);
    }
  }
  function checkResize(e) {
    isMobile = window.innerWidth < 848;

    sections.forEach((section) => {
      sectionPos[section.id] = section.offsetTop;
      sectionName[section.id] = section.id;
    });
  }
});
