document.addEventListener('DOMContentLoaded', function () {
    // Getting Register Button

    let $register = $('#register');
    $register.click(function () {

        // For Name
        let needToAdd = false;
        let $name = $('#name');
        let name_val = $name.val();
        if(name_val.length === 0){
            needToAdd = true;
            $name.removeClass('is-info');
            $name.addClass('is-danger');
        }else{
            $name.addClass('is-info');
            $name.removeClass('is-danger');
        }

        // For Phone Number
        let $phone_number = $('#phone_number');
        let phone_number_val = $phone_number.val();
        if(phone_number_val.length !== 10 || !/^\d+$/.test(phone_number_val)){
            needToAdd = true;
            $phone_number.removeClass('is-info');
            $phone_number.addClass('is-danger');
        }else{
            $phone_number.addClass('is-info');
            $phone_number.removeClass('is-danger');
        }

        //For Blood Group
        let $blood_group = $('#blood_group');
        let blood_group_val = $blood_group.val();
        if( blood_group_val !== 'O+' &&
            blood_group_val !== 'O-' &&
            blood_group_val !== 'A+' &&
            blood_group_val !== 'A-' &&
            blood_group_val !== 'B+' &&
            blood_group_val !== 'B-' &&
            blood_group_val !== 'AB+'&&
            blood_group_val !== 'AB-'){

            needToAdd = true;
            $blood_group.removeClass('is-info');
            $blood_group.addClass('is-danger');
        }else{
            $blood_group.addClass('is-info');
            $blood_group.removeClass('is-danger');
        }

        //For Address
        let $address = $('#address');
        let address_val = $address.val();
        if(address_val.length === 0){
            needToAdd = true;
            $address.removeClass('is-info');
            $address.addClass('is-danger');
        }else{
            $address.addClass('is-info');
            $address.removeClass('is-danger');
        }

        //For Pin Code
        let $pin_code = $('#pin_code');
        let pin_code_val = $pin_code.val();
        if(pin_code_val.length !== 6 || !/^\d+$/.test(phone_number_val)){
            needToAdd = true;
            $pin_code.removeClass('is-info');
            $pin_code.addClass('is-danger');
        }else{
            $pin_code.addClass('is-info');
            $pin_code.removeClass('is-danger');
        }

        //For Email
        let $email = $('#email');
        let email_val = $email.val();
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_val) === false){
            needToAdd = true;
            $email.removeClass('is-info');
            $email.addClass('is-danger');
        }else{
            $email.addClass('is-info');
            $email.removeClass('is-danger');
        }

        //For Password
        let $password = $('#password');
        let password_val = $password.val();
        if(password_val.length < 6){
            needToAdd = true;
            $password.removeClass('is-info');
            $password.addClass('is-danger');
        }else{
            $password.addClass('is-info');
            $password.removeClass('is-danger');
        }

        let $info_about_register = $('#info-about-register');
        let $loader = $('#loader');
        $loader.addClass('is-active');
        if(needToAdd){
            setTimeout(function () {
                $info_about_register.html("<div class=\"notification is-danger\">\n" +
                    "                          <strong>Some of the fields are incorrect or empty</strong>\n" +
                    "                      </div>");
                $loader.removeClass('is-active');
            }, 1500);
        }else{
            setTimeout(function () {
                $.post('/add/checkUser', {email : email_val}, function (result) {
                    if(result.present){
                        $info_about_register.html("<div class=\"notification is-danger\">\n" +
                            "                          <strong>Email Already Registered... Try With another Email</strong>\n" +
                            "                      </div>");
                        $loader.removeClass('is-active');
                    } else{
                        $.post('/add/newUser', {
                            name: name_val,
                            phone_number:  phone_number_val,
                            blood_group: blood_group_val,
                            address: address_val,
                            pin_code: pin_code_val,
                            email: email_val,
                            password: password_val
                        }, function (result) {
                            $.post('/login', {username : email_val, password: password_val}, function (result1) {
                                let $form=$(document.createElement('form')).css({display:'none'}).attr("method","POST").attr("action","/profile");
                                let $input=$(document.createElement('input')).attr('name','id').val(result1.hash);
                                $form.append($input);
                                $("body").append($form);
                                $form.submit();
                            });
                        });
                    }
                });
            }, 1500);
        }
    });
});