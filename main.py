from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_manager import AIManager
from input_analyzer import InputAnalyzer
from service_selector import ServiceSelector
from junction import Junction
from output_processor import OutputProcessor
from neural_network import NeuralNetwork
from database import Database
import functools

app = Flask(__name__)
CORS(app)
db = Database()
ai_manager = AIManager(db)
input_analyzer = InputAnalyzer()
service_selector = ServiceSelector(db)
junction = Junction(db)
output_processor = OutputProcessor()
neural_network = NeuralNetwork()


def create_endpoint(route, methods):
    def decorator(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            try:
                result = f(*args, **kwargs)
                return jsonify({"success": True, "data": result})
            except Exception as e:
                return jsonify({"success": False, "error": str(e)}), 400

        return app.route(route, methods=methods)(wrapper)

    return decorator


@create_endpoint('/process_input', ['POST'])
def process_input():
    data = request.json
    user_input = data['input']
    input_type = data['type']

    analyzed_input = input_analyzer.analyze(user_input)
    selected_service = service_selector.select(analyzed_input)

    service_id = selected_service['id']
    service = junction.get_service(service_id)

    raw_output = service.process(analyzed_input)
    processed_output = output_processor.process(raw_output, input_type)

    return processed_output


@create_endpoint('/add_ai', ['POST'])
def add_ai():
    ai_data = request.json
    return ai_manager.add_ai(ai_data)


@create_endpoint('/update_ai', ['PUT'])
def update_ai():
    ai_id = request.json['id']
    ai_data = request.json['data']
    return ai_manager.update_ai(ai_id, ai_data)


@create_endpoint('/delete_ai', ['DELETE'])
def delete_ai():
    ai_id = request.json['id']
    return ai_manager.delete_ai(ai_id)


@create_endpoint('/get_all_ai', ['GET'])
def get_all_ai():
    return ai_manager.get_all_ai()


if __name__ == '__main__':
    app.run(port=5000,debug=True)