document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    // for Sign In Modal
    var $signInBtn = document.getElementById("signInButton");

    $signInBtn.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        let target = $signInBtn.dataset.target;
        let $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $target.classList.toggle('is-active');

        let $close = document.getElementsByClassName("signInClose");

        for(let i = 0; i < $close.length; i++){
            $close[i].addEventListener('click', function () {
                $target.classList.remove('is-active');
            })
        }

    });


    // for Register Modal
    var $registerBtn = document.getElementById("registerButton");

    $registerBtn.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        let target = $registerBtn.dataset.target;
        let $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $target.classList.toggle('is-active');

        let $close = document.getElementsByClassName("registerClose");

        for(let i = 0; i < $close.length; i++){
            $close[i].addEventListener('click', function () {
                $target.classList.remove('is-active');
            })
        }

    });
});