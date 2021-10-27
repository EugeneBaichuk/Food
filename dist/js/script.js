window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
  // Timer
  const now = new Date();
  const deadline = (`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+5}`); // текущая дата + 5 дн

  function getTimeRemaining(endtime) { // ф-ция получающая оставшееся время в таймере
    const t = Date.parse(endtime) - Date.parse(new Date()), // .parce - получить количество милисек от 1970 года
      // получаем разницу между deadline и текущей датой в милисекундах 
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // конвертируем миллисек в дни, часы итд
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return { // возвращаем значение в виде объекта
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) { // ф-ция для подставления 0 перед числом если таймер меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }


  function setClock(selector, endtime) { // подставляем значение таймера на страницу
    const timer = document.querySelector(selector), // получаем элементы со страницы
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); // устанавливаем обновление таймера каждую секунду
    updateClock();

    function updateClock() { //меняем значение на странице на значения таймера
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadline); //подставляем класс таймера на странице и нужного дедлайна

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('.modal__close');

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }


  modalTrigger.forEach((item) => {
    item.addEventListener('click', openModal);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 20000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
});