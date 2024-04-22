document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize each slider
    function initializeSlider(sliderContainer) {
      const slides = sliderContainer.querySelectorAll('.swiper-slide');
      let currentIndex = 0;
  
      function showSlide(index) {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      }
  
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }
  
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      }
  
      sliderContainer.querySelector('.next-btn').addEventListener('click', nextSlide);
      sliderContainer.querySelector('.prev-btn').addEventListener('click', prevSlide);
  
      // Initially show the first slide
      showSlide(currentIndex);
    }
  
    // Get all slider containers
    const sliderContainers = document.querySelectorAll('.swiper');
  
    // Initialize each slider
    sliderContainers.forEach(sliderContainer => {
      initializeSlider(sliderContainer);
    });
  });
  
   

// Получаем текущий день недели
var today = new Date().getDay();

// Функция для получения названия дня по его числовому значению
function getDayName(dayIndex) {
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[dayIndex];
}

// Удаляем все дни недели, кроме текущего
for (var i = 0; i < 7; i++) {
    if (i !== today) {
        var dayElement = document.getElementById(getDayName(i));
        if (dayElement !== null) {
            dayElement.parentNode.removeChild(dayElement);
        }
    }
}
// Создаем изображение
const image = document.createElement('img');
image.src = 'img/book-background.jpg'; // Замените 'путь_к_изображению' на реальный путь к вашему изображению

// Находим все элементы с классом modal и добавляем изображение внутрь каждого из них
document.querySelectorAll('.modal').forEach(modal => {
    modal.appendChild(image.cloneNode(true));
});
// Создаем изображение
const image2 = document.createElement('img');
image2.src = 'img/Background345.png'; // Замените 'путь_к_изображению' на реальный путь к вашему изображению

// Находим все элементы с классом modal и добавляем изображение внутрь каждого из них
document.querySelectorAll('.inscript').forEach(modal => {
    modal.appendChild(image2.cloneNode(true));
});
const image3 = document.createElement('img');
image3.src = 'img/button.png'; // Замените 'путь_к_изображению' на реальный путь к вашему изображению

// Находим все элементы с классом modal и добавляем изображение внутрь каждого из них
document.querySelectorAll('.topic').forEach(modal => {
    modal.appendChild(image3.cloneNode(true));
});
const image4 = document.createElement('img');
image4.src = 'img/button.png'; // Замените 'путь_к_изображению' на реальный путь к вашему изображению

// Находим все элементы с классом modal и добавляем изображение внутрь каждого из них
document.querySelectorAll('.question').forEach(modal => {
    modal.appendChild(image4.cloneNode(true));
});


let currentEkran = 1;
let visitedEkran = [1]; // Начинаем с экрана 1, так как мы всегда начинаем с него
let selectedVariant = null; // Выбранный вариант на экране 2

function showRandomModal() {
    const modals = document.querySelectorAll('.ekran2 .modal');
    const randomIndex = Math.floor(Math.random() * modals.length);
    modals.forEach((modal, index) => {
        if (index === randomIndex) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    });
    selectedVariant = randomIndex;
}

