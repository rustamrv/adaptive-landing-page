"use strict";

// --- Constants and Variables ---
var HERO_IMAGES = ["assets/images/first_screen.png", "assets/images/second_screen.png", "assets/images/third_screen.png"];
var HERO_INTERVAL_TIME = 5000;
var heroCurrentIndex = 0;
var heroInterval;
var PROJECTS_DATA = [{
  title: "ONE WORLD",
  highlight: "TRADE CENTER",
  description: "Increasing prosperity in our lives can be accomplished by having the right frame of mind.",
  image: "assets/images/joel-filipe-151697 1.png",
  overlayColor: "#5AA9E6",
  position: "left"
}, {
  title: "INTERNATIONAL",
  highlight: "COMMERCE CENTRE",
  description: "Successful businesses have many things in common, today we’ll look at the big ‘R’ of recognition.",
  image: "assets/images/photos-1284iH4Hjf4mhNgW 1.png",
  overlayColor: "#7E5AFF",
  position: "right"
}];
var NEWS_DATA = [{
  image: "assets/images/news1.jpg",
  title: "SEE THE UNMATCHED BEAUTY OF THE GREAT.",
  description: "Free directories: directories are perfect for customers that are searching for...",
  author: "ALJA BRUN",
  authorImage: "assets/images/author1.png",
  date: "20 Jan 2020"
}, {
  image: "assets/images/news2.jpg",
  title: "EFFECTIVE ADVERTISING POINTERS.",
  description: "Having a home based business is a wonderful asset to your life...",
  author: "DOMINIC FREEMAN",
  authorImage: "assets/images/author2.png",
  date: "13 Dec 2019"
}, {
  image: "assets/images/news3.jpg",
  title: "HYPNOTIZE YOURSELF INTO THE GHOST.",
  description: "There are many things that are important to catalog design...",
  author: "ALICE WARD",
  authorImage: "assets/images/author3.png",
  date: "30 Nov 2019"
}];
var newsIndex = 0;
var NEWS_CARDS = [];
var GALLERY_IMAGES = [{
  src: "assets/images/gallery_1.png",
  alt: "Gallery Image 1"
}, {
  src: "assets/images/gallery_2.png",
  alt: "Gallery Image 2"
}, {
  src: "assets/images/gallery_3.png",
  alt: "Gallery Image 3"
}, {
  src: "assets/images/gallery_4.png",
  alt: "Gallery Image 4"
}, {
  src: "assets/images/gallery_5.png",
  alt: "Gallery Image 5"
}];
var galleryMainImage = GALLERY_IMAGES[0];
var heroElement = document.querySelector("#hero");
var newsContainer = $(".news-slider");
var galleryContainer = document.querySelector(".gallery-grid");
var modalDiv = document.querySelector(".image-modal");
var modal = document.querySelector(".image-modal");
var nextBtn = document.querySelector(".next-btn");
var prevBtn = document.querySelector(".prev-btn");
var dots = document.querySelectorAll(".news-dots .dot");
var projectsContainer = document.querySelector(".projects-container");

function changeHeroBackground(index) {
  if (!heroElement) return;
  var dot = document.querySelectorAll(".dot");
  heroElement.style.backgroundImage = "url('".concat(HERO_IMAGES[index], "')");
  heroElement.style.backgroundSize = "cover";
  heroElement.style.backgroundPosition = "center";
  heroElement.style.backgroundRepeat = "no-repeat";
  dot.forEach(function (dot) {
    return dot.classList.remove("active");
  });
  var activeDot = document.querySelector(".dot[data-slide='".concat(index, "']"));
  if (activeDot) activeDot.classList.add("active");
}

function startHeroSlider() {
  heroInterval = setInterval(function () {
    heroCurrentIndex = (heroCurrentIndex + 1) % HERO_IMAGES.length;
    changeHeroBackground(heroCurrentIndex);
  }, HERO_INTERVAL_TIME);
}

function setupHeroDots() {
  document.querySelectorAll(".dot").forEach(function (dot) {
    dot.addEventListener("click", function () {
      clearInterval(heroInterval);
      heroCurrentIndex = Number(this.dataset.slide);
      changeHeroBackground(heroCurrentIndex);
      startHeroSlider();
    });
  });
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
}

function displayNews() {
  var _loop = function _loop(i) {
    var group = NEWS_DATA.slice(i, i + 3);
    var groupHTML = $('<div class="news-group"></div>');
    group.forEach(function (news) {
      var newsHTML = "\n        <div class=\"news-card\">\n            <div class=\"news-image\">\n                <img src=\"".concat(news.image, "\" alt=\"").concat(news.title, "\">\n            </div>\n            <div class=\"news-content\">\n                <h3>").concat(news.title, "</h3>\n                <p>").concat(news.description, "</p>\n                <div class=\"news-author\">\n                    <div class=\"author-photo\" style=\"background-image: url('").concat(news.authorImage, "');\"></div>\n                    <div class=\"author-info\">\n                        <span class=\"author-name\">").concat(news.author, "</span>\n                        <span class=\"author-date\">").concat(news.date, "</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
      groupHTML.append(newsHTML);
    });
    newsContainer.append(groupHTML);
    NEWS_CARDS.push(groupHTML);
  };

  for (var i = 0; i < NEWS_DATA.length; i += 3) {
    _loop(i);
  }

  newsContainer.children().hide();
  $(newsContainer.children()[newsIndex]).css("display", "flex");
  $(".news-dots .dot").removeClass("active");
  $(".news-dots .dot[data-news=".concat(newsIndex, "]")).addClass("active");
}

function setupNewsSliderControls() {
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      newsIndex = (newsIndex + 1) % NEWS_CARDS.length;
      NEWS_DATA = shuffleArray(NEWS_DATA);
      displayNews();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      newsIndex = (newsIndex - 1 + NEWS_CARDS.length) % NEWS_CARDS.length;
      NEWS_DATA = shuffleArray(NEWS_DATA);
      displayNews();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      newsIndex = parseInt(dot.dataset.news);
      NEWS_DATA = shuffleArray(NEWS_DATA);
      displayNews();
    });
  });
}

