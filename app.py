from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('faca o seu pedido.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = {
        'nome': request.form['nome'],
        'endereco': request.form['endereco'],
        'telefone': request.form['telefone'],
        'responsavel': request.form['responsavel'],
        'formaPagamento': request.form['formaPagamento']
    }
    return jsonify(data)

@app.route('/submitted')
def submitted():
    return render_template('submitted.html', **request.args)

if __name__ == '__main__':
    app.run(debug=True)
