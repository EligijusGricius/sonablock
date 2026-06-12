
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


    /* Story media swiper */

    document.querySelectorAll('.story-media-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                navigation: {
                    nextEl: holder.parentElement.querySelector('.swiper-button-next'),
                    prevEl: holder.parentElement.querySelector('.swiper-button-prev'),
                },
            });
        }
    });

    /* Media swiper */

    document.querySelectorAll('.media-swiper .swiper').forEach(swiperEl => {
        const slideCount = swiperEl.querySelectorAll('.swiper-slide').length;

        const swiper = new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true,
            },
            on: {
                init: function () {
                    updateNav(this);
                },
                slideChange: function () {
                    updateNav(this);
                },
            },
        });

        function updateNav(s) {
            swiperEl.querySelectorAll('.swiper-button-prev').forEach(btn => {
                btn.classList.toggle('disabled', s.isBeginning);
                btn.disabled = s.isBeginning;
            });
            swiperEl.querySelectorAll('.swiper-button-next').forEach(btn => {
                btn.classList.toggle('disabled', s.isEnd);
                btn.disabled = s.isEnd;
            });
        }

        swiperEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.swiper-button-prev, .swiper-button-next');
            if (!btn) return;

            if (btn.classList.contains('swiper-button-next')) {
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        });
    });

    /* Stat grid swiper */

    document.querySelectorAll('.stat-grid-swiper').forEach(swiperEl => {
        new Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: false,
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'),
                clickable: true,
            },
        });
    });

    /* Team members swiper */

    document.querySelectorAll('.team-members-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {

            const swiper = new Swiper(swiperContainer, {
                slidesPerView: 4.5,
                spaceBetween: 0,
                loop: false,
                navigation: {
                    nextEl: holder.parentElement.querySelector('.swiper-button-next'),
                    prevEl: holder.parentElement.querySelector('.swiper-button-prev'),
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
                        spaceBetween: 0,
                    },

                    1400: {
                        slidesPerView: 4.5,
                        spaceBetween: 0,
                    },

                    1600: {
                        slidesPerView: 5.5,
                        spaceBetween: 0,
                    },
                }
            });
        }
    });

    /* Related posts swiper */

    document.querySelectorAll('.related-posts').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {

            const swiper = new Swiper(swiperContainer, {
                slidesPerView: 3,
                spaceBetween: 24,
                loop: false,
                navigation: {
                    nextEl: holder.parentElement.querySelector('.swiper-button-next'),
                    prevEl: holder.parentElement.querySelector('.swiper-button-prev'),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                    },

                    576: {
                        slidesPerView: 1.5,
                    },

                    769: {
                        slidesPerView: 2.2,
                    },

                    992: {
                        slidesPerView: 2,
                    },

                    1200: {
                        slidesPerView: 3,
                    },

                }
            });
        }
    });

    /* Responsive tables for blog posts */

    function initResponsiveTables() {
        const postTables = document.querySelectorAll('.single-blog .post table');
        if (!postTables.length) return;

        postTables.forEach(function (table) {
            if (table.parentElement.classList.contains('responsive-table')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'responsive-table';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    initResponsiveTables();

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

    /* Single product gallery */

    if (document.querySelector('.single-product-page .product-images')) {
        const thumbnailSwiper = new Swiper('.single-product-page .swiper-container-thumbs', {
            slidesPerView: 6,
            spaceBetween: 12,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: false,
            slideToClickedSlide: true,
    
            breakpoints: {
                0: {
                    slidesPerView: 5.2,
                    spaceBetween: 12,
                },

                576: {
                    slidesPerView: 6.2,
                    spaceBetween: 12,
                },

                768: {
                    slidesPerView: 7.2,
                    spaceBetween: 12,
                },

                992: {
                    slidesPerView: 5.5,
                    spaceBetween: 12,
                },

                1200: {
                    slidesPerView: 6.5,
                    spaceBetween: 12,
                },
            }
        });
    
        const mainSwiper = new Swiper('.product-images .swiper-container-main', {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.single-product-page .swiper-button-next',
                prevEl: '.single-product-page .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbnailSwiper
            }
        });
    
    }
    
    /* /Single product gallery */

    /* Quantity Selector Logic */

    const quantityContainers = document.querySelectorAll('.quantity');

    quantityContainers.forEach(container => {
        const input = container.querySelector('.input-text.qty');
        const plusBtn = container.querySelector('.plus');
        const minusBtn = container.querySelector('.minus');

        if (input && plusBtn && minusBtn) {
            // Handle plus button click
            plusBtn.addEventListener('click', () => {
                input.stepUp();
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });

            // Handle minus button click
            minusBtn.addEventListener('click', () => {
                const min = parseFloat(input.getAttribute('min')) || 1;
                const currentValue = parseFloat(input.value) || 0;

                // Prevent decreasing below the minimum value
                if (currentValue > min) {
                    input.stepDown();
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            // Validation: reset to minimum if user types an invalid number manually
            input.addEventListener('blur', function() {
                const min = parseFloat(this.getAttribute('min')) || 1;
                if (parseFloat(this.value) < min || this.value === "") {
                    this.value = min;
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    });

    /* Show more toggle for product description */

    function initShowMore() {
        const showMoreButtons = document.querySelectorAll('.single-product-page .summary .description .show-more');
        
        if (!showMoreButtons.length) return;

        showMoreButtons.forEach(function (showMoreButton) {
            const description = showMoreButton.closest('.description');
            const wrapper = description.querySelector('.description__wrapper');

            if (wrapper.scrollHeight <= wrapper.clientHeight) {
                showMoreButton.style.display = 'none';
                return;
            }

            showMoreButton.addEventListener('click', function () {
                const isExpanded = description.classList.toggle('is-expanded');
                showMoreButton.textContent = isExpanded
                    ? showMoreButton.dataset.textLess
                    : showMoreButton.dataset.textMore;
            });
        });
    }

    initShowMore();

    /* SINGLE Product highlights features swiper */

    document.querySelectorAll('.single-product-page .product-highlights .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            let userScrolling = null;

            const swiper = new Swiper(swiperContainer, {
                slidesPerView: 'auto',
                spaceBetween: 48,
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
                    0:    { slidesPerView: 'auto', spaceBetween: 24 },
                    769:  { slidesPerView: 'auto', spaceBetween: 24 },
                    1400: { slidesPerView: 'auto', spaceBetween: 48 },
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

    /* Custom size toggle in product form */

    function initCustomSize() {
        const lengthSelect = document.querySelector('#fiber-length-options');
        const customSizeRow = document.querySelector('.form-row--custom-size-row');

        if (!lengthSelect || !customSizeRow) return;

        lengthSelect.addEventListener('change', function () {
            customSizeRow.classList.toggle('show', lengthSelect.value === 'Custom size');
        });
    }

    initCustomSize();

    /* Product tabs mobile toggle */

    function initProductTabsMobileToggle() {
        const mobileToggleBtns = document.querySelectorAll('.single-product-page .product-tabs .tab-pane .mobile-toggle-btn');
        if (!mobileToggleBtns.length) return;

        mobileToggleBtns.forEach(function (mobileToggleBtn) {
            mobileToggleBtn.addEventListener('click', function () {
                mobileToggleBtn.parentElement.classList.toggle('show-mobile');
            });
        });
    }

    initProductTabsMobileToggle();

    /* Summary modal accordion toggle */

    function initSummaryAccordion() {
        const summaryToggles = document.querySelectorAll('.summary-item__toggle');
        if (!summaryToggles.length) return;

        summaryToggles.forEach(function (summaryToggle) {
            summaryToggle.addEventListener('click', function () {
                summaryToggle.closest('.summary-item').classList.toggle('is-open');
            });
        });
    }

    initSummaryAccordion();

});
