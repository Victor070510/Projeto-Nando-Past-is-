from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

def conectar_banco():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="victor0705",
        database="nando_pasteis"
    )
    return db

@app.route('/pedido', methods=['GET', 'POST']) 
def receber_pedido():
    if request.method == 'POST':
        try:
            db = conectar_banco()
            cur = db.cursor()

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
            cur.execute(insert_pedido, pedido_values)
            db.commit()

            pedido_id = cur.lastrowid

            # Inserir informações na tabela itens_carrinho
            for item in data['cartItems']:
                nome_produto = item['name']
                quantidade = item['quantity']
                preco_unitario = item['price']
                total_item = quantidade * preco_unitario

                insert_item_carrinho = "INSERT INTO itens_carrinho (id_pedido, nome_produto, quantidade, preco_unitario, total_item) VALUES (%s, %s, %s, %s, %s)"
                item_values = (pedido_id, nome_produto, quantidade, preco_unitario, total_item)
                cur.execute(insert_item_carrinho, item_values)
                db.commit()

            cur.close()
            db.close()

            return render_template('pedido.html', message='Pedido recebido e armazenado com sucesso!')
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'GET':
        render_template('index.html', message='teste') 

    return jsonify({'message': 'Método não permitido'}), 405

if __name__ == '__main__':
    app.run(debug=True)