function initMap() {
  var map = L.map("map").setView([46.97103383118516, 31.96630788882693], 16);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
  }).addTo(map);
  L.marker([46.97103383118516, 31.96630788882693]).addTo(map).bindPopup("I’m here!");
}

function renderGallery() {
  galleryContainer.innerHTML = "";
  var galleryHTML = "\n            <div class=\"gallery-main\">\n                <img src=\"".concat(galleryMainImage.src, "\" alt=\"").concat(galleryMainImage.alt, "\" class=\"main-image\">\n                <div class=\"zoom-icon\" data-src=\"").concat(galleryMainImage.src, "\">\n                    <button class=\"btn\">+</button>\n                </div>\n            </div>\n            <div class=\"gallery-thumbnails\">\n                ").concat(GALLERY_IMAGES.filter(function (img) {
    return img.src !== galleryMainImage.src;
  }).map(function (img) {
    return "<img src=\"".concat(img.src, "\" alt=\"").concat(img.alt, "\" class=\"thumbnail\">");
  }).join(""), "\n            </div>\n        ");
  galleryContainer.innerHTML = galleryHTML;
}

function setupGallery() {
  galleryContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("thumbnail")) {
      galleryMainImage = GALLERY_IMAGES.find(function (img) {
        return img.src === event.target.getAttribute("src");
      });
      renderGallery();
    }
  });
  galleryContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("zoom-icon") || event.target.closest(".zoom-icon")) {
      var zoomIcon = event.target.classList.contains("zoom-icon") ? event.target : event.target.closest(".zoom-icon");
      document.getElementById("fullImage").setAttribute("src", zoomIcon.getAttribute("data-src"));
      modal.style.display = "flex";
    }
  });
}

function setupModal() {
  modal.style.display = "none";
  document.querySelector(".close-modal").addEventListener("click", function () {
    modal.style.display = "none";
  });
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      modal.style.display = "none";
    }
  });
}

function displayProjects() {
  if (!projectsContainer) return;
  PROJECTS_DATA.forEach(function (_ref2) {
    var title = _ref2.title,
        highlight = _ref2.highlight,
        description = _ref2.description,
        image = _ref2.image,
        overlayColor = _ref2.overlayColor,
        position = _ref2.position;
    var projectElement = document.createElement("div");
    projectElement.classList.add("project-item", position);
    projectElement.style.opacity = "0";
    projectElement.style.transform = "translateY(50px)";
    projectElement.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    projectElement.innerHTML = "\n            ".concat(position === "left" ? "\n                <div class=\"image-container\">\n                    <div class=\"overlay\" style=\"background: ".concat(overlayColor, ";\"></div>\n                    <img src=\"").concat(image, "\" alt=\"").concat(highlight, "\">\n                </div>\n                <div class=\"project-info\">\n                    <h3>").concat(title, " <span>").concat(highlight, "</span></h3>\n                    <p>").concat(description, "</p>\n                    <a href=\"#\" class=\"btn\">MORE DETAILS</a>\n                </div>\n            ") : "\n                <div class=\"project-info\">\n                    <h3>".concat(title, " <span>").concat(highlight, "</span></h3>\n                    <p>").concat(description, "</p>\n                    <a href=\"#\" class=\"btn\">MORE DETAILS</a>\n                </div>\n                <div class=\"image-container\">\n                    <div class=\"overlay\" style=\"background: ").concat(overlayColor, ";\"></div>\n                    <img src=\"").concat(image, "\" alt=\"").concat(highlight, "\">\n                </div>\n            "), "\n        ");
    projectsContainer.appendChild(projectElement);
    setTimeout(function () {
      projectElement.style.opacity = "1";
      projectElement.style.transform = "translateY(0)";
    }, 100);
  });
}

function handleScroll() {
  var sectionTop = projectsContainer.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.75) {
    document.querySelectorAll(".project-item").forEach(function (item, index) {
      setTimeout(function () {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 200);
    });
    window.removeEventListener("scroll", handleScroll);
  }
}

-document.addEventListener("DOMContentLoaded", function () {
  initMap();
  changeHeroBackground(heroCurrentIndex);
  startHeroSlider();
  setupHeroDots();
  NEWS_DATA = shuffleArray(NEWS_DATA);
  displayNews();
  setupNewsSliderControls();
  renderGallery();
  setupGallery();
  setupModal();
  displayProjects();
  window.addEventListener("scroll", handleScroll);
});