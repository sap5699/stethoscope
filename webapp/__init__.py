from flask import Flask, request, render_template

def create_app():
	app = Flask(__name__)

	@app.route('/questionnaire')
	def questionnaire():
		return render_template('questionnaire.html')

	@app.route('/')
	def home():
		return render_template('index.html');
	return app

	