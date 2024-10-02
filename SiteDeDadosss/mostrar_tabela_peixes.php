<?php
session_start();
if (isset($_SESSION['dadosPeixes']) && !empty($_SESSION['dadosPeixes'])) {
    echo '<h3>Dados dos Peixes Coletados</h3>';
    echo '<table class="table table-bordered">';
    echo '<thead><tr><th>Mês</th><th>Ano</th><th>Tanque</th><th>Peso (g)</th><th>Quantidade</th></tr></thead>';
    echo '<tbody>';
    foreach ($_SESSION['dadosPeixes'] as $peixe) {
        echo "<tr><td>{$peixe['mes']}</td><td>{$peixe['ano']}</td><td>{$peixe['tanque']}</td><td>{$peixe['peso']}</td><td>{$peixe['quantidade']}</td></tr>";
    }
    echo '</tbody></table>';
} else {
    echo '<p>Nenhum dado de peixes coletado até o momento.</p>';
}
?>
