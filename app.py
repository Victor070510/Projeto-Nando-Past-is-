from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Configuração do banco de dados
DATABASE = 'database.db'

def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            endereco TEXT,
            telefone TEXT,
            retirada TEXT,
            pagamento TEXT,
            total REAL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/sua-rota', methods=['POST'])
def receber_pedido():
    data = request.json

    # Aqui você pode acessar os dados do pedido e salvá-los no banco de dados
    nome = data.get('name')
    endereco = data.get('address')
    telefone = data.get('phone')
    retirada = data.get('pickup')
    pagamento = data.get('payment')
    total = data.get('total')

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO pedidos (nome, endereco, telefone, retirada, pagamento, total)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (nome, endereco, telefone, retirada, pagamento, total))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Pedido recebido e salvo no banco de dados'})

if __name__ == '__main__':
    create_table()
    app.run(debug=True)
