
let dadosAlfaces = JSON.parse(localStorage.getItem('dadosAlfaces')) || [];
let dadosPeixes = JSON.parse(localStorage.getItem('dadosPeixes')) || [];

// Mostrar Tabela de Alfaces
document.getElementById('mostrarTabelaAlfaces').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Dados dos Alfaces Coletados</h3>
        <div class="form-group">
            <label for="mesAnoSelectAlfaces">Selecione Mês/Ano:</label>
            <select id="mesAnoSelectAlfaces" class="form-control">
                <option value="">Selecione...</option>
                <!-- As opções serão inseridas aqui -->
            </select>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Quantidade</th>
                    <th>Peso Total</th>
                    <th>Medições (cm)</th>
                </tr>
            </thead>
            <tbody id="tabelaDadosAlfaces">
                <!-- Os dados serão inseridos aqui -->
            </tbody>
        </table>
        <button id="limparDadosAlfaces" class="btn btn-danger">Limpar Dados</button>
    `;

    const mesAnoSelectAlfaces = document.getElementById('mesAnoSelectAlfaces');
    const uniqueMesAnoAlfaces = [...new Set(dadosAlfaces.map(item => `${item.mes}/${item.ano}`))];
    uniqueMesAnoAlfaces.forEach(mesAno => {
        mesAnoSelectAlfaces.innerHTML += `<option value="${mesAno}">${mesAno}</option>`;
    });

    mesAnoSelectAlfaces.addEventListener('change', function() {
        const selectedMesAno = this.value;
        const tabelaDadosAlfaces = document.getElementById('tabelaDadosAlfaces');
        tabelaDadosAlfaces.innerHTML = '';
        dadosAlfaces.forEach((item) => {
            const mesAnoItem = `${item.mes}/${item.ano}`;
            if (mesAnoItem === selectedMesAno) {
                const medicoes = item.medicoes.join(', ');
                tabelaDadosAlfaces.innerHTML += `
                    <tr>
                        <td>${item.quantidade}</td>
                        <td>${item.peso}</td>
                        <td>${medicoes}</td>
                    </tr>
                `;
            }
        });
    });

    document.getElementById('limparDadosAlfaces').addEventListener('click', function() {
        if (confirm("Tem certeza que deseja limpar todos os dados?")) {
            localStorage.removeItem('dadosAlfaces');
            dadosAlfaces = [];
            document.getElementById('tabelaDadosAlfaces').innerHTML = '';
            alert("Todos os dados foram apagados.");
        }
    });
});

// Inserir Dados de Alfaces
document.getElementById('inserirDadosAlfaces').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Inserir Dados de Alfaces</h3>
        <form id="formDadosAlfaces">
            <div class="form-group">
                <label for="mes">Mês de Medição:</label>
                <select id="mes" class="form-control" required>
                    <option value="Janeiro">Janeiro</option>
                    <option value="Fevereiro">Fevereiro</option>
                    <option value="Março">Março</option>
                    <option value="Abril">Abril</option>
                    <option value="Maio">Maio</option>
                    <option value="Junho">Junho</option>
                    <option value="Julho">Julho</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Setembro">Setembro</option>
                    <option value="Outubro">Outubro</option>
                    <option value="Novembro">Novembro</option>
                    <option value="Dezembro">Dezembro</option>
                </select>
            </div>
            <div class="form-group">
                <label for="ano">Ano:</label>
                <input type="number" class="form-control" id="ano" required>
            </div>
            <div class="form-group">
                <label for="quantidade">Quantidade de Alfaces:</label>
                <input type="number" class="form-control" id="quantidade" required>
            </div>
            <div class="form-group">
                <label for="peso">Peso Total do Alface:</label>
                <input type="number" step="0.01" class="form-control" id="peso" required>
            </div>
            <div id="medicoesAlfaces"></div>
            <button type="button" class="btn btn-primary" onclick="adicionarMedicoes()">Adicionar Medições</button>
            <button type="submit" class="btn btn-success">Salvar</button>
        </form>
    `;

    document.getElementById('formDadosAlfaces').addEventListener('submit', function(e) {
        e.preventDefault();

        const mes = document.getElementById('mes').value;
        const ano = document.getElementById('ano').value;
        const quantidade = document.getElementById('quantidade').value;
        const peso = document.getElementById('peso').value;
        const medicoes = [];
        for (let i = 1; i <= quantidade; i++) {
            medicoes.push([
                document.getElementById(`medicao${i}_1`).value,
                document.getElementById(`medicao${i}_2`).value,
                document.getElementById(`medicao${i}_3`).value,
                document.getElementById(`medicao${i}_4`).value
            ].join('/'));
        }

        dadosAlfaces.push({ mes, ano, quantidade, peso, medicoes });

        // Salvar dados no Local Storage
        localStorage.setItem('dadosAlfaces', JSON.stringify(dadosAlfaces));

        // Limpar o formulário após o envio
        document.getElementById('formDadosAlfaces').reset();
        document.getElementById('medicoesAlfaces').innerHTML = '';
    });
});

