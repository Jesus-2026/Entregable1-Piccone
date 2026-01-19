//🏥 Calculadora de Índice de Masa Corporal (IMC)



/* Simulador web de cálculo de IMC que procesa datos de múltiples 
personas (nombre, peso, altura), determina su índice de masa 
corporal, clasifica su categoría de salud y almacena los resultados
 en localStorage. Desarrollado con HTML, CSS y JavaScript, 
 implementando manipulación del DOM, arrays de objetos
 y almacenamiento local para simular persistencia de datos.
*/


// CONSTANTES - Valores de referencia para categorías IMC

const bajoPeso = 18.5;
const pesoNormal = 25;
const sobrePeso = 29.9;
const obesidad = 30;



// ARRAY para guardar todas las personas en localstorage
let personas = JSON.parse(localStorage.getItem('personas')) || [];



function pedirDatos(){
    let nombre = document.getElementById('inputNombre').value;
    let peso = parseFloat(document.getElementById('inputPeso').value);
    let altura = parseFloat(document.getElementById('inputAltura').value);
    return {nombre, peso, altura};
}

function calcularIMC(peso, altura){
    let imc = peso / (altura * altura);
    return imc;
}

function determinarCategoria(imc){
    if (imc < bajoPeso){
        return "Bajo Peso";
    } else if(imc >= bajoPeso && imc < pesoNormal){
        return "Peso Normal";
    } else if( imc >= pesoNormal && imc < sobrePeso) {
        return "Atención, Sobre Peso!!"
    } else if( imc >= sobrePeso ){
        return "Alerta, Obesidad!!"
    }

}

const formulario = document.getElementById('formularioIMC');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue
    
    // 1. Obtener datos del formulario
    let datos = pedirDatos();
    
    // 2. Calcular IMC
    let resultadoIMC = calcularIMC(datos.peso, datos.altura);
    
    // 3. Determinar categoría
    let categoria = determinarCategoria(resultadoIMC);
    
    let persona = {
        nombre: datos.nombre,
        peso: datos.peso,
        altura: datos.altura,
        imc: resultadoIMC.toFixed(2),
        categoria: categoria
    };

    personas.push(persona);

    localStorage.setItem('personas', JSON.stringify(personas));

    console.log("personasguardadas:", personas);    
    
    
    //4. Mostrar resultado en la pagina

    let divResultado = document.getElementById('resultado');
    divResultado.innerHTML = `
        <div class="resultado">
            <h3>Resultado:</h3>
            <p><strong>Peso:</strong> ${datos.peso} kg</p>
            <p><strong>Altura:</strong> ${datos.altura} m</p>
            <p><strong>IMC:</strong> ${resultadoIMC.toFixed(2)} </p>
            <p><strong>Categoria:</strong> ${categoria}</p>
        </div>`;


 })

