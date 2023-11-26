from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configurações do banco de dados
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="victor0705",
    database="nando_pasteis"
)
cursor = db.cursor()

# Rota para receber os dados do formulário e armazená-los no banco de dados
@app.route('/sua-rota', methods=['POST'])
def receber_pedido():
    data = request.json

    nome = data['name']
    endereco = data['address']
    telefone = data['phone']
    responsavel_retirada = data['pickup']
    forma_pagamento = data['payment']
    total = data['total']

    # Inserir informações na tabela pedidos
    insert_pedido = "INSERT INTO pedidos (nome, endereco, telefone, responsavel_retirada, forma_pagamento, total) VALUES (%s, %s, %s, %s, %s, %s)"
    pedido_values = (nome, endereco, telefone, responsavel_retirada, forma_pagamento, total)
    cursor.execute(insert_pedido, pedido_values)
    db.commit()

    pedido_id = cursor.lastrowid  # Obtém o ID do pedido inserido

    # Inserir informações na tabela itens_carrinho
    for item in data['cartItems']:
        nome_produto = item['name']
        quantidade = item['quantity']
        preco_unitario = item['price']
        total_item = quantidade * preco_unitario

        insert_item_carrinho = "INSERT INTO itens_carrinho (id_pedido, nome_produto, quantidade, preco_unitario, total_item) VALUES (%s, %s, %s, %s, %s)"
        item_values = (pedido_id, nome_produto, quantidade, preco_unitario, total_item)
        cursor.execute(insert_item_carrinho, item_values)
        db.commit()

    return jsonify({'message': 'Pedido recebido e armazenado com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)
