from flask import render_template
from app import app

@app.route('/')
def microblog():
    return render_template('index.html', title='Home')
