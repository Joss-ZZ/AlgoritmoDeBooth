let producto;

const arrayA = document.getElementsByClassName('resultado__A');
const arrayS = document.getElementsByClassName('resultado__S');
let arrayP = document.getElementsByClassName('resultado__P');
let arraySuma = document.getElementsByClassName('suma');

const valor1 = document.getElementById('valor1');
const valor2 = document.getElementById('valor2');
const calcular = document.getElementById('Calcular');
const contenidoMultiplicando = document.querySelector('.contenido-multiplicando');
const contenidoMultiplicador = document.querySelector('.contenido-multiplicador');

const contenidoVariables = [];
contenidoVariables.push(contenidoMultiplicando);
contenidoVariables.push(contenidoMultiplicador);

let binario1 = [];
let binario2 = [];

//Función que convierte un decimal a binario
let convertirBinario = (num, binarios)=>{
     while(num>=1){
          if(num%2 === 0){
               binarios.push(0);
          }else{
               binarios.push(1);
          }
          num=Math.trunc(num/2);
     }
}

//Función que hace la suma de binarios
let SumaBinarios = (bin1 , bin2, resultado)=>{
     let acarreo = 0;
     for(let i=bin1.length; i>=0; i--){
          if(bin1[i] === 0 && bin2[i] === 0){
               if(acarreo === 0){
                    resultado.unshift(0);
               }else{
                    acarreo = 0;
                    resultado.unshift(1);
               }
          }
          if((bin1[i] === 0 && bin2[i] === 1) || (bin1[i] === 1 && bin2[i] === 0)){
               if(acarreo === 0){
                    resultado.unshift(1);
               }else{
                    resultado.unshift(0);
                    acarreo = 1;
               }
          }
          if(bin1[i] === 1 && bin2[i] === 1){
               if(acarreo === 0){
                    resultado.unshift(0);
                    acarreo = 1;
               }else{
                    resultado.unshift(1);
                    acarreo = 1;
               }
          }
     }
}

//Funcion que hace el corrimiento
let corrimiento = (binario, nuevoP)=>{
     for(let i=binario.length-2; i>=0; i--){
          if(i==0){
               nuevoP.unshift(binario[i], binario[i]);
          }else{
               nuevoP.unshift(binario[i]);
          }
     }
}

//Funcion que elimina las variables
function eliminaDatos(index){
     return new Promise( resolve =>{
          while(contenidoVariables[index].firstChild){
               contenidoVariables[index].removeChild(contenidoVariables[index].firstChild);
          }
          resolve();
     })
}

//Funciones para la animación de variables
function animacionVar(valor, tam, i){
     return new Promise(resolve =>{
          let varElement = document.createElement('div');
          varElement.classList.add('var-element');
          varElement.textContent = valor;
          contenidoVariables[i].appendChild(varElement);
          varElement.style.animation = `deslizarVar .5s ease`
          setTimeout(() => {
               contenidoVariables[i].style.animation = null;
               resolve();
          }, 1000/tam);
     })
}
async function animVar(bin1,bin2, tam){
     let eliminaVariables1 = await eliminaDatos(0);
     let eliminaVariables2 = await eliminaDatos(1);
     for(let i=0; i<tam; i++){
          let animBin1 = await animacionVar(bin1[i], tam, 0);
          let animBin2 = await animacionVar(bin2[tam+i], tam, 1);
     }
}

