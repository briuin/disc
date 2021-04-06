from flask import Flask, jsonify, redirect, request, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('disc_db')
disc_col = db.get_collection('disc_col')

@app.route('/addRecord', methods=['POST'])
def addRecord():
    data = json.loads(request.data.decode('utf-8'))
    disc_col.insert_one({"name": data['name'], "position": data['position'], "results": data['results']})
    return jsonify({})

@app.route('/getRecords')
def getRecords():
    records_json = []
    if disc_col.find({}):
        for record in disc_col.find({}).sort('_id', -1):
            records_json.append({"name": record['name'], "id": str(record['_id']), "position": record['position'], "results": record['results'], "time": str( record['_id'].generation_time.utcnow() )})
    return json.dumps(records_json)

if __name__ == "__main__":
    app.run(debug=True)