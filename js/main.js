$(document).ready(function() {
	$(window).scroll(function () {
        // "use strict";
        var scroll = $(window).scrollTop();
        if (scroll > 60) {
            $(".navbar").addClass("navbar-fixed").removeClass("navbar-top");
        } else {
            $(".navbar").removeClass("navbar-fixed").addClass("navbar-top");
        }
        if (scroll > 1000) {
            $(".bottombl").removeClass("closed")
        } else {
            $(".bottombl").addClass("closed");
        }
    });
	var $openModal = $('.js-open-modal');
	// console.log($openModal);
	$openModal.rsModal({
		getcourse: false
	});
	$('.closeblock').on('click', function() {
		$('.bottombl').addClass('close')
	})
})