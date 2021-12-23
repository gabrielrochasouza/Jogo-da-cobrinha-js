import { createTable,ctx,canvas,body,span,maxScore,maxScoreSpan } from "./areaJogo.js";

createTable()
let quantidadeQuadrados
let tamanhoQuadrados=15
let gameStarted=false
let score=0
let interval
const arrScore=[]

let keyDownPressed=false

function verificarQuantidadeDeQuadrados(){
    if(window.innerWidth<=360){
        quantidadeQuadrados=20
        interval=120
    }
    if(window.innerWidth>360 && window.innerWidth<600){
        quantidadeQuadrados=23
        interval=80
    }
    if(window.innerWidth>=600){
        quantidadeQuadrados=30
        interval=60
    }
}
verificarQuantidadeDeQuadrados()
window.onresize=function(){
    body.innerHTML=''

    createTable()
    verificarQuantidadeDeQuadrados()
    canvas.width=tamanhoQuadrados*quantidadeQuadrados
    canvas.height=tamanhoQuadrados*quantidadeQuadrados
    pintarTabuleiro()
    macaX=Math.floor(Math.random()*quantidadeQuadrados  )
    macaY=Math.floor(Math.random()*quantidadeQuadrados  )
    maçaUpdate(macaX,macaY)
    pintarCobra(cabecaX,cabecaY)
}

//maça
let macaX=Math.floor(Math.random()*quantidadeQuadrados  )
let macaY=Math.floor(Math.random()*quantidadeQuadrados  )

//cabeça da cobra 
let cabecaX=10
let cabecaY=10
let trilha=[]
let cauda=3
let velocidade=1
let velX=0
let velY=0

canvas.width=tamanhoQuadrados*quantidadeQuadrados
canvas.height=tamanhoQuadrados*quantidadeQuadrados




function pintarTabuleiro(){
    //pinta todo o tabuleiro de preto
    ctx.fillStyle='black'
    ctx.fillRect(0,0,
        tamanhoQuadrados*quantidadeQuadrados,
        tamanhoQuadrados*quantidadeQuadrados)
}
pintarTabuleiro()

function maçaUpdate(x,y){
    //pinta a maça no tabuleiro em uma posição aleatória
    ctx.fillStyle='red'
    ctx.fillRect(
    x*tamanhoQuadrados,
    y*tamanhoQuadrados,
    tamanhoQuadrados,
    tamanhoQuadrados
    )
}
maçaUpdate(macaX,macaY)



function pintarCobra(x,y){
    ctx.fillStyle='grey'
    ctx.fillRect(
        x*tamanhoQuadrados,
        y*tamanhoQuadrados,
        tamanhoQuadrados,
        tamanhoQuadrados
        )
}
pintarCobra(cabecaX,cabecaY)


function iniciarGame(){
    const loopGame= setInterval( ()=>{
        game()
 
        if(checarDerrota(trilha) || (velX==0 && velY==0 ) ){
            console.log('limpou o intervalo')
            clearInterval(loopGame)
        }
        
    } , interval);
}
    

function game(){

    pintarTabuleiro()
    maçaUpdate(macaX,macaY)
    pintarCobra(cabecaX,cabecaY)
    
    cabecaX+=velX
    cabecaY+=velY  
    checarDerrota(trilha)
    
    keyDownPressed= keyDownPressed==true ? false : false
    
    

    verificarPosicao(cabecaX,cabecaY)    
    verificarMaca(cabecaX,cabecaY,macaX,macaY)

    for(let i=0; i<trilha.length;i++){
        pintarCobra( trilha[i].x,trilha[i].y )
        /*
        if(trilha[i].x==cabecaX && trilha[i].y==cabecaY && i!==trilha.length-1){
            velX=0
            velY=0
            cauda=3
            score=0
            span.innerText=score
        }*/
    }
    while(trilha.length>cauda){
        trilha.shift()
    }
    trilha.push( {x:cabecaX,y:cabecaY } )
}

