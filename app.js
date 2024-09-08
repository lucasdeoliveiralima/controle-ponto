let horasAcumuladas = 0;
const btnRegistro = document.querySelector(".btn");

function registrarPonto() {
    const entrada = new Date(`2023-11-22T${document.getElementById('entrada').value}`);
    const almoco = new Date(`2023-11-22T${document.getElementById('almoco').value}`);
    const retorno = new Date(`2023-11-22T${document.getElementById('retorno').value}`);
    const saida = new Date(`2023-11-22T${document.getElementById('saida').value}`);
    
    const horasExtras = ((almoco - entrada) / 3600000 + (saida - retorno) / 3600000) - 8;

    horasAcumuladas += horasExtras;

    if (horasAcumuladas > 20) {
        alert('As horas extras não podem ultrapassar 20 horas');
        horasAcumuladas -= horasExtras;
        return;
    }

    document.getElementById('horas-acumuladas').textContent = horasAcumuladas.toFixed(2);

    const tabela = document.getElementById('corpo-tabela');
    const novaLinha = tabela.insertRow();
    novaLinha.insertCell(0).textContent = entrada.toLocaleTimeString();
    novaLinha.insertCell(1).textContent = almoco.toLocaleTimeString();
    novaLinha.insertCell(2).textContent = retorno.toLocaleTimeString();
    novaLinha.insertCell(3).textContent = saida.toLocaleTimeString();
    novaLinha.insertCell(4).textContent = horasExtras.toFixed(2);

    document.getElementById('entrada').value = '';
    document.getElementById('almoco').value = '';
    document.getElementById('retorno').value = '';
    document.getElementById('saida').value = '';
}

btnRegistro.addEventListener('click', registrarPonto);