function submitForm() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  
  fetch("/submit", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    window.location.href = `/submitted?nome=${data.nome}&endereco=${data.endereco}&telefone=${data.telefone}&responsavel=${data.responsavel}&formaPagamento=${data.formaPagamento}`;
  })
  .catch(error => console.error('Erro:', error));
}