function showEkran(ekranNumber) {
    const ekranElements = document.querySelectorAll('.ekran');
    ekranElements.forEach((ekran) => {
        ekran.style.display = 'none';
    });

    const currentEkranElement = document.querySelector(`.ekran${ekranNumber}`);
    currentEkranElement.style.display = 'flex';

    if (ekranNumber === 2) {
        if (selectedVariant === null) {
            showRandomModal();
        } else {
            const modals = document.querySelectorAll('.ekran2 .modal');
            modals.forEach((modal, index) => {
                if (index === selectedVariant) {
                    modal.classList.remove('hidden');
                } else {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach((item, index) => {
        if (visitedEkran.includes(index + 1)) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
        item.classList.remove('active');
    });
    document.querySelector(`.menu li:nth-child(${ekranNumber})`).classList.add('active');
}

function goToEkran(ekranNumber) {
    if (visitedEkran.includes(ekranNumber)) {
        currentEkran = ekranNumber;
        showEkran(currentEkran);
        window.location.hash = '#' + ekranNumber;
    }
}

function nextEkran() {
    if (currentEkran < 6) {
        currentEkran++;
        visitedEkran.push(currentEkran); // Добавляем экран в массив посещенных экранов
        if (currentEkran === 2) {
            selectedVariant = null; // Сбрасываем выбранный вариант при переходе на второй экран
        }
        showEkran(currentEkran);
        window.location.hash = '#' + currentEkran;
    }
}

function goToRandomEkran() {
    if (currentEkran === 1) {
        selectedVariant = null; // Сбрасываем выбранный вариант
        const randomVariantNumber = Math.floor(Math.random() * 10) + 1; // Случайное число от 1 до 10
        const randomEkranNumber = document.querySelector(`.ekran2.variant-${randomVariantNumber}`);
        if (randomEkranNumber) {
            currentEkran = 2;
            showEkran(currentEkran);
            window.location.hash = '#' + currentEkran;
        }
    }
}

// Обработка изменения хэша при нажатии кнопок в браузере
window.onpopstate = function(event) {
    const hash = window.location.hash.substr(1);
    const ekranNumber = parseInt(hash);
    if (!isNaN(ekranNumber) && ekranNumber >= 1 && ekranNumber <= 6) {
        currentEkran = ekranNumber;
        showEkran(currentEkran);
    }
};

// Обработка загрузки страницы
window.onload = function () {
    const hash = window.location.hash.substr(1);
    if (hash === '' || isNaN(hash) || parseInt(hash) < 1 || parseInt(hash) > 6) {
        window.location.hash = '#1';
    } else {
        currentEkran = parseInt(hash);
    }
    showEkran(currentEkran);

    // Сброс истории браузера при перезагрузке страницы
    history.pushState({}, document.title, window.location.pathname);

    // Добавляем обработчик события для кнопки на первом экране
    document.querySelector('.ekran1 button').addEventListener('click', goToRandomEkran);
};

// Обработка клика по пунктам меню
document.querySelectorAll('.menu li').forEach((item, index) => {
    item.addEventListener('click', () => {
        const ekranNumber = index + 1;
        goToEkran(ekranNumber);
    });
});




var elements = document.querySelectorAll('#text-C');

  elements.forEach(function(element) {
    var span = document.createElement('span'); // creating <span>
    span.textContent = ".... להמשך לחץ"; // Добавляем текст внутрь <span>
    span.classList.add('back'); // adding class "back" to <span>
    element.appendChild(span); // Putting <span> in the end of the #text-C
    span.setAttribute('onclick', 'nextEkran()');
  });

  // Получаем все кнопки и экраны вопросов
  const buttons = document.querySelectorAll('.topic');
  const screens = document.querySelectorAll('.questions');

  // Для каждой кнопки добавляем обработчик события
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Получаем значение атрибута data-target, которое содержит класс соответствующего экрана вопросов
      const targetClass = button.getAttribute('data-target');

      // Показываем только экран вопросов, соответствующий нажатой кнопке
      screens.forEach((screen) => {
        if (screen.className.includes(targetClass)) {
          screen.style.display = 'block';
        } else {
          screen.style.display = 'none';
        }
      });
    });
  });

// Получаем все элементы с классом .question
const but = document.querySelectorAll('.question');

// Получаем элемент, в который будем вставлять текст
const questionName = document.querySelector('.question-name');

// Добавляем обработчик события для каждой кнопки
but.forEach(button => {
    button.addEventListener('click', () => {
        // Получаем текст с кнопки
        const buttonText = button.textContent;
        // Вставляем текст в .question-name
        questionName.textContent = buttonText;
        // Также можно воспользоваться командой для копирования текста в буфер обмена
        // navigator.clipboard.writeText(buttonText);
    });
});



  document.addEventListener("DOMContentLoaded", function() {
    // Получаем все элементы с классом .question
    const questions = document.querySelectorAll('.topic');

    // Проходимся по каждому элементу
    questions.forEach((question, index) => {
        // Получаем текст из элемента с классом .questionsN, где N - номер вопроса
        const questionText = document.querySelector(`.topic${index + 1}`).innerText;
        
        // Находим соответствующий элемент с классом .question-topicN и добавляем текст в него
        const questionTopic = document.querySelector(`.question-topic${index + 1}`);
        if (questionTopic) {
            questionTopic.innerText = questionText;
        }
    });
});

// window.addEventListener('DOMContentLoaded', function() {
//     // Скрыть .swiper-slider при загрузке страницы
    // var swiperSlider = document.querySelector('.swiper-wrapper');
    // swiperSlider.style.display = 'flex';

//     if (swiperSlider) {
//         swiperSlider.style.display = 'none';
//     }

    // Показать .swiper-slider после полной загрузки контента
    // window.addEventListener('load', function() {
    //     if (swiperSlider) {
    //     }
    // });
