from typing import Union, List, Annotated

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
# from psycopg_pool import AsyncConnectionPool
from pydantic import BaseModel
import os
from distutils.log import debug

from dotenv import load_dotenv
# Import required libraries
import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt
import sklearn
from sklearn.neural_network import MLPClassifier
from sklearn.neural_network import MLPRegressor
from .config import settings
# from psycopg_pool import ConnectionPool, AsyncConnectionPool

# Import necessary modules
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn.metrics import r2_score
import psycopg2

from ia.models import Ut, Poa, Arvore
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import select, join, and_, func, column
import json
import re
from geoalchemy2.shape import from_shape, to_shape
from shapely import Point, to_wkb, to_wkt, to_geojson

# models.Base.metadata.create_all(bind=engine)

class Poa(BaseModel):
    id: str
    descricao: str

app = FastAPI(docs_url="/ia/docs", openapi_url="/ia/openapi.json")

origins = [
    settings.CLIENT_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

def get_conn_str():
    return f"""
    dbname={os.getenv('POSTGRES_DB')}
    user={os.getenv('POSTGRES_USER')}
    password={os.getenv('POSTGRES_PASSWORD')}
    host={os.getenv('POSTGRES_HOST')}
    port={os.getenv('POSTGRES_PORT')}
    """

url = os.getenv("DATABASE_URL")

# connection = psycopg2.connect(settings.DATABASE_URL)
    
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     app.async_pool = AsyncConnectionPool(conninfo=get_conn_str())
#     yield
#     await app.async_pool.close()


# app = FastAPI(lifespan=lifespan)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/ia/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}

@app.get("/ia/vars")
def info():
    return {
        "default variable": url
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALL_INVENTARIO_BY_POA = """SELECT a.numero_arvore, a.altura, a.dap, a.volume, s.nome as situacao FROM arvore a 
    INNER JOIN ut u ON u.id = a.id_ut
    INNER JOIN poa p on p.id = u.id_poa
    INNER JOIN situacao_arvore s ON s.id = a.id_situacao
    WHERE p.id = %s
    ORDER BY a.numero_arvore;"""

@app.get('/ia/get-poa/{poa_id}')
async def inventario_poa(poa_id: str, db: db_dependency):
    # query = select(func.ST_AsText(Ut.polygon_path), Ut.id)
    # print(query)
    # data = db.query(Arvore).join(Ut).filter(
    #     Ut.id == Arvore.id_ut
    # )

    # Convert the SQLAlchemy objects to a list of dictionaries
    # locations_json = [{'numero_arvore': arvore.numero_arvore, 'ponto_arvore': arvore.id } for arvore in data]

    # Convert to JSON
    # locations_json_string = json.dumps(locations_json, indent=4)

    # print(locations_json)
    # result['ponto_arvore'] = func.ST_AsGeoJSON(result['ponto_arvore'])
    # print(result['id'])
    # result = []
    # for row in data:
    #     result.append([func.ST_AsGeoJSON(row.ponto_arvore)])
        
    # if hasattr(result, '__dict__'):
    #     print(vars(result))
    # else:
    #     print("obj1 doesn't have a __dict__ attribute")
    #result = db.execute(select(Arvore.id, func.ST_AsText(func.ST_Transform(Arvore.ponto_arvore,4326)))).scalars().all()
    result = db.query(Arvore).order_by(Arvore.numero_arvore).all()
    # result = select(models.Arvore).join(models.Ut).join(models.Poa).where(models.Arvore.id_ut == models.Ut.id).where(models.Ut.id == models.Poa.id)

    # for row in db.execute(stmt):
    #     print(row)
    # result = db.execute(select(models.Poa)).first()
    if not result:
        raise HTTPException(status_code=404, detail='Poa is not found')
    return result


class TodoCreate(BaseModel):
    title: str


class TodoUpdate(BaseModel):
    title: Union[str, None] = None
    completed: Union[bool, None] = None


class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool


# Define the TodoItem model
class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool


# In-memory storage for todo items
todos = []

# Route to create a new todo item


@app.post("/ia/todos")
def create_todo_item(todo: TodoCreate):
    new_todo = TodoItem(id=len(todos) + 1, title=todo.title, completed=False)
    todos.append(new_todo)
    return new_todo

# Route to get all todo items


@app.get("/ia/todos")
def get_all_todo_items():
    return todos

# Route to get a specific todo item by ID


@app.get("/ia/todos/{todo_id}")
def get_todo_item(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    return {"error": "Todo item not found"}

# Route to update a specific todo item by ID


@app.patch("/ia/todos/{todo_id}")
def update_todo_item(todo_id: int, todo: TodoUpdate):
    for todo_item in todos:
        if todo_item.id == todo_id:
            todo_item.title = todo.title if todo.title is not None else todo_item.title
            todo_item.completed = todo.completed if todo.completed is not None else todo_item.completed
            return todo_item
    return {"error": "Todo item not found"}

# Route to delete a specific todo item by ID


@app.delete("/ia/todos/{todo_id}")
def delete_todo_item(todo_id: int):
    for i, todo_item in enumerate(todos):
        if todo_item.id == todo_id:
            del todos[i]
            return {"message": "Todo item deleted"}
    return {"error": "Todo item not found"}