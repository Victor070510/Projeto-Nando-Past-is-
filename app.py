from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pymysql

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/nando_pasteis'
db = SQLAlchemy(app)
db.init_app(app)

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Ping!'})
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
    with app.app_context():
        db.create_all()
    app.run(debug=True)
