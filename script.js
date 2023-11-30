// Função para remover um item do carrinho
function removerItem(event) {
  let currentItem = event.target.parentElement.parentElement;
  let quantity = currentItem.querySelector('.quantity');
  quantity.innerText = '0';
  mostrarDetalhesPedido();
}

// Função para mostrar os detalhes do pedido
function mostrarDetalhesPedido() {
  // Lógica para obter os dados do formulário
  let name = document.getElementById('name').value;

  let address = document.getElementById('address').value;
  let phone = document.getElementById('phone').value;
  let pickup = document.getElementById('pickup').value;
  let payment = document.getElementById('payment').value;

  // Atualiza os detalhes do pedido
  document.getElementById('confirmName').innerText = name;
  document.getElementById('confirmAddress').innerText = address;
  document.getElementById('confirmPhone').innerText = phone;
  document.getElementById('confirmPickup').innerText = pickup;
  document.getElementById('confirmPayment').innerText = payment;

  // Lógica para atualizar o carrinho e calcular o total
  let cartItems = document.querySelectorAll('.pastel');
  let total = 0;
  let detalhesPedido = document.getElementById('detalhesPedido');
  detalhesPedido.innerHTML = '';

  cartItems.forEach(item => {
      let addButton = item.querySelector('.add');
      let removeButton = item.querySelector('.remove');
      let quantity = item.querySelector('.quantity');
      let productName = item.querySelector('.pro').innerText.split(' - ')[0];
      let itemPrice = parseFloat(item.querySelector('.pro').innerText.split('R$')[1]);
      let itemQuantity = parseInt(quantity.innerText);
      let itemTotal = itemQuantity * itemPrice;

      total += itemTotal;

      // Atualiza a exibição dos itens no detalhe do pedido
      if (itemQuantity > 0) {
          let listItem = document.createElement('li');
          listItem.innerText = `${productName} - Quantidade: ${itemQuantity} - Total: R$${itemTotal.toFixed(2)}`;
          detalhesPedido.appendChild(listItem);
      }
  });

  // Atualiza o total
  document.getElementById('total').innerText = total.toFixed(2);

}

// Event listeners para botões e formulário
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let address = document.getElementById('address').value;
  let phone = document.getElementById('phone').value;
  let pickup = document.getElementById('pickup').value;
  let payment = document.getElementById('payment').value;

  
// Verifica se algum campo está vazio
if (name === '' || address === '' || phone === '' || pickup === '' || payment === '') {
  alert('Por favor, preencha todos os campos do formulário.');
} else {
  mostrarDetalhesPedido();

  // Verifica se o método de pagamento é válido
  let validPaymentOptions = ['pix', 'dinheiro', 'crédito', 'débito'];
  if (!validPaymentOptions.includes(payment)) {
    alert('Opção de pagamento inválida. Escolha entre "pix", "dinheiro", "crédito" ou "débito".');
  } else {
    // Verifica se todos os campos estão preenchidos corretamente
    alert('O formulário foi preenchido corretamente. Vá para o carrinho!');
  }
}
});

let cartItems = document.querySelectorAll('.pastel');

cartItems.forEach(item => {
  let addButton = item.querySelector('.add');
  let removeButton = item.querySelector('.remove');
  let quantity = item.querySelector('.quantity');
  let removeItemButton = item.querySelector('.remove-item');

  addButton.addEventListener('click', function() {
      let currentQuantity = parseInt(quantity.innerText);
      currentQuantity++;
      quantity.innerText = currentQuantity;
      mostrarDetalhesPedido();
  });

  removeButton.addEventListener('click', function() {
      let currentQuantity = parseInt(quantity.innerText);
      if (currentQuantity > 0) {
          currentQuantity--;
          quantity.innerText = currentQuantity;
          mostrarDetalhesPedido();
      }
  });

  removeItemButton.addEventListener('click', removerItem);
});

document.getElementById('clearForm').addEventListener('click', function() {
  document.getElementById('myForm').reset();
  mostrarDetalhesPedido();
});

document.getElementById('clearCart').addEventListener('click', function() {
  cartItems.forEach(item => {
      item.querySelector('.quantity').innerText = '0';
  });
  mostrarDetalhesPedido();
});

document.getElementById('enviarBackend').addEventListener('click', function() {
  // Lógica para enviar dados para o backend usando fetch
  let formData = new FormData(document.getElementById('myForm'));

  fetch('/pedido', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Ocorreu um erro ao enviar o pedido.');
      }
      return response.json();
  })
  .then(data => {
      console.log('Pedido enviado com sucesso:', data);
  })
  .catch(error => {
      console.error('Erro:', error);
  });
});



