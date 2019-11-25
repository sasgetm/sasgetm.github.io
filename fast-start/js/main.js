$(document).ready(function () {
	var $inputEmail = $('.js-input-email'),
		$inputPhone = $('.js-input-phone'),
		$answer = $('.js-answer'),
		$submitData = $('.js-submit-data'),
		$forGenerating = $('.js-generate-link'),
		$sideBlock = $('.js-side-block'),
		$navbar = $(".js-navbar"),
		$bottomBlock = $(".js-bottom-block"),
		$closeBlock = $('.js-closeblock'),
		$targetButton = $('.js-target-button'),
		$elemCurrentYear = $('.js-current-year'),
		$openModal = $('.js-open-modal'),
		$sideBlockLabel = $('.js-side-block-label'),
		roistat_id = getCookie('roistat_visit');

	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : '';
	}
	
	function generateLink() {
		$('.js-generate-link').attr('href', function(i, val) {
			return val + '&roistatId=' + roistat_id;
		});
	}

	function sendMetrics() {
		fbq('track', 'InitiateCheckout');
		roistat.event.send('roistat_button');
		ym(24840335, 'reachGoal', 'fast_start_button');
		ga('send', 'event', 'roistat_button', 'click');
	}

	function currentYear() {
		var currentYearValue = new Date().getFullYear();
		$elemCurrentYear.text(currentYearValue);
	}
	
	function turnOffLeadHunter() {
		if ($(window).width() < '768'){
			window.onRoistatModuleLoaded = function () {
				window.roistat.leadHunter.isEnabled = false;
			}
		}
	}

	function initEventListeners() {	
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			function showNavbar() {
				if (scroll > 60) {
					$navbar.addClass("navbar-fixed").removeClass("navbar-top");
					return;
				}
				$navbar.removeClass("navbar-fixed").addClass("navbar-top");
			}

			function showBottomHideSide() {
				if (scroll > 1000) {
					$bottomBlock.removeClass("closed");
					$sideBlock.addClass("closed");
					return;
				}
				$bottomBlock.addClass("closed");
				$sideBlock.removeClass("closed");
			}
			
			showNavbar();
			showBottomHideSide();
			$sideBlock.removeClass('hover');
		});

		$submitData.on('click', function (e) {
			e.preventDefault();

			var email = $inputEmail.val(),
				phone = $inputPhone.val(),
				mailRegex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
				telRegex = /^[\+\d\(\)\ -]{4,18}\d$/,
				public_key ='F1F80A6A60BADCAD6631F323B084FA8B',
				url = "https://cloud.roistat.com/lead/register",
				urlWithParams = url + "?" + 'email=' + email + '&roistat_id=' + roistat_id + '&phone=' + phone + '&public_key=' + public_key + '&is_need_response=1';

			function validateForm() {
				if (email === "") {
					$inputEmail.addClass('error');
					$answer.fadeIn('fast').text('Пожалуйста, введите e-mail.');
					return;
				}

				if (!(mailRegex.test(email))) {
					$inputEmail.addClass('error');
					$answer.fadeIn('fast').text('E-mail введен неправильно.');
					return;
				}

				if (phone === "") {
					$inputPhone.addClass('error');
					$answer.fadeIn('fast').text('Пожалуйста, введите номер телефона.');
					return;
				}

				if (!(telRegex.test(phone))) {
					$inputPhone.addClass('error');
					$answer.fadeIn('fast').text('Номер телефона введен неправильно.');
					return;
				}

				if (!($('.agreecheck').prop('checked'))) {
					$answer.fadeIn('fast').text('Подтвердите согласие с политикой конфиденциальности, поставив галочку.');
					return;
				}
				return true
			}

			function submitForm() {
				$submitData.attr('disabled', 'disabled');

				$answer.fadeIn('fast').text('Спасибо, ваше сообщение отправлено.');

				fbq('track', 'Lead');
				ym(24840335, 'reachGoal', 'fast_start_lead');
				ga('send', 'event', 'roistat_lead', 'click');
				
				window.location.href = urlWithParams;
			}

			if (validateForm()) {
				submitForm();
			}
		});

		$sideBlockLabel.on('click', function () {
			if ($sideBlock.hasClass('hover')) {
				$sideBlock.removeClass('hover');
				return;
			}

			$sideBlock.addClass('hover');
		});

		$closeBlock.on('click', function () {
			$bottomBlock.addClass('close');
			$sideBlock.addClass('open');
		});

		$targetButton.on('click', sendMetrics);
	}

	$openModal.rsModal({
		getcourse: false
	});

	generateLink();
	initEventListeners();
	currentYear();
	turnOffLeadHunter();
});