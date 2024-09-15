const batidas = document.querySelectorAll(".ponto__horario")
const resultado = document.querySelector("#resultado")
const btnRegistrarHE = document.querySelector("#btn-enviar")
const controleBatidasTabela = document.querySelector("tbody")

let horasTrabalhadas = 0
let horasExtras = 0

const criarLinhaTabela = _ => controleBatidasTabela.insertRow()
const criarCelulaTabela = linha => linha.insertCell()

function inserirBatidasPonto(){
    const novaLinha = criarLinhaTabela()
    batidas.forEach(batida => criarCelulaTabela(novaLinha).innerHTML = batida.value)
}

function capturarHorarioBatidas(arrayBatidas){
    let horarioBatidas = []
    arrayBatidas.forEach((batida, i) => horarioBatidas[i] = batida.value)
    horarioBatidas = horarioBatidas
        .map(batida => batida.split(":"))
        .map(([hora, minutos]) => [Number(hora), Number(minutos)])
            
    return horarioBatidas
}

function calcularHorasTrabalhadas(arrayBatidas){
    const horarioBatidas = capturarHorarioBatidas(arrayBatidas)
    const batidasEmMinutos = horarioBatidas.map(([hora, minutos], i) => {
        if(i % 2 === 1) 
            return hora * 60 + minutos 
        else 
            return (hora * 60 + minutos) * -1
    })
    const minutosTrabalhados = batidasEmMinutos.reduce((acc, minutos) => acc + minutos)
    const horasTrabalhadas = minutosTrabalhados / 60
    return horasTrabalhadas
}

function calcularHorasExtras(){
    horasTrabalhadas = calcularHorasTrabalhadas(batidas)
    horasExtras += horasTrabalhadas - 8
    checarHoraExtraMaiorQueVinte(horasExtras)
}

function imprimirHorasExtras(horasExtras){
    const horas = String(Math.floor(horasExtras)).padStart(2, '0')
    const minutos = String(Math.floor(horasExtras % 1 * 60)).padStart(2,'0')
    return `${horas}:${minutos}`
}

function checarHoraExtraMaiorQueVinte(horasExtras){
    if(horasExtras > 20){
        alert('Suas horas extras alcançaram o limite de 20 horas')
        resultado.innerHTML = "20:00"
        return
    }
    resultado.innerHTML = imprimirHorasExtras(horasExtras)
}

btnRegistrarHE.addEventListener('click', inserirBatidasPonto)
btnRegistrarHE.addEventListener('click', calcularHorasExtras)