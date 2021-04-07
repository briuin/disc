from flask import Blueprint, jsonify, redirect, request, url_for
import json
from pymongo import MongoClient

disc = Blueprint('disc', __name__)

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('disc_db')
disc_col = db.get_collection('disc_col')

@disc.route('/addRecord', methods=['POST'])
def addRecord():
    data = json.loads(request.data.decode('utf-8'))
    disc_col.insert_one({"name": data['name'], "position": data['position'], "results": data['results']})
    return jsonify({})

@disc.route('/getRecords')
def getRecords():
    records_json = []
    if disc_col.find({}):
        for record in disc_col.find({}).sort('_id', -1):
            records_json.append({"name": record['name'], "id": str(record['_id']), "position": record['position'], "results": record['results'], "time": str( record['_id'].generation_time )})
    return json.dumps(records_json)