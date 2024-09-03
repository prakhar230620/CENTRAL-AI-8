import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


class InputAnalyzer:
    def __init__(self):
        nltk.download('punkt')
        nltk.download('stopwords')
        self.stop_words = set(stopwords.words('english'))

    def analyze(self, user_input):
        tokens = word_tokenize(user_input.lower())
        filtered_tokens = [w for w in tokens if w not in self.stop_words]
        return {
            'original_input': user_input,
            'tokens': filtered_tokens,
            'intent': self._determine_intent(filtered_tokens)
        }

    def _determine_intent(self, tokens):
        intent_keywords = {
            'question': ['what', 'who', 'when', 'where', 'why', 'how'],
            'command': ['do', 'make', 'create', 'show', 'tell'],
            'statement': []
        }

        for token in tokens:
            for intent, keywords in intent_keywords.items():
                if token in keywords:
                    return intent

        return 'statement'