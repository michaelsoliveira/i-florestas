from distutils.log import debug
from flask import Flask

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def index():
    return "Flask Server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)