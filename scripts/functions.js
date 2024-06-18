export function loadProducts(productList, load) {
  /* carrega os produtos na home e na pagina de prododus*/

  productList.forEach((produto) => {
    const valParcela = (produto.preco / 5).toFixed(2);
    const html = `<div class="product-card idprod" id="${produto.codigoProduto}">
    <!-- container que controla o tamanho da imagem -->
    <div class="card-image-container">
        <img src="${produto.imagemProduto.img1}" id="${produto.codigoProduto}" alt="${produto.tituloProduto}">
    </div>
    <!-- container que agrupa as informacoes do produto -->
    <div class="product-card-info-container">
        <h2 class="product-card-title" title="${produto.tituloProduto}">
            ${produto.tituloProduto}
        </h2>
        <h4 class="product-card-reference"> Cod. ${produto.children}</h4>
        <h3 class="product-card-price"> R$ ${produto.preco.toFixed(2)} </h3>
        <h4 class="product-card-installment"> 5x de R$ ${valParcela} sem juros </h4>
    </div>
    <!-- botao de comprar, que levara para a pagina do produto -->
    <a href="./produto.html">
        <button class="product-card-btn" id="${produto.codigoProduto}">COMPRAR</button>
    </a>
</div>`;
    load.innerHTML += html;
  });
}

// captura o codigo/id do produto
export function getProdId(){
  let itens = document.querySelectorAll(".idprod")
  console.log(itens)
  itens.forEach(item => item.addEventListener('click',(evento)=>{
      let prodID = evento.target.id
      localStorage.setItem('prodId',prodID)
      
  }))
}

// localiza o produto na base de dados
export function findProduct(productList, productId){
  let produto = productList.find(produto => produto.codigoProduto == productId)
  return produto
}

//carrega o produto na pagina do produto

export function loadProduct(produto,selecaoProduto){

// const productCategory = document.querySelector("#product-category");
// productCategory.innerText = `${produto.categoriaProduto}`;

const productTitle = document.querySelector("#product-title")

productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`
productTitle.children[1].innerText = `${produto.tituloProduto}`


 const HTML = `<div class="grid-images">
 <div class="carrousel">

     <div class="thumb">
         <img src="${produto.imagemProduto.img2}">
     </div>

     <div class="thumb">
         <img src="${produto.imagemProduto.img3}">
     </div>

     <div class="thumb">
         <img src="${produto.imagemProduto.img4}">
     </div>

 </div>

 <div class="main-image-container">
     <img src="${produto.imagemProduto.img1}" alt="" class="main-image">
 </div>

</div>
<div class="product-description">
 <h2>Descrição</h2>
 <p>
     ${produto.descricao}
 </p>
</div>`
selecaoProduto.innerHTML = HTML

const price = document.querySelector(".price-container")
const parcela = (produto.preco/10).toFixed(2)
price.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`
price.children[1].innerText = `Ou em ate 10x sem juros de R$ ${parcela} no cartão de credito`



}

function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + item.preco * item.quantity, 0);
}


export function loadCartItem(cartItens,cartItensHTML){

  if(cartItens.length == [] || cartItens.length == [] ){
    cartItensHTML.innerHTML = `Seu carrinho está vazio`
  } else {
    cartItens.forEach(item => {  
      let html = `<li id="${item.codigoProduto}">
      <div class="cart-item">
          <div class="cart-item-img">
              <div class="cart-img-container">
                  <img src="${item.imagemProduto.img1}" alt="">
              </div>

          </div>
          <div class="cart-item-info">
              <p>${item.tituloProduto}</p>
              <input type="text" name="" id="" value=${item.quantity}>
              <p>R$ ${(item.preco * item.quantity)}</p>
              <i class="bi bi-trash3 remove"></i>
          </div>
      </div>
  </li>
      
  `
  cartItensHTML.innerHTML += html
  })
  const total = cartTotal(cartItens);
  localStorage.setItem('totalValue', total);
  const price = document.querySelector('.total-container .total-info:nth-child(1) h2:nth-child(2)');
  price.innerHTML = `R$ ${total.toFixed(2)}`}

  }
  


  export function removeCartItem(sacolaCompras) {
    let botaoDel = document.querySelectorAll("i.remove") /* remover produto do carrinho */
    
    let cartItens = document.querySelector("#checkout")
    console.log(cartItens)
    botaoDel.forEach(botao => botao.addEventListener('click', (event) => {
      let item = event.target.parentElement.parentElement.parentElement
      cartItens.removeChild(item)
      let index = sacolaCompras.findIndex(i => i.codigoProduto == item.id)
      sacolaCompras.splice(index, 1)
      localStorage.setItem('listaCompras', JSON.stringify(sacolaCompras))
  
      // Update the price element here
      const total = cartTotal(sacolaCompras);
      localStorage.setItem('totalValue', total);
      const price = document.querySelector('.total-container .total-info:nth-child(1) h2:nth-child(2)');
      price.innerHTML = `R$ ${total.toFixed(2)}`;
     
    }));
  }


export function shop(pedidos){

const form = document.querySelector('#checkout form');
console.log(form)
const inputs = form.querySelectorAll('input,select');
const inputValues = {};
inputs.forEach((input) => {
  if (input.type!== 'submit' && input.type!== 'button') {
    inputValues[input.name] = input.value;
  }
});
console.log(inputValues);
const order = {
   id: pedidos.length > 0? pedidos[pedidos.length - 1].id + 1 : 1,
   address:{...inputValues},
   items: JSON.parse(localStorage.getItem("listaCompras")),
   totalValue: parseFloat(localStorage.getItem("totalValue"))
};

pedidos.push(order);
localStorage.setItem("pedidos", JSON.stringify(pedidos));;
alert("pedido realizado com sucesso")
localStorage.removeItem("listaCompras");
localStorage.removeItem("totalValue");
window.location = "./index.html"
} 