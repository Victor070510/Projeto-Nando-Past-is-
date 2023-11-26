from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Tente estabelecer uma conexão
try:
    mydb = mysql.connector.connect(
        host="localhost:3306",
        user="root",
        password="victor0705",
        database="seu_banco_de_dados"
    )
    print("Conexão com o banco de dados MySQL estabelecida com sucesso!")
except mysql.connector.Error as err:
    print(f"Erro ao conectar ao banco de dados: {err}")

@app.route('/sua-rota', methods=['POST'])
def receber_pedido():
    data = request.json

    cursor = mydb.cursor()

    # Inserir detalhes do pedido na tabela 'pedidos'
    pedido_sql = "INSERT INTO pedidos (nome, endereco, telefone, responsavel_retirada, forma_pagamento, total) VALUES (%s, %s, %s, %s, %s, %s)"
    pedido_values = (data['name'], data['address'], data['phone'], data['pickup'], data['payment'], data['total'])
    cursor.execute(pedido_sql, pedido_values)
    mydb.commit()

    # Obter o ID do pedido inserido
    pedido_id = cursor.lastrowid

    # Inserir itens do carrinho na tabela 'itens_carrinho'
    for item in data['cartItems']:
        item_sql = "INSERT INTO itens_carrinho (id_pedido, nome_produto, quantidade, preco_unitario, total_item) VALUES (%s, %s, %s, %s, %s)"
        item_values = (pedido_id, item['name'], item['quantity'], item['price'], item['quantity'] * item['price'])
        cursor.execute(item_sql, item_values)
        mydb.commit()

    cursor.close()

    return jsonify({"message": "Pedido recebido e inserido no banco de dados"}), 200

if __name__ == '__main__':
    app.run(debug=True)
