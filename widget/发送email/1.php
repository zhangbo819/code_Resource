<?php
$to = "297234792@qq.com";
$subject = "Test mail";
$message = "Hello! This is a simple email message.";
$from = "someonelse@example.com";
$headers = "From: $from";

SMTP PHP_INI_ALL;

mail($to,$subject,$message,$headers);
echo "Mail Sent.";