const wsUrl = "wss://echo-ws-service.herokuapp.com/";

function pageLoaded() {
	const infoOutput = document.querySelector(".info_output");
	const chatOutput = document.querySelector(".chat_output");
	const input = document.querySelector("input");
	const sendBtn = document.querySelector(".btn_send");
	const btn = document.querySelector('.btn_geo_location');
	const coords = []

	let socket = new WebSocket(wsUrl);

	socket.onopen = () => {
		infoOutput.innerText = "Соединение установлено";
	}

	socket.onmessage = (event) => {
		if (coords.length > 1) {
			coords.splice(0, 2);
		} else {
			writeToChat(event.data, true);
		}
		
	}

	socket.onerror = () => {
		infoOutput.innerText = "При передаче данных произошла ошибка";
	}

	sendBtn.addEventListener("click", sendMessage);

	function sendMessage() {
		if (!input.value) return;
		socket.send(input.value);
		writeToChat(input.value, false);
		input.value === "";
	}

	function writeToChat(message, isRecived) {
		let messageHTML = `<div class="${isRecived? "recieved": "sent"}">${message}</div>`;
		chatOutput.innerHTML += messageHTML;
	}
	// Геолокация
	// Функция, выводящая текст об ошибке
	const error = () => {
		let errors = 'Невозможно получить ваше местоположение';
		writeToChat(errors, false);
	}

	// Функция, срабатывающая при успешном получении геолокации
	const success = (position) => {
		coords.push(position.coords.latitude);
		coords.push(position.coords.longitude);
		let link = `<a id = "map-link" href = "https://www.openstreetmap.org/#map=18/${coords[0]}/${coords[1]}" target="_blank">Гео-локация</a>`;
		socket.send(coords);
		writeToChat(link, false);
	}

	btn.addEventListener('click', () => {	
	if (!navigator.geolocation) {
		writeToChat('Geolocation не поддерживается вашим браузером', false);
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	});
}

document.addEventListener("DOMContentLoaded", pageLoaded);

