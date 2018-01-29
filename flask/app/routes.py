from flask import render_template
from flask import request
from app import app

@app.route('/', methods=['GET', 'POST'])
def microblog():
    if request.method == "POST":
        print request.get_data()
        user_input = request.get_data().split('=')[1]
        return render_template('index.html', title='Home', name=user_input)
    return render_template('index.html', title='Home')
