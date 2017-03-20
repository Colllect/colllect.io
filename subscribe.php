<?php
var_dump(isset($_POST['email']), filter_var($_POST['email'], FILTER_VALIDATE_EMAIL));
if (isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    if (file_put_contents('subscribers', $_POST['email'] . PHP_EOL, FILE_APPEND) === false) {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}
