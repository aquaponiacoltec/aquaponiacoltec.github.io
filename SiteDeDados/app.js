function showForm(formId) {
    hideAllSections();
    document.getElementById(formId).style.display = 'block';
}

function showTable(tableId) {
    hideAllSections();
    document.getElementById(tableId).style.display = 'block';
    loadDataFromGoogleSheets(tableId);
}

document.addEventListener('DOMContentLoaded', function () {
    hideAllSections();
});

function hideAllSections() {
    const sections = document.getElementsByClassName('form-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
}

document.getElementById('quantidadeAlface').addEventListener('change', function() {
    const quantidade = parseInt(this.value);
    const container = document.getElementById('medicoesFolhasContainer');
    container.innerHTML = '';

    for (let i = 1; i <= quantidade; i++) {
        const div = document.createElement('div');
        div.className = 'mb-3';
        div.innerHTML = `
            <label for="tamanhoFolha${i}" class="form-label">Tamanho das 4 folhas do Alface ${i} (cm)</label>
            <input type="text" class="form-control" id="tamanhoFolha${i}" placeholder="Ex: 5, 6, 5.5, 6.2" required>
        `;
        container.appendChild(div);
    }
});

document.getElementById('colheitaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const quantidade = document.getElementById('quantidadeAlface').value;
    const medicoes = [];

    for (let i = 1; i <= quantidade; i++) {
        const tamanho = document.getElementById(`tamanhoFolha${i}`).value;

        if (!tamanho) {
            alert(`O tamanho das folhas do Alface ${i} está vazio.`);
            return;
        }

        const parsedMedicoes = tamanho.split(',').map(Number);
        medicoes.push(parsedMedicoes);
    }

    const data = {
        data: document.getElementById('dataAlface').value,
        quantidade: document.getElementById('quantidadeAlface').value,
        peso: document.getElementById('pesoAlface').value,
        medicoes: medicoes
    };

    console.log("Enviando os seguintes dados de Alface:", data);
    submitDataToGoogleSheets(data, 'alface');
});

document.getElementById('peixeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = {
        data: document.getElementById('dataPeixe').value,
        tanque: document.getElementById('tanquePeixe').value,
        peso: document.getElementById('pesoPeixe').value,
        quantidade: document.getElementById('quantidadePeixe').value
    };

    console.log("Enviando os seguintes dados de Peixes:", data);
    submitDataToGoogleSheets(data, 'peixe');
});

function submitDataToGoogleSheets(data, tipo) {
    fetch('https://script.google.com/macros/s/AKfycbxuHgR1Z_tPEEGNtDLyod4APPTnowi01FoXWFuH0wn5Rm3bh5hmUegFsdEXP6ZROVvB/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, tipo })
    })
    .then(() => alert('Dados enviados com sucesso!'))
    .catch(error => console.error('Erro ao enviar os dados:', error));
}

function loadDataFromGoogleSheets(tableId) {
    fetch('https://script.google.com/macros/s/AKfycbxuHgR1Z_tPEEGNtDLyod4APPTnowi01FoXWFuH0wn5Rm3bh5hmUegFsdEXP6ZROVvB/exec?tipo=' + tableId, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById(tableId + 'Body');
        tableBody.innerHTML = '';
        data.forEach(row => {
            let tr = document.createElement('tr');
            row.forEach(cell => {
                let td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    })    
    .catch(error => console.error('Erro ao carregar os dados:', error));
}
