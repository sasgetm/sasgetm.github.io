$(document).ready(function() {
	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : '';
	}

	var roistat_id = getCookie('roistat_visit');

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

			var public_key ='F1F80A6A60BADCAD6631F323B084FA8B';

			var url = "https://cloud.roistat.com/lead/register";
	        var urlWithParams = url + "?" + 'email=' + email + '&roistat_id=' + roistat_id + '&phone=' + phone + '&public_key=' + public_key + '&is_need_response=1';

	        fbq('track', 'Lead');
	        ym(24840335, 'reachGoal', 'fast_start_lead');
	        ga('send', 'event', 'roistat_lead', 'click');
	        
			window.location.href = urlWithParams;

		}
	});

	var enterbutton = 'https://cloud.roistat.com/user/login?tags=199&roistatId='+roistat_id+'&lang=ru';
	console.log(enterbutton)
	var demobutton = 'https://cloud.roistat.com/user/register?demo=1&tags=199&roistatId='+roistat_id+'&lang=ru';
	$('.navbar-nav__reg-button').attr('href', enterbutton);
	$('.demobutton').attr('href', demobutton);

	
	var uagent = navigator.userAgent.toLowerCase();
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
	$openModal.rsModal({
		getcourse: false
	});
	$('.closeblock').on('click', function() {
		$('.bottombl').addClass('close');
		$('.sidebl').addClass('open');
	})
})