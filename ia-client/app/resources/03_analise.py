import streamlit as st
import pickle
import numpy as np
from utils import get_upas, var_dep_options, preprocessing_data
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.metrics import r2_score
from utils import dfColumns
from sklearn.preprocessing import StandardScaler, LabelEncoder

st.markdown(
    """
    <style>
        [data-testid="stSidebar"] {
            background-color: rgb(242, 239, 239);
        }
    </style>
    """,unsafe_allow_html=True
)

st.markdown("# Análise Preditiva")

top_panel = st.columns(2)

origem_options = [
    {'label': 'BOManejo Web', 'value': 'bomanejo' },
    {'label': 'Dataset Externo', 'value': 'externo' },
]

panel_model = st.columns([4,4])

upas = get_upas()

global dataset

def dfAlturaCondition(x):
    if x > 0.0:
        return np.log(x)
    else:
        return 

typeModel = None
    
with top_panel[0]:      
    selectedOrigem = st.selectbox("Origem da Base de Dados", options=origem_options, format_func=lambda origem: f'{origem["label"]}')
    uploaded_file = st.file_uploader("Carregar Modelo")
    if uploaded_file is not None:
        typeModel = uploaded_file.name.split('.')[1]
        model = pickle.loads(uploaded_file.read())         
        selectedVariavel = st.selectbox("Variável dependente", options=(var_dep_options), format_func=lambda var: f'{var["label"]}')
        
if (selectedOrigem['value'] == 'externo'):
    with top_panel[1]:
        panel_externo = st.columns([3,1])
        with panel_externo[0]:
            encoding = st.selectbox("Codificação", options=('iso-8859-1', 'utf-8'))    
        
        with panel_externo[1]:
            delimiter = st.selectbox("Delimitador", options=(';', ','))
        
        uploaded_dataset = st.file_uploader("Carregar Dataset")
        if uploaded_dataset is not None:
            dataset = pd.read_csv(uploaded_dataset, encoding=encoding, delimiter=delimiter, decimal=",")
            dataset.columns = dataset.columns.str.lower().str.normalize('NFKD').str.encode('ascii', 'ignore').str.decode('utf-8')
            
            dataset['inv_dap'] = 1/dataset['dap']
            impute = SimpleImputer(missing_values=0.0,strategy='mean')
            dataset['altura_dom'] = impute.fit_transform(dataset['altura'].values.reshape(-1, 1))
            dataset['ln_altura'] =  dataset[["altura", "altura_dom"]].apply(lambda x: np.log(x.altura) if x.altura > 0.0 else np.log(x.altura_dom), axis=1)
            dataset['volume'] = np.around(((0.7 * (np.pi * dataset['dap']**2 / 4000) * dataset['altura'])/10), 2)
            dataset['area_basal'] = np.pi * dataset['dap']**2 / 40000
            dataset['dap_2'] = dataset['dap'].apply(lambda x: np.square(x))
            datasetRna = dataset[['altura', 'inv_dap', 'ln_altura', 'dap', 'volume', 'area_basal', 'especie', 'dap_2']]
            columns = filter(lambda x : x != selectedVariavel['value'], dfColumns)
            dataset['altura'] = impute.fit_transform(dataset['altura'].values.reshape(-1, 1))
            dfPrepared = datasetRna[columns]
            transform = preprocessing_data()
            
            if (typeModel == 'h5'):
                categorical_preprocessor = LabelEncoder()
                numerical_preprocessor = StandardScaler()
                sc_y = StandardScaler()
                X_cat = dfPrepared.select_dtypes(include='object')
                X_num = dfPrepared.select_dtypes(exclude='object')
                X_num = pd.DataFrame(numerical_preprocessor.fit_transform(X_num), columns=X_num.columns)
                transformed_especie = categorical_preprocessor.fit_transform(X_cat)
                # categorical_columns = [f'{col}_{cat}' for i, col in enumerate(X_cat.columns) for cat in categorical_preprocessor.categories_[i]]
                one_hot_features = pd.DataFrame(transformed_especie, columns=['especie'])
                
                X = X_num.join(one_hot_features)
                y = sc_y.fit_transform(datasetRna[selectedVariavel['value']].values.reshape(-1, 1))
            else:
                X = dfPrepared
                y = dataset[selectedVariavel['value']]
            
    panel_download = st.columns(2)
    # dfDadosInv.to_csv("resultado_altura_rna.csv", index=None, sep=';', encoding='utf-8')

    if uploaded_dataset is not None:    
        with panel_download[0]:
            btn_analise = st.button('Executar Análise')
        if btn_analise:
            if 'analise_dataset' in st.session_state:
                del st.session_state['analise_dataset']
            predictions = model.predict(X)
            if typeModel == 'h5':
                pred_Y = sc_y.inverse_transform(predictions)
                dfPredictions = pd.DataFrame(data=pred_Y, columns=[f"{selectedVariavel['value']}_estimada"], dtype=float)
            else:
                dfPredictions = pd.DataFrame(data=predictions, columns=[f"{selectedVariavel['value']}_estimada"], dtype=float)
                
            dfPredictions['index'] = dfPredictions.index
            dataset['index'] = dataset.index
            dataset = pd.merge(dataset, dfPredictions, on='index').fillna(0.0)
            analise_score = r2_score(dataset[selectedVariavel['value']], dataset[f"{selectedVariavel['value']}_estimada"])
            dataset = dataset.rename(columns={'numero_arvore': 'num_arv'})
            volume = np.around(((0.7 * (np.pi * dataset['dap']**2 / 4000) * dataset[f"{selectedVariavel['value']}_estimada"])/10), 2)
            dataset['vol_est'] = volume
            dataset['volume'] = dataset.apply(lambda df: df['volume'] if df['volume'] > 0.0 else df['vol_est'], axis=1)
            # dataset = dataset.drop(['index', 'lat', 'lng', 'ponto_gps', 'obs', 'comentario', 'vol_est', 'altura_dom', 'dap_2'], axis=1)
            dataset = dataset.drop(['index', 'vol_est'], axis=1)
            if (selectedVariavel['value'] == 'volume'):
                dataset['residuo'] = dataset['volume'] - dataset['volume_estimada']
            else:
                dataset['residuo'] = dataset['altura'] - dataset['altura_estimada']
                
            st.write("Acurácia: {}%".format(round(analise_score, 2) *100))
            
            st.session_state['analise_dataset'] = dataset
            st.session_state['type'] = selectedVariavel['value']
            
        with panel_download[1]:
            csv = dataset.to_csv(index=None, sep=';', decimal=",", encoding='utf-8')
            st.download_button(
                    "Baixar Análise Preditiva",
                    csv,
                    "analise_preditiva.csv",
                    "text/csv",
                    key='analise_preditiva-csv'
                )

