# Python Flask API 及 AJAX 練習

# 資料夾結構
```
|__api // Python Flask API
|
|__frontend // 前端畫面
```

# 檔案架構
## api
- app.py
Python Flask 啟動檔案
- coder-bridge.db
SQLite database
- requirements.txt
Python 相關套件管理

## frontend
- index.html
- style.css
- index.js
裡面實作 AJAX 與 Python Flask API 互動

# 如何開發？
1. 前往 api 資料夾
```console
$ cd practice-flask-api/api
```
2. 安裝相關套件
```console
$ pip install -r requirements.txt
```
3. 執行 Flask
```console
$ flask run
```
4. 開啟 `frontend/index.html` 開啟網頁
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/33183531/176677945-123b7bb4-9f7b-4ef6-9428-f300972f8e06.png">

5. 開啟 app.py 檔案，並實作以下 function
- create_task
- update_task
- delete_task

# 預期結果畫面
![test](https://user-images.githubusercontent.com/33183531/176678807-1adea6b7-e308-48fc-95ba-c7f941f50076.gif)
