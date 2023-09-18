from functools import lru_cache

import psycopg
from psycopg_pool import ConnectionPool, AsyncConnectionPool
from .config import settings

def get_conn():
    return psycopg.connect(settings.DATABASE_URL)

@lru_cache
def get_pool():
    return ConnectionPool(settings.DATABASE_URL)

@lru_cache
def get_async_pool():
    return AsyncConnectionPool(settings.DATABASE_URL)