body.addEventListener('keydown',(evt)=>{
   
    if(gameStarted==false){
        iniciarGame()
    }
    gameStarted=true
    if(evt.key=='ArrowRight' && velX!=-velocidade){
        velX=velocidade
        velY=0
    }
    if(evt.key=='ArrowLeft' && velX!=velocidade){
        velX=-velocidade
        velY=0
    }
    if(evt.key=='ArrowUp' && velY!=velocidade){
        velY=-velocidade
        velX=0
    }
    if(evt.key=='ArrowDown'&& velY!=-velocidade){   
        velY=velocidade
        velX=0
    }  
})
//swipe detection
let firstTouchX
let lastTouchX
let firstTouchY
let lastTouchY

document.addEventListener('touchstart',(e)=>{
    firstTouchX=e.touches[0].clientX
    firstTouchY=e.touches[0].clientY

})
document.addEventListener('touchmove',(e)=>{
    lastTouchX=(e.touches[0].clientX)
    lastTouchY=(e.touches[0].clientY)
})
document.addEventListener('touchend',(e)=>{
    let diffX=lastTouchX - firstTouchX
    let diffY=lastTouchY - firstTouchY

    if(gameStarted==false){
        iniciarGame()
    }
    gameStarted=true

    if( diffX>=0 && diffY>=0 ){

        if(diffX>diffY && velX!=-velocidade){
            console.log('direita')
            velX=velocidade
            velY=0
            
        }else if(velY!=-velocidade){
            console.log('baixo')
            velY=velocidade
            velX=0
        }
    }else if( diffX>0 && diffY<0 ){
        if(diffX>Math.abs(diffY)  && velX!=-velocidade ){
            console.log('direita')
            velX=velocidade
            velY=0   
        }else if(velY!=velocidade){
            console.log('cima')
            velY=-velocidade
            velX=0
        }
    }else if( diffX<0 && diffY<0 ){
        if(Math.abs(diffX)>Math.abs(diffY) && velX!=velocidade ){
            console.log('esquerda')
            velX=-velocidade
            velY=0   
        }else if(velY!=velocidade){
            console.log('cima')
            velY=-velocidade
            velX=0
        }
    }else if( diffX<0 && diffY>0 ){
        if(Math.abs(diffX)>diffY  && velX!=velocidade){
            console.log('esquerda')
            velX=-velocidade
            velY=0   
        }else if(velY!=-velocidade){
            console.log('baixo')
            velY=velocidade
            velX=0   
        }   
    }
})
//swipe detection end
//--------------------------------------

function verificarMaca(cabecaEmX,cabecaEmY,macaEmX,macaEmY){
    
    if(cabecaEmX==macaEmX && cabecaEmY==macaEmY){
        let newPosMacaX=Math.floor( Math.random()*quantidadeQuadrados )
        let newPosMacaY=Math.floor( Math.random()*quantidadeQuadrados )
        while(trilha.some(elem=>elem.x==newPosMacaX && elem.y==newPosMacaY) ){
            newPosMacaX=Math.floor( Math.random()*quantidadeQuadrados )
            newPosMacaY=Math.floor( Math.random()*quantidadeQuadrados )
        }
        macaX=newPosMacaX
        macaY=newPosMacaY
        score+=100
        span.innerText=score
        cauda++
        maçaUpdate(macaX,macaY)

        if(trilha.some(elem=> elem.x==macaX && elem.y==macaY  )  ){
            console.log('**********erro*****************')
            console.log(trilha)
            console.log('maçaX: '+macaX)
            console.log('maçaY: '+macaY)
        }
    }

}

function verificarPosicao(x,y){
    if(x>quantidadeQuadrados-1){
        cabecaX=0
    }
    if(x<0){
        cabecaX=quantidadeQuadrados-1
    }
    if(y>quantidadeQuadrados-1){
        cabecaY=0
    }
    if(y<0){
        cabecaY=quantidadeQuadrados-1
    }
}
function checarDerrota(arr){
    for(let i=0; i<arr.length;i++){
        if(arr[i].x==cabecaX && arr[i].y==cabecaY && i!==arr.length-1){
            velX=0
            velY=0
            cauda=3

            arrScore.push(score)
            maxScoreSpan.innerText=arrScore.reduce( (elem1,elem2)=> elem1>elem2 ? elem1 : elem2 )

            score=0

            trilha=[]
            span.innerText=score
            gameStarted=false
            return true
        }
        
    }
    return false
}