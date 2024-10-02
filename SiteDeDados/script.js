let dadosAlfaces = [];
let dadosPeixes = []; // Variável para armazenar dados dos peixes

// Funções para Alfaces
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
        mes: document.getElementById('mes').value,
        ano: document.getElementById('ano').value,
        quantidade: document.getElementById('quantidade').value,
        peso: document.getElementById('peso').value,
        medicoes: []
    };

    fetch('https://script.google.com/macros/s/AKfycbwrZLLmrjcw7TuCoOL1sIUe0pa9sfNgFUIsPrF-YdI/dev', {
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
    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limpar=true', {
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

// Funções para Peixes
function fetchDadosPeixes() {
    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limpar=true') // Substitua pela URL correta
        .then(response => response.json())
        .then(data => {
            dadosPeixes = data.map(row => ({
                mes: row[0],
                ano: row[1],
                tanque: row[2],
                peso: row[3],
                quantidade: row[4],
                tamanho: row[5]
            }));
        })
        .catch(error => console.error('Erro ao buscar dados dos peixes:', error));
}

function enviarDadosPeixes() {
    const dadosPeixes = {
        mes: document.getElementById('mes').value,
        ano: document.getElementById('ano').value,
        tanque: document.getElementById('tanque').value,
        peso: document.getElementById('peso').value,
        quantidade: document.getElementById('quantidade').value,
        tamanho: document.getElementById('tamanho').value,
    };

    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limparDadosPeixes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosPeixes),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchDadosPeixes();
    })
    .catch(error => console.error('Erro ao enviar dados dos peixes:', error));
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
            <tbody id="tabelaDadosAlfaces"></tbody>
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
                <label for="peso">Peso Total (kg):</label>
                <input type="number" class="form-control" id="peso" required>
            </div>
            <button type="button" class="btn btn-primary" id="submitDadosAlfaces">Enviar Dados</button>
        </form>
    `;

    document.getElementById('submitDadosAlfaces').addEventListener('click', enviarDadosAlfaces);
});

document.getElementById('mostrarTabelaPeixes').addEventListener('click', function() {
    fetchDadosPeixes();
});

function mostrarTabelaPeixes() {
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
            <tbody id="tabelaDadosPeixes"></tbody>
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
};

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
            <button type="button" class="btn btn-success" id="submitDadosPeixes">Salvar</button>
        </form>
    `;

    document.getElementById('submitDadosPeixes').addEventListener('click', enviarDadosPeixes);
});

// Função para limpar os dados dos peixes na planilha
function limparDadosPeixes() {
    fetch('https://script.google.com/macros/s/AKfycbxBh3DIJcSY2ZtNLyAJOAuBljPa6rgvtqeiEsWt66qvp7eNIVXK9aeMbYX-LKOKCGn9/exec?limparPeixes=true', {
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
