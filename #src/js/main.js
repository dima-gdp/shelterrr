$(document).ready(function () {

	const slider_1 = new Swiper('.slider-1', {

		slidesPerView: 4,
		spaceBetween: 31,
		observer: true,
		observeParents: true,
		observeSlideChildren: false,
		loop: true,
		navigation: {
			nextEl: '.slider-1-next',
			prevEl: '.slider-1-prev',
		},
	});

	const slider_2 = new Swiper('.slider-2', {

		slidesPerView: 2,
		spaceBetween: 31,
		// observer: true,
		// observeParents: true,
		loop: true,
		navigation: {
			nextEl: '.slider-2__next',
			prevEl: '.slider-2__prev',
		},
	});


	$('ul.tabs__items').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__block').removeClass('active').eq($(this).index()).addClass('active');
	})





	ymaps.ready(init);

	function init() {
		var myMap = new ymaps.Map("map", {
			center: [43.1420542527047, 131.91734209167475],
			zoom: 14
		}, {
			searchControlProvider: 'yandex#search'
		});

		// Открываем балун на карте (без привязки к геообъекту).
		myMap.balloon.open(
			[43.14, 131.91],
			"График работы:<br>Пн-Вс 9:00 - 22:00",
			{
				// Опция: не показываем кнопку закрытия.
				closeButton: false,
			});
	}




	// function init() {
	// 	// Создание карты.
	// 	var myMap = new ymaps.Map("map", {
	// 		center: [43.1420542527047, 131.91734209167475],
	// 		zoom: 14,
	// 	});

	// 	var point = new ymaps.GeoObject({
	// 		geometry: {
	// 			type: "Point", // тип геометрии - точка
	// 			coordinates: [43.1420542527047, 131.91734209167475], // координаты точки
	// 		}
	// 	},
	// 		{
	// 			iconLayout: 'default#imageWithContent',
	// 			iconImageHref: '../img/point-map.svg',
	// 			iconImageSize: [311, 170],
	// 		}
	// 	);

	// 	myMap.geoObjects.add(point);
	// }
});