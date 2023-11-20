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
  

  