$(document).ready(function() {
	var $openModal = $('.js-open-modal'),
		$openModalPrezent = $('.js-open-modal-prezent'),
		$targetButton = $('.js-target-button'),
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
		roistat.event.send('roistat_button');
		ym(24840335, 'reachGoal', 'academy_calltracking_button_click');
		ga('send', 'event', 'academy_calltracking_button_click', 'click');
	}
	
	function turnOffLeadHunter() {
		if ($(window).width() < '768'){
			window.onRoistatModuleLoaded = function () {
				window.roistat.leadHunter.isEnabled = false;
			}
		}
	}

	function initEventListeners() {	
		$targetButton.on('click', sendMetrics);
	}

	$openModal.rsModal({
		title: 'Посетить урок по коллтрекингу',
		buttonText: 'Посетить урок'
	});
	// $openModalPrezent.rsModal({
	// 	getcourse: false,
	// 	title: 'Закажите презентацию коллтрекинга от Roistat',
	// 	buttonText: 'Заказать'
	// });

	generateLink();
	initEventListeners();
	turnOffLeadHunter();
})