from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

from api.disc import disc
app.register_blueprint(disc)

if __name__ == "__main__":
    app.run(debug=True)
