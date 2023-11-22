document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const details = document.getElementById("detalhesPedido");
  const confirmation = document.getElementById("confirmation");
  const clearFormButton = document.getElementById("clearForm");
  const clearCartButton = document.getElementById("clearCart");
  const totalElement = document.getElementById("total");
  let total = 0;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const pickup = document.getElementById("pickup").value;
    const payment = document.getElementById("payment").value;

    if (name && address && phone && pickup && payment !== "escolha") {
      alert("Seus dados foram preenchidos. Faça o seu pedido!");

      document.getElementById("confirmName").textContent = name;
      document.getElementById("confirmAddress").textContent = address;
      document.getElementById("confirmPhone").textContent = phone;
      document.getElementById("confirmPickup").textContent = pickup;
      document.getElementById("confirmPayment").textContent = payment;

      confirmation.classList.remove("hidden");
      form.reset();
    } else {
      alert("Por favor, preencha todos os campos do formulário e selecione uma forma de pagamento!");
    }
  });

  const cartItems = document.querySelectorAll(".pastel");

  cartItems.forEach(function (item) {
    const addButton = item.querySelector(".add");
    const removeButton = item.querySelector(".remove");
    const quantityElement = item.querySelector(".quantity");
    const price = parseFloat(item.querySelector(".pro").textContent.split("R$")[1]);

    addButton.addEventListener("click", function () {
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotal();
    });

    removeButton.addEventListener("click", function () {
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotal();
      }
    });

    item.querySelector(".remove-item").addEventListener("click", function () {
      quantityElement.textContent = "0";
      updateTotal();
    });

    function updateTotal() {
      total = 0;
      cartItems.forEach(function (cartItem) {
        const itemQuantity = parseInt(cartItem.querySelector(".quantity").textContent);
        const itemPrice = parseFloat(cartItem.querySelector(".pro").textContent.split("R$")[1]);
        total += itemPrice * itemQuantity;
      });
      totalElement.textContent = total.toFixed(2);
      updateDetails();
    }

    function updateDetails() {
      details.innerHTML = "";
      cartItems.forEach(function (cartItem) {
        const itemName = cartItem.querySelector(".pro").textContent;
        const itemQuantity = parseInt(cartItem.querySelector(".quantity").textContent);
        const itemPrice = parseFloat(cartItem.querySelector(".pro").textContent.split("R$")[1]);

        if (itemQuantity > 0) {
          const li = document.createElement("li");
          const totalItemPrice = itemPrice * itemQuantity;
          li.textContent = `${itemName} - Quantidade: ${itemQuantity} - Total: R$${totalItemPrice.toFixed(2)}`;
          details.appendChild(li);
        }
      });
    }
  });

  clearFormButton.addEventListener("click", function () {
    form.reset();
    confirmation.classList.add("hidden");
  });

  clearCartButton.addEventListener("click", function () {
    cartItems.forEach(function (item) {
      item.querySelector(".quantity").textContent = "0";
    });
    totalElement.textContent = "0.00";
    details.innerHTML = "";
  });
});