//Funcion para el algoritmo de Booth
function algoritmoDeBooth1(){
     //El siguiente bloque de código hace el Algorito de booth
     for(let i=0; i<productoBinario.length; i++){
          if(P[P.length-1] === P[P.length-2]){
               corrimiento(P,corrimientos);
               P = corrimientos;
               console.log(P); 
               listResultados.innerHTML += `<li>${P}</li>`
               resultado =[];
               corrimientos = [];           
          }else if(P[P.length-1] === 0 && P[P.length-2] === 1){
               SumaBinarios(P,S,resultado);
               P = resultado;
               console.log(P);
               listResultados.innerHTML += `<li>${P}</li>`
               corrimiento(P, corrimientos);
               P = corrimientos;
               console.log(P);
               listResultados.innerHTML += `<li>${P}</li>`
               resultado =[];
               corrimientos = [];  
          }else{
               SumaBinarios(P,A,resultado);
               P = resultado;
               console.log(P);
               listResultados.innerHTML += `<li>${P}</li>`
               corrimiento(P, corrimientos);
               P = corrimientos;
               console.log(P);
               listResultados.innerHTML += `<li>${P}</li>`
               resultado =[];
               corrimientos = [];  
          }
     }
     A=[];
     S=[];
     P=[];
     binario1=[];
     binario2=[];

}


//Animacion principal A, S y P
function animationPrincipal(A,S,P){
     return new Promise(resolve =>{
          const listResultados = document.getElementById('resultados');                  
          for(let i = 0; i<3; i++){
               const resultadosFila = document.createElement('div');
               resultadosFila.classList.add('resultados__fila');
               if(i===0){
                    resultadosFila.classList.add('elementoVarA');
               }else if(i===1){
                    resultadosFila.classList.add('elementoVarS');
               }else{
                    resultadosFila.classList.add('elementoVarP');
               }
               listResultados.appendChild(resultadosFila);
               for(let j = 0; j<P.length; j++){
                    const resultado = document.createElement('div');
                    resultado.classList.add('resultado');
                    if(i===0){
                         resultado.classList.add('resultado__A');
                         resultado.textContent = A[j];
                    }else if(i===1){
                         resultado.classList.add('resultado__S');
                         resultado.textContent = S[j];
                    }else{
                         resultado.textContent = P[j];
                         resultado.classList.add('resultado__P');                             
                    }
                    resultado.style.animation = `agrandar 1s ease-in`;
                    resultadosFila.appendChild(resultado);
               }     
          }
          setTimeout(() => {
               resolve();
          }, 1000);
     })
}

//Animacion corrimiento elemento por elemento
function elementoCorrimiento(elemento, accion){
     return new Promise(resolve =>{
          elemento.style.opacity = '1';
          if(accion===0){
               elemento.style.animation = `abajo .5s ease`;
          }else{
               elemento.style.animation = `corrimiento .5s ease`;
          }
          setTimeout(() => {
               resolve();
          }, 500);
     })
}

async function elementoCorre(resultadosFila){
     for(let i=arrayP.length-1; i>=0; i--){
          if(i===0){
               await elementoCorrimiento(arrayP[i], 0);
          }else{
               await elementoCorrimiento(arrayP[i], 1);
          }
     }
     resultadosFila.classList.add('elementoVarP');
}

//Animacion corrimiento
async function animationCorrimiento(P){
     return new Promise(resolve =>{
          //Removemos la clase resultado__P del DOM*/
          let arrayPTam = arrayP.length;
          for(let i=0; i<arrayPTam; i++){
               arrayP[0].classList.remove('resultado__P');
          }
          //Añadimos el nuevo P al DOM
          const listResultados = document.getElementById('resultados'); 
          const resultadosFila = document.createElement('div');
          resultadosFila.classList.add('resultados__fila');
          listResultados.appendChild(resultadosFila);
          for(let i = 0; i<P.length; i++){
               const resultado = document.createElement('div');
               resultado.classList.add('resultado', 'resultado__P');
               resultado.textContent = P[i];
               resultado.style.opacity = '0';
               resultadosFila.appendChild(resultado);
          }
          //Animamos el corrimiento elemento por elemento
          elementoCorre(resultadosFila);
          setTimeout(() => {
               resolve();
          }, P.length*1000/2);
     })
}

//Animacion corrimiento elemento por elemento
function elementoSumayBaja(elemento){
     return new Promise(resolve =>{
          elemento.style.opacity = '1';
          elemento.style.animation = `abajo .5s ease`;
          setTimeout(() => {
               resolve();
          }, 500);
     })
}

