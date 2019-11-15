$(document).ready(function() {
	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : '';
	}

	$('.js-submit-data').on('click', function (e) {
		e.preventDefault();

		$('input[type=text]').removeClass('error');

		var email = $('.input__email').val();
		var phone = $('.input__phone').val();

		var mch = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
		var tch = /^[\+\d\(\)\ -]{4,18}\d$/;

		if (email == "") {
			$('.input__email').addClass('error');
			$('.oksend').text('Пожалуйста, введите e-mail.');
		}
		else if (!(mch.test(email))) {
			$('.input__email').addClass('error');
			$('.oksend').text('E-mail введен неправильно.');
		}
		else if (phone == "") {
			$('.input__phone').addClass('error');
			$('.oksend').text('Пожалуйста, введите номер телефона.');
		}
		else if (!(tch.test(phone))) {
			$('.input__phone').addClass('error');
			$('.oksend').text('Номер телефона введен неправильно.');
		}
		else if (!($('#agreecheck1').prop('checked'))) {
			$('.oksend').text('Подтвердите согласие с политикой конфиденциальности, поставив галочку.');
		} else {
			var url = 'https://roistat.com/ml/leadhunter/scripts/send.php',
				data = {
					email: email,
					phone: phone,
					roistat_id: getCookie('roistat_visit'),
					public_key: ''
				};

			console.log('submit')

			// $.ajax({
			// 	type: 'POST',
			// 	data: data,
			// 	url: url,
			// 	success: function () {
			// 		$(".js-answer").text("Ваша заявка отправлена.");
			// 	},
			// 	error: function () {
			// 		$("js-answer").text("Сообщение не передано. Пожалуйста, повторите попытку позже.");
			// 	}
			// });
		}
	});

	$(".js-form").submit(function(e){
		e.preventDefault(); 
	});

	
	var uagent = navigator.userAgent.toLowerCase();
	console.log(uagent);
	if (uagent.search("android|iphone|ipad|ipod") > -1) {
		$('.sidebl').addClass('mobile');
	};

	function sideblopen() {
		$('.sidebl').addClass('hover');
	}
	function sideblclose() {
		$('.sidebl').removeClass('hover');
	}
	$('.sidebl').mouseover(sideblopen);
	$('.sidebl').mouseout(sideblclose);
	$('.sidebl-label').on('click', function() {
		console.log('click')
		if ($('.sidebl').hasClass('hover')) {
			sideblclose();
		} else {
			sideblopen();
		}
	})
	$(window).scroll(function () {
        // "use strict";
        var scroll = $(window).scrollTop();
        if (scroll > 60) {
            $(".navbar").addClass("navbar-fixed").removeClass("navbar-top");
        } else {
            $(".navbar").removeClass("navbar-fixed").addClass("navbar-top");
        }
        if (scroll > 1000) {
            $(".bottombl").removeClass("closed");
            $(".sidebl").addClass("closed");
        } else {
            $(".bottombl").addClass("closed");
            $(".sidebl").removeClass("closed");
        }

        sideblclose();
    });
	var $openModal = $('.js-open-modal');
	// console.log($openModal);
	$openModal.rsModal({
		getcourse: false
	});
	$('.closeblock').on('click', function() {
		$('.bottombl').addClass('close');
		$('.sidebl').addClass('open');
	})
})