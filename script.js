// Código JavaScript

const pasteis = [
  { nome: 'Carne', preco: 5.00, quantidade: 0 },
  { nome: 'Queijo', preco: 5.00, quantidade: 0 },
  { nome: 'Pizza', preco: 5.00, quantidade: 0 },
  { nome: 'Carne e Queijo', preco: 5.00, quantidade: 0 },
  { nome: 'Mexicano', preco: 5.00, quantidade: 0 },
  { nome: 'Frango/Catupiry', preco: 5.00, quantidade: 0 },
  { nome: '3/1', preco: 5.00, quantidade: 0 },
  { nome: 'Palmito', preco: 5.00, quantidade: 0 },
  { nome: 'Queijo/Alho', preco: 5.00, quantidade: 0 },
  { nome: 'Nutella', preco: 5.00, quantidade: 0 },
  { nome: 'Carne/Ovo', preco: 5.00, quantidade: 0 },
];

const botaoAdd = document.querySelectorAll('.add');
const botaoRemove = document.querySelectorAll('.remove');
const quantidades = document.querySelectorAll('.quantity');
const detalhesPedido = document.getElementById('detalhesPedido');
const totalSpan = document.getElementById('total');

function atualizarQuantidade(pastel, elementoQuantidade) {
  elementoQuantidade.textContent = pastel.quantidade;
  calcularTotal();
}

function calcularTotal() {
  let total = 0;
  pasteis.forEach(pastel => {
    total += pastel.preco * pastel.quantidade;
  });

  totalSpan.textContent = total.toFixed(2);
}

function atualizarDetalhesPedido() {
  detalhesPedido.innerHTML = ''; // Limpa os detalhes do pedido
  pasteis.forEach(pastel => {
    if (pastel.quantidade > 0) {
      const itemPedido = document.createElement('li');
      itemPedido.textContent = `${pastel.nome}: ${pastel.quantidade} - R$${(pastel.preco * pastel.quantidade).toFixed(2)}`;
      detalhesPedido.appendChild(itemPedido);
    }
  });
}

botaoAdd.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    pasteis[index].quantidade++;
    atualizarQuantidade(pasteis[index], quantidades[index]);
    atualizarDetalhesPedido();
  });
});

botaoRemove.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    if (pasteis[index].quantidade > 0) {
      pasteis[index].quantidade--;
      atualizarQuantidade(pasteis[index], quantidades[index]);
      atualizarDetalhesPedido();
    }
  });
});

// Adicione a funcionalidade de remoção do item
const removeItemButtons = document.querySelectorAll('.remove-item');
removeItemButtons.forEach((removeBtn, index) => {
  removeBtn.addEventListener('click', () => {
    pasteis[index].quantidade = 0;
    atualizarQuantidade(pasteis[index], quantidades[index]);
    atualizarDetalhesPedido();
  });
});

// Inicializar o total ao carregar a página
calcularTotal();

// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Recupera os dados do formulário armazenados localmente
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (formData) {
    // Exibe os dados do formulário na página do carrinho
    document.getElementById('confirmName').textContent = formData.name;
    document.getElementById('confirmAddress').textContent = formData.address;
    document.getElementById('confirmPhone').textContent = formData.phone;
    document.getElementById('confirmPickup').textContent = formData.pickup;
    document.getElementById('confirmPayment').textContent = formData.payment;
  }

  // Lógica do carrinho aqui...

  // Botão para limpar os dados do armazenamento local
  document.getElementById('clearData').addEventListener('click', function() {
    localStorage.removeItem('formData');
  });
});

// ... (código existente)

document.addEventListener('DOMContentLoaded', function() {
  // Recupera os dados do carrinho armazenados localmente
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

  // Verifica se há dados no carrinho armazenados localmente
  if (storedCartItems) {
    pasteis.forEach((pastel, index) => {
      // Define a quantidade de cada item do carrinho com base nos dados armazenados
      pasteis[index].quantidade = storedCartItems[index].quantidade;
      // Atualiza a visualização da quantidade na página
      quantidades[index].textContent = storedCartItems[index].quantidade;
    });

    // Atualiza os detalhes do pedido ao carregar a página
    atualizarDetalhesPedido();
    // Calcula o total ao carregar a página
    calcularTotal();
  }

  // ... (outro código)

  // Botão para limpar os dados do carrinho armazenados localmente
  document.getElementById('clearCart').addEventListener('click', function() {
    // Limpa os dados do carrinho armazenados localmente
    const emptyCart = Array(pasteis.length).fill({ nome: '', preco: 0.00, quantidade: 0 });
    localStorage.setItem('cartItems', JSON.stringify(emptyCart));

    // Atualiza a visualização do carrinho (limpa os itens exibidos na página)
    quantidades.forEach((quantidade, index) => {
      quantidade.textContent = '0';
      pasteis[index].quantidade = 0;
    });

    // Atualiza os detalhes do pedido
    atualizarDetalhesPedido();
    // Calcula o total
    calcularTotal();
  });
});


document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup').value;
  const payment = document.getElementById('payment').value;

  document.getElementById('confirmName').textContent = name;
  document.getElementById('confirmAddress').textContent = address;
  document.getElementById('confirmPhone').textContent = phone;
  document.getElementById('confirmPickup').textContent = pickup;
  document.getElementById('confirmPayment').textContent = payment;

  // Adicionando os dados do formulário ao objeto do pedido
  const pedido = {
      nome: name,
      endereco: address,
      telefone: phone,
      retirada: pickup,
      pagamento: payment
  };

  // Exibindo os dados do pedido nos detalhes
  document.getElementById('confirmation').classList.remove('hidden');
  // Chame a função para atualizar os detalhes do pedido com os dados do objeto 'pedido'
});