async function elementoBaja(){
     for(let i=arraySuma.length-1; i>=0; i--){
          await elementoSumayBaja(arraySuma[i]);
     }
}

//Animacion suma binaria
async function animationSumaBinaria(P){
     return new Promise(resolve =>{
          //Removemos la clase suma del DOM*/
          let arraySumaTam = arraySuma.length;
          for(let i=0; i<arraySumaTam; i++){
               arraySuma[0].classList.remove('suma');
          }
          //Añadimos la suma binaria al DOM
          const listResultados = document.getElementById('resultados'); 
          const resultadosFila = document.createElement('div');
          resultadosFila.classList.add('resultados__fila');
          listResultados.appendChild(resultadosFila);
          for(let i = 0; i<P.length; i++){
               const resultado = document.createElement('div');
               resultado.classList.add('resultado', 'suma');
               resultado.textContent = P[i];
               resultado.style.opacity = '0';
               resultadosFila.appendChild(resultado);
          }
          //Animamos la suma elemento por elemento
          elementoBaja();
          setTimeout(() => {
               resolve();
          }, P.length*1000/2);
     })
}

async function animarSumaFila(accion, color, valorpintar){
     return new Promise(resolve =>{
          for(let i=0; i<arrayP.length; i++){
               if(i>=arrayP.length-2 && valorpintar==='despinta'){
                    arrayP[i].style.backgroundColor = 'red';
                    arrayP[i].style.transition = 'background 2s';
               }else{
                    arrayP[i].style.backgroundColor = color;
                    arrayP[i].style.transition = 'background 2s';
               }
               if(accion === '01'){
                    arrayA[i].style.backgroundColor = color;
                    arrayA[i].style.transition = 'background 2s';
               }else if(accion ==='10'){
                    arrayS[i].style.backgroundColor = color;
                    arrayS[i].style.transition = 'background 2s';
               }
          }
          setTimeout(() => {
               resolve();
          }, 1000);
     })
}

//Animacion reglas(reutizable)
function animationReglas(){
     return new Promise(resolve =>{
          for(let i=arrayP.length-2;i<arrayP.length;i++){
               arrayP[i].style.transition = 'all 2s';
               arrayP[i].style.backgroundColor = 'red';
          }
          setTimeout(() => {
               resolve();
          }, 1000);
     })
}

//Animacion flecha(reutilizable)
function animationFlecha(){
     return new Promise(resolve =>{
          const fila = document.getElementById('resultados').lastChild;
          let flecha = document.createElement('img');
          flecha.src = 'img/pointer.png';
          flecha.classList.add('flecha');
          flecha.style.animation = `deslizar 1s ease`;
          fila.appendChild(flecha);
          setTimeout(() => {
               flecha.style.animation = null;
               resolve();
          }, 1000);
     })
}

//Animacion operacion regla(reutilizable)
function animationReglaOP(op){
     return new Promise(resolve =>{
          const fila = document.getElementById('resultados').lastChild;
          let reglaOP = document.createElement('div');
          reglaOP.classList.add('regla');
          if(op === 'corre'){
               reglaOP.textContent = 'Corrimiento';
          }else if(op === '01'){
               reglaOP.textContent = 'P + A ; ==>';
          }else{
               reglaOP.textContent = 'P + S ; ==>';
          }
          reglaOP.style.animation = `agrandar 1s ease-in`;
          fila.appendChild(reglaOP);
          setTimeout(() => {
               reglaOP.style.animation = null;
               resolve();
          }, 1000);
     })
}

