
// Aos animation :-
AOS.init({
   duration: 2000, 
});

setInterval(function(){
	if ($("#video")[0].paused == true){
		$(".video_inner").removeClass("active")
	}
	else{
		$(".video_inner").addClass("active")
	}
}, 100)


$(function () {
	var obj = {
		for: ''
	};

	$("[data-target='modal']").click(function (e) {
		obj.for = 'DEMO';
		$("." + e.target.id).hide();
		$(".modal-demo-popup").addClass("is-active");
	});

	$(".modal-close").click(function () {
		$(".modal-demo-popup").removeClass("is-active");
	});
	$("[data-target='modal-deck']").click(function (e) {
		obj.for = 'DECK';
		$("." + e.target.id).hide();
		$(".modal-demo-popup").addClass("is-active");
	});
	$(".play_icon").click(function () {
		document.getElementById('video').play();
		// document.getElementById('video').currentTime = 0;
		$(this).parent().addClass("active")
	});
	$(".pause_icon").click(function () {
		document.getElementById('video').pause();
		// document.getElementById('video').currentTime = 0;
		$(this).parent().removeClass("active")
	});
	$(".tab1").click(function () {
		$(".campus_benefit").addClass("active");
		$(".recruiters_benefit, .student_benefit").removeClass("active");
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	$(".tab2").click(function () {
		$(".recruiters_benefit").addClass("active");
		$(".campus_benefit, .student_benefit").removeClass("active");
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	$(".tab3").click(function () {
		$(".student_benefit").addClass("active");
		$(".recruiters_benefit, .campus_benefit").removeClass("active");
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});


	$('#signup').click(function () {

		swal.fire({
			title: 'Please Wait!',
			// text: 'Please wait while we process the data.',
			allowEscapeKey: false,
			allowOutsideClick: false
		});

		Swal.showLoading();

		var name = $('#name').val();
		var message = $('#message').val();

		var email = $('#email').val();
		var error = [];

		if (name.trim() === '') {
			error.push('name')
		}
		if (email.trim() === '') {
			error.push('email')
		} else if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
			error.push('Please enter valid email id');
		}

		if (message.trim() === '') {
			error.push('message')
		}

		var data = {
			email: email,
			name: name,
			message: message
		};

		if (error.length) return swal.fire('Error !', error + ' is required', 'error');

		$.ajax({
			url: "/api/v1/contact/create",
			data: data,
			type: "POST",
			success: function (data) {
				setTimeout(function () {
					Swal.fire({
						position: 'top-end',
						text: data.message,
						showConfirmButton: false,
						timer: 2000
					});
					clean()
				}, 1000);

			},
			error: function (err) {
				if (err && err.responseText) {
					setTimeout(function () {
						Swal.fire({
							position: 'top-end',
							text: err.responseText,
							showConfirmButton: false,
							timer: 2000
						});
						clean()
					}, 1000);
				}
			}
		});

		function clean() {
			$('#name').val('');
			$('#message').val('');
			$('#email').val('');
		}

		return false;
	});

	$('#demoRequest').click(function () {

		swal.fire({
			title: 'Please Wait!',
			// text: 'Please wait while we process the data.',
			allowEscapeKey: false,
			allowOutsideClick: false
		});

		Swal.showLoading();


		var fname = $('#demo-fname').val();
		var lname = $('#demo-lname').val();
		var category = $('#demo-category').val();
		var countrycode = $('#demo-countrycode').val();
		var message = $('#demo-message').val();
		var mobilenumber = $('#demo-mobilenumber').val();

		var email = $('#demo-email').val();
		var error = [];

		// if (fname.trim() === '') {
		// 	error.push('first name')
		// }
		// if (lname.trim() === '') {
		// 	error.push('last name')
		// }
		// if (email.trim() === '') {
		// 	error.push('email')
		// } else if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
		// 	error.push('Please enter valid email id');
		// }

		// if (message.trim() === '') {
		// 	error.push('message')
		// }

		if (mobilenumber.trim() === '') {
			error.push('mobile number')
		}

		var data = {
			email: email,
			name: {
				first: fname,
				last: lname
			},
			for: obj.for,
			category: category,
			message: message,
			mobileNumber: mobilenumber,
			countryCode: countrycode
		};

		if (error.length) return swal.fire('Error !', error + ' is required', 'error');

		$.ajax({
			url: "/api/v1/demoRequest/create",
			data: data,
			type: "POST",
			success: function (data) {
				setTimeout(function () {
					Swal.fire({
						position: 'top-end',
						text: data.message,
						showConfirmButton: false,
						timer: 2000
					});
					clean()
				}, 1500);

			},
			error: function (err) {
				setTimeout(function () {
					Swal.fire({
						position: 'top-end',
						text: err && err.responseJSON && (err.responseJSON.details && err.responseJSON.details[0] && err.responseJSON.details[0].message) || err.responseText || 'Please try again later',
						showConfirmButton: false,
						timer: 2000
					});
					clean()
				}, 1500);
			}
		});

		function clean() {
			$('#demo-email').val('');
			$('#demo-fname').val('');
			$('#demo-lname').val('');
			$('#demo-category').val('');
			$('#demo-countrycode').val('');
			$('#demo-message').val('');
			$('#demo-mobilenumber').val('');
		}

		return false;
	});
	var id = (window.location.pathname.split("/"));
	if (id && id[1]) $("." + id[1]).addClass('active');
});

/* header fixed */
$(window).scroll(function () {
	if ($(this).scrollTop() > 200) {
		$('header').addClass("header-fixed");
	}
	else {
		$('header').removeClass("header-fixed");
	}
});


/* mobile menu */
$(function () {
	$(".menu_icon").on("click", function (e) {
		$(".navigation").toggleClass("active");
		e.stopPropagation()
	});
	$(document).on("click", function (e) {
		if ($(e.target).is(".menu_icon") === false) {
			$(".navigation").removeClass("active");
		}
	});
});
$(window).scroll(function () {
	if ($(this).scrollTop() > 0) {
		$('.navigation').removeClass("active");
	}
});

/* navigation */
$(function () {
    $(".scroll_down[href]").click(function () {
        var store = $(this).attr("href");
        $('body,html').animate({scrollTop: $(store).offset().top - 50}, 700);
        return false;
    })

});

$('.home-banner-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    navText: [ '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots:false,
    responsive:{
        0:{
            items:1
        }
    }
}); 


/* owl-carousel bottom gallery */
$('.testimonial-carousel').owlCarousel({
    loop:false,
    margin:0,
    nav:false,
    navText: [ '', '' ],
    autoplay:false,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    dots:false,
    responsive:{
        0:{
            items:1,
            stagePadding:60,
            loop:false,
            margin:20,
            dots:true,
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
}); 

$('.featured_carousel').owlCarousel({
    loop:false,
    margin:25,
    nav:true,
    navText: [ '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
    autoplay:false,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1,
            stagePadding:40,
            loop:false,
            margin:10
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
}); 
/* benefits-carousel */
owl =  $('.benefits-carousel').owlCarousel({
    loop:false,
    margin:25,
    nav:true,
    navText: [ '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
    autoplay:false,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    smartSpeed:700,
    dots: true,
    dotsContainer: '.benefits-tab',
    responsive:{
        0:{
            items:1,
        }
    }
}); 

$('.benefits-tab').on('click', 'li', function(e) {
	owl.trigger('to.owl.carousel', [$(this).index(), 300]);
});


$(document).ready(function(){
  $(".personality-cls").mouseover(function(){
    $(".parameters_section").addClass("personality animationRemove");
    $(".parameters_section").removeClass("technical aptitude profile skills");
   	$(".number-count>span").text("20");
   	$(".number-count>span").removeClass("numscroller scrollzip roller-title-number-1 isShown")
  });
  $(".technical-cls").mouseover(function(){
    $(".parameters_section").addClass("technical animationRemove");
    $(".parameters_section").removeClass("personality aptitude profile skills");
    $(".number-count>span").text("20");
    $(".number-count>span").removeClass("numscroller scrollzip roller-title-number-1 isShown")
  });
  $(".aptitude-cls").mouseover(function(){
    $(".parameters_section").addClass("aptitude animationRemove");
    $(".parameters_section").removeClass("technical personality profile skills");
    $(".number-count>span").text("20");
    $(".number-count>span").removeClass("numscroller scrollzip roller-title-number-1 isShown")
  });
  $(".profile-cls").mouseover(function(){
    $(".parameters_section").addClass("profile animationRemove");
    $(".parameters_section").removeClass("technical aptitude personality skills");
    $(".number-count>span").text("20");
    $(".number-count>span").removeClass("numscroller scrollzip roller-title-number-1 isShown")
  });
  $(".skills-cls").mouseover(function(){
    $(".parameters_section").addClass("skills animationRemove");
    $(".parameters_section").removeClass("technical aptitude profile personality");
    $(".number-count>span").text("20");
    $(".number-count>span").removeClass("numscroller scrollzip roller-title-number-1 isShown")
  });
  $(".parameters-option li").mouseout(function(){
    $(".parameters_section").removeClass("personality technical aptitude profile skills");
    $(".number-count>span").text("100");
  });
});


$(document).ready(function() {
    var $lis = $(".home-campus-inner div"), i = -1;
    function nextCurrent() {
        $lis.eq(i).removeClass("active");
        $lis.eq(i=(i+1)%$lis.length).addClass("active");
        setTimeout(nextCurrent, 1500);
    }
    nextCurrent();
    $(".solution-item-image").addClass("animation")
    clearIt();
});



function clearIt() {
   myVar = setTimeout(removeCssClass, 6000);
}
function removeCssClass() {
    $(".solution-item-image").removeClass("animation")
}
setInterval(function() {
    $(".solution-item-image").addClass("animation")
    clearIt();
}, 8000);


function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 43 ) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}

$('[id^=demo-countrycode]').keypress(validateNumber);