
if($('select').length) {
    $('select').selectpicker();
}

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

document.addEventListener("DOMContentLoaded", function () {

    /* Header on scroll */

    const masthead = document.getElementById("masthead");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            masthead.classList.add("on-scroll");
        } else {
            masthead.classList.remove("on-scroll");
        }
    });

    /* Mobile toggle btn */

    document.querySelector('#masthead .menu-toggle').addEventListener('click', function (e) {
        document.documentElement.classList.toggle('mobile-nav-open');
        this.classList.toggle('opened');

        e.preventDefault();
    });


    /* Product highlights video play on hover */
    
    const cards = document.querySelectorAll('.product-highlights__card');

    if (cards.length) {
        cards.forEach(card => {
            const video = card.querySelector('.product-highlights__card-video');

            if (!video) return;

            card.addEventListener('mouseenter', () => {
                video.currentTime = 0;
                video.play();
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        });
    }

    /* Product highlights features swiper */

    document.querySelectorAll('.product-highlights__features .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            let userScrolling = null;

            const swiper = new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 24,
                loop: true,
                loopAdditionalSlides: 4,
                speed: 10000,
                allowTouchMove: true,
                
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },

                freeMode: {
                    enabled: true,
                    momentum: false,
                },

                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 1,
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                    },
                    576: {
                        slidesPerView: 1.5,
                    },
                    769: {
                        slidesPerView: 2.8,
                    },
                    992: {
                        slidesPerView: 3.2,
                    },
                    1200: {
                        slidesPerView: 3.5,
                        spaceBetween: 24,
                    },
                    1400: {
                        slidesPerView: 4.5,
                        spaceBetween: 24,
                    },
                }
            });

            // Hover pause
            swiperContainer.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });

            swiperContainer.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });

            // Touchpad/mousewheel scroll — pause autoplay temporarily
            swiperContainer.addEventListener('wheel', () => {
                swiper.autoplay.stop();
                clearTimeout(userScrolling);
                userScrolling = setTimeout(() => {
                    swiper.autoplay.start();
                }, 2000);
            });
        }
    });

    /* Video preview play button */

    const videoPreview = document.querySelector('.video-preview');

    if (videoPreview) {
        const video = videoPreview.querySelector('video');
        const playBtn = videoPreview.querySelector('.video-preview__play');

        if (video && playBtn) {
            const resetVideo = () => {
                video.pause();
                video.currentTime = 0;
                videoPreview.classList.remove('video-preview--playing');
            };

            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    const playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                videoPreview.classList.add('video-preview--playing');
                            })
                            .catch(() => {});
                    }
                } else {
                    video.pause();
                    videoPreview.classList.remove('video-preview--playing');
                }
            });

            video.addEventListener('ended', () => {
                resetVideo();
            });

            window.addEventListener('scroll', () => {
                if (!video.paused) {
                    resetVideo();
                }
            });
        }
    }

    /* Testimonials reviews functionality */

    const reviews = document.querySelectorAll('.testimonials__review');
    const featured = document.querySelector('.testimonials__featured');

    if (reviews.length && featured) {
        const featuredImg = featured.querySelector('.testimonials__featured-image img');
        const featuredName = featured.querySelector('.testimonials__featured-name');
        const featuredRole = featured.querySelector('.testimonials__featured-role');
        const featuredTitle = featured.querySelector('.testimonials__featured-title');

        reviews.forEach(review => {
            review.addEventListener('click', () => {
                reviews.forEach(r => r.classList.remove('testimonials__review--active'));
                review.classList.add('testimonials__review--active');

                featuredImg.src = review.dataset.image;
                featuredName.textContent = review.dataset.name;
                featuredRole.textContent = review.dataset.role;
                featuredTitle.textContent = review.querySelector('.testimonials__review-title').textContent;
            });
        });
    }

    /* Key benefits swiper */

    document.querySelectorAll('.key-benefits .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 1.1,
                spaceBetween: 16,
                loop: false,
                freeMode: true,
                navigation: {
                    nextEl: holder.parentElement.querySelector('.swiper-button-next'),
                    prevEl: holder.parentElement.querySelector('.swiper-button-prev'),
                },
                
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 1,
                    thresholdDelta: 5,
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                    },
                    640: {
                        slidesPerView: 2.1,
                    },
                    992: {
                        slidesPerView: 2.8,
                    },
                    1200: {
                        slidesPerView: 3.1,
                        spaceBetween: 24,
                    },
                    1300: {
                        slidesPerView: 3.5,
                    },
                }
            });
        }
    });

    /* Feel the difference wavy animation */

    const audioToggle = document.querySelector('.feel-difference__audio-input');
    const audioSection = document.querySelector('.feel-difference__audio');

    if (audioToggle && audioSection) {
        audioToggle.addEventListener('change', () => {
            audioSection.classList.toggle('feel-difference__audio--active', audioToggle.checked);
        });
    }

    /* Contacts team section tabs */

    var team = document.querySelector('.team');

    if (team) {
        var toggles = team.querySelectorAll('.team__tab-toggle');
        var tabItems = team.querySelectorAll('.team__tab');
        var panels = team.querySelectorAll('.team__panel');

        // Sync panel with active tab on load
        var activeTab = team.querySelector('.team__tab--active .team__tab-toggle');
        if (activeTab) {
            var activePanel = team.querySelector('[data-panel="' + activeTab.getAttribute('data-tab') + '"]');
            if (activePanel) activePanel.classList.add('team__panel--active');
        }

        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
            var tab = this.closest('.team__tab');
            var target = this.getAttribute('data-tab');

            tabItems.forEach(function (t) { t.classList.remove('team__tab--active'); });
            panels.forEach(function (p) { p.classList.remove('team__panel--active'); });

            tab.classList.add('team__tab--active');
            team.querySelector('[data-panel="' + target + '"]').classList.add('team__panel--active');
            });
        });
    }

    /* Contacts team swiper */

    var teamSwipers = [];

    document.querySelectorAll('.team__tab').forEach(function (tab) {
    var swiperEl = tab.querySelector('.swiper');

    if (swiperEl) {
        var pagination = document.createElement('div');
        pagination.className = 'swiper-pagination';
        swiperEl.appendChild(pagination);

        teamSwipers.push(new Swiper(swiperEl, {
        slidesPerView: 1.3,
        spaceBetween: 8,
        pagination: {
            el: pagination,
            clickable: true
        },
        breakpoints: {
            0: {
            slidesPerView: 1.3,
            spaceBetween: 12
            },
            768: {
            slidesPerView: 2.5,
            spaceBetween: 12
            }
        }
        }));
    }
    });

    /* Footer menu toggle on mobile */

    const footerTitles = document.querySelectorAll('#main-footer .menu-col .widget-title');

    if (footerTitles.length) {
        footerTitles.forEach(title => {
            const menu = title.nextElementSibling;

            if (!menu) return;

            title.addEventListener('click', () => {
                title.classList.toggle('widget-title--active');
                menu.classList.toggle('menu--open');
            });
        });
    }

});
