const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
	let w = window.screen.width;
	let h = window.screen.height;
	alert(`Ширина экрана ${w}px, высота экрана ${h}px.`);
});
