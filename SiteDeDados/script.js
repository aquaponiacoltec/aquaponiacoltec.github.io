let dadosAlfaces = [];

function fetchAlfacesData() {
    fetch('https://script.google.com/macros/s/AKfycbwrZLLmrjcw7TuCoOL1sIUe0pa9sfNgFUIsPrF-YdI/dev') 
        .then(response => response.json())
        .then(data => {
            dadosAlfaces = data.map(row => ({
                mes: row[0],
                ano: row[1],
                quantidade: row[2],
                peso: row[3],
                medicoes: row[4].split(', ')
            }));
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function enviarDadosAlfaces() {
    const dadosAlfaces = {
        type: "alface",
        mes: document.getElementById('mes').value,
        ano: document.getElementById('ano').value,
        quantidade: document.getElementById('quantidade').value,
        peso: document.getElementById('peso').value,
        medicoes: []
    };

    fetch('https://script.google.com/macros/s/AKfycbwrZLLmrjcw7TuCoOL1sIUe0pa9sfNgFUIsPrF-YdI/dev', {  // Substitua pela URL do seu Google Apps Script
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAlfaces),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchAlfacesData();  // Atualiza os dados da tabela
    })
    .catch(error => console.error('Erro ao enviar dados:', error));
}


function limparDadosAlfaces() {
    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limpar=true', {  // Adicionando um parâmetro para indicar que a ação é de limpeza
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        alert("Todos os dados foram apagados.");
        dadosAlfaces = [];
        document.getElementById('tabelaDadosAlfaces').innerHTML = '';
    })
    .catch(error => console.error('Erro ao limpar dados:', error));
}

document.getElementById('mostrarTabelaAlfaces').addEventListener('click', function() {
    fetchAlfacesData();

    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Dados dos Alfaces Coletados</h3>
        <div class="form-group">
            <label for="mesAnoSelectAlfaces">Selecione Mês/Ano:</label>
            <select id="mesAnoSelectAlfaces" class="form-control">
                <option value="">Selecione...</option>
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

    document.getElementById('limparDadosAlfaces').addEventListener('click', limparDadosAlfaces);
});

document.getElementById('inserirDadosAlfaces').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Inserir Dados de Alfaces</h3>
        <form id="formDadosAlfaces">
            <!-- Formulário aqui... -->
        </form>
    `;

    document.getElementById('formDadosAlfaces').addEventListener('submit', function(e) {
        e.preventDefault();

        const dadosAlfaces = {
            mes: document.getElementById('mes').value,
            ano: document.getElementById('ano').value,
            quantidade: document.getElementById('quantidade').value,
            peso: document.getElementById('peso').value,
            medicoes: []
        };

        enviarDadosAlfaces(dadosAlfaces);
    });
});

function enviarDadosPeixes() {
    const dadosPeixes = {
        type: "peixe",
        mes: document.getElementById('mes').value,
        ano: document.getElementById('ano').value,
        tanque: document.getElementById('tanque').value,
        peso: document.getElementById('peso').value,
        quantidade: document.getElementById('quantidade').value,
        tamanho: document.getElementById('tamanho').value,
    };

    fetch('URL_DO_SEU_APPS_SCRIPT', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosPeixes),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchDados();
    })
    .catch(error => console.error('Erro ao enviar dados:', error));
}

document.getElementById('formDadosPeixes').addEventListener('submit', function(e) {
    e.preventDefault();
    enviarDadosPeixes();
});


// Função para limpar os dados dos peixes na planilha
function limparDadosPeixes() {
    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limparPeixes=true', {  // Adicionando um parâmetro para indicar que a ação é de limpeza
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        alert("Todos os dados dos peixes foram apagados.");
        dadosPeixes = [];
        document.getElementById('tabelaDadosPeixes').innerHTML = '';
    })
    .catch(error => console.error('Erro ao limpar dados:', error));
}

// Mostrar Tabela de Peixes
document.getElementById('mostrarTabelaPeixes').addEventListener('click', function() {
    fetchDados();  // Buscar os dados da planilha antes de mostrar

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
                    <th>Tamanho (cm)</th>
                </tr>
            </thead>
            <tbody id="tabelaDadosPeixes">
                <!-- Os dados serão inseridos aqui -->
            </tbody>
        </table>
        <button id="limparDadosPeixes" class="btn btn-danger">Limpar Dados</button>
    `;

    const tanqueSelect = document.getElementById('tanqueSelect');
    tanqueSelect.addEventListener('change', function() {
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
                        <td>${item.tamanho}</td>
                    </tr>
                `;
            }
        });
    });

    document.getElementById('limparDadosPeixes').addEventListener('click', limparDadosPeixes);
});

// Inserir Dados de Peixes
document.getElementById('inserirDadosPeixes').addEventListener('click', function() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h3>Inserir Dados de Peixes</h3>
        <form id="formDadosPeixes">
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
                <label for="tanque">Tanque:</label>
                <select id="tanque" class="form-control" required>
                    <option value="T1">T1</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="Aquario">Aquário</option>
                </select>
            </div>
            <div class="form-group">
                <label for="peso">Peso Total dos Peixes (g):</label>
                <input type="number" step="0.01" class="form-control" id="peso" required>
            </div>
            <div class="form-group">
                <label for="quantidade">Quantidade de Peixes:</label>
                <input type="number" class="form-control" id="quantidade" required>
            </div>
            <div class="form-group">
                <label for="tamanho">Tamanho Médio dos Peixes (cm):</label>
                <input type="number" step="0.01" class="form-control" id="tamanho" required>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
        </form>
    `;

    document.getElementById('formDadosPeixes').addEventListener('submit', function(e) {
        e.preventDefault();

        const dadosPeixes = {
            mes: document.getElementById('mes').value,
            ano: document.getElementById('ano').value,
            tanque: document.getElementById('tanque').value,
            peso: document.getElementById('peso').value,
            quantidade: document.getElementById('quantidade').value,
            tamanho: document.getElementById('tamanho').value,
        };

        enviarDadosPeixes(dadosPeixes);
    });
});