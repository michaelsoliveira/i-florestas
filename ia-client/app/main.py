import streamlit as st
from st_pages import Page, show_pages
import os
from dotenv import load_dotenv
import os, time, datetime, sentry_sdk
load_dotenv()

try:
  print('INFO > Starting running at', datetime.datetime.now())

  print('INFO > Setting Sentry to error tracking...')

  sentry_sdk.init(
    dsn = os.getenv('SENTRY_DNS'),
    traces_sample_rate=1.0
  )
except Exception as e:
  print('CRITICAL >', e)


backend_url = os.getenv('BACKEND_URL')
st.set_page_config(layout="centered")

# Specify what pages should be shown in the sidebar, and what their titles 
# and icons should be
show_pages(
    [
        Page("main.py", "Análise de Dados", "🏠"),
        Page("resources/02_preparacao.py", "Treinamento do Modelo", ":books:"),
        Page("resources/03_analise.py", "Análise Preditiva", ":pencil:"),
        Page("resources/04_grafico.py", "Gráficos", ":chart:")
    ]
)

if 'accessToken' not in st.session_state:
    token = st.query_params.get_all('session')[0]
    st.session_state['accessToken'] = token

st.markdown(
    """
    <style>
        [data-testid="stSidebar"] {
            background-color: rgb(242, 239, 239);
        }
    </style>
    """,unsafe_allow_html=True
)
st.markdown("# Análise de Dados")
# st.divider()
with st.container(border=True):
    st.markdown("""
                **Dados utilizados no dataset para realização da análise de dados**
                
                **altura**, volume, **dap** (diâmetro a altura do peito), area basal, **especie**, 1/dap, dap**2, ln(altura)
                """)

    st.latex(r"""
                Area Basal = \frac{(\pi \cdot dap^2)}{4} \\
            """)

    st.markdown("""
                **Fator de Fórmula para determinar o volume**
                
                Caso o volume não esteja definido na base de dados ou no dataset escolhido,
                será utilizado o fator de forma (ff) para sua obtenção na predição de altura
                conforme apresentado na função descrita abaixo.
                """)

    st.latex(r"""
            V = 0.7 \cdot \frac{(\pi \cdot dap ^2 )}{4000} \cdot \frac{altura}{10}
            """)

# st.divider()

st.subheader("Funcões utilizadas")
st.markdown("""
            Foram utilizadas funções básicas para treinamento e processamento dos modelos, 
            conforme códigos apresentados abaixo.
            """)
with st.expander("**Função básica para o pre-processamento**"):
    st.code("""
            from sklearn.compose import make_column_selector as selector
            from sklearn.compose import ColumnTransformer
            from sklearn.preprocessing import StandardScaler, OneHotEncoder
            import requests
            import streamlit as st
            import pandas as pd
            
            # function to preprocess our data 
            def preprocessing_data():
                numerical_columns_selector = selector(dtype_exclude=object)
                categorical_columns_selector = selector(dtype_include=object)
                
                categorical_preprocessor = OneHotEncoder(handle_unknown="ignore")
                numerical_preprocessor = StandardScaler()
                
                preprocessor = ColumnTransformer(
                    [
                        (
                            "one-hot-encoder", 
                            categorical_preprocessor, 
                            categorical_columns_selector
                        ),
                        (
                            "standard-scaler", 
                            numerical_preprocessor, 
                            numerical_columns_selector
                        ),
                    ],
                    remainder="drop",
                )
                
                return preprocessor
            """)
with st.expander("**Seleção dos Modelos disponíveis para realização da análise preditiva**"):
    st.code("""
            def get_model(type: str):
            match type:
                case "svr":
                    model = make_pipeline(preprocessor, SVR())
                case "knn":
                    model = make_pipeline(preprocessor, KNeighborsRegressor())
                case "dtr":
                    model = make_pipeline(preprocessor, DecisionTreeRegressor())
                case _:
                    model = make_pipeline(preprocessor, SVR())
            
            return model
            """)

with st.expander("**Carrega dados do inventário**"):
    st.code("""
            def get_inventario(upa_id: str, host: str):
            response = requests.get("HOST/arvore/get-all?
                    upaId=UPA_ID&orderBy=numero_arvore&order=asc",
                    headers={ 
                        'Authorization': f'Bearer TOKEN' 
                    }).json()
            
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
            """)

# Python snippet to send message to parent
js = '''
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
})

// Observe the scrollingElement for when the window gets resized
resizeObserver.observe(container);

window.document.addEventListener('token', handleEvent, false)
function handleEvent(e) {
console.log(e); // outputs: {foo: 'bar'}
}

sideBar.style.minHeight = "100vh";
window.addEventListener('message', function (event) {
    console.log(event);
})

</script>
'''
st.components.v1.html(js, height=0)