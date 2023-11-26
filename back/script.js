document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const details = document.getElementById("detalhesPedido");
  const confirmation = document.getElementById("confirmation");
  const clearFormButton = document.getElementById("clearForm");
  const clearCartButton = document.getElementById("clearCart");
  const totalElement = document.getElementById("total");
  const enviarBackendButton = document.getElementById("enviarBackend");

  let total = 0;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const pickup = document.getElementById("pickup").value;
    const payment = document.getElementById("payment").value;

    if (name && address && phone && pickup && payment !== "escolha") {
      // Aqui, coletamos os dados do formulário e preparamos para enviar ao backend
      const formData = {
        name,
        address,
        phone,
        pickup,
        payment,
        cartItems: [],
        total: parseFloat(totalElement.textContent)
      };

      // Capturamos os itens do carrinho
      const cartItems = document.querySelectorAll(".pastel");
      cartItems.forEach(function (cartItem) {
        const itemName = cartItem.querySelector(".pro").textContent;
        const itemQuantity = parseInt(cartItem.querySelector(".quantity").textContent);
        const itemPrice = parseFloat(cartItem.querySelector(".pro").textContent.split("R$")[1]);

        if (itemQuantity > 0) {
          const itemDetails = {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice
          };
          formData.cartItems.push(itemDetails);
        }
      });

      // Aqui enviamos os dados para o backend
      fetch('http://localhost:5000/sua-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta do backend:', data);
        alert('Pedido enviado com sucesso!');
        // Aqui, você pode realizar alguma ação após o envio bem-sucedido, se necessário
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar os dados para o backend.');
      });

      // Limpa o formulário e esconde a confirmação após o envio
      form.reset();
      confirmation.classList.add("hidden");
    } else {
      alert("Por favor, preencha todos os campos do formulário e selecione uma forma de pagamento!");
    }
  });

  // Restante do seu código de manipulação do carrinho e detalhes do pedido...
});
