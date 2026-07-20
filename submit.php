<?php
/**
 * Server-side form handler for Waypoint Machine Works
 * Fallback if Formspree is not configured.
 * Sends form submissions to info@waypointmachineworks.com
 */

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Honeypot check
if (!empty($_POST['_gotcha'])) {
    // Bot detected — return fake success
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
    exit;
}

// Sanitize inputs
$to = 'info@waypointmachineworks.com';
$fields = [];

foreach ($_POST as $key => $value) {
    if ($key === '_gotcha') continue;
    $fields[htmlspecialchars($key, ENT_QUOTES, 'UTF-8')] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

// Build email
$subject = 'Waypoint Site Inquiry';
if (!empty($fields['inquiry_type'])) {
    $subject = 'Wholesale Inquiry: ' . $fields['inquiry_type'];
} elseif (!empty($fields['subject'])) {
    $subject = 'Contact: ' . $fields['subject'];
}

$body = "New inquiry from waypointmachineworks.com\n";
$body .= str_repeat('-', 40) . "\n\n";

foreach ($fields as $key => $value) {
    $label = ucwords(str_replace('_', ' ', $key));
    $body .= "$label: $value\n";
}

$body .= "\n" . str_repeat('-', 40);
$body .= "\nSubmitted: " . date('Y-m-d H:i:s T');

$headers = 'From: noreply@waypointmachineworks.com' . "\r\n";
if (!empty($fields['email'])) {
    $headers .= 'Reply-To: ' . $fields['email'] . "\r\n";
}
$headers .= 'X-Mailer: WaypointSite/1.0';

$sent = mail($to, $subject, $body, $headers);

header('Content-Type: application/json');
if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
