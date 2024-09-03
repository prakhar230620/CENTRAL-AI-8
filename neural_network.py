import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class NeuralNetwork:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def calculate_score(self, analyzed_input, service_description):
        input_text = ' '.join(analyzed_input['tokens'])
        corpus = [input_text, service_description]

        tfidf_matrix = self.vectorizer.fit_transform(corpus)
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        return similarity