async function algoritmoDeBooth(A, S, P,productoBinario){
     await animationPrincipal(A,S,P);
     //El siguiente bloque de código hace el Algorito de booth
     let resultado = [];
     let corrimientos = [];
     for(let i=0; i<productoBinario.length; i++){
          if(P[P.length-1] === P[P.length-2]){
               await animationReglas();
               await animationFlecha();
               await animationReglaOP('corre');
               corrimiento(P,corrimientos);
               P = corrimientos;
               await animationCorrimiento(P);

               resultado =[];
               corrimientos = [];           
          }else if(P[P.length-1] === 0 && P[P.length-2] === 1){
               await animationReglas();
               await animationFlecha();
               await animationReglaOP('10');
               SumaBinarios(P,S,resultado);
               P = resultado;
               await animarSumaFila('10', 'yellow', 'pinta');
               await animationSumaBinaria(P)
               await animarSumaFila('10', '#64d419', 'despinta');             

               corrimiento(P, corrimientos);
               P = corrimientos;
               await animationCorrimiento(P);

               resultado =[];
               corrimientos = [];  
          }else{
               await animationReglas();
               await animationFlecha();
               await animationReglaOP('01');
               SumaBinarios(P,A,resultado);
               P = resultado;
               await animarSumaFila('01','yellow', 'pinta');
               await animationSumaBinaria(P);
               await animarSumaFila('01', '#64d419', 'despinta');    

               corrimiento(P, corrimientos);
               P = corrimientos;
               await animationCorrimiento(P);

               resultado =[];
               corrimientos = [];  
          }
     }
     A=[];
     S=[];
     P=[];
     binario1=[];
     binario2=[];
}

//Evento de cacular producto
calcular.addEventListener('click', (e)=>{
     e.preventDefault();
     if(valor1.value.length != 0 && valor2.value.length != 0){
          if(isNaN(Number(valor1.value)) || isNaN(Number(valor2.value))){
               document.getElementById('mensaje-error').style.display = 'block';
          }else{
               document.getElementById('mensaje-error').style.display = 'none';
               producto = parseInt(valor1.value)*parseInt(valor2.value);
               //Ejecutamos la lineas de código solo si el producto no superar los 7 bits en binario o el 127 en decimal
               if(producto<=127){
                    let itemResultados = document.getElementById('resultados');
                    while(itemResultados.firstChild) {
                         itemResultados.removeChild(itemResultados.firstChild);
                    }
                    convertirBinario(parseInt(valor1.value),binario1);
                    convertirBinario(parseInt(valor2.value),binario2);
                    console.log(producto.toString(2));

                    let productoBinario = producto.toString(2)+'';
                    let diferencia1 = productoBinario.length-binario1.length;
                    let diferencia2 = productoBinario.length-binario2.length;

                    for(let i=0; i<diferencia1; i++){
                         binario1.push(0);
                    }
                    for(let i=0; i<diferencia2; i++){
                         binario2.push(0);
                    }

                    binTam = binario1.length;
                    binario1.reverse();
                    binario2.reverse();

                    console.log(binario1);
                    console.log(binario2);

                    animVar(binario1,binario2, binTam);


                    let A = binario1;
                    let S = [];
               
                    //Pasamos a complemento A2
                    for(let i=productoBinario.length-1;i>=0;i--){
                         S.unshift(A[i]);
                         if(A[i] === 1){
                              for(let j=i-1; j>=0; j--){
                                   if(A[j] === 0){
                                        S.unshift(1);
                                   }else{
                                        S.unshift(0);
                                   }
                              }
                              break;
                         }
                    }
               
                    //Agregamos un 0 a los arrays para completarlos con 0 en un solo for
                    A.push(0);
                    S.push(0);
                    let P = binario2;
                    P.push(0);
               
                    //Completamos con 0 los 3 arreglos 
                    for(let i=0; i<productoBinario.length; i++){
                         P.unshift(0);
                         A.push(0);
                         S.push(0);
                    }
                    console.log(A);
                    console.log(S);
                    console.log(P);

                    document.querySelector('.contenido-spinner').style.display = 'block';

                    setTimeout(() => {
                         document.querySelector('.contenido-spinner').style.display = 'none';
                         algoritmoDeBooth(A,S,P,productoBinario);
                    }, 2000);                 
               }else{
                    //Mandamos un mensaje de error
                    console.log("El producto supera los 7 bits")
               }
               
          }
     }else{
          document.getElementById('mensaje-error').style.display = 'block';
     }
})
               