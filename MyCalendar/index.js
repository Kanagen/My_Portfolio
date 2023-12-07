// Текущая дата
let date = new Date();
//Текущий год
let year = date.getFullYear();
//Текущий месяц
let month = date.getMonth();

//Объявление массива месяцев
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//Доступ к элементам страницы

const btn = document.getElementById('btn');
const mode = document.getElementById('mode');

const navigation = document.querySelector(".dataSet");
const controls = document.querySelector('.controls');
const currMonth = document.querySelector(".dataMonth");
const currYear = document.querySelector(".dataYear");

const inputData = document.querySelector('.inputData');
const monthList = document.querySelector('.monthList');
const setYear = document.querySelector('.setYear');

const navEditor = document.querySelector(".navEditor");

const calendarDays = document.querySelector(".dayMeans");

const arrows = document.querySelectorAll(".dataSet span");

btn.classList.add('noVisible');

//заполнение календаря числами

function CalendarMain() {

    let firstDayCM = new Date(year, month, 7).getDay(); //определяем первый день недели ткущего месяца = понедельник (7)

    let lastFDateCM = new Date(year, month + 1, 0).getDate(); // последний дата текущего месяца (30 или 31...)

    let lastDayCM = new Date(year, month, lastFDateCM).getDay(); // определяем последний день недели ткущего месяца

    let lastDatePM = new Date(year, month, 0).getDate(); // последняя дата предыдущего месяца (30 или 31...)


    let lit = "";
    let str = "";

    // заполнение дней предыдущего месяца и выделение цветом выходных

    for (let i = firstDayCM; i > 0; i--) {
        const prevMonthDate = lastDatePM - i + 1;
        
        const holiday = new Date(year, month - 1, prevMonthDate).getDay()
        
        if (holiday === 6 || holiday === 0) {
            str = `<li class="inactiveRed">${prevMonthDate}</li>`;
        } else {
            str = `<li class="inactive">${prevMonthDate}</li>`;
        }

        lit += str;
    }

    // заполнение дней текущего месяца и выделение цветом 
    //выходных и текущей даты

    for (let i = 1; i <= lastFDateCM; i++) {

        let isToday = i;

        let holiday = new Date(year, month, i).getDay();

        if (holiday === 6 || holiday === 0) {
            str = `<li class="activeRed">${i}</li>`;

            if (isToday === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()) {
                
            str = `<li class="activeholiday">${i}</li>`;
        }

        } else if (isToday === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()) {
                
            str = `<li class="active">${i}</li>`;
        } else {
            str = `<li>${i}</li>`;
        }

        lit += str;
    }


    // заполнение дней следующего месяца и выделение цветом выходных

    for (let i = lastDayCM; i <= 6; i++) {
        const nextMonthDate = i - lastDayCM + 1;
        // To get right day we need to set right date:
        // e.g. year = [current year] month = [current month] + 1 (next month) date = [actual date]
        let holiday = new Date(year, month + 1, nextMonthDate).getDay();

        if (holiday === 6 || holiday === 0) {
            str = `<li class="inactiveRed">${nextMonthDate}</li>`;
        } else {
            str = `<li class="inactive">${nextMonthDate}</li>`;
        }

        lit += str;
    }

    //присвоение значений элементам страницы

    calendarDays.innerHTML = lit;
    currMonth.innerHTML = months[month];
    currYear.innerHTML = year;

    // конец функции CalendarMain
}

CalendarMain(); //вызов функции

//переход на сдующий/предыдуший месяц с помощью стрелок

let clickCounter = 0;

arrows.forEach(function (icon) {

    icon.addEventListener('click', function () {
        
        if (icon.id === "prev") {

            month -= 1;
            currMonth.innerHTML = months[month];
            clickCounter -=1;

            counter(clickCounter);
            checkUp();
            CalendarMain();

        } else {

            month += 1;
            currMonth.innerHTML = months[month];
            clickCounter +=1;

            counter(clickCounter);
            checkUp();
            CalendarMain();

        }

        // конец функции перехода даты по стрелкам
    })

    // добавление/удаление класса "Сегодня"

    function counter(clickCounter){
        if(clickCounter === 0){
            btn.classList.add('noVisible');
        } else {
            btn.classList.remove('noVisible');
        }
    }

})

//функция проверки даты при переходе в новый год
function checkUp() {
    if (month < 0 || month > 11) {
        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();
    } else {
        date = new Date();
    }
    // конец функции проверки даты при переходе в новый год
}

// навигация по календарю с помощью прямого ввода месяца и года

currYear.addEventListener('click', function func() {

    //присвоение классов

    controls.classList.add('noVisible');
    inputData.classList.remove('noVisible');

    btn.classList.remove('noVisible');

    //заполнение выпадающего списка
    for (let i = 0; i < months.length; i++) {
        let item = document.createElement('option');
        item.value = i;
        item.innerHTML = months[i];
        monthList.appendChild(item);
    }

    setYear.addEventListener('change', function () {
        year = Number(setYear.value);

        checkUp();
        CalendarMain();
    })

    monthList.addEventListener('click', function () {

        month = monthList.options.selectedIndex;
        checkUp();
        CalendarMain();

    })
    
    // this.classList.add('noVisible');
    // this.removeEventListener('click', func);
    
})

btn.addEventListener('click', function(){

    controls.classList.remove('noVisible');
    inputData.classList.add('noVisible');
    btn.classList.add('noVisible')
    
    clickCounter = 0;
    
    date = new Date();
//Текущий год
    year = date.getFullYear();
//Текущий месяц
    month = date.getMonth();

    CalendarMain();

})
