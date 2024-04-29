# from sklearn.neural_network import MLPRegressor
from sklearn.compose import make_column_selector as selector
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
import requests
import streamlit as st
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
import keras
from sklearn import metrics
from dotenv import load_dotenv
import os

load_dotenv()

backend_url = os.getenv('BACKEND_URL')
environment = os.getenv('ENVIRONMENT')
dfColumns = ['altura', 'volume', 'inv_dap', 'ln_altura', 'dap', 'area_basal', 'especie', 'dap_2']
var_dep_options = [
    {'label': 'Altura', 'value': 'altura' },
    {'label': 'Volume', 'value': 'volume' },
]
# function to preprocess our data 
def preprocessing_data():
    numerical_columns_selector = selector(dtype_exclude=object)
    categorical_columns_selector = selector(dtype_include=object)
    
    categorical_preprocessor = OneHotEncoder(handle_unknown="ignore")
    numerical_preprocessor = StandardScaler()
    
    preprocessor = ColumnTransformer(
        [
            ("one-hot-encoder", categorical_preprocessor, categorical_columns_selector),
            ("standard-scaler", numerical_preprocessor, numerical_columns_selector),
        ],
        remainder="passthrough",
    )
    
    return preprocessor

def prepareRNA(dados, y_result):
    #Variáveis globais
    timeGraf = 1           
    sizePoint = 3
    
    #Ordena base de dados de forma crescente
    dados = dados.reset_index(drop=True)
    dados['index'] = dados.index

    #Seleciona somente árvores com altura mensurada
    dfAjustado = dados.loc[(dados.altura != 0.0)].copy()

    #Prepara variáveis para ajuste
    dfAjustado['inv_dap'] = 1/dfAjustado.dap
    impute = SimpleImputer(missing_values=0.0,strategy='mean')
    dfAjustado['altura_dom'] = impute.fit_transform(dados['altura'].values.reshape(-1, 1))
    dfAjustado['ln_altura'] = np.log(dfAjustado.altura_dom)
    dfAjustado['area_basal'] = dfAjustado['dap'].apply(lambda x: (np.pi * np.square(x)/4))
    dfAjustado['dap_2'] = dfAjustado['dap'].apply(lambda x: np.square(x))
    
    #Seleciona somente variáveis de interesse para treino da Rna
    dfRnaDados = dfAjustado[['altura', 'volume','inv_dap', 'ln_altura', 'dap', 'area_basal', 'dap_2', 'especie']]
    dfPrepared = dfRnaDados.copy()
    dfPrepared = dfPrepared.drop([y_result], axis=1)
    
    # categorical_preprocessor = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
    categorical_preprocessor = LabelEncoder()
    numerical_preprocessor = StandardScaler()
    X_cat = dfRnaDados.select_dtypes(include='object')
    X_num = dfRnaDados.select_dtypes(exclude='object')
    
    X_num = pd.DataFrame(numerical_preprocessor.fit_transform(X_num), columns=X_num.columns)
    transformed_especie = categorical_preprocessor.fit_transform(X_cat)
    # categorical_columns = [f'{col}_{cat}' for i, col in enumerate(X_cat.columns) for cat in categorical_preprocessor.categories_[i]]
    one_hot_features = pd.DataFrame(transformed_especie, columns=['especie'])
    df = X_num.join(one_hot_features)
    
    y = df[y_result].values.reshape(-1, 1)
    X = df.drop([y_result], axis=1)
    count = len(X.columns)
    
    #Separa base de dados em treino e teste para extrapolação/validação/generalização
    X_train, X_test, y_train, y_test = train_test_split(X, y,
                                                        test_size=0.25, 
                                                        random_state=1)
    model = keras.Sequential()
    model.add(keras.layers.Dense(count, activation = 'relu',
                                input_shape=(count,)))
    model.add(keras.layers.Dense(64, activation = 'sigmoid'))
    model.add(keras.layers.Dense(1))

    model.compile(optimizer='adam', loss='MeanSquaredError', metrics=['mse', 'accuracy'])

    history = model.fit(X_train, y_train, epochs=30,verbose = 2,
            callbacks=[keras.callbacks.EarlyStopping(monitor='loss',
                                                    patience=5)])
    # y_pred = sc_y.inverse_transform ((regressor.predict (sc_X.transform(np.array([[6.5]])))))
    predictions = model.predict([X_test])
    
    #measure RMSE error
    # score = np.sqrt(metrics.root_mean_squared_error(y_test,predictions))
    # Calculate metrics
    r2 = metrics.r2_score(y_test, predictions)  # R-Squared
    print('R-Squared:', r2)

    adjusted_r2 = 1 - (1-r2)*(len(y_test)-1)/(len(y_test)-X_test.shape[1]-1)  # Adjusted R-Squared
    print('Adjusted R-Squared:', adjusted_r2)

    mse = metrics.mean_squared_error(y_test, predictions)  # Mean Squared Error
    print('Mean Squared Error:', mse)

    rmse = np.sqrt(mse)  # Root Mean Squared Error
    print('Root Mean Squared Error:', rmse)

    mae = metrics.mean_absolute_error(y_test, predictions)  # Mean Absolute Error
    print('Mean Absolute Error:', mae)

    metricas = [r2, adjusted_r2, mse, rmse, mae]
    
    return model, metricas, history

def get_inventario(upa_id: str):
    response = requests.get(f"{backend_url}/arvore/get-all?upaId={upa_id}&orderBy=numero_arvore&order=asc",
                    headers={ 'Authorization': f'Bearer {st.session_state.accessToken}' }).json()
    
    arvores = []
    
    for row in response['arvores']:
        point = 'POINT({} {})'.format(row['lng'], row['lat'])
        arvores.append({
            'id': str(row['id']),
            'ponto_arvore': point,
            'numero_arvore': row['numero_arvore'],
            'altura': row['altura'],
            'dap': row['dap'],
            'volume': row['volume'],
            'area_basal': row['area_basal'],
            'lat': row['lat'],
            'lng': row['lng'],
            'especie': str(row['especie']['nome'])
        })
    
    return arvores

def get_upas():
    response = requests.get(f"{backend_url}/upa",
            headers={ 'Authorization': f'Bearer {st.session_state.accessToken}' }).json()
    data = pd.DataFrame.from_dict(response) if response else []
    return data.upas

