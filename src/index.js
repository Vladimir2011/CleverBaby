import './style.css';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

const mainNav = document.querySelector('.main-nav__list');
const mainNavItems = document.querySelectorAll('.main-nav__item')
const headerTel = document.querySelector('.header__tel')
const menuOpenButton = document.getElementById('open');
const menuCloseButton = document.getElementById('close');
const signButtons = document.querySelectorAll('.sign');
const popupSign = document.querySelector('.popup__sign');
const popupThanks = document.querySelector('.popup__thanks');
const upButton = document.querySelector('.up-button');
const formSign = document.querySelector('.form__sign');
const buttonSign = document.querySelector('.popup__button--sign');
const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Введите правильный тип данных'
}

// Адаптируем слайдер под ширину планшета / смартфона

const adaptiveSlide = () => {
  let slidesToShow = 4;
  if (screen.width <= 1023 && screen.width >= 768) {
    return slidesToShow = 3;
  } else if (screen.width <= 767) {
    return slidesToShow = 1;
  } else {
    return slidesToShow;
  }
};

// Переменные слайдер

let position = 0;
const slidesToScroll = 1;
const sliderContainer = document.querySelector('.slider__container');
const sliderTrack = sliderContainer.querySelector('.slider__wrapper');
const btnNext = sliderContainer.querySelector('.slider__button--next');
const btnPrev = sliderContainer.querySelector('.slider__button--prev');
const slides = sliderContainer.querySelectorAll('.slider__slide');
const slidesCount = slides.length;
const slideWidth = sliderContainer.clientWidth / adaptiveSlide();
const movePosition = slidesToScroll * slideWidth;


// Открытие меню

let openMenu = () => {
  mainNav.classList.add('main-nav__list--open');
  headerTel.style.display = 'none';
  menuOpenButton.style.display = 'none';
  menuCloseButton.style.display = 'block';
}

menuOpenButton.addEventListener('click', openMenu);

// Закрытие меню

let closeMenu = () => {
  mainNav.classList.remove('main-nav__list--open');
  headerTel.style.display = 'block';
  menuOpenButton.style.display = 'block';
  menuCloseButton.style.display = 'none';
}

menuCloseButton.addEventListener('click', closeMenu);

// Закрытие меню при нажатии на ссылку

for (let item of mainNavItems) {
  item.onclick = function () {
    closeMenu();
  }
}

// Закрытие попапа

let closeModal = (event) => {
  if (event.target.classList.contains('popup__close')) {
    let hideElem = event.target.closest('.popup');
    hideElem.classList.remove('popup__open');
  }
}

popupSign.addEventListener('click', closeModal);
popupThanks.addEventListener('click', closeModal);


// Открытие попапа при нажатии на кнопки "Записаться"

for (let button of signButtons) {
  button.onclick = function (e) {
    e.preventDefault();
    openSignEdit();
  }
}

// Функция поднятия к верху страницы (скролл)

window.onscroll = function () {
  if (window.pageYOffset > 2700) {
    upButton.classList.add('up-button-show');
  } else {
    upButton.classList.remove('up-button-show');
  }
};

let scrollUp = () => {
  window.scrollTo(0, 0);
};

upButton.addEventListener('click', scrollUp);

// Валидация формы

let checkInputValidity = (input, error) => {
  for (let key in ERROR_MESSAGES) {
    if (input.validity[key]) {
      return error.textContent = ERROR_MESSAGES[key];
    }
    console.log(key);
  }
  error.textContent = '';
}

let setSubmitButtonState = (form, button) => {
  button.disabled = !form.checkValidity();
}

let setEventListeners = (popup) => {
  const form = popup.querySelector('.popup__form');
  const button = form.querySelector('.popup__button');

  function validate(event) {
    checkInputValidity(event.target, event.target.nextElementSibling);
    setSubmitButtonState(form, button);
  }

  form.addEventListener('input', validate);
}

let openSignEdit = () => {
  const name = formSign.elements.name;
  const email = formSign.elements.email;
  const phone = formSign.elements.phone;
  const button = document.querySelector('.popup__button');

  checkInputValidity(name, name.nextElementSibling);
  checkInputValidity(email, email.nextElementSibling);
  checkInputValidity(phone, phone.nextElementSibling);

  setSubmitButtonState(formSign,button);

  popupSign.classList.add('popup__open');
  setEventListeners(popupSign);
}

// Функция для отправки данных

let signInfo = (event) => {
  event.preventDefault();

  popupSign.classList.remove('popup__open');
  popupThanks.classList.add('popup__open');
}

buttonSign.addEventListener('click', signInfo);


// Слайдер

// Задаем мин ширину элементам слайдера

slides.forEach((slide) => {
  slide.style.minWidth = `${slideWidth}px`;
});


btnNext.addEventListener('click', () => {
  const itemsLeft = slidesCount - (Math.abs(position) + adaptiveSlide() * slideWidth) / slideWidth;

  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * slideWidth;

  setPosition();
  checkBtns();
});

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / slideWidth;

  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * slideWidth;

  setPosition();
  checkBtns();
});

const setPosition = () => {
  sliderTrack.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(slidesCount - adaptiveSlide()) * slideWidth;
};

checkBtns();

const links = document.querySelectorAll(".main-nav__link");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");

  document.querySelector(href).scrollIntoView({
    behavior: "smooth"
  });
}
