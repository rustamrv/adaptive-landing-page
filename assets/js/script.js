// --- Constants and Variables ---
const HERO_IMAGES = [
    "assets/images/first_screen.png",
    "assets/images/second_screen.png",
    "assets/images/third_screen.png",
];
const HERO_INTERVAL_TIME = 5000;
let heroCurrentIndex = 0;
let heroInterval;

const PROJECTS_DATA = [{
        title: "ONE WORLD",
        highlight: "TRADE CENTER",
        description: "Increasing prosperity in our lives can be accomplished by having the right frame of mind.",
        image: "assets/images/joel-filipe-151697 1.png",
        overlayColor: "#5AA9E6",
        position: "left",
    },
    {
        title: "INTERNATIONAL",
        highlight: "COMMERCE CENTRE",
        description: "Successful businesses have many things in common, today we’ll look at the big ‘R’ of recognition.",
        image: "assets/images/photos-1284iH4Hjf4mhNgW 1.png",
        overlayColor: "#7E5AFF",
        position: "right",
    },
];

let NEWS_DATA = [{
        image: "assets/images/news1.jpg",
        title: "SEE THE UNMATCHED BEAUTY OF THE GREAT.",
        description: "Free directories: directories are perfect for customers that are searching for...",
        author: "ALJA BRUN",
        authorImage: "assets/images/author1.png",
        date: "20 Jan 2020",
    },
    {
        image: "assets/images/news2.jpg",
        title: "EFFECTIVE ADVERTISING POINTERS.",
        description: "Having a home based business is a wonderful asset to your life...",
        author: "DOMINIC FREEMAN",
        authorImage: "assets/images/author2.png",
        date: "13 Dec 2019",
    },
    {
        image: "assets/images/news3.jpg",
        title: "HYPNOTIZE YOURSELF INTO THE GHOST.",
        description: "There are many things that are important to catalog design...",
        author: "ALICE WARD",
        authorImage: "assets/images/author3.png",
        date: "30 Nov 2019",
    },
];
let newsIndex = 0;
const NEWS_CARDS = [];

const GALLERY_IMAGES = [{
        src: "assets/images/gallery_1.png",
        alt: "Gallery Image 1"
    },
    {
        src: "assets/images/gallery_2.png",
        alt: "Gallery Image 2"
    },
    {
        src: "assets/images/gallery_3.png",
        alt: "Gallery Image 3"
    },
    {
        src: "assets/images/gallery_4.png",
        alt: "Gallery Image 4"
    },
    {
        src: "assets/images/gallery_5.png",
        alt: "Gallery Image 5"
    },
];
let galleryMainImage = GALLERY_IMAGES[0];

const heroElement = document.querySelector("#hero");
const newsContainer = $(".news-slider");
const galleryContainer = document.querySelector(".gallery-grid");
const modalDiv = document.querySelector(".image-modal");
const modal = document.querySelector(".image-modal");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const dots = document.querySelectorAll(".news-dots .dot");
const projectsContainer = document.querySelector(".projects-container");


function changeHeroBackground(index) {
    if (!heroElement) return;
    const dot = document
        .querySelectorAll(".dot");

    heroElement.style.backgroundImage = `url('${HERO_IMAGES[index]}')`;
    heroElement.style.backgroundSize = "cover";
    heroElement.style.backgroundPosition = "center";
    heroElement.style.backgroundRepeat = "no-repeat";

    dot.forEach((dot) => dot.classList.remove("active"));
    const activeDot = document.querySelector(`.dot[data-slide='${index}']`);
    if (activeDot) activeDot.classList.add("active");
}


function startHeroSlider() {
    heroInterval = setInterval(() => {
        heroCurrentIndex = (heroCurrentIndex + 1) % HERO_IMAGES.length;
        changeHeroBackground(heroCurrentIndex);
    }, HERO_INTERVAL_TIME);
}

