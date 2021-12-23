const canvas=document.createElement('canvas')
const span=document.createElement('span')
const ctx=canvas.getContext('2d')
const body=document.body

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
}
export {ctx,canvas,body,span}