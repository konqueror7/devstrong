<?php

if (isset($_POST["email"]) && isset($_POST["search"])) {
    $response_mail = $_POST["email"];
    $to = "pup@kinvas.ya";
    $subject = "Заявка с сайта удочек";
    $what = $_POST["search"];

    $message = "Пользователь ищет: ".htmlspecialchars($what)."<br />
    E-mail для новостной рассылки: ".htmlspecialchars($response_mail);

    $headers = "From: LOGOtype <site-email@logotype.ru>\r\nContent-type: text/html; charset=utf-8 \r\n";
    mail($to, $subject, $message, $headers);

    $response = ['success' => true, 'email' => $response_mail, 'search' => $what] ;
    echo json_encode($response);
}
