from collections import Counter
from pymongo import MongoClient
import nltk
import random
import spacy
from nltk.corpus import mac_morpho
from flask import jsonify

class GuessingGame():
    def __init__(self):
        self.word = None
        
    def getWord(self):
        nltk.download('mac_morpho')
        palavras_rotuladas = mac_morpho.tagged_words()

        palavras = [palavra for palavra,tag in palavras_rotuladas if tag == 'N']

        palavras_validas = [palavra.lower() for palavra in palavras if palavra.isalpha() and len(palavra) > 3]
        palavraSorteada = palavras_validas[random.randint(0, len(palavras_validas))]
        self.word = palavraSorteada

        palavraOculta = []
        for i in range(len(palavraSorteada)):
            palavraOculta.append("_")

        return [len(palavraSorteada), palavraOculta]

    def guessWord(self, tryWord):
        tryWord = tryWord.lower()
        nlp = spacy.load("pt_core_news_lg")
        palavra1 = nlp(tryWord)
        palavra2 = nlp(self.word)

        if palavra1.vector_norm <=0:
            return str(0)

        try:
            finalValue = round((palavra1.vector @ palavra2.vector) / (palavra1.vector_norm * palavra2.vector_norm) * 100, 2)

            if finalValue < 0:
                finalValue = 0

            return str(finalValue)
        except Exception as e:
            return str(0)

    def surrender(self):
        return jsonify(self.word)