document.addEventListener('DOMContentLoaded', function () {
    // Getting Register Button

    let $signin = $('#signin');
    $signin.click(function () {

        let needToAdd = false;

        //For Email
        let $emailIn = $('#emailIn');
        let emailIn_val = $emailIn.val();
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailIn_val) === false){
            needToAdd = true;
            $emailIn.removeClass('is-info');
            $emailIn.addClass('is-danger');
        }else{
            $emailIn.addClass('is-info');
            $emailIn.removeClass('is-danger');
        }

        //For Password
        let $passwordIn = $('#passwordIn');
        let passwordIn_val = $passwordIn.val();
        let $info_about_signin = $('#info-about-signin');

        if(needToAdd){

            $info_about_signin.html("<div class=\"notification is-danger\">\n" +
                "                          <strong>Enter A Valid EmailID.</strong>\n" +
                "                      </div>");
        }else{
            let $loader = $('#loader');
            $loader.addClass('is-active');
            setTimeout(function () {
                $.post('/login', {username : emailIn_val, password: passwordIn_val}, function (result) {
                    if(!result.isDone){
                        $info_about_signin.html("<div class=\"notification is-danger\">\n" +
                            "                          <strong>Email/Password Entered is Incorrect</strong>\n" +
                            "                      </div>");
                        $loader.removeClass('is-active');
                    }else{
                        window.location.replace('/profile?q='+result.hash);
                    }
                });
            }, 2000);

        }
    });


});