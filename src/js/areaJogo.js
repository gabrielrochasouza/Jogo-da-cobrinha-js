const canvas=document.createElement('canvas')
const span=document.createElement('span')
const ctx=canvas.getContext('2d')
const body=document.body
const maxScore=document.createElement('div')
const maxScoreSpan=document.createElement('a')


maxScore.innerText='MaxScore: '
maxScore.classList.add('maxScore')
maxScoreSpan.innerText=0
maxScore.appendChild(maxScoreSpan)

export const createTable=()=>{
    
    const h1=document.createElement('h1')
    const h2=document.createElement('h2')
    
    h1.innerText='Jogo da Cobrinha'
    h2.innerText='Score: '
    span.innerText=0
    
    h2.appendChild(span)
    body.appendChild(h1)
    body.appendChild(canvas)
    body.appendChild(h2)
    body.appendChild(maxScore)

}
export {ctx,canvas,body,span,maxScore,maxScoreSpan}