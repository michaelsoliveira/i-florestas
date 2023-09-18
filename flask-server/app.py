import os
import psycopg2
from distutils.log import debug
from flask import Flask, request, jsonify, Response, render_template, send_file
from dotenv import load_dotenv
# Import required libraries
import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt
import sklearn
from sklearn.neural_network import MLPClassifier
from sklearn.neural_network import MLPRegressor

# Import necessary modules
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn.metrics import r2_score

load_dotenv

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
print(url)
connection = psycopg2.connect(url)

# Generate a scatter plot and returns the figure
def get_plot():
    data = {
        'a': np.arange(50),
        'c': np.random.randint(0, 50, 50),
        'd': np.random.randn(50)
    }
    data['b'] = data['a'] + 10 * np.random.randn(50)
    data['d'] = np.abs(data['d']) * 100
  
    plt.scatter('a', 'b', c='c', s='d', data=data)
    plt.xlabel('X label')
    plt.ylabel('Y label')
    return plt
  
# Root URL
@app.get('/plot')
def single_converter():
    # Get the matplotlib plot 
    plot = get_plot()
    
    return send_file(plot,
                    download_name='plot.png',
                    mimetype='image/png',
                    as_attachment=True)
  
    # Save the figure in the static directory 
    plot.savefig(os.path.join('static', 'images', 'plot.png'))
  
    return render_template('matplotlib-plot1.html')

ALL_INVENTARIO_BY_POA = """SELECT a.numero_arvore, a.altura, a.dap, a.volume, s.nome as situacao FROM arvore a 
    INNER JOIN ut u ON u.id = a.id_ut
    INNER JOIN poa p on p.id = u.id_poa
    INNER JOIN situacao_arvore s ON s.id = a.id_situacao
    WHERE p.id = %s
    ORDER BY a.numero_arvore;"""
        
@app.get('/get-inventario')
def inventario_poa():
    args = request.args
    poa = args.get('poa')

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(ALL_INVENTARIO_BY_POA, (poa, ))
            data = cursor.fetchall()

    if data is not None:
        return jsonify(data)
    else:
        return "Nenhum poa encontrado"

@app.route('/home', methods=['GET'])
def index():
    return "Flask Server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)