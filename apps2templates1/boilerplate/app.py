#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#
import csv
import requests
from random import randint

from flask import Flask, render_template, request, json, jsonify
# from flask.ext.sqlalchemy import SQLAlchemy
import logging
from logging import Formatter, FileHandler
from forms import *
import os


#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_object('config')
#db = SQLAlchemy(app)

# Automatically tear down SQLAlchemy.
'''
@app.teardown_request
def shutdown_session(exception=None):
    db_session.remove()
'''

# Login required decorator.
'''
def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap
'''
#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#


@app.route('/')
def home():
    return render_template('pages/placeholder.home.html')


@app.route('/take', methods=['GET', 'POST'])
def about():
    if request.method == "GET":
        form = TakeForm(request.form)
        return render_template('forms/take.html', form=form)
    if request.method == "POST":

        nameToSearch = request.form['name']
        print(nameToSearch)

        url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT631ElTRFOLGOtJnNypmH3FGbEKcsJeW55DYti7nuobFCbH85ojsy5VrsASDZeTzAsnWsHMxVErQzu/pub?gid=917980352&single=true&output=csv'
        r = requests.get(url)
        text = r.iter_lines()
        reader = list(csv.reader(text, delimiter=','))
        
        names = [item[1] for item in reader[1:len(reader)]]
        meals = [item[2:len(item)] for item in reader[1:len(reader)]]

        dayMealDict = {0: 'monday lunch', 1: 'tuesday lunch', 2: 'wednesday lunch', 3: 'thursday lunch', 4: 'friday lunch',
        5: 'monday dinner', 6: 'tuesday dinner', 7: 'wednesday dinner', 8: 'thursday dinner', 9: 'friday dinner'}

        if nameToSearch in names:
            nameIndex = names.index(nameToSearch)
            needleMeals = meals[nameIndex]
            haystackMeals = (meals[:nameIndex]+meals[nameIndex+1:len(meals)])
            matches = []
            for sublist in (haystackMeals):
                # print(needleMeals)
                # print(sublist)
                matches.append([i for i, item in enumerate(sublist) if sublist[i]=='yes' and needleMeals[i] == 'yes'])
            # print(matches)
            if (len(matches)>1):
                personMatch = randint(0,len(matches)-1) #pick a random match
                match = matches[personMatch]
            else:
                personMatch = 0
                match  = matches[0]
            dayofMatch = match[randint(0,len(match)-1)] #pick a random day to match
            print('so the ',  personMatch, ' th index of all other people to match should match with ', nameToSearch, ' on ', dayMealDict[dayofMatch])

            result = 'your date is on ' + dayMealDict[dayofMatch]

        else:
            result = 'no match'

        return render_template('pages/placeholder.about.html', name=nameToSearch, result=result)


@app.route('/login')
def login():
    form = LoginForm(request.form)
    return render_template('forms/login.html', form=form)


@app.route('/register')
def register():
    form = RegisterForm(request.form)
    return render_template('forms/register.html', form=form)


@app.route('/forgot')
def forgot():
    form = ForgotForm(request.form)
    return render_template('forms/forgot.html', form=form)

# Error handlers.


@app.errorhandler(500)
def internal_error(error):
    #db_session.rollback()
    return render_template('errors/500.html'), 500


@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

if not app.debug:
    file_handler = FileHandler('error.log')
    file_handler.setFormatter(
        Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    )
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('errors')

#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''
