import streamlit as st
import requests
import pandas as pd
import matplotlib.pyplot as plt
import pickle
import base64
import numpy as np

from sklearn.pipeline import make_pipeline
from utils import preprocessing_data, get_inventario, get_upas, dfColumns, prepareRNA, var_dep_options
from sklearn.svm import SVR
from sklearn.tree   import DecisionTreeRegressor
from sklearn.neighbors  import KNeighborsRegressor
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# if 'accessToken' not in st.session_state:
#     token = st.query_params.get_all('session')[0]
#     st.session_state['accessToken'] = token

st.markdown("# Treinamento do Modelo")

fast_url = 'http://localhost:5555'

dataset_analise = []

fig, ax = plt.subplots()

def download_model(model):
    output_model = pickle.dumps(model)
    b64 = base64.b64encode(output_model).decode()
    href = f'<a href="data:file/output_model;base64,{b64}" download="model_rna.h5">Baixar Modelo Treinado</a>'
    st.markdown(href, unsafe_allow_html=True)
    
upas = get_upas()

panel_header = st.columns(3)

types_dict = { 'id': str, 'ponto_arvore': str, 'numero_arvore': int, 'altura': float, 'dap': float, 'volume': float, 'area_basal': float, 'lat': float, 'lng': float, 'especie': str }

preprocessor = preprocessing_data()

def get_model(type: str):
    match type:
        case "svr":
            model = make_pipeline(preprocessor, SVR(kernel='linear'))
        case "kneighborsregressor":
            model = make_pipeline(preprocessor, KNeighborsRegressor())
        case "decisiontreeregressor":
            model = make_pipeline(preprocessor, DecisionTreeRegressor())
    
    return model

model_options = [ 
                    {'label': 'Máquina de Suporte de Vetores', 'value': 'svr' },
                    {'label': 'Redes Neurais Artificiais', 'value': 'rna' },
                    {'label': 'Regressão KNN', 'value': 'kneighborsregressor' },
                    {'label': 'Regressão de árvore de Decisão', 'value': 'decisiontreeregressor' }
                ]

panel_model = st.columns([4,4])

if len(upas) > 0:  
    with panel_header[0]:      
        selectedUpa = st.selectbox("UPA", options=upas, format_func=lambda upa: f'{upa["descricao"]}')
    with panel_header[1]:      
        selectedModel = st.selectbox("Modelo para treinamento", options=(model_options), format_func=lambda modelo: f'{modelo["label"]}')
    with panel_header[2]:      
        selectedVariavel = st.selectbox("Variável dependente", options=(var_dep_options), format_func=lambda var: f'{var["label"]}')
        
    with panel_model[0]:
        buttonML = st.button('Treinar Modelo')

    if buttonML:
        # data = handleML(selectedUpa['id'])
        data = get_inventario(selectedUpa['id'])
        dataFrame = pd.DataFrame.from_dict(data).astype(types_dict)
        dataFrame['inv_dap'] = 1/dataFrame.dap
        dataFrame['area_basal'] = dataFrame['dap'].apply(lambda x: (np.pi * np.square(x)/4))
        dataFrame['dap_2'] = dataFrame['dap'].apply(lambda x: np.square(x))
        dataFrame['ln_altura'] =  dataFrame['altura'].apply(lambda x: np.log(x) if x > 0.0 else 0.0)
        dataFrame = dataFrame.loc[(dataFrame.altura != 0.0) & (dataFrame.volume != 0.0)].copy()
        st.session_state['dataset_preparacao'] = dataFrame.drop(['id', 'ponto_arvore', 'lat', 'lng'], axis=1)
        
        columns = filter(lambda x : x != selectedVariavel['value'], dfColumns)
        
        X = dataFrame[columns]
        y = dataFrame[selectedVariavel['value']]
    
        data_train, data_test, target_train, target_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        file_name = f"model_{selectedModel['value']}_{selectedVariavel['value']}.{'pkl' if selectedModel['value'] != 'rna' else 'h5'}"
        
        if (selectedModel['value'] == 'rna'):
            model, metricas, history = prepareRNA(dataFrame, selectedVariavel['value'])
            # summarize history for accuracy
            ax.set_title('Erro quadrático médio do Modelo', fontsize=15)
            ax.plot(history.history['mse'])
            # ax.plot(history.history['val_accuracy'])
            ax.set_ylabel('MSE')
            ax.set_xlabel('epoch')
            ax.legend(['train', 'test'], loc='upper left')
            st.plotly_chart(fig, theme="streamlit")
            metricasTable = [
                {
                    "R-Squared" : metricas[0], 
                    "Adjusted R-Squared": metricas[1], 
                    "Mean Squared Error": metricas[2], 
                    "Root Mean Squared Error": metricas[3], 
                    "Mean Absolute Error": metricas[4]
                }
            ]
            tblMetrics = pd.DataFrame.from_dict(metricasTable)
            
            st.table(tblMetrics)
        else:
            model = get_model(selectedModel['value'])
            model.fit(data_train, target_train)
            # save_model = pickle.dumps(model)
            scoreModel = model.score(data_test, target_test)
        
            st.write("Score do modelo {}%".format(round(scoreModel, 2) *100))
        
        with panel_model[1]:
            st.download_button(
                "Baixar Modelo Treinado",
                data=pickle.dumps(model),
                file_name=file_name,
            )
    