@st.cache_data(show_spinner=True)
def split_frame(input_df, rows):
    df = ([st.session_state['analise_dataset'].loc[i : i + rows - 1, :] for i in range(0, len(input_df), rows)])
    return df

if 'analise_dataset' in st.session_state:    
    top_menu = st.columns(3)
    with top_menu[0]:
        sort = st.radio("Ordenar", options=["Sim", "Não"], horizontal=1, index=1)
    if sort == "Sim":
        with top_menu[1]:
            sort_field = st.selectbox("Ordenar por", options=st.session_state['analise_dataset'].columns)
        with top_menu[2]:
            sort_direction = st.radio(
                "Direção", options=["⬆️", "⬇️"], horizontal=True
            )
        st.session_state['analise_dataset'] = st.session_state['analise_dataset'].sort_values(
            by=sort_field, ascending=sort_direction == "⬆️", ignore_index=True
        )
    bottom_menu = st.columns((3.8, 1.1, 1))
    total_items = len(st.session_state['analise_dataset'])

    with bottom_menu[2]:
        batch_size = st.selectbox("por Página", options=[25, 50, 100])

    total_pages = int(len(st.session_state['analise_dataset']) / batch_size) if int(len(st.session_state['analise_dataset']) / batch_size) > 0 else 1

    with bottom_menu[1]:    
        current_page = st.number_input('Página', min_value=1, max_value=total_pages, step=1)

    with bottom_menu[0]:
        st.markdown(f"Página **{current_page}** de **{total_pages}** ")
        
    pagination = st.container()

    pages = split_frame(st.session_state['analise_dataset'], batch_size)
    pagination.dataframe(data=pages[current_page - 1], use_container_width=True, height=(int(batch_size * 35) + 42))        

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