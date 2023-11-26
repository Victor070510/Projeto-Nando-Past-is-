from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/nando_pasteis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(20))
    responsavel_retirada = db.Column(db.String(100))
    forma_pagamento = db.Column(db.String(50))
    total = db.Column(db.Float)

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Ping!'})

@app.route('/sua-rota', methods=['POST'])
def receber_dados():
    if request.method == 'POST':
        data = request.json

        novo_pedido = Pedido(
            nome=data['name'],
            endereco=data['address'],
            telefone=data['phone'],
            responsavel_retirada=data['pickup'],
            forma_pagamento=data['payment'],
            total=data['total']
        )

        db.session.add(novo_pedido)
        db.session.commit()

        return jsonify({'message': 'Dados inseridos no banco de dados com sucesso.'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
