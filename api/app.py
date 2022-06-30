from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

def get_db_connection():
    connection = sqlite3.connect('coder-bridge.db')
    connection.row_factory = dict_factory

    return connection

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

app = Flask(__name__)
CORS(app)

@app.route("/tasks")
def get_tasks():
    # 取得 DB 連線
    conn = get_db_connection()
    # 執行 SQL query
    rows = conn.execute('SELECT * FROM tasks').fetchall()
    # commit SQL query
    conn.commit()
    conn.close()

    return jsonify(list(rows))

@app.route("/tasks", methods=['POST'])
def create_task():
    # 請實作新增待辦事項 API
    # 前端會把要新增的待辦事項放在 body, key 為 description
    return jsonify({}) # 此行請保留

@app.route("/tasks/<id>", methods=['PATCH'])
def update_task(id):
    # 請實作更新待辦事項敘述 API
    # 前端會把要更改的待辦事項放在 body, key 為 description
    # method 的 id 參數為 task 的 id
    return jsonify({}) # 此行請保留

@app.route("/tasks/<id>", methods=['DELETE'])
def delete_task(id):
    # 請實作完成待辦事項敘述 API
    # method 的 id 參數為 task 的 id
    return jsonify({}) # 此行請保留
