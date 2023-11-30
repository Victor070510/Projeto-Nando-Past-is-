# back-end Nando Pasteis

Esta API foi criada para receber e armazenar pedidos de uma loja chamada Nando Pasteis em um banco de dados MySQL.

## Funcionalidades

- **Receber Pedido**: Envia dados do pedido (nome, endereço, itens do carrinho, etc.) para o servidor e armazena no banco de dados.
  - Rota: `/pedido`
  - Método: `POST`

## Como Usar

1. **Enviar um Pedido**
   - Endpoint: `POST /pedido`
   - Envie uma requisição POST com os dados do pedido no formato JSON.

    Exemplo de requisição:
    ```json
    {
        "name": "Nome do Cliente",
        "address": "Endereço de Entrega",
        "phone": "Número de Contato",
        "pickup": "Responsável pela Retirada",
        "payment": "Forma de Pagamento",
        "total": 50.0,
        "cartItems": [
            {
                "name": "Pastel de Frango",
                "quantity": 2,
                "price": 5.0
            },
            {
                "name": "Pastel de Carne",
                "quantity": 3,
                "price": 4.0
            }
            // Outros itens do carrinho
        ]
    }
    ```

2. **Resposta**
   - Após o envio bem-sucedido, a API retornará uma mensagem indicando o sucesso.

## Pré-requisitos

- Python 3.x
- Flask
- MySQL
- Pacote `mysql-connector-python`

## Configuração do Banco de Dados

1. Crie um banco de dados chamado `nando_pasteis`.
2. Execute o script SQL fornecido para criar as tabelas `pedidos` e `itens_carrinho`.

---

*Este é um exemplo básico e pode necessitar de ajustes para um ambiente de produção.*


# API de Pedidos de Nando Pasteis

Esta API foi desenvolvida para gerenciar pedidos de uma loja fictícia chamada Nando Pasteis. Ela recebe dados dos pedidos, incluindo informações do cliente e itens do carrinho, armazenando-os em um banco de dados MySQL.

## Funcionalidades

### 1. Receber Pedido

- **Rota:** `/pedido`
- **Método:** `POST`
- **Payload:** Os dados do pedido devem ser enviados no formato JSON.

### Exemplo de Payload:

```json
{
    "name": "Nome do Cliente",
    "address": "Endereço de Entrega",
    "phone": "Número de Contato",
    "pickup": "Responsável pela Retirada",
    "payment": "Forma de Pagamento",
    "total": 50.0,
    "cartItems": [
        {
            "name": "Pastel de Frango",
            "quantity": 2,
            "price": 5.0
        },
        {
            "name": "Pastel de Carne",
            "quantity": 3,
            "price": 4.0
        }
        // Outros itens do carrinho
    ]
}


