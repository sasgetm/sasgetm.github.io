$(document).ready(function() {
	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : '';
	}
	$('.js-submit-data').on('click', function (e) {
		e.preventDefault();
		
		var url = 'https://roistat.com/ml/leadhunter/scripts/send.php',
			data = {
				email: $('.input__email').val(),
				phone: $('.input__phone').val(),
				roistat_id: getCookie('roistat_visit')
			};

		$.ajax({
			type: 'POST',
			data: data,
			url: url,
			success: function () {
				$(".js-answer").text("Ваша заявка отправлена.");
			},
			error: function () {
				$("js-answer").text("Сообщение не передано. Пожалуйста, повторите попытку позже.");
			}
		});
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
	// $('.sidebl').on()
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

        sideblclose;
    });
	var $openModal = $('.js-open-modal');
	// console.log($openModal);
	$openModal.rsModal({
		getcourse: false
	});
	$('.closeblock').on('click', function() {
		$('.bottombl').addClass('close');
	})
})