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
			$('.oksend').fadeIn('fast').text('Пожалуйста, введите e-mail.');
		}
		else if (!(mch.test(email))) {
			$('.input__email').addClass('error');
			$('.oksend').fadeIn('fast').text('E-mail введен неправильно.');
		}
		else if (phone == "") {
			$('.input__phone').addClass('error');
			$('.oksend').fadeIn('fast').text('Пожалуйста, введите номер телефона.');
		}
		else if (!(tch.test(phone))) {
			$('.input__phone').addClass('error');
			$('.oksend').fadeIn('fast').text('Номер телефона введен неправильно.');
		}
		else if (!($('#agreecheck1').prop('checked'))) {
			$('.oksend').fadeIn('fast').text('Подтвердите согласие с политикой конфиденциальности, поставив галочку.');
		} else {
			$('.js-submit-data').attr('disabled', 'disabled');
			// var url = 'https://roistat.com/ml/leadhunter/scripts/send.php',
			// 	data = {
			// 		email: email,
			// 		phone: phone,
			// 		roistat_id: getCookie('roistat_visit'),
			// 		public_key: 'F1F80A6A60BADCAD6631F323B084FA8B'
			// 	};

			var roistat_id = getCookie('roistat_visit');
			var public_key ='F1F80A6A60BADCAD6631F323B084FA8B';

			// console.log('submit')
			var url = "https://cloud.roistat.com/lead/register";
	        var urlWithParams = url + "?" + 'email=' + email + '&roistat_id=' + roistat_id + '&phone=' + phone + '&public_key=' + public_key + '&is_need_response=1';
			window.location.href = urlWithParams;

			// $.ajax({
			// 	type: 'POST',
			// 	data: data,
			// 	url: url,
			// 	success: function () {
			// 		$(".oksend").fadeIn('fast').text("Ваша заявка отправлена.");
			// 		window.open(urlWithParams);
			//         window.location.href = urlWithParams;
			// 	},
			// 	error: function () {
			// 		$(".oksend").fadeIn('fast').text("Сообщение не передано. Пожалуйста, повторите попытку позже.");
			// 	}
			// });
		}
	});

	// $(".js-form").submit(function(e){
	// 	e.preventDefault(); 
	// });

	
	var uagent = navigator.userAgent.toLowerCase();
	// console.log(uagent);
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