function setupHeroDots() {
    document.querySelectorAll(".dot").forEach((dot) => {
        dot.addEventListener("click", function() {
            clearInterval(heroInterval);
            heroCurrentIndex = Number(this.dataset.slide);            
            changeHeroBackground(heroCurrentIndex);
            startHeroSlider();
        });
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayNews() {
    for (let i = 0; i < NEWS_DATA.length; i += 3) {
        const group = NEWS_DATA.slice(i, i + 3);
        const groupHTML = $('<div class="news-group"></div>');        
        group.forEach((news) => {
            let newsHTML = `
        <div class="news-card">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <div class="news-author">
                    <div class="author-photo" style="background-image: url('${news.authorImage}');"></div>
                    <div class="author-info">
                        <span class="author-name">${news.author}</span>
                        <span class="author-date">${news.date}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
            groupHTML.append(newsHTML);
        });
        newsContainer.append(groupHTML);
        NEWS_CARDS.push(groupHTML);
    }
    newsContainer.children().hide();
    $(newsContainer.children()[newsIndex]).css("display", "flex");
    $(".news-dots .dot").removeClass("active");
    $(`.news-dots .dot[data-news=${newsIndex}]`).addClass("active");
}



function setupNewsSliderControls() {

    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            newsIndex = (newsIndex + 1) % NEWS_CARDS.length;
            NEWS_DATA = shuffleArray(NEWS_DATA);
            displayNews();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function() {
            newsIndex = (newsIndex - 1 + NEWS_CARDS.length) % NEWS_CARDS.length;
            NEWS_DATA = shuffleArray(NEWS_DATA);
            displayNews();
        });
    }

    dots.forEach(function(dot) {
        dot.addEventListener("click", function() {
            newsIndex = parseInt(dot.dataset.news);
            NEWS_DATA = shuffleArray(NEWS_DATA);
        
            displayNews();
        });
    });
}


function initMap() {
    const map = L.map("map").setView([46.97103383118516, 31.96630788882693], 16);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);
    L.marker([46.97103383118516, 31.96630788882693])
        .addTo(map)
        .bindPopup("I’m here!");
}

function renderGallery() {
    galleryContainer.innerHTML = "";

    let galleryHTML = `
            <div class="gallery-main">
                <img src="${galleryMainImage.src}" alt="${galleryMainImage.alt}" class="main-image">
                <div class="zoom-icon" data-src="${galleryMainImage.src}">
                    <button class="btn">+</button>
                </div>
            </div>
            <div class="gallery-thumbnails">
                ${GALLERY_IMAGES
                    .filter(img => img.src !== galleryMainImage.src)
                    .map(img => `<img src="${img.src}" alt="${img.alt}" class="thumbnail">`)
                    .join("")}
            </div>
        `;
    galleryContainer.innerHTML = galleryHTML;
}

function setupGallery() { 
    galleryContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("thumbnail")) {
            galleryMainImage = GALLERY_IMAGES.find(
                (img) => img.src === event.target.getAttribute("src")
            );
            renderGallery();
        }
    });

    galleryContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("zoom-icon") || event.target.closest(".zoom-icon")) {
            const zoomIcon = event.target.classList.contains("zoom-icon") ? event.target : event.target.closest(".zoom-icon");
            document.getElementById("fullImage").setAttribute("src", zoomIcon.getAttribute("data-src"));
            modal.style.display = "flex"; 
        }
    });

}

function setupModal() {

    modal.style.display = "none";

    document.querySelector(".close-modal").addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function(e) {
        if (e.target === this) {
            modal.style.display = "none";
        }
    });
}

function displayProjects() {
    if (!projectsContainer) return;

    PROJECTS_DATA.forEach(({
        title,
        highlight,
        description,
        image,
        overlayColor,
        position
    }) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-item", position);
        projectElement.style.opacity = "0";
        projectElement.style.transform = "translateY(50px)";
        projectElement.style.transition = "opacity 1s ease-out, transform 1s ease-out";

        projectElement.innerHTML = `
            ${position === "left" ? `
                <div class="image-container">
                    <div class="overlay" style="background: ${overlayColor};"></div>
                    <img src="${image}" alt="${highlight}">
                </div>
                <div class="project-info">
                    <h3>${title} <span>${highlight}</span></h3>
                    <p>${description}</p>
                    <a href="#" class="btn">MORE DETAILS</a>
                </div>
            ` : `
                <div class="project-info">
                    <h3>${title} <span>${highlight}</span></h3>
                    <p>${description}</p>
                    <a href="#" class="btn">MORE DETAILS</a>
                </div>
                <div class="image-container">
                    <div class="overlay" style="background: ${overlayColor};"></div>
                    <img src="${image}" alt="${highlight}">
                </div>
            `}
        `;

        projectsContainer.appendChild(projectElement);

        setTimeout(() => {
            projectElement.style.opacity = "1";
            projectElement.style.transform = "translateY(0)";
        }, 100);
    });
}

function handleScroll() {
    const sectionTop = projectsContainer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
        document.querySelectorAll(".project-item").forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, index * 200);
        });
        window.removeEventListener("scroll", handleScroll);
    }
} -
document.addEventListener("DOMContentLoaded", () => {
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