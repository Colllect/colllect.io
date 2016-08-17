'use strict';

(function () {
    var formSubitedOk = false;
    var emailFieldElement = document.getElementById('email'),
        checkIsFilled = function() {
            if (this.value.length === 0) {
                this.classList.remove('filled');
            } else {
                this.classList.add('filled');
            }
        };

    checkIsFilled.call(emailFieldElement);
    emailFieldElement.addEventListener('keyup', checkIsFilled, false);
    emailFieldElement.addEventListener('input', checkIsFilled, false);

    var formSubscribeElement = document.getElementById('form-subscribe');
    formSubscribeElement.addEventListener('submit', function (e) {
        e.preventDefault();
        if (formSubitedOk) {
            return;
        }

        document.querySelector('.m-form--success').style.display = 'none';
        document.querySelector('.m-form--error').style.display = 'none';

        var req = new XMLHttpRequest();
        req.open('POST', 'subscribe.php', true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState === 4) {
                var classSuffix;
                switch (req.status) {
                    case 400:
                        classSuffix = 'error';
                        break;
                    case 500:
                        classSuffix = 'server-error';
                        break;
                    default:
                        classSuffix = 'success';
                }
                document.querySelector('.m-form--' + classSuffix).style.display = 'block';

                if (req.status === 200) {
                    formSubitedOk = true;
                    emailFieldElement.disabled = true;
                    emailFieldElement.classList.add('submitted');
                    formSubscribeElement.querySelector('button').remove();
                }
            }
        };
        req.send(new FormData(formSubscribeElement));
    }, false);
})();