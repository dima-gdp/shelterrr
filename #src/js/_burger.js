const burger = document.querySelector('.burger')
const menu = document.querySelector('.header__nav')
const btns = document.querySelectorAll('[data-path]');
// const closePopupBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const body = document.body;
const fixBlocks = document.querySelectorAll('.fix-block');

// Функция отключения скролла
const disableScroll = (body, fixBlocks) => {
	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let pagePosition = window.scrollY;
	fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});
	body.style.paddingRight = paddingOffset;
	body.classList.add('disable-scroll');
	body.dataset.position = pagePosition;
	body.style.top = -pagePosition + 'px';
}

// Функция включения скролла
const enableScroll = (body, fixBlocks) => {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	body.style.top = 'auto';
	body.classList.remove('disable-scroll');
	fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.style.paddingRight = '0px';
	window.scroll({ top: pagePosition, left: 0 });
	body.removeAttribute('data-position');
}

// Функция открытия буршера
const showBurger = (menu, burger) => {
	menu.classList.toggle('active');
	burger.classList.toggle('active');
	document.body.classList.contains('disable-scroll') ? enableScroll(body, fixBlocks) : disableScroll(body, fixBlocks)
}


// Обработчик клика по бургеру
burger.addEventListener('click', () => {
	showBurger(menu, burger)
});


// Функция закрытия модалки
const closePopup = () => {
	modalOverlay.classList.remove('--visible');
	modals.forEach((el) => {
		el.classList.remove('--visible');
	});
	enableScroll(body, fixBlocks)
	// setTimeout(enableScroll, 200);
}

// Обработчик события на кнопку(кнопки) появления модалки
btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.target.getAttribute('data-path');
		disableScroll(body, fixBlocks);

		modals.forEach((el) => {
			el.classList.remove('--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('--visible');
		modalOverlay.classList.add('--visible');
	});
});

// Обработчик события на скрытие модалки
modalOverlay.addEventListener('click', (e) => {
	if (e.target == modalOverlay) {
		closePopup();
	}
});

// // Обработчик события на скрытие модалки
// closePopupBtn.addEventListener('click', () => {
// 	closePopup();
// });