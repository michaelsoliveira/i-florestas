from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
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
from .config import settings
from psycopg_pool import ConnectionPool, AsyncConnectionPool

# Import necessary modules
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn.metrics import r2_score

app = FastAPI(docs_url="/api-python/docs", openapi_url="/api-python/openapi.json")

load_dotenv

url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(settings.DATABASE_URL)

@app.get("/api-python/vars")
async def info():
    return {
        "default variable": settings.DATABASE_URL,
        "app max integer": settings.APP_MAX,
    }

@app.get("/api-python/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}


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

@app.get('/api-python/get-inventario/{poa}')
def inventario_poa(poa: str):
    # args = request.args
    # poa = args.get('poa')
    print(poa)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(ALL_INVENTARIO_BY_POA, (poa, ))
            data = cursor.fetchall()

    if data is not None:
        return jsonify(data)
    else:
        return "Nenhum poa encontrado"


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


@app.post("/api-python/todos")
def create_todo_item(todo: TodoCreate):
    new_todo = TodoItem(id=len(todos) + 1, title=todo.title, completed=False)
    todos.append(new_todo)
    return new_todo

# Route to get all todo items


@app.get("/api-python/todos")
def get_all_todo_items():
    return todos

# Route to get a specific todo item by ID


@app.get("/api-python/todos/{todo_id}")
def get_todo_item(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    return {"error": "Todo item not found"}

# Route to update a specific todo item by ID


@app.patch("/api-python/todos/{todo_id}")
def update_todo_item(todo_id: int, todo: TodoUpdate):
    for todo_item in todos:
        if todo_item.id == todo_id:
            todo_item.title = todo.title if todo.title is not None else todo_item.title
            todo_item.completed = todo.completed if todo.completed is not None else todo_item.completed
            return todo_item
    return {"error": "Todo item not found"}

# Route to delete a specific todo item by ID


@app.delete("/api-python/todos/{todo_id}")
def delete_todo_item(todo_id: int):
    for i, todo_item in enumerate(todos):
        if todo_item.id == todo_id:
            del todos[i]
            return {"message": "Todo item deleted"}
    return {"error": "Todo item not found"}