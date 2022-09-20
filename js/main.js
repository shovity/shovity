;(function () {
    'use strict';

    $(window).on('load', function() {
        $('.loader').delay(0).fadeOut('slow');
        
        setTimeout(function() {
            $('.cover .display-tc').addClass('fadeInUp');
        }, 600); 
    });

    // Page scroll
    var pageScroll = function() {
        $('body').on('click touch', '.page-scroll', function(event) {
            var $anchor = $(this);

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
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

    var counterWayPoint = function() {
        if ($('#counter').length > 0 ) {
            $('#counter').waypoint( function( direction ) {
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                    setTimeout(counter , 400);
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
        var deadline = '2022-10-10T04:00:00.000Z';
        if (countdown){
            initializeClock('timer', deadline);
        }
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
        contentWayPoint();
        testimonialCarousel();
        counterWayPoint();
        countdown();
        singlePost();
        isotope();
    });

}());