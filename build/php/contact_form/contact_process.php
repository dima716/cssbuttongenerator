<?php

    include 'email_validation.php';

    $post = (!empty($_POST)) ? true : false;
 
    if($post){
 

        $email = stripslashes($_POST['email']);
        $codehtml = stripslashes($_POST['codehtml']);
        $codecss = stripslashes($_POST['codecss']);
        $subject = 'Your code, bro:)';
        $error = '';    
        $message = "HTML code:"."\r\n"
                    .$codehtml."\r\n"
                    ."\r\n"
                    ."CSS code:"."\r\n"
                    .$codecss;
          
        if (!ValidateEmail($email)){
            $error = 'You entered incorrect email, bro! Try another one, my man!';
        }
 
        if(!$error){
            $mail = mail($email, $subject, $message,
                 "From: ".$name." <".$email.">\r\n"
                ."Reply-To: ".$email."\r\n"
                ."Content-type: text; charset=utf-8 \r\n"
                ."X-Mailer: PHP/" . phpversion());
 
            if($mail){
                echo 'OK';
            }
        }else{
            echo '<div class="alert alert-danger">'.$error.'</div>';
        }
 
    }
?>