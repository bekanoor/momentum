// date options 
const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];
const dayNames = [
    'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
];

// dom elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    date = document.querySelector('.date'),
    quote = document.querySelector('.quote'),
    focus = document.querySelector('.focus'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city'),
    weatherHumidity = document.querySelector('.weather-humidity'),
    windSpeed = document.querySelector('.wind-speed');

let previasCity = '',
    previousName = '',
    previousFocus = '';

// image control
const base = './assets/images/';
const images = [];

document.body.style.textShadow = '1px 1px 1px black, 0 0 1em black';

console.log("Array of pictures: ")
console.log(images)
console.log('Если на странице нет цитаты/погоды, то умер api')

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');

    img.src = src;
    img.onload = () => {      
        body.style.backgroundImage = `url(${src})`;
    }; 
}

function getImage() {
    i++;

    const index = i % images.length;
    const imageSrc = base + images[index];

    viewBgImage(imageSrc);
    btn.disabled = true;
    
    setTimeout(function() { btn.disabled = false }, 1000);
} 

function getRandomImage() {
    let getRandomDay = generateArrayRandomNumber(1,20);

    for (let i = 0; i < 6; i++) images.push(`night/${getRandomDay.slice(i, i + 1)}.jpg`);
    for (let i = 0; i < 6; i++) images.push(`morning/${getRandomDay.slice(i, i + 1)}.jpg`);
    for (let i = 0; i < 6; i++) images.push(`day/${getRandomDay.slice(i, i + 1)}.jpg`);
    for (let i = 0; i < 6; i++) images.push(`evening/${getRandomDay.slice(i, i + 1)}.jpg`);
}

// get random array number without  duplicates
function generateArrayRandomNumber (min, max) {
	let totalNumbers = max - min + 1,
		arrayTotalNumbers 	= [],
		arrayRandomNumbers 	= [],
		tempRandomNumber;

	while (totalNumbers--) {
		arrayTotalNumbers.push(totalNumbers + min);
	}
	while (arrayTotalNumbers.length) {
		tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
		arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
		arrayTotalNumbers.splice(tempRandomNumber, 1);
	}

	return arrayRandomNumbers;
}

const btn = document.querySelector('.btn');
let i = 0;
let hoursManager = new Date();
i = hoursManager.getHours();

// set background 
function setBgGreet() {
    let hour = hoursManager.getHours();
    let path = `${base}${images[hour]}`;
    console.log("Path to the first picture - " + path)
    
    if (hour > 5 && hour < 12) {
        // Morning
        document.body.style.backgroundImage = `url('${path}')`;
        greeting.textContent = 'Good Morning, ';
        document.body.style.color = 'white';

    } else if (hour > 11 && hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = `url('${path}')`;
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour > 17 && hour <= 23){
        // Evening
        document.body.style.backgroundImage = `url('${path}')`;
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    } else{
        //Night
        document.body.style.backgroundImage = `url('${path}')`;
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    }
}

// get time
function getTime() {
    let timeManager = new Date(),
    hours = timeManager.getHours(),
    minutes = timeManager.getMinutes(),
    seconds = timeManager.getSeconds(),
    day = dayNames[timeManager.getDay()],
    week = timeManager.getDate(),
    month = monthNames[timeManager.getMonth()];

    date.innerHTML = `${day}<span>, </spam>${week}<span> </spam>${month}`
    // add zero before seconds
    seconds < 10 ? 
    time.innerHTML = `${hours}<span>:</spam>${minutes}<span>:</spam><span>0</spam>${seconds}` : 
    time.innerHTML = `${hours}<span>:</spam>${minutes}<span>:</spam>${seconds}`;
    
    setTimeout(getTime, 1000);
}

function timeManage(){
    let nowTime = new Date();

    return 3600000 - nowTime.getMinutes() * 60000 - nowTime.getSeconds() * 1000;
}
// get name to local storage
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// set name to local storage
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if(name.innerHTML === '') name.textContent = previousName;
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        if(name.innerHTML === '') name.textContent = previousName;
        localStorage.setItem('name', e.target.innerText);
    }
}
// get focus to local storage
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}  
// set focus to local storage
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if(focus.innerHTML === '') focus.textContent = previousFocus;
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        if(focus.innerHTML === '') focus.textContent = previousFocus;
        localStorage.setItem('focus', e.target.innerText);
    }
}

// get quote 
async function getQuote() {  
    const url = `https://favqs.com/api/qotd`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quote.body;
    figcaption.textContent = data.quote.author;
}

// get weather 
function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter city]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ea&appid=83377b627705bd25dff85ae1fa17aa07&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod === '404' && city.innerHTML !== '[Enter city]') {
        alert(data.message);
        city.innerHTML = '[Enter city]';
        weatherIcon.className = '';
        temperature.textContent = ``;
        weatherHumidity.textContent = ``;
        windSpeed.textContent = ``;
        weatherDescription.textContent = "";
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherHumidity.textContent = `humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `wind: ${data.wind.speed} m/s`;
        weatherDescription.textContent = data.weather[0].description;
    }
}

function setCity(e) {
    if(e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if(city.innerHTML === '') city.textContent = previasCity;
            localStorage.setItem('city', e.target.innerText);
            city.blur();
            getWeather();
        }
    } else {
        if(city.innerHTML === '') city.textContent = previasCity;
        localStorage.setItem('city', e.target.innerText);
    }
}

city.addEventListener('click', e => {previasCity = city.innerHTML; city.innerText = '';})
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);

btn.addEventListener('click', getQuote);
btn.addEventListener('click', getImage);

name.addEventListener('click', e => {previousName = name.innerHTML; name.innerText = ''})
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', e => {previousFocus = focus.innerHTML; focus.innerText = ''})
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// run
getRandomImage();
getTime();
setBgGreet();
getName();
getFocus();
getCity();
setTimeout(() => {
    getImage();
    console.log('ebalda');
    setInterval(() => getImage(), 3600000);
}, timeManage());