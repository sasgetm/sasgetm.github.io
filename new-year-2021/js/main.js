!function(f,b,e,v,n,t,s){
	if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '1860525404053913');
	fbq('track', 'PageView');

$(document).ready(function() {
	var $form = $('.js-form'),
		$submitData = $('.js-submit'),
		$inputEmail = $('.js-input-email'),
		$inputPhone = $('.js-input-tel'),
		regExpForMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
		regExpForPhone = /^[\+\d\(\)\ -]{4,18}\d$/,
		$jsCheckboxContainer = $('.js-checkbox-container'),
		$overOverlay = $('.js-over-overlay'),
		$overlay = $('.js-overlay'),
		$closeIcon = $('.js-close-icon'),
		$successPopup = $('.js-success-popup'),
		$agreeprivacy = $('.js-agreeprivacy'),
		public_key = 'B37BEE5305F64490CF7024AF7DA72253';


	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : '';
	};

	function popupFadeOut() {
		$formPopup.fadeOut('fast');
		$successPopup.fadeOut('fast');
		$overOverlay.fadeOut('fast');
		$overlay.fadeOut('fast');
	};

	function turnOffLeadHunter() {
		if ($(window).width() < '820'){
			window.onRoistatModuleLoaded = function () {
				window.roistat.leadHunter.isEnabled = false;
			}
		}
	}

	function initEventListeners() {
		$closeIcon.on('click', popupFadeOut);
		$overlay.on('click', popupFadeOut);

		$submitData.on('click', function (e) {
			e.preventDefault();

			$form = $(this).closest($form);
			var submitButtonText = $(this).text();
			$submitData.text('Отправка...');

			var email = $form.find($inputEmail).val(),
				phone = $form.find($inputPhone).val();

			if (validateForm($form, email, phone, submitButtonText)) {
				submitForm(email, phone);
			}
		});
	};

	function validateForm($form, email, phone, submitButtonText) {
		return validateEmail($form, email, submitButtonText) && validatePhone($form, phone, submitButtonText) && checkAgreecheck($form, submitButtonText);
	}
	function validateEmail($form, email, submitButtonText) {
		$inputEmail.removeClass('error');
		if (email === "") {
			$form.find($inputEmail).addClass('error');
            $submitData.text(submitButtonText);
			return;
		}
		if (!(regExpForMail.test(email))) {
			$form.find($inputEmail).addClass('error');
            $submitData.text(submitButtonText);
			return;
		}
		return true;
	};
	function validatePhone($form, phone, submitButtonText) {
		$inputPhone.removeClass('error');
		if (phone === "") {
			$form.find($inputPhone).addClass('error');
            $submitData.text(submitButtonText);
			return;
		}
		if (!(regExpForPhone.test(phone))) {
			$form.find($inputPhone).addClass('error');
            $submitData.text(submitButtonText);
			return;
		}
		return true;
	};
	function checkAgreecheck($form, submitButtonText) {
		$jsCheckboxContainer.removeClass('error');
		if (!($form.find($agreeprivacy).prop('checked'))) {
			$form.find($jsCheckboxContainer).addClass('error');
            $submitData.text(submitButtonText);
			return;
		}
		return true;
	};
	function submitForm(email, phone) {
		// $.ajax({
		// 	type: 'POST',
		// 	url: 'https://cloud.roistat.com/lead/register',
		// 	data: {
		// 		name: name,
		// 		email: email,
		// 		phone: phone,
		// 		public_key: public_key,
		// 		roistat_id: getCookie('roistat_visit'),
		// 	},
		// 	success: function() {
		// 		showSuccess();
		// 		$inputPhone.val('');
		// 		$inputEmail.val('');
		// 		fbq('track', 'Lead');
		// 		ym(24840335, 'reachGoal', 'new-year_new-clients_form_send');
		// 		ga('send', 'event', 'form_send', 'click');
		// 	},
		// 	error: function () {
		// 	}
		// });
		var roistat_id = getCookie('roistat_visit');

		fbq('track', 'Lead');
		ym(24840335, 'reachGoal', 'new-year_new-clients_form_send');
		ga('send', 'event', 'form_send', 'click');

		window.location.href = 'https://cloud.roistat.com/lead/register?public_key=B37BEE5305F64490CF7024AF7DA72253&roistat_id='+roistat_id+'&email='+email;
	}
	function showSuccess() {
		$formPopup.fadeOut('fast');
		$overOverlay.fadeIn('fast');
		$overlay.fadeIn('fast');
		$successPopup.fadeIn('fast');
		setTimeout(function () {
			$successPopup.fadeOut('fast');
			$overlay.fadeOut('fast');
			$overOverlay.fadeOut('fast');
		}, 3000);
	}

	turnOffLeadHunter();
	initEventListeners();
});
