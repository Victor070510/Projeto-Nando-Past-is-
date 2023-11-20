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

  document.getElementById('confirmation').classList.remove('hidden');
});
