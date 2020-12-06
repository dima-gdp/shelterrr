$(document).ready(function () {

	objectFitImages();

	const mobMenu = $('.mob-menu');
	const burger = $('.header__burger');
	const slidersTabs = document.querySelectorAll('.slider-1__container');

	let activeTab = $('.tabs__block.active');

	function widthSlider(tabActive) {
		$(tabActive).find('.slider-tabs__item').each((function (i, el) {
			let maxWidth = 0;

			$(el).find('.slider-tabs__value').each(function (i, el) {
				if ($(el).innerWidth() > maxWidth) {
					maxWidth = $(el).innerWidth()
				}
			})

			if (maxWidth) {
				$(el).find('.slider-tabs__value').css('width', `${maxWidth}px`)
			}

		}))
	}

	function widthPetTable(sel) {
		let maxWidth = 0;

		sel.each(function (i, el) {
			if ($(el).innerWidth() > maxWidth) {
				maxWidth = $(el).innerWidth()
			}
		})

		if (maxWidth) {
			sel.css('width', `${maxWidth}px`)
		}


	}

	widthPetTable($('.card-pet__value'));
	widthSlider(activeTab);



	const blnOffset = $(window).width() > '1200' ? [10, -175] : [10, -100];


	const slider_hero = new Swiper('.slider-hero', {

		slidesPerView: 1,
		spaceBetween: 30,
		observer: true,
		observeParents: true,
		loop: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	});



	slidersTabs.forEach(function (el) {

		const slider_1 = new Swiper(el, {

			slidesPerView: 4,
			spaceBetween: 31,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			loop: false,
			navigation: {
				nextEl: el.closest('.slider-1').querySelector('.slider-1__next'),
				prevEl: el.closest('.slider-1').querySelector('.slider-1__prev'),
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				653: {
					slidesPerView: 2,
				},
				1130: {
					slidesPerView: 3,
				},
				1340: {
					slidesPerView: 4,
					spaceBetween: 30,
				}
			}
		});
	})

	const slider_2 = new Swiper('.slider-2', {

		slidesPerView: 2,
		spaceBetween: 31,
		loop: false,
		navigation: {
			nextEl: '.slider-2__next',
			prevEl: '.slider-2__prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 31,

			},
			769: {
				slidesPerView: 2,
				spaceBetween: 25,

			},
			993: {
				slidesPerView: 2,
				spaceBetween: 31,
			},
		}
	});


	$('ul.tabs__items').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__block').removeClass('active').eq($(this).index()).addClass('active');
		widthSlider($(this).closest('div.tabs').find('.tabs__block.active'))
	})



	var myMap;
	// Дождёмся загрузки API и готовности DOM.
	ymaps.ready(init);
	function init() {
		// Создание экземпляра карты и его привязка к контейнеру с
		// заданным id ("map").
		myMap = new ymaps.Map('map', {
			// При инициализации карты обязательно нужно указать
			// её центр и коэффициент масштабирования.
			center: [43.1420542527047, 131.91734209167475],
			zoom: 14,
			controls: []
		});

		// Создание макета балуна
		MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			' <div class="bln">' +
			' <div class="bln__inner">' +
			'$[[options.contentLayout]]' +
			' </div>' +
			' </div>', {
			/**
			* Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
			* @function
			* @name build
			*/
			build: function () {
				this.constructor.superclass.build.call(this);
				this._$element = $('.bln', this.getParentElement());
				this.applyElementOffset();
				this._$element.find('.bln__close')
					.on('click', $.proxy(this.onCloseClick, this));
			},

			/**
			* Удаляет содержимое макета из DOM.
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
			* @function
			* @name clear
			*/
			clear: function () {
				this._$element.find('.bln__close')
					.off('click');
				this.constructor.superclass.clear.call(this);
			},

			/**
			* Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
			* @function
			* @name onSublayoutSizeChange
			*/
			onSublayoutSizeChange: function () {
				MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

				if (!this._isElement(this._$element)) {
					return;
				}
				this.applyElementOffset();
				this.events.fire('shapechange');
			},

			/**
			* Сдвигаем балун, чтобы середина указывала на точку привязки.
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
			* @function
			* @name applyElementOffset
			*/
			applyElementOffset: function () {
				this._$element.css({
					left: -(this._$element[0].offsetWidth / 2),
					top: -(this._$element[0].offsetHeight)
				});
			},

			/**
			* Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
			* @function
			* @name onCloseClick
			*/
			onCloseClick: function (e) {
				e.preventDefault();
				this.events.fire('userclose');
			},

			/**
			* Используется для автопозиционирования (balloonAutoPan).
			* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
			* @function
			* @name getClientBounds
			* @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
			*/
			getShape: function () {
				if (!this._isElement(this._$element)) {
					return MyBalloonLayout.superclass.getShape.call(this);
				}
				var position = this._$element.position();
				return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
					[position.left, position.top], [
						position.left + this._$element[0].offsetWidth,
						position.top + this._$element[0].offsetHeight]
				]));
			},
			/**
			* Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
			* @function
			* @private
			* @name _isElement
			* @param {jQuery} [element] Элемент.
			* @returns {Boolean} Флаг наличия.
			*/
			_isElement: function (element) {
				return element && element[0];
			}
		}),

			// Создание вложенного макета содержимого балуна.
			MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				' <a class="bln__close" href="#"></a>' +
				' <p class="bln__text">$[properties.balloonHeader]</p>' +
				' <p class="bln__text">$[properties.balloonContent]</p>'
			),
			// Создание метки
			myPlacemark = new ymaps.Placemark(
				// Координаты метки
				[43.1420542527047, 131.91734209167475], {
				// Свойства
				// Текст метки
				hintContent: 'iResource',
				balloonHeader: 'График работы:',
				balloonContent: 'Пн-Вс 9:00 - 22:00'
			}, {
				balloonShadow: false,
				balloonLayout: MyBalloonLayout,
				balloonContentLayout: MyBalloonContentLayout,
				balloonPanelMaxMapArea: 0,
				// Не скрываем иконку при открытом балуне.
				hideIconOnBalloonOpen: false,
				// И дополнительно смещаем балун, для открытия над иконкой.
				balloonOffset: blnOffset
			});
		// Добавление метки на карту
		myMap.geoObjects.add(myPlacemark);
	}

	burger.click(function () {
		mobMenu.addClass('active')
	})

	$('.mob-menu__close').click(function () {
		mobMenu.removeClass('active')
	})

	$(document).click(function (ev) {

		if (!ev.target.closest('.header__burger')) {

			if (!ev.target.closest('.mob-menu')) {
				mobMenu.removeClass('active')
			}

		}
	})


	$("#to-modal").on('click', function () {

		$.fancybox.open({
			src: '#modal',
			touch: 'false',
			smallBtn: false,
			buttons: '',
		});

	});

	$("#to-privacy").on('click', function () {

		$.fancybox.open({
			src: '#modal-polit',
			touch: 'false',
			smallBtn: false,
			buttons: '',
		});

	});


	$('input[type="tel"]').inputmask({ "mask": "+7 (999)-999-99-99" });

});