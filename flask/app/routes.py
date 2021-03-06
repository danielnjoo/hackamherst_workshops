from flask import render_template
from flask import request
from flask import jsonify
from pymongo import MongoClient

from app import app

import datetime

client = MongoClient('mongodb://test:test@ds119078.mlab.com:19078/heroku_2f9zr1zs')
db = client.heroku_2f9zr1zs
# help(db.test) # get all the methods for a mongoDB collection

def get_posts():
    return db.test.find().sort('date', -1)

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
        print('here')
        name = request.form['name']
        comment = request.form['comment']
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        likes = 0;

        print "name:", name
        print "comment:", comment
        print "date:", date

        db.test.insert_one({'name': name, 'comment': comment, 'date': date, 'likes': likes})
        return render_template('blog.html', title='Blog', posts=get_posts())

    return render_template('blog.html', title='Blog', posts=get_posts())

@app.route('/<string:like_id>', methods=['POST'])
def like(like_id):
    # print(like_id)

    likes = db.test.find_one({'date': like_id}, {'_id': 0, 'likes': 1})['likes']
    db.test.update_one({
        'date': like_id
    },{
        '$set': {
            'likes': likes + 1
        }
    }, upsert=False)

    return render_template('blog.html', title='Blog', posts=get_posts())
