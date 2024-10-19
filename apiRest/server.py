from flask import Flask
from flask_cors import CORS

from main import GuessingGame

app = Flask(__name__)
CORS(app)

guessingGame = GuessingGame()

@app.route('/apis/get-word')
def getWord():
    retorno = guessingGame.getWord()
    return retorno

@app.route('/apis/guess-word/<string:tryWord>')
def guessWord(tryWord):
    retorno = guessingGame.guessWord(tryWord)
    return retorno

@app.route('/apis/surrender/')
def surrender():
    retorno = guessingGame.surrender()
    return retorno

app.run()