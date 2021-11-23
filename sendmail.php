<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('example@mail.com', 'Name');
$mail->addAddress('example@mail.com');
$mail->Subject = 'Тестовое задание "Форма обратной связи"';

$body = '<h1>Сообщение и контактные данные</h1>';

$name = $_POST['name'];
$email = $_POST['email'];
$phoneNumber = $_POST['phoneNumber'];
$dateOfBirth = $_POST['dateOfBirth'];
$question = $_POST['question'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$phoneNumber = htmlspecialchars($phoneNumber);
$dateOfBirth = htmlspecialchars($dateOfBirth);
$question = htmlspecialchars($question);

$name = urldecode($name);
$email = urldecode($email);
$phoneNumber = urldecode($phoneNumber);
$dateOfBirth = urldecode($dateOfBirth);
$question = urldecode($question);

$name = trim($name);
$email = trim($email);
$phoneNumber = trim($phoneNumber);
$dateOfBirth = trim($dateOfBirth);
$question = trim($question);

$body.='<p><strong>Имя:</strong> '.$name.'</p>';
$body.='<p><strong>Телефон:</strong> '.$email.'</p>';
$body.='<p><strong>Почта:</strong> '.$phoneNumber.'</p>';
$body.='<p><strong>Дата рождения:</strong> '.$dateOfBirth.'</p>';
$body.='<p><strong>Вопрос:</strong> '.$question.'</p>';

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка при отправке';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>