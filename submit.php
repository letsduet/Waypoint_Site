<?php
/**
 * Server-side form handler for Waypoint Machine Works.
 * Sends form submissions to info@waypointmachineworks.com and logs every
 * attempt (independent of email delivery) for diagnostics.
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

$to      = 'info@waypointmachineworks.com';
$domain  = 'waypointmachineworks.com';
$envFrom = 'noreply@' . $domain; // envelope sender — must be a domain address for SPF alignment

// Sanitize inputs
$fields = [];
foreach ($_POST as $key => $value) {
    if ($key === '_gotcha') continue;
    if (!is_string($value)) continue;
    $fields[htmlspecialchars($key, ENT_QUOTES, 'UTF-8')] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

// Build email
$subject = 'Waypoint Site Inquiry';
if (!empty($fields['inquiry_type'])) {
    $subject = 'Wholesale Inquiry: ' . $fields['inquiry_type'];
} elseif (!empty($fields['subject'])) {
    $subject = 'Contact: ' . $fields['subject'];
}

$body  = "New inquiry from {$domain}\n";
$body .= str_repeat('-', 40) . "\n\n";
foreach ($fields as $key => $value) {
    $label = ucwords(str_replace('_', ' ', $key));
    $body .= "$label: $value\n";
}
$body .= "\n" . str_repeat('-', 40);
$body .= "\nSubmitted: " . date('Y-m-d H:i:s T');

// Reply-To lets you hit "reply" straight to the sender.
$replyTo = '';
if (!empty($fields['email']) && filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    $replyTo = $fields['email'];
}

$headers  = 'From: Waypoint Website <' . $envFrom . '>' . "\r\n";
if ($replyTo !== '') {
    $headers .= 'Reply-To: ' . $replyTo . "\r\n";
}
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'X-Mailer: WaypointSite/1.0';

// Set the envelope sender (-f) so bounces are addressed and SPF aligns to the domain.
$sent = @mail($to, $subject, $body, $headers, '-f' . $envFrom);

// --- Diagnostics: record every attempt so nothing is ever lost, even if mail() fails.
$logLine = sprintf(
    "[%s] mail()=%s to=%s replyto=%s ip=%s subject=%s | %s\n",
    date('Y-m-d H:i:s T'),
    $sent ? 'OK' : 'FALSE',
    $to,
    $replyTo !== '' ? $replyTo : '-',
    $_SERVER['REMOTE_ADDR'] ?? '-',
    $subject,
    str_replace(["\r", "\n"], ' ', $body)
);

// Prefer a log OUTSIDE the web root (cPanel home dir); fall back to alongside this script.
$logCandidates = [__DIR__ . '/../waypoint-form.log', __DIR__ . '/waypoint-form.log'];
foreach ($logCandidates as $logPath) {
    if (@file_put_contents($logPath, $logLine, FILE_APPEND | LOCK_EX) !== false) {
        break;
    }
}
error_log('Waypoint form submit: mail()=' . ($sent ? 'true' : 'false') . ' to=' . $to);

header('Content-Type: application/json');
if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
