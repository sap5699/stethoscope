from flask import Flask, request, render_template


def create_app():
	app = Flask(__name__)
	@app.route('/')
	def home():
		return render_template('index.html');
