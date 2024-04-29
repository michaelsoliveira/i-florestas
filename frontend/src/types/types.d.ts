type Umf = {
    "id": string,
    "nome": string,
    "municipio": string,
    "localizacao": string,
    "estado": {
        "id": string,
        "uf": string,
        "nome": string,
        "ddd": number
    }
}