
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
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 24,
                loop: false,
                pagination: false,
                navigation: false,
                freeMode: true,
                
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 1,
                    thresholdDelta: 5,
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
