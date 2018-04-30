$(document).ready(function() {

	//sticky navbar
	if ($(window).width() > 650) {
		var nav_top = $('nav').offset().top
		var nav_height = $('nav').outerHeight(true)
		$(window).scroll(function() {
			if ($(window).scrollTop() > nav_top) {
				$('nav').addClass('sticky-nav')
				$('body').css('margin-top', nav_height+'px')
				$('.main-bg-wrap img').css('top', (-nav_height-80)+'px')
			} else {
				$('nav').removeClass('sticky-nav')	
				$('body').css('margin-top', '0px')
				$('.main-bg-wrap img').css('top', -80+'px')		
			}
		})
	} else {
		var nav_top = 0
		var nav_height = 0
	}
	//sticky navbar -- END

	//menu

	function go(select) {
		var destination = select.offset().top - nav_height;
		$('html, body').animate({ scrollTop: destination}, 500);
		return false; 
	}
	$('.go1').click(function() {
		go($('.section-1'))
	})
	$('.go2').click(function() {
		go($('.section-3'))
	})
	$('.go3, .main-button').click(function() {
		go($('.catalog'))
	})
	$('.go4').click(function() {
		go($('.section-4'))
	})
	$('.go5').click(function() {
		go($('.section-6'))
	})
	$('.go6').click(function() {
		go($('.section-9'))
	})

	if ($(window).width() < 650) {
		$('.burger').click(function() {
			$('nav').fadeIn(300)
		})
		$('nav').click(function() {
			$(this).fadeOut(300)
		})
	}
	//menu -- END

	//masks
	$('input[name=name]').on('keyup keypress', function(e) {
		if (e.keyCode == 8 || e.keyCode == 46) {}
			else
			{
				var letters=' zxcvbnmasdfghjklqwertyuiopQWERTYUIOPLKJHGFDSAZXCVBNMйцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
				return (letters.indexOf(String.fromCharCode(e.which))!=-1);
			}
		});
	$("input[name=phone]").mask("9 (999) 999-9999");
	//masks -- END

	//info
	$('.main-item')
		.mouseenter(function() {
			$(this).children('.info').children('.info-text').addClass('info-open')
		})
		.mouseleave(function() {
			$(this).children('.info').children('.info-text').removeClass('info-open')
		})
	//info -- END

	//section-2 TAB
	$('.section-2__menu ul li').each(function(e) {
		$(this).attr('data-tab', e)
	})
	$('.section-2__item').each(function(e) {
		$(this).attr('data-tab', e)
	})
	$('.section-2__mob-menu li').each(function(e) {
		$(this).attr('data-tab', e)
	})
	$('.section-2__menu ul li, .section-2__mob-menu li').click(function() {
		if (!$(this).is('.current-tab')) {
			$('.section-2__menu ul li, .section-2__mob-menu li').removeClass('current-tab')
			$(this).addClass('current-tab')

			var e = $(this).data('tab')
			$('.section-2__item').removeClass('current-item')
			setTimeout(function(){
				$('.section-2__item[data-tab='+e+']').addClass('current-item')
			}, 300)
		}
	})

	if ($(window).width() < 650) {
		$('.section-2__menu').click(function() {
			$(this).fadeOut(300)
		})
	}
	//section-2 TAB -- END

	//section-3 TAB + SLIDERS
	$('.section-3__tab').each(function(e) {
		$(this).attr('data-slider', e)
	})
	$('.section-3__slider').each(function(e) {
		$(this).attr('data-slider', e)
	})
	// $('.section-3__slider').owlCarousel({
	// 	items : 1,
	// 	mouseDrag: true,
	// 	nav: true,
 //    	addClassActive: true,
	// 	navText : ["<div class='section-3-button-prev'><img src='img/arr.png'/></div>", "<div class='section-3-button-next'><img src='img/arr.png'/></div>"],
	// });
	$('.section-3__tab').click(function() {
		if (!$(this).is('.choose-current-tab')) {
			$('.section-3__tab').removeClass('choose-current-tab')
			$(this).addClass('choose-current-tab')

			var e = $(this).data('slider')
			$('.section-3__slider').removeClass('choose-current-slider')
			setTimeout(function(){
				$('.section-3__slider[data-slider='+e+']').addClass('choose-current-slider')
			}, 500)
		}
	})
	//section-3 TAB + SLIDERS -- END

	//catalog filter
	$('.select').click(function() {
		$(this).toggleClass('select-active')
	})
	$(document).mouseup(function(e) {
		if (e.target.className != 'select' && $('.select').has(e.target).length === 0) {
			$('.select').removeClass('select-active')
		}
	})
	$('.select li').click(function() {
		var t = $(this).text()
		$(this).closest('ul').siblings('span').text(t)
	})

	var works = true
	var catalog_slider_item = $('.catalog-item')

	if ($(window).width() < 650) {
		works = false
		var catalog_slider = $('.catalog-main-flex')
		catalog_slider.owlCarousel({
			items : 1,
			mouseDrag: true,
			nav: true,
			navText : ["<div class='catalog-button-prev'><img src='/static/img/arr.png'/></div>", "<div class='catalog-button-next'><img src='/static/img/arr.png'/></div>"],
		});
		catalog_slider_item = $('.catalog-item').closest('.owl-item')
	}

	var filter = {}
	$('.filter-submit').click(function() {
		filter['height_min'] = $('#min-height span').text()
		filter['height_max'] = $('#max-height span').text()
		filter['spring'] = $('#spring span').text()
		filter['group'] = $('#group span').text()

		if ($(window).width() < 650) {
			$('.temp .owl-item').each(function(){
				$('.catalog-main-flex .owl-stage').append($(this).clone())
				$(this).remove()
			})
		}

		catalog_slider_item.removeClass('catalog-hidden-item')
		
		catalog_slider_item.each(function() {
			var item = {}
			if ($(window).width() < 650) {
				item['height'] = $(this).children('.catalog-item').data('height')
				item['spring'] = $(this).children('.catalog-item').data('spring')
				item['group'] = $(this).children('.catalog-item').data('group')
			} else {
				item['height'] = $(this).data('height')
				item['spring'] = $(this).data('spring')
				item['group'] = $(this).data('group')				
			} 
			if ((item['height'] < filter['height_min'] || item['height'] > filter['height_max']) ||
				(item['spring'] != filter['spring'] && filter['spring'] != 'Не выбрано') ||
				(item['group'] != filter['group'] && filter['group'] != 'Все')) {
				$(this).addClass('catalog-hidden-item')
				if ($(window).width() < 650) {
					$('.temp').append($(this).clone())
					$(this).remove()
				}
			}
		})
		if ($(window).width() < 650) {
			setTimeout(function() {
				catalog_slider.owlCarousel('destroy');
				catalog_slider.owlCarousel({
					items : 1,
					mouseDrag: true,
					nav: true,
					navText : ["<div class='catalog-button-prev'><img src='/static/img/arr.png'/></div>", "<div class='catalog-button-next'><img src='/static/img/arr.png'/></div>"],
				});
			}, 300)
		}
		items(works)
	}) 

	$('.filter-clear').click(function() {
		$('#min-height span').text('12')
		$('#max-height span').text('20')
		$('#spring span').text('Не выбрано')
		$('#group span').text('Все')

		if ($(window).width() < 650) {
			$('.temp .owl-item').each(function(){
				$('.catalog-main-flex .owl-stage').append($(this).clone())
				$(this).remove()
			})
			setTimeout(function() {
				catalog_slider.owlCarousel('destroy');
				catalog_slider.owlCarousel({
					items : 1,
					mouseDrag: true,
					nav: true,
					navText : ["<div class='catalog-button-prev'><img src='/static/img/arr.png'/></div>", "<div class='catalog-button-next'><img src='/static/img/arr.png'/></div>"],
				});
			}, 300)
		}

		catalog_slider_item.removeClass('catalog-hidden-item')
		items(works)
	})

	$('.catalog-show-all').click(function() {
		$('#min-height span').text('12')
		$('#max-height span').text('20')
		$('#spring span').text('Не выбрано')
		$('#group span').text('Все')

		works = false

		$('.catalog-item').removeClass('catalog-hidden-item')
		items(works)

		$(this).hide()
	})

	var items_show = 6

	if ($(window).width() < 970) {
		items_show = 4
	}

	function items(works) {
		if (works) {
			var e = 0
			$('.catalog-item').each(function() {
				if (!$(this).is('.catalog-hidden-item') && e < items_show) {
					e += 1
				} else {
					$(this).addClass('catalog-hidden-item')
				}

			})
		}
	}
	items(works)
	//catalog filter END

	//catalog additional
	var catalog_items = 3

	if ($(window).width() < 970) {
		catalog_items = 2
	} if ($(window).width() < 650) {
		catalog_items = 1
	}

	$('.catalog-additional__slider').owlCarousel({
	 	items: catalog_items,
	 	mouseDrag: true,
    	addClassActive: true,
	 	nav: true,
		navText : ["<div class='additional-button-prev'><img src='/static/img/arr2.png'/></div>", "<div class='additional-button-next'><img src='/static/img/arr2.png'/></div>"],
	});
	//catalog additional - END

	//replies slider
	var owl = $('.replies-slider')
	owl.owlCarousel({
		items : 1,
		mouseDrag: true,
    	addClassActive: true,
		nav: true,
		navText : ["<div class='replies-button-prev'><img src='/static/img/arr.png'/></div>", "<div class='replies-button-next'><img src='/static/img/arr.png'/></div>"],
	});
	owl.on('translated.owl.carousel', function(e) {
		var i = $('.replies-slider .owl-item.active .replies-item').data('reply')
		$('.replies-photo').removeClass('reply-active')
		$('.replies-photo[data-reply='+i+']').addClass('reply-active')
	})
	//replies slider -- END

	//delivery tabs
	$('.section-8__tab-item').each(function(e) {
		$(this).attr('data-delivery', e)
	})
	$('.section-8__item').each(function(e) {
		$(this).attr('data-delivery', e)
	})
	$('.section-8__tab-item').click(function() {
		if (!$(this).is('.section-8__tab-active')) {
			$('.section-8__tab-item').removeClass('section-8__tab-active')
			$(this).addClass('section-8__tab-active')

			var e = $(this).data('delivery')
			$('.section-8__item').removeClass('delivery-current')
			setTimeout(function(){
				$('.section-8__item[data-delivery='+e+']').addClass('delivery-current')
			}, 500)
		}
	})
	//delivery tab -- END

	//popup catalog slider
	$('.popup-slider').owlCarousel({
		items : 1,
	 	mouseDrag: true,
    	addClassActive: true,
	 	nav: true,
		navText : ["<div class='popup-button-prev'><img src='/static/img/arr.png'/></div>", "<div class='popup-button-next'><img src='/static/img/arr.png'/></div>"],
	});
	//popup catalog slider -- END

	//popup catalog prices
	$('.popup-select ul li').click(function() {
		var price = $(this).children('.new-price').text()
		var that = $(this)
		$(this).closest('.popup-select').siblings('.price').fadeOut(100)
		setTimeout(function() {
			that.closest('.popup-select').siblings('.price').children('span').text(price)
			that.closest('.popup-select').siblings('.price').fadeIn(100)
		}, 100)
	})
	//popup catalog prices -- END

	//POP UPS
	$('.catalog-item').each(function(e) {
		$(this).attr('data-catalog', e)
	})
	$('.popup-product').each(function(e) {
		$(this).attr('data-catalog', e)
	})
	$('.additional-item').each(function(e) {
		$(this).attr('data-extra', e)
	})
	$('.popup-extra').each(function(e) {
		$(this).attr('data-extra', e)
	})

	$('.head-phone span').click(function() {
		$('.layer').fadeIn(300)
		$('.popup-callback').fadeIn(500)
	})
	$('.descriptor .callback, .section-3__consultation').click(function() {
		$('.layer').fadeIn(300)
		$('.popup-consultation').fadeIn(500)
	})
	$('.delivery-get').click(function() {
		$('.layer').fadeIn(300)
		$('.popup-delivery').fadeIn(500)
	})
	$('.non-standart').click(function() {
		$('.layer').fadeIn(300)
		$('.popup-consultation2').fadeIn(500)
	})
	$('.catalog-item').click(function() {
		var id = $(this).data('catalog')
		$('.layer').fadeIn(300)
		//$('.popup-catalog').fadeIn(500)
		$('.popup-catalog[data-catalog='+id+']').fadeIn(500)
	})
	$('.additional-item').click(function() {
		var id = $(this).data('extra')
		$('.layer').fadeIn(300)
		//$('.popup-catalog').fadeIn(500)
		$('.popup-extra[data-extra='+id+']').fadeIn(500)
	})


	$('.popup-consultation-button').click(function() {
		$(this).closest('.popup-catalog').fadeOut(300)
		setTimeout(function() {
			$('.popup-consultation').fadeIn(300)
		}, 300)
	})

	$('.layer').click(function(e) {
		if ($(this).has(e.target).length === 0) {
			$(this).fadeOut(300)
			$('.popup-min').fadeOut(300)
			$('.popup-catalog').fadeOut(300)
			$('.buy-form').fadeOut(300)
			$('.thank').fadeOut(300)
		}
	})
	$('.popup-min .close').click(function() {
		$('.popup-min').fadeOut(300)
		$('.layer').fadeOut(300)
		$('.buy-form').fadeOut(300)
	})
	$('.popup-catalog .close-popup').click(function() {
		$('.popup-catalog').fadeOut(300)
		$('.layer').fadeOut(300)
		$('.buy-form').fadeOut(300)
	})

	$('.popup-buy').click(function() {
		$('.layer').fadeIn(300)
		$('.popup-catalog').fadeOut(300)
		$('.popup-min').fadeOut(300)
		$('.buy-form').fadeIn(500)
		var info = $(this).parents('.popup-buttons').parents('.popup-catalog__right').siblings('.popup-catalog__left')
		var title = info.children('h5').text()
		var subtitle = info.children('.descriptor').text()
		var product_name = title + ' ' + subtitle
		var price = info.children('.popup-select').children('.holder').text()
		var accurate_price = info.children('.price').children('span').text()
		$('.buy-form input[name=accurate-price]').val(accurate_price)
		$('.buy-form input[name=product-size]').val(price)
		$('.buy-form input[name=product-title]').val(title)
		$('.buy-form input[name=product-subtitle]').val(subtitle)
		$('.buy-form .buy-product').text(product_name)
		$('.buy-form .buy-price').text(price)
	})


	//POP UPS -- END

	//FORM SUBMIT
	$('form').submit(function(e) {
		e.preventDefault()

		var data = $(this).serialize()
		var url = $(this).attr('action')

		$.ajax({
			url: url,
			data: data,
			type: 'POST',
			success: function(data) {
				$('.layer').fadeIn(300)
				$('.popup-min').fadeOut(300)
				$('.popup-catalog').fadeOut(300)
				setTimeout(function() {
					$('.thank').fadeIn(300)
				}, 300)
			},
			error: function() {
				console.log('an error has been occured...')
			}
		})
		
	})

	/*
	оплата
	*/
	$('#pay-form').submit(function(e){
		e.preventDefault()

		var data = $(this).serialize()

		$.ajax({
			url: '/checkform/&',
			data: data,
			type: 'POST',
			success: function(result){
				window.location.href = result['response'];
			}
		})
	})

	//FORM SUBMIT -- END

})