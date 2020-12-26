"use strict"
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
function scroll(page, duration) {
    let target = document.querySelector(page);
    let startPosition = window.pageYOffset || window.scrollY;
    let distance = target.getBoundingClientRect().top;
    distance += 5;
    let startTime = null;
    function anim(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(anim);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(anim);
};
function scrollButtons() {
    let home = document.querySelectorAll('.home__link, .footer__btn');
    let service = document.querySelectorAll('.service__link');
    let gallery = document.querySelectorAll('.gallery__link');
    let channel = document.querySelectorAll('.channel__link, .header__btn_video');
    let blog = document.querySelectorAll('.blog__link');
    let contact = document.querySelectorAll('.contact__link');
    let headerBtn = document.querySelector('.header__btn_about');
    headerBtn.addEventListener('click', function () {
        scroll('.services__title', 500);
    })
    function scrollToLink(links, target, duration = 500) {
        for (let link of links) {
            link.addEventListener('click', function () {
                event.preventDefault;
                scroll(target, duration)
            })
        }
    }
    scrollToLink(home, '.header');
    scrollToLink(service, '.services');
    scrollToLink(gallery, '.gallery');
    scrollToLink(channel, '.channel');
    scrollToLink(blog, '.blog');
    scrollToLink(contact, '.contacts');
}
scrollButtons();
function pickCategory(button, elems) {
    let buttons = document.querySelectorAll(button);
    let items = document.querySelectorAll(elems);
    function removeClass(elems, clas) {
        elems.forEach(function (elem) {
            elem.classList.remove(clas);
        })
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            removeClass(buttons, 'active');
            removeClass(items, 'active');
            items[i].classList.add('active');
            buttons[i].classList.add('active');
        })
    }
}
pickCategory('.services__button', '.services__item');
pickCategory('.blog__btn', '.blog__items');