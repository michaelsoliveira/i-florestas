import streamlit as st
import requests
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns 

st.markdown(
    """
    <style>
        [data-testid="stSidebar"] {
            background-color: rgb(242, 239, 239);
        }
    </style>
    """,unsafe_allow_html=True
)

st.markdown("# Gráficos")
# st.sidebar.markdown("# Page 3")
graficos_options = []
if 'type' in st.session_state:
    if (st.session_state['type'] == 'altura'):
        graficos_options = [ 
                        {'label': 'Altura x DAP', 'value': 'alt_dap' },
                        {'label': 'Altura Observada x Altura Estimada', 'value': 'alt_obs_est' },
                        {'label': 'Distribuição Diamétrica', 'value': 'distribuicao' },
                        {'label': 'Resíduos Altura Observada x Estimada', 'value': 'residuo_1' }
                    ]
    else:
        graficos_options = [ 
                        {'label': 'Volume x DAP', 'value': 'alt_dap' },
                        {'label': 'Volume Observado x Volume Estimado', 'value': 'alt_obs_est' },
                        {'label': 'Distribuição Diamétrica', 'value': 'distribuicao' },
                        {'label': 'Resíduos Volume Observado x Volume Estimado', 'value': 'residuo_1' }
                    ]
else:
    st.subheader("""
                Para visualizar os gráficos é necessário executar a análise na opção acima
                """)
fig, ax = plt.subplots()

def gerarGrafico(type: str):
    if 'analise_dataset' in st.session_state:
        match (type):
            case 'alt_dap':
                if (st.session_state['type'] == 'altura'):
                    ax.set_title('Altura x DAP', fontsize=15)
                    ax.set_xlabel('Altura (m)', fontsize=15)
                else:
                    ax.set_title('Volume x DAP', fontsize=15)
                    ax.set_xlabel('Volume (cm)', fontsize=15)
                ax.set_ylabel('DAP (cm)', fontsize=15) 
                plt.ylim(-1.5,1.5)
                ax.set_axisbelow(True)
                ax.grid(color='gray')
                ax.scatter(st.session_state.analise_dataset[st.session_state.type], st.session_state.analise_dataset['dap'],s=4)
                ax.axis([0, st.session_state.analise_dataset[st.session_state.type].max()+5, 0, st.session_state.analise_dataset['dap'].max()+5])
                st.plotly_chart(fig, theme="streamlit")
            case 'alt_obs_est':
                if (st.session_state['type'] == 'altura'):
                    ax.set_title('Altura Observada x Altura Estimada', fontsize=15)
                    ax.set_xlabel('Altura Observada (m)', fontsize=15)
                    ax.set_ylabel('Altura Estimada (cm)', fontsize=15) 
                else:
                    ax.set_title('Volume Observada x Volume Estimada', fontsize=15)
                    ax.set_xlabel('Volume Observada (cm)', fontsize=15)
                    ax.set_ylabel('Volume Estimada (cm)', fontsize=15) 
                plt.ylim(-1.5,1.5)
                ax.set_axisbelow(True)
                ax.grid(color='gray')
                ax.scatter(st.session_state.analise_dataset[st.session_state.type], st.session_state.analise_dataset[f"{st.session_state.type}_estimada"],s=4)
                ax.axis([0, st.session_state.analise_dataset[st.session_state.type].max()-5, 0, st.session_state.analise_dataset[st.session_state.type].max()+5])
                st.plotly_chart(fig, theme="streamlit")
            case 'distribuicao':
                ax.set_title('Distribuição Diamétrica', fontsize=15)
                ax.grid(color='gray')
                ax.set_xlabel('DAP (cm)', fontsize=15)
                ax.hist(st.session_state.analise_dataset['dap'], rwidth=0.9, bins=50, range=[st.session_state.analise_dataset['dap'].min()-10, st.session_state.analise_dataset['dap'].max()+10])
                st.plotly_chart(fig, theme="streamlit")
            case 'residuo_1':
                sns.residplot(x = st.session_state.type, 
                    y = f"{st.session_state.type}_estimada", 
                    data = st.session_state.analise_dataset)
                st.pyplot(fig)
                
top_menu = st.columns((4, 2))
panel_main = st.empty()

with top_menu[0]:      
        selectedGrafico = st.selectbox("Selecione o tipo do Gráfico", options=(graficos_options), format_func=lambda modelo: f'{modelo["label"]}')

with top_menu[1]:   
    btnValidacao = st.button('Exibir o Gráfico', disabled=True if len(graficos_options) == 0 else False)

if btnValidacao:
    with panel_main.container():
        gerarGrafico(selectedGrafico['value'])   
    
def graficoDistDiametrica():
    daps = st.session_state.dataset.dap
    print(daps)

st.markdown(
    """
    <style>

        div[data-testid="column"]:nth-of-type(2)
        {
            display: flex;
            align-items: flex-end;
        } 
    </style>
    """,unsafe_allow_html=True
)