<?php

require('.env.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    return;
}

if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    return;
}

// Add the email
const CONTACTS_API_URL = 'https://sarbacaneapis.com/v1/lists/' . LIST_ID . '/contacts/upsert';
$curl = curl_init(CONTACTS_API_URL);
curl_setopt(
    $curl,
    CURLOPT_HTTPHEADER,
    [
        'Content-Type: application/json',
        'accountId: ' . ACCOUNT_ID,
        'apiKey: ' . API_KEY,
    ]
);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([
    'email' => $_POST['email'],
]));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_exec($curl);
$httpResponseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($httpResponseCode !== 200) {
    http_response_code(500);

    return;
}

http_response_code(200);
