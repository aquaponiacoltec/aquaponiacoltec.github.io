<?php
session_start();

if (!isset($_SESSION['dadosAlfaces'])) {
    $_SESSION['dadosAlfaces'] = [];
}
if (!isset($_SESSION['dadosPeixes'])) {
    $_SESSION['dadosPeixes'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'adicionarAlfaces') {
    $mes = $_POST['mes'];
    $ano = $_POST['ano'];
    $quantidade = $_POST['quantidade'];
    $peso = $_POST['peso'];
    $medicoes = $_POST['medicoes'];

    $_SESSION['dadosAlfaces'][] = [
        'mes' => $mes,
        'ano' => $ano,
        'quantidade' => $quantidade,
        'peso' => $peso,
        'medicoes' => $medicoes
    ];

    echo "Dados de alfaces adicionados com sucesso!";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'adicionarPeixes') {
    $mes = $_POST['mes'];
    $ano = $_POST['ano'];
    $tanque = $_POST['tanque'];
    $peso = $_POST['peso'];
    $quantidade = $_POST['quantidade'];

    $_SESSION['dadosPeixes'][] = [
        'mes' => $mes,
        'ano' => $ano,
        'tanque' => $tanque,
        'peso' => $peso,
        'quantidade' => $quantidade
    ];

    echo "Dados de peixes adicionados com sucesso!";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'limparAlfaces') {
    $_SESSION['dadosAlfaces'] = [];
    echo "Dados de alfaces limpos.";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'limparPeixes') {
    $_SESSION['dadosPeixes'] = [];
    echo "Dados de peixes limpos.";
}
?>
