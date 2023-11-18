from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('faca o seu pedido.html')

@app.route('/processar_formulario', methods=['POST'])
def processar_formulario():
    data = request.get_json()
    return jsonify(data)

@app.route('/exibir_dados')
def exibir_dados():
    nome = request.args.get('nome')
    endereco = request.args.get('endereco')
    telefone = request.args.get('telefone')
    responsavel = request.args.get('responsavel')
    pagamento = request.args.get('pagamento')

    return render_template('dados_pedidos.html', nome=nome, endereco=endereco, telefone=telefone, responsavel=responsavel, pagamento=pagamento)

if __name__ == '__main__':
    app.run(debug=True)