@st.cache_data(show_spinner=True)
def split_frame(input_df, rows):
    df = [st.session_state['dataset_preparacao'].loc[i : i + rows - 1, :] for i in range(0, len(input_df), rows)]
    return df
        
if 'dataset_preparacao' in st.session_state:    
    top_menu = st.columns(3)
    with top_menu[0]:
        sort = st.radio("Ordenar", options=["Sim", "Não"], horizontal=1, index=1)
    if sort == "Sim":
        with top_menu[1]:
            sort_field = st.selectbox("Ordenar por", options=st.session_state['dataset_preparacao'].columns)
        with top_menu[2]:
            sort_direction = st.radio(
                "Direção", options=["⬆️", "⬇️"], horizontal=True
            )
        st.session_state['dataset_preparacao'] = st.session_state['dataset_preparacao'].sort_values(
            by=sort_field, ascending=sort_direction == "⬆️", ignore_index=True
        )
    bottom_menu = st.columns((3.8, 1.1, 1))
    total_items = len(st.session_state['dataset_preparacao'])
    
    with bottom_menu[2]:
        batch_size = st.selectbox("por Página", options=[25, 50, 100])

    total_pages = int(len(st.session_state['dataset_preparacao']) / batch_size) if int(len(st.session_state['dataset_preparacao']) / batch_size) > 0 else 1
    
    with bottom_menu[1]:    
        current_page = st.number_input('Página', min_value=1, max_value=total_pages, step=1)

    with bottom_menu[0]:
        st.markdown(f"Página **{current_page}** de **{total_pages}** ")
        
    pagination = st.container()
    
    pages = split_frame(st.session_state['dataset_preparacao'], batch_size)
    pagination.dataframe(data=pages[current_page - 1], use_container_width=True, height=(int(batch_size * 35) + 42))

st.markdown(
    """
    <style>
        div[data-testid="stHorizontalBlock"]:nth-of-type(5) > div[data-testid="column"]:nth-of-type(1)
        {
            display: flex;
            align-items: flex-end;
        } 
        
        div[data-testid="stHorizontalBlock"]:nth-of-type(3) > div[data-testid="column"]:nth-of-type(2)
        {
            display: flex;
            text-align: end;
        } 
    </style>
    """,unsafe_allow_html=True
)

# Python snippet to send message to parent
js = """
<script>
const container = window.parent.document.querySelectorAll('[data-testid="stAppViewBlockContainer"]')[0]
const sideBar = window.parent.document.querySelectorAll('[data-testid="stSidebar"]')[0]
const sectionMain = window.parent.document.querySelectorAll('section.main')[0]
sectionMain.style.overflowY = "hidden";

const resizeObserver = new ResizeObserver(entries => {
    window.parent.parent.postMessage({
        type: 'resize',
        height: container.scrollHeight,
    }, '*')
});

// Observe the scrollingElement for when the window gets resized
resizeObserver.observe(container);

sideBar.style.minHeight = "100vh";

function displayMessage (evt) {
    
	var message;
	if (evt.origin !== "http://localhost:3000") {
		message = "You are not worthy";
	}
	else {
		message = "I got " + evt.data + " from " + evt.origin;
	}
	console.log(message);
}

window.addEventListener("message", (evt) => {
    console.log(evt)    
});

</script>
"""
st.components.v1.html(js, height=0)
st.markdown(
    """
    <style>
        [data-testid="stSidebar"] {
            background-color: rgb(242, 239, 239);
        }
    </style>
    """,unsafe_allow_html=True
)