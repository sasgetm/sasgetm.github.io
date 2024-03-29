(function ($) {
    var initModal = function (el, options) {
        var $el = $(el),
            settings = {
                title: 'Записаться на вебинар',
                successMessage: 'Ваши данные успешно отправлены. Спасибо!',
                errorMessage: 'error',
                erp: true,
                getcourse: true,
                getcourseID: 409792882,
                buttonText: 'Записаться',
                public_key: '23F0A4094AC1171132512E2C2AE195C7',
                ym: {
                    id: 24840335,
                    targetName: 'academy_calltracking_form_send'
                }
            },
            $checkboxLink = $('.js-checkbox__link'),
            $form = $('.js-form'),
            $formBtn = $('.js-submit'),
            $phoneField = $('.js-phone'),
            $nameField = $('.js-name'),
            $emailField = $('.js-email'),
            $roistatVisit = getCookie('roistat_visit');

        $.extend(true, settings, options);

        function getCookie(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : '';
        }

        function sendMetrics(id, targetName) {
            ym(id, 'reachGoal', targetName);
            fbq('track', "Lead");
        }

        function changeElementsText(modalTitle, buttonText) {
            var $title = $('.js-modal__title');

            $title.text(modalTitle);
            $formBtn.text(buttonText);
        }

        function showError(field, message) {
            $('<p class="error">' + message + '</p>').insertAfter(field.closest('.input-group'));
                field.addClass('error-field');
        }

        function checkNameField() {
            if ($nameField.val() === '') {
                showError($nameField, 'Кажется, вы кое-что не заполнили');
                return false;
            }
            return true;
        }

        function checkPhoneField() {
            if ($phoneField.val() === '') {
                showError($phoneField, 'Кажется, вы кое-что не заполнили');
                return false;
            }
            return true;
        }

        function checkEmailField() {
            var emailRegex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

            if ($emailField.val() === '') {
                showError($emailField, 'Кажется, вы кое-что не заполнили');
                return false;
            }

            if (!(emailRegex.test($emailField.val()))) {
                showError($emailField, 'Адрес электронной почты указан некорректно');
                return false;
            }

            return true;
        }

        function checkCheckboxField() {
            var $checkbox = $('.js-checkbox__input'),
                $checkboxContainer = $('.js-checkbox');

            if (!$checkbox.prop('checked')) {
                $checkboxLink.addClass('checkbox-link-error');
                $checkboxContainer.css({animation: 'checkboxError 1s ease-in-out'});
                return false;
            }
            return true;
        }

        function resetErrorStyles() {
            var $formInput = $('.js-form-input');

            $('.error').remove();
            $formInput.removeClass('error-field');
            $checkboxLink.removeClass('checkbox-link-error');
        }

        function validateForm() {
            return checkNameField() && checkEmailField() && checkPhoneField() && checkCheckboxField()
        }

        function showAnswer(isSuccess) {
            var $answerImg = $('.js-answer-image'),
                $answerText = $('.js-answer-text'),
                $answer = $('.js-answer');

            if ($answerText.text() === '' || isSuccess === false) {
                $answer.removeClass('answer-show').addClass('answer-show');
                $form.addClass('hide');

                if (isSuccess) {
                    $answerImg.attr('src', 'img/success.svg');
                    $answerText.html(settings.successMessage);
                    return;
                }

                $answerImg.attr('src', 'img/error.svg');
                $answerText.html(settings.errorMessage);
            }
        }

        function submitDataToErp(public_key) {
            // var url = "https://cloud.roistat.com/lead/register",
            //     $emailFieldVal = $emailField.val(),
            //     $nameFieldVal = $nameField.val(),
            //     $phoneFieldVal = $phoneField.val(),
            //     urlWithParams = url + "?" + 'email=' + $emailFieldVal + '&name=' + $nameFieldVal + '&roistat_id=' + $roistatVisit + '&phone=' + $phoneFieldVal + '&public_key=' + public_key + '&is_need_response=1';

            // window.location.href = urlWithParams;
            $.ajax({
                type: 'POST',
                url: 'https://roistat.com/ml/leadhunter/scripts/send.php',
                data: {
                    phone: $phoneField.val(),
                    email: $emailField.val(),
                    name: $nameField.val(),
                    public_key: public_key,
                    roistat_id: getCookie('roistat_visit')
                },
                success: function () {
                    showAnswer(true);
                },
                error: function () {
                    showAnswer(false);
                }
            });
            

        }

        function submitDataToGetcourse() {
            $.ajax({
                type: 'POST',
                url: 'https://cors-anywhere.herokuapp.com/https://edu.roistat.com/pl/lite/block-public/process-html?id=' + settings.getcourseID + '&' + $form.serialize(),
                data: $form.serialize(),
                success: function () {
                    showAnswer(true);
                },
                error: function () {
                    showAnswer(false);
                }
            });
        }

        function submitData() {
            if (settings.getcourse) {
                submitDataToGetcourse();
            }

            if (settings.erp) {
                submitDataToErp(settings.public_key);
            }
        }

        Inputmask({"mask": "+7 (999) 999-9999", "placeholder": "*", "clearIncomplete": true}).mask($phoneField);

        function initEventListeners() {
            var $modal = $('.js-modal'),
                $overlay = $('.js-overlay'),
                $closeIcon = $('.js-close-modal'),
                $dropdown = $('.js-dropdown'),
                $countryItem = $('.js-country-item'),
                $flagBox = $('.js-flag-container');

            $el.on('click', function () {
                changeElementsText(settings.title, settings.buttonText);
                $modal.addClass('modal--active');
                $overlay.addClass('overlay--active');

                

                // console.log(settings.getcourse);
            });

            $.merge($closeIcon, $overlay).on('click', function () {
                $modal.removeClass('modal--active');
                $overlay.removeClass('overlay--active');
            });

            $.merge($countryItem, $flagBox).on('click', function () {
                $dropdown.toggleClass('show');

                if (document.documentElement.clientWidth <= 550) {
                    $phoneField.css({borderBottomRightRadius: 0});
                }

                $phoneField.toggleClass('phone__input--active');
            });

            $formBtn.on('click', function (e) {

                
                // console.log(settings.getcourse);

                e.preventDefault();
                resetErrorStyles();

                if (!validateForm()) {
                    return;
                }

                submitData();
                sendMetrics(settings.ym.id, settings.ym.targetName);

                ga('send', 'event', 'academy_calltracking_form_send', 'click');

                $form.submit();
            });

            $flagBox.on('click', function () {
                $($phoneField).val('');
            });

            $countryItem.on('click', function(e) {
                var currentCountryItem = e.currentTarget,
                    countryItemData = $(currentCountryItem).data('country'),
                    $countryImg = $('.js-country-image');

                $phoneField.focus();

                if (countryItemData === 'russia' || countryItemData === 'kazakhstan') {
                    Inputmask({"mask": "+7 (999) 999-9999", "placeholder": "*", "clearIncomplete": true}).mask($phoneField);
                    if (countryItemData === 'russia') {
                        $($countryImg).attr('src', 'img/rus.svg');
                        return;
                    }
                    $($countryImg).attr('src', 'img/kaz.svg');
                    return;
                }

                if (countryItemData  === 'belarus') {
                    Inputmask({"mask": "+375 (999) 999-9999", "placeholder": "*", "clearIncomplete": true}).mask($phoneField);
                    $($countryImg).attr('src', 'img/bel.svg');
                    return;
                }

                if (countryItemData === 'ukraine') {
                    Inputmask({"mask": "+380 (999) 999-9999", "placeholder": "*", "clearIncomplete": true}).mask($phoneField);
                    $($countryImg).attr('src', 'img/ukr.svg');
                }
            });
        }

        initEventListeners();
    };

    $.fn.rsModal = function (options) {
        initModal($(this), options);
    };
})(jQuery);