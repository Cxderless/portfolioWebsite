    (function ($) {
    "use strict"; 

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };

    navbarCollapse();
    
    $(window).scroll(navbarCollapse);

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio === 1) {
                let barPercent = entry.target.getAttribute("data-bar-percent");
                let percentPerMs = Math.floor(1200 / barPercent / 1.25);
                entry.target.querySelector(".skills-icon").insertAdjacentHTML("beforeend", '<div class="skills-percent"></div>');
                const percentEl = entry.target.querySelector(".skills-percent");
                let percent = 0;
                let percentInterval = setInterval(() => {
                    percent++;
                    percentEl.textContent = `${percent}%`;
                    if (percent > 50) {
                        percentEl.classList.add("text-left");
                    }
                    if (percent == barPercent) {
                        clearInterval(percentInterval);
                    }
                }, percentPerMs)
                entry.target.style.opacity = "1";
                entry.target.querySelector(".skills-fill").style.width = `${barPercent}%`;
                entry.target.querySelector(".skills-icon").style.left = `${barPercent}%`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0%',
        threshold: 1
    });
    
    document.querySelectorAll("[data-bar-percent]").forEach(bar => {
        observer.observe(bar);
    });
    
    document.querySelectorAll("[data-tooltip-text").forEach(tooltip => {
        let tooltipHtml = `<div class="tooltip">${tooltip.getAttribute("data-tooltip-text")}</div>`;
        tooltip.insertAdjacentHTML("beforeend", tooltipHtml);
    })
    
})(jQuery); 
