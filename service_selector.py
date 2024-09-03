from neural_network import NeuralNetwork


class ServiceSelector:
    def __init__(self, db):
        self.db = db
        self.nn = NeuralNetwork()

    def select(self, analyzed_input):
        services = self.db.get_all_services()
        service_scores = []

        for service in services:
            score = self.nn.calculate_score(analyzed_input, service['description'])
            service_scores.append((service, score))

        best_service = max(service_scores, key=lambda x: x[1])[0]
        return best_service