function adicionarMedicoes() {
    const quantidade = document.getElementById('quantidade').value;
    const medicoesDiv = document.getElementById('medicoesAlfaces');
    medicoesDiv.innerHTML = '';
    for (let i = 1; i <= quantidade; i++) {
        medicoesDiv.innerHTML += `
            <h4>Medições para Alface ${i}</h4>
            <div class="form-group">
                <label for="medicao${i}_1">Medição 1 (cm):</label>
                <input type="number" class="form-control" id="medicao${i}_1" required>
            </div>
            <div class="form-group">
                <label for="medicao${i}_2">Medição 2 (cm):</label>
                <input type="number" class="form-control" id="medicao${i}_2" required>
            </div>
            <div class="form-group">
                <label for="medicao${i}_3">Medição 3 (cm):</label>
                <input type="number" class="form-control" id="medicao${i}_3" required>
            </div>
            <div class="form-group">
                <label for="medicao${i}_4">Medição 4 (cm):</label>
                <input type="number" class="form-control" id="medicao${i}_4" required>
            </div>
        `;
    }
}

// Mostrar Tabela de Peixes
document.getElementById('mostrarTabelaPeixes').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Dados dos Peixes Coletados</h3>
        <div class="form-group">
            <label for="tanqueSelect">Selecione o Tanque:</label>
            <select id="tanqueSelect" class="form-control">
                <option value="">Selecione...</option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="Aquario">Aquário</option>
            </select>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Mês</th>
                    <th>Ano</th>
                    <th>Peso (g)</th>
                    <th>Quantidade</th>
                </tr>
            </thead>
            <tbody id="tabelaDadosPeixes">
                <!-- Os dados serão inseridos aqui -->
            </tbody>
        </table>
        <button id="limparDadosPeixes" class="btn btn-danger">Limpar Dados</button>
    `;

    document.getElementById('tanqueSelect').addEventListener('change', function() {
        const selectedTanque = this.value;
        const tabelaDadosPeixes = document.getElementById('tabelaDadosPeixes');
        tabelaDadosPeixes.innerHTML = '';
        dadosPeixes.forEach((item) => {
            if (item.tanque === selectedTanque) {
                tabelaDadosPeixes.innerHTML += `
                    <tr>
                        <td>${item.mes}</td>
                        <td>${item.ano}</td>
                        <td>${item.peso}</td>
                        <td>${item.quantidade}</td>
                    </tr>
                `;
            }
        });
    });

    document.getElementById('limparDadosPeixes').addEventListener('click', function() {
        if (confirm("Tem certeza que deseja limpar todos os dados?")) {
            localStorage.removeItem('dadosPeixes');
            dadosPeixes = [];
            document.getElementById('tabelaDadosPeixes').innerHTML = '';
            alert("Todos os dados foram apagados.");
        }
    });
});

// Inserir Dados de Peixes
document.getElementById('inserirDadosPeixes').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Inserir Dados de Peixes</h3>
        <form id="formDadosPeixes">
            <div class="form-group">
                <label for="mesPeixes">Mês de Medição:</label>
                <select id="mesPeixes" class="form-control" required>
                    <option value="Janeiro">Janeiro</option>
                    <option value="Fevereiro">Fevereiro</option>
                    <option value="Março">Março</option>
                    <option value="Abril">Abril</option>
                    <option value="Maio">Maio</option>
                    <option value="Junho">Junho</option>
                    <option value="Julho">Julho</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Setembro">Setembro</option>
                    <option value="Outubro">Outubro</option>
                    <option value="Novembro">Novembro</option>
                    <option value="Dezembro">Dezembro</option>
                </select>
            </div>
            <div class="form-group">
                <label for="anoPeixes">Ano:</label>
                <input type="number" class="form-control" id="anoPeixes" required>
            </div>
            <div class="form-group">
                <label for="tanquePeixes">Tanque:</label>
                <select id="tanquePeixes" class="form-control" required>
                    <option value="T1">T1</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="Aquario">Aquário</option>
                </select>
            </div>
            <div class="form-group">
                <label for="pesoPeixes">Peso Total (g):</label>
                <input type="number" step="0.01" class="form-control" id="pesoPeixes" required>
            </div>
            <div class="form-group">
                <label for="quantidadePeixes">Quantidade:</label>
                <input type="number" class="form-control" id="quantidadePeixes" required>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
        </form>
    `;

    document.getElementById('formDadosPeixes').addEventListener('submit', function(e) {
        e.preventDefault();

        const mes = document.getElementById('mesPeixes').value;
        const ano = document.getElementById('anoPeixes').value;
        const tanque = document.getElementById('tanquePeixes').value;
        const peso = document.getElementById('pesoPeixes').value;
        const quantidade = document.getElementById('quantidadePeixes').value;

        dadosPeixes.push({ mes, ano, tanque, peso, quantidade });

        // Salvar dados no Local Storage
        localStorage.setItem('dadosPeixes', JSON.stringify(dadosPeixes));

        // Limpar o formulário após o envio
        document.getElementById('formDadosPeixes').reset();
    });
});


