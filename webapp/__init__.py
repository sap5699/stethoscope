from flask import Flask, request, render_template
println("HELLO STEEEVEN");
def create_app():
	app = Flask(__name__)
	@app.route('/')
	def home():
		return render_template('index.html');