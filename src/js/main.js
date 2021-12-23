import { createTable,ctx,canvas,body,span } from "./areaJogo.js";

createTable()
let quantidadeQuadrados
let tamanhoQuadrados=15
let gameStarted=false
let score=0

let keyDownPressed=false

if(window.innerWidth<=360){
    quantidadeQuadrados=20
}
if(window.innerWidth>360 && window.innerWidth<600){
    quantidadeQuadrados=23
}
if(window.innerWidth>=600){
    quantidadeQuadrados=30
}
//maça
let macaX=Math.floor(Math.random()*20  )
let macaY=Math.floor(Math.random()*20  )

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
    ctx.fillStyle='rgb(0,0,0)'
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
 
        if(checarDerrota(trilha) ){
            
            clearInterval(loopGame)
        }
        
    } , 105);
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


function verificarMaca(cabecaEmX,cabecaEmY,macaEmX,macaEmY){
    if(cabecaEmX==macaEmX && cabecaEmY==macaEmY){
        macaX=Math.floor( Math.random()*20 )
        macaY=Math.floor( Math.random()*20 )
        while(trilha.some(elem=> elem.x==macaX && elem.y==macaY) ){
            macaX=Math.floor( Math.random()*20 )
            macaY=Math.floor( Math.random()*20 )
        }
        score+=100
        span.innerText=score
        cauda++
        maçaUpdate(macaX,macaY)

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
            score=0
            trilha=[]
            span.innerText=score
            gameStarted=false
            return true
        }
        
    }
    return false
}