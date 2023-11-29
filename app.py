from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import mysql.connector


app = Flask(__name__)

def conectar_banco():
    try:
        conexao = mysql.connector.connect(
            database="nando_pasteis",
            host="localhost",
            user="root",
            password="victor0705"
        )
        print("Conexão bem-sucedida!")
        return conexao  # Retorna a conexão para ser usada

    except mysql.connector.Error as erro:
        print(f"Erro ao conectar ao banco de dados: {erro}")
        return None  # Retorna None em caso de erro

# Rota para criar um pedido
@app.route('/pedido', methods=['GET', 'POST'])
def criar_pedido():
    conexao = conectar_banco()
    cur = conexao.cursor()

    nome = request.json['nome']
    endereco = request.json['endereco']
    telefone = request.json['telefone']
    responsavel_retirada = request.json['responsavel_retirada']
    forma_pagamento = request.json['forma_pagamento']

    cur.execute(
        "INSERT INTO Pedidos (nome, endereco, telefone, responsavel_retirada, forma_pagamento) VALUES (%s, %s, %s, %s, %s);",
        (nome, endereco, telefone, responsavel_retirada, forma_pagamento)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Pedido criado com sucesso!'})

# Rota para obter todos os pedidos
@app.route('/pedidos', methods=['GET'])
def obter_pedidos():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Pedidos")
    pedidos = cur.fetchall()
    cur.close()

    return jsonify({'pedidos': pedidos})

# Rota para obter um pedido por ID
@app.route('/pedido/<int:pedido_id>', methods=['GET'])
def obter_pedido(pedido_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Pedidos WHERE id = %s", (pedido_id,))
    pedido = cur.fetchone()
    cur.close()

    return jsonify({'pedido': pedido})

# Rota para atualizar um pedido por ID
@app.route('/pedido/<int:pedido_id>', methods=['PUT'])
def atualizar_pedido(pedido_id):
    cur = mysql.connection.cursor()
    nome = request.json['nome']
    endereco = request.json['endereco']
    telefone = request.json['telefone']
    responsavel_retirada = request.json['responsavel_retirada']
    forma_pagamento = request.json['forma_pagamento']

    cur.execute(
        "UPDATE Pedidos SET nome=%s, endereco=%s, telefone=%s, responsavel_retirada=%s, forma_pagamento=%s WHERE id=%s",
        (nome, endereco, telefone, responsavel_retirada, forma_pagamento, pedido_id)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Pedido atualizado com sucesso!'})

# Rota para deletar um pedido por ID
@app.route('/pedido/<int:pedido_id>', methods=['DELETE'])
def deletar_pedido(pedido_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Pedidos WHERE id = %s", (pedido_id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Pedido deletado com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)