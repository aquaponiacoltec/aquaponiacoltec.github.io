<?php
if (isset($_SESSION['dadosAlfaces']) && !empty($_SESSION['dadosAlfaces'])) {
    echo '<h2>Dados dos Alfaces Coletados</h2>';
    echo '<table class="table">';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Mês</th>';
    echo '<th>Ano</th>';
    echo '<th>Quantidade</th>';
    echo '<th>Peso (g)</th>';
    echo '<th>Medições (cm)</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    // Loop para exibir cada alface coletada
    foreach ($_SESSION['dadosAlfaces'] as $alface) {
        $medicoes = implode(', ', $alface['medicoes']);
        echo '<tr>';
        echo '<td>' . htmlspecialchars($alface['mes']) . '</td>';
        echo '<td>' . htmlspecialchars($alface['ano']) . '</td>';
        echo '<td>' . htmlspecialchars($alface['quantidade']) . '</td>';
        echo '<td>' . htmlspecialchars($alface['peso']) . '</td>';
        echo '<td>' . htmlspecialchars($medicoes) . '</td>';
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
} else {
    echo '<p>Nenhum dado de alfaces coletado até o momento.</p>';
}
?>
