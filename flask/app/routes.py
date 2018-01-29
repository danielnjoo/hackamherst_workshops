from flask import render_template
from flask import request
from flask import jsonify
from app import app

posts = []

@app.route('/', methods=['GET', 'POST'])
def microblog():
    if request.method == "POST":
        print request.get_data()
        user_input = request.get_data().split('=')[1]
        return render_template('index.html', title='Home', name=user_input)
    return render_template('index.html', title='Home')

@app.route('/blog', methods=['GET', 'POST'])
def blog():
    if request.method == "POST":
        name = request.form['name']
        comment = request.form['comment']
        print "name:", name
        print "comment:", comment

        posts.append({'name': name, 'comment': comment})
        return render_template('blog.html', title='Blog', posts=posts)


    return render_template('blog.html', title='Blog')
