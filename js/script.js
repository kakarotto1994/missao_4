'use strict';

// url api   https://www.weatherbit.io/api/weather-forecast-16-day


const apiKey = '55320766e7114a74bd9725a7c855e282';

//const lang = 'pt';
//let city = 'Recife';

const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';

const weekdays = {
	0: 'Dom',
	1: 'Seg',
	2: 'Ter',
	3: 'Qua',
	4: 'Qui',
	5: 'Sex',
	6: 'Sab'
}



$('#search').click(function (e) {
	e.preventDefault();
	const newCity = $('#city').val();

	getForecast(newCity);
});

function getForecast (city) {

	exibeLoadImg();

	clearFields();

	$.ajax({
		url: baseURL,
		data: {
			key: apiKey,
			city: city,
			lang: 'pt'
		},
		success: function(result) {
			ocultaLoadImg();
			$('#city-name').text(result.city_name);

			const forecast = result.data;
			const today = forecast[0];
			const nextDays = forecast.slice(1);

	//		console.log(nextDays);
			
			displayToday(today);
			displayNextDays(nextDays);
		},
		error: function(error) {
			console.log(error.responseText);
		}
	});
}

function clearFields () {
		$('#next-days').empty();
}

// Exibe load IMG
function exibeLoadImg() {
	$('#loader').css('display', 'none');
	$('#loader').css('display', '');
}

// Oculta load IMG
function ocultaLoadImg() {
	$('#loader').css('display', '');
	$('#loader').css('display', 'none');
}



function displayToday(today) {
	let temperature = Math.round(today.temp);

	/*$(document).ready(function() {
	$('ul').click(function() {
		$('ul').toggleClass('active');
		temperature = far(temperature);
		$('#current-temperature').text(temperature);
		temperature = Math.round(today.temp);

		})
	});*/

	$('#Fahrenheit').click(function(){
		temperature = far(temperature);
		$('#current-temperature').text(temperature);
		temperature = Math.round(today.temp);
	})

	$('#celsios').click(function(){
		temperature = Math.round(today.temp);
		$('#current-temperature').text(temperature);
	})

	const windSpeed = today.wind_spd;
	const humidity = today.rh;
	const weather = today.weather.description;
	const icon = today.weather.icon;
	const iconURL = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

	console.log(iconURL);

	$('#current-temperature').text(temperature);
	$('#current-wind').text(windSpeed);
	$('#current-humidity').text(humidity);
	$('#current-weather').text(weather);
	$('#weather-icon').attr({
		src: iconURL
	});
}

function displayNextDays(nextDays) {
	for(let i = 0; i < nextDays.length; i++) { 
		//console.log(nextDays);
		const day = nextDays[i];
		const min = Math.round(day.min_temp);
		const max = Math.round(day.max_temp);
		let date = new Date(day.valid_date);
		const weekday = weekdays[date.getUTCDay()];

		//date = date.getUTCDate();

//		console.log(date);

//	Cria as div's dos day card's começando a partir de amanhã.

		const card = $(`
			<div class="day-card">
	               <div class="date">${date.getUTCDate()}/${date.getUTCMonth()+1}</div>
	               <div class="weekday">${weekday}</div>
	               <div class="temperatures">
	                  <span class="max">${max}°</span>
	                  <span class="min">${min}°</span>
	              </div>
	        </div>`
	);
		card.appendTo('#next-days');

		

//		console.log('oi');
	}


}

	function far(t) {
		t = Math.round(t * 9 / 5 + 32);
		return t;
	}


