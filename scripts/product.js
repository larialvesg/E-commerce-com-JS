import { database } from "./database.js";
import { findProduct, loadProduct } from "./functions.js"; 


let id = localStorage.getItem('prodId') 
let listaCompras = JSON.parse(localStorage.getItem('listaCompras')) 


if (listaCompras == null || listaCompras.length == 0){
    listaCompras = []
}

let produto = findProduct(database,id)
let selecaoProduto = document.querySelector(".col-1")
console.log(selecaoProduto)



loadProduct(produto,selecaoProduto) 

let botaoComprar = document.querySelector(".button-product-page") 
console.log(botaoComprar)

botaoComprar.addEventListener('click',()=>{
    let quantity = parseInt(document.querySelector("#quantity").value) 
    produto.quantity = quantity
    listaCompras.push(produto)
    alert("Produto adicionado com sucesso!")
    localStorage.setItem('listaCompras',JSON.stringify(listaCompras))
    console.log(listaCompras)
    window.location = "./carrinho.html"
})
