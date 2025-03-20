from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

presets = {
    "default": {
        "bpm": 120,
        "sequence": [1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0],
        "waveform": "sawtooth"
    }
}

@app.route('/api/presets', methods=['GET'])
def get_presets():
    return jsonify(presets)

if __name__ == '__main__':
    app.run(port=5000)