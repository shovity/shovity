;(function () {
	'use strict';

	$(window).on('load', function() {
		$('.loader').delay(600).fadeOut('slow');
		setTimeout(function() {
			$('.cover .display-tc').addClass('fadeInUp');
		}, 800);
		
	});

	// Form
	var contactForm = function() {
		(function ($, window, document, undefined) {
		var $form = $('#contact-form');
		$form.submit(function (e) {
			// remove the error class
			$('.form-group').removeClass('has-error');
			$('.help-block').remove();
			var guestsList = [];
			$('.guest-list input').each(function() {
				guestsList.push(this.value);
			});
			// get the form data
			var formData = {
				'name' : $('input[name="form-name"]').val(),
				'email' : $('input[name="form-email"]').val(),
				'attending': $('.switch-field input[type="radio"]:checked').attr('id'),
				'guest': guestsList.join(', ')
			};
			// process the form
			$.ajax({
				type : 'POST',
				url  : 'form.php',
				data : formData,
				dataType : 'json',
				encode : true
			}).done(function (data) {
				// handle errors
				if (!data.success) {
					if (data.errors.name) {
						$('#name-field').addClass('has-error');
						$('#name-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.name + '</span>');
					}
					if (data.errors.email) {
						$('#email-field').addClass('has-error');
						$('#email-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.email + '</span>');
					}
				} else {
					// display success message
					$form.html('<div class="message-success">' + data.message + '</div>');
				}
			}).fail(function (data) {
				// for debug
				// console.log(data);
			});
			e.preventDefault();
		});
	}(jQuery, window, document));
	}

	// Offcanvas
	var offcanvasMenu = function() {
		$('.main').prepend('<div id="offcanvas" />');
		$('.main').prepend('<a href="#" class="js-nav-toggle nav-toggle nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#offcanvas').append(clone2);

		$('#offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		$(window).on('resize', function() {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('.js-nav-toggle').removeClass('active');
			}
		});
	};

	// Page scroll
	var pageScroll = function() {
		$('body').on('click touch', '.page-scroll', function(event) {
			var $anchor = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$('.js-nav-toggle').toggleClass('active');
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('nav').affix({
			offset: {
				top: $('#header').height()
			}
		});
	};

	// Mobile menu
	var mobileMenuOutsideClick = function() {
		$(document).on('click', function (e) {
		var container = $("#offcanvas, .js-nav-toggle");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('.js-nav-toggle').removeClass('active');
			}
		}
		});
	};

	// // Burgermenu
	var burgerMenu = function() {
		$('body').on('click', '.js-nav-toggle', function(event){
			var $this = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

	// Content way point
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );
	};

	// Dropdown
	var dropdown = function() {
		$('.has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');
		}).mouseleave(function(){
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
	};

	// Testimonials
	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	// Counter
	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
			return value.toFixed(options.decimals);
		},
		});
	};

	var counterWayPoint = function() {
		if ($('#counter').length > 0 ) {
			$('#counter').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Countdown
	var countdown = function() {
		var countdown = document.querySelector('.countdown');

		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function initializeClock(id, endtime) {
			var clock = document.getElementById(id);
			var daysSpan = clock.querySelector('.days');
			var hoursSpan = clock.querySelector('.hours');
			var minutesSpan = clock.querySelector('.minutes');
			var secondsSpan = clock.querySelector('.seconds');
			var newChild;

			function updateClock() {
				var t = getTimeRemaining(endtime);
				var daysArr = String(t.days).split('');
				daysSpan.innerHTML = '';
				for (var i = 0; i < daysArr.length; i++){
					newChild = document.createElement('span');
					newChild.innerHTML = daysArr[i];
					daysSpan.appendChild(newChild);
				}
				var hoursArr = String(('0' + t.hours).slice(-2)).split('');
				hoursSpan.innerHTML = '';
				for (var i = 0; i < hoursArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = hoursArr[i];
					hoursSpan.appendChild(newChild);
				}
				var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
				minutesSpan.innerHTML = '';
				for (var i = 0; i < minuteArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = minuteArr[i];
					minutesSpan.appendChild(newChild);
				}
				var secondArr = String(('0' + t.seconds).slice(-2)).split('');
				secondsSpan.innerHTML = '';
				for (var i = 0; i < secondArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = secondArr[i];
					secondsSpan.appendChild(newChild);
				}
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			var timeinterval = setInterval(updateClock, 1000);
		}
		// set your wedding date here
		var deadline = 'November 28 2022 17:30:00 GMT+0300';
		if (countdown){
			initializeClock('timer', deadline);
		}
	}

	// Form
	function filledLabels() {
		var inputFields = $('.control-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			singleInput.on('focus blur', function(event){
				checkVal(singleInput);
			});
		});
	}

	function checkVal(inputField) {
		if (inputField.val() === '') {
			if (event.type === "focus") {
				inputField.prev('.control-label').addClass('filled')
			} else if (event.type === "blur") {
				inputField.prev('.control-label').removeClass('filled')
			}
		}
	}

	function addGuest() {
		var addBtn = $('.add-button');
		var guestInput = $('#form-guest-name');
		var guestList = $('.guest-list');

		addBtn.on('click', function() {
			event.preventDefault(); 
			var guestVal = guestInput.val();
			var appendString = '<div><input class="form-control" type="text" value="'+guestVal+'"/><a href="#" class="remove_field"><i class="fa fa-trash"></i></a></div>';
			if (guestVal == '') {
				guestInput.focus();
			} else {
				guestList.append(appendString);
				guestInput.val('');
			}
		});

		$('.guest-list').on('click', '.remove_field', function(e){
			e.preventDefault();
			$(this).parent('div').remove();
		});
	}

	var collapseEvents = function() {
		$('#accordion').on('show.bs.collapse hide.bs.collapse', function (e) {
			var elemId = $(e.target).attr('id') + '0';

			$('#accordion-img .collapse').collapse('hide');
			$('#'+elemId).collapse('toggle');
		});
	}

	var singlePost = function() {
		var hightLight = $('.post-hightlight');

		if ($('p').is('.post-hightlight')) {
			hightLight.prev().addClass('post-hightlight--before');
			hightLight.next().addClass('clearfix');
		}
	}

	var isotope = function() {
		var $container = $('.grid');

		$container.imagesLoaded( function() {
			$container.isotope({
				// options
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					// use element for option
					columnWidth: '.grid-sizer',
				},
				getSortData: {
					moments: '.moments', // text from querySelector
					category: '[data-category]',
					weight: function( itemElem ) { // function
						var weight = $( itemElem ).find('.weight').text();
						return parseFloat( weight.replace( /[\(\)]/g, '') );
					}
				}
			});
		})
		
		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function() {
			var number = $(this).find('.number').text();
			return parseInt( number, 10 ) > 50;
			},
			// show if name ends with -ium
			ium: function() {
			var name = $(this).find('.name').text();
			return name.match( /ium$/ );
			}
		};
		// bind filter button click
		$('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[ filterValue ] || filterValue;
			$container.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
			});
		});
	}

	$(function(){
		pageScroll();
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		counter();
		counterWayPoint();
		countdown();
		filledLabels();
		addGuest();
		collapseEvents();
		singlePost();
		isotope();
		contactForm();
	});

}());