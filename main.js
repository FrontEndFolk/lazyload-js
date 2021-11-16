"use strict";

let lazyImages = document.querySelectorAll('img[data-src]');
let lazyMap = document.querySelector('.map__body');
let windowHeigth = document.documentElement.clientHeight;

let lazyImagesPositions = [];

if(lazyImages.length > 0){
    lazyImages.forEach(img =>{
        if(img.dataset.src){     
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
            lazySrollCheck();
        }
    });

}

document.addEventListener('scroll', lazyScroll)

function lazyScroll(){
    if(document.querySelectorAll('img[data-src]').length > 0){
        console.log('ok');
        lazySrollCheck();
    }
    if(!lazyMap.classList.contains('loaded')){
        loadMap();
    }
}

function loadMap(){
    const lazyMapPos = lazyMap.getBoundingClientRect().top + pageYOffset;
    if(pageYOffset > lazyMapPos - windowHeigth){
        const mapURL = lazyMap.dataset.map;
        if(mapURL){
            lazyMap.insertAdjacentHTML(
                'beforeend',
                `<iframe src="${mapURL}" width="1440" height="500" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
            );
            lazyMap.classList.add('loaded');
        }
    }
}

function lazySrollCheck(){
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowHeigth
    );
    if(imgIndex >= 0){
        if(lazyImages[imgIndex].dataset.src){
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        }
        delete lazyImagesPositions[imgIndex];
    }
    
}