<?php
header('Content-Type: application/json');

$name = $_POST['nome'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$package = $_POST['package'];
$note = $_POST['note'];
$data_actual = date('d/m/Y');
$hora_actual = date('H:i:s');

$server = 'localhost';
$user = 'id22338148_iv4ndr0';
$password = 'Nelma$leite9';
$banco = 'id22338148_securityluanda';

$conn = new mysqli($server, $user, $password, $banco);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Falha ao conectar com o banco de dados']);
    exit();
}

$stmt = $conn->prepare("INSERT INTO mensagens (nome, email, telefone, plano, mensagem, Data, Hora) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $name, $email, $phone, $package, $note, $data_actual, $hora_actual);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar a mensagem: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
