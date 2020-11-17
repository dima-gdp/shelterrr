$(document).ready(function () {

	const slider_1 = new Swiper('.tabs__body', {

		slidesPerView: 4,
		spaceBetween: 30,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		loop: false,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
	});

	const slider_2 = new Swiper('.slider-2', {

		slidesPerView: 2,
		spaceBetween: 31,
		// observer: true,
		// observeParents: true,
		loop: false,
		navigation: {
			nextEl: '.slider-2__next',
			prevEl: '.slider-2__prev',
		},
	});


	$('ul.tabs__items').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__block').removeClass('swaper-wrapper active').eq($(this).index()).addClass('active swaper-wrapper');
	})





	ymaps.ready(init);

	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			center: [43.1420542527047, 131.91734209167475],
			zoom: 14,
		});

		var point = new ymaps.GeoObject({
			geometry: {
				type: "Point", // тип геометрии - точка
				coordinates: [43.1420542527047, 131.91734209167475], // координаты точки
			}
		},
			{
				iconLayout: 'default#imageWithContent',
				iconImageHref: '../img/point-map.svg',
				iconImageSize: [311, 170],
			}
		);

		myMap.geoObjects.add(point);
	}
});