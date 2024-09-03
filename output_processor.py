import pyttsx3

class OutputProcessor:
    def __init__(self):
        self.tts_engine = pyttsx3.init()

    def process(self, raw_output, input_type):
        if isinstance(raw_output, str):
            if input_type == 'voice':
                self._speak(raw_output)
            return {'text': raw_output, 'type': 'text'}
        elif isinstance(raw_output, dict) and 'image' in raw_output:
            return {'image_url': raw_output['image'], 'type': 'image'}
        else:
            return {'data': raw_output, 'type': 'other'}

    def _speak(self, text):
        self.tts_engine.say(text)
        self.tts_engine.runAndWait()