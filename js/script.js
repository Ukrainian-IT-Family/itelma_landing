// menu btn
let menuBtn = document.querySelector('.burger');
let menu = document.querySelector('.header__list');

menuBtn.onclick = function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
};

// phone btn
window.addEventListener('resize', function (event) {
  function startResize(e) {
    let windowWidth = window.innerWidth;
    let phoneBtn = document.querySelector('.phone');
    let phoneWrapper = document.querySelector('.phone__wrapper');

    if (windowWidth > 400) {
      menu.after(phoneBtn);
    } else {
      phoneWrapper.prepend(phoneBtn);
    }

  }
  startResize();
}, true);



// scroll
document.querySelectorAll('a[href^="#"').forEach(link => {

  link.addEventListener('click', function (e) {
    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    // const topOffset = document.querySelector('.scrollto').offsetHeight;
    const topOffset = 0; // если не нужен отступ сверху 
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

if (document.getElementById("first")) {
  let first = new Swiper('.first', {
    slidesPerView: 1,
    loop: false,
    allowTouchMove: false,
    navigation: {
      nextEl: '#first__next',
      prevEl: '#first__prev',
    },
  });

  let dateItem = document.querySelectorAll('.headings__name');

  first.on('slideChange', function () {
    let activeIndex = first.activeIndex;

    dateItem.forEach(function (date1) {
      date1.classList.remove('active');
    })

    dateItem[activeIndex].classList.add('active');
  });

  dateItem.forEach(function (date, index) {
    date.setAttribute('data-title', index);
    date.addEventListener('click', function () {
      if (!date.classList.contains('active')) {
        let index = date.getAttribute('data-title');
        first.slideTo(index);
      }
    })
  })

}


new Swiper('.second', {
  navigation: {
    nextEl: '.second__next',
    prevEl: '.second__prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1.3,
    },
    500: {
      slidesPerView: 2,
    },
    660: {
      slidesPerView: 2.3,
    },
    767: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    }
  }
});


// Video
let videoSlider = new Swiper('.video__slider', {
  slidesPerView: 1,
  navigation: {
    nextEl: '#video__next',
    prevEl: '#video__prev',
  },
});

let videoPlayer = document.querySelectorAll('.video__slide');

videoPlayer.forEach(element => {
  let video = element.querySelector('.video__item');
  let videoFilter = element.querySelector('.video__middle');
  let cloudLeft = element.querySelector('.cloud__left');
  let cloudRight = element.querySelector('.cloud__right');
  video.volume = 0.2;

  element.addEventListener('click', () => {
    if (video.paused) {
      cloudLeft.classList.add('active');
      cloudRight.classList.add('active');
      videoFilter.classList.add('active');
      video.play();
    } else {
      video.pause();
      cloudLeft.classList.remove('active');
      cloudRight.classList.remove('active');
      videoFilter.classList.remove('active');
    }
  })

  videoSlider.on('slideChange', function () {
    video.pause();
    cloudLeft.classList.remove('active');
    cloudRight.classList.remove('active');
    videoFilter.classList.remove('active');
  });
});


// map
try {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [25.678362, 37.631757],
      zoom: 14,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),


      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: './img/label.png',
        // Размеры метки.
        iconImageSize: [40, 62],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      })
    myMap.geoObjects
      .add(myPlacemark)
  });
} catch (error) {
  console.log(error)
}