// Get the orders from local storage
// Get the orders from local storage

let orders = JSON.parse(localStorage.getItem("pedidos"));

// Function to display the orders
function displayOrders() {
  // Check if orders is defined and has a value
  if (orders && orders.length > 0) {
    // Get the order list element
    let orderList = document.getElementById("order-list");

    // Create the order list HTML
    let orderListHtml = "";

    // Loop through each order
    orders.forEach((order, index) => {
      orderListHtml += `
            <li class="order-card">
              <h3>Pedido: ${order.id}</h3>
              <p>Endereço:</p>
              <ul>
              <li>Cliente: ${order.address.name} ${order.address.surname}</li>
                <li>Rua: ${order.address.address},${order.address.address_2}</li>

                <li>Cidade: ${order.address.city}</li>
                <li>UF: ${order.address.UF}</li>
                <li>CEP: ${order.address.zip}</li>
              </ul>
              <p>Itens:</p>
              <ul>
          `;

      // Loop through each item
      order.items.forEach((item) => {
        orderListHtml += `
              <li>
                <p>
                  Codigo Produto: ${item.codigoProduto}
                </p>
              </li>
              <li>
                <p>
                  Produto: ${item.tituloProduto}
                </p>
              </li>
                
               <li>
                <p>
                  Quantidade: ${item.quantity}
                </p>
              </li>
              <li>
                <p>Preço: R$ ${item.preco}</p>
              </li>
            `;
      });

      orderListHtml += `
              </ul>
              <p>Valor Total do Pedido: R$ ${order.totalValue}</p>
            </li>
          `;
    });

    // Set the innerHTML of the order list element
    orderList.innerHTML = orderListHtml;
  } else {
    console.log("No orders found");
  }
}

// Call the displayOrders function
displayOrders();

