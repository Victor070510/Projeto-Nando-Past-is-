from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configurações do banco de dados MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="victor0705",
    database="nando_pasteis"
)

@app.route('/sua-rota', methods=['POST'])
def receber_dados():
    data = request.json  # Aqui você recebe os dados enviados pelo JavaScript

    cursor = db.cursor()

    # Insira os dados recebidos na tabela do banco de dados
    query = "INSERT INTO pedidos (nome, endereco, telefone, responsavel_retirada, forma_pagamento, total) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (data['name'], data['address'], data['phone'], data['pickup'], data['payment'], data['total'])

    cursor.execute(query, values)
    db.commit()

    cursor.close()
    return jsonify({'message': 'Dados inseridos no banco de dados com sucesso.'})

if __name__ == '__main__':
    app.run(debug=True)
