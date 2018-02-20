## apps2templates1, 21st February

### What we're doing
- going over some basics/principles
- building quickly, trying to minimize need for proprietary back-end and/or complicated front-end
  - we can use Google Forms to collect data and populate a Google Sheet, then, draw data from this Google Sheet
  - we can also use project boilerplate templates to get from 0-30 in seconds

### General overview

__Hackathon basics__
- teams of up to 4
- delegating responsibilities is incredibly important, and requires communication (everyone has to be on the same page)
- plan out exactly what you want to do and how you're going to do it... it's a lot easier than trying to make a square peg fit into a circular hole
  - think of your product, and how __your user is going to interact with it__, this will in turn dictate what you'll build
- time is limited, and often setting up your IDE (coding environment) and initial project structure is itself a big task, so keep that in mind (i.e. what tech stack you're comfortable and will work with) and be aware of _templates_

__Project basics__
- having only 50% your features working is better than having 0% of your features working but 100% of it attempted, so __build in steps__, build a minimum viable product (MVP) and iterate on it, especially if you're using new technologies, e.g. use Google Sheets as a database instead of implementing your own
- all projects can be thought of as having a _front-end_ (a view, e.g. for the Bot we didn't have to make one as Messenger provided it, whereas in the Flask project we did) and a _back-end_ (the data that populates the view), each of these can also be thought of as 1 of 2 categories:
- static:
  - front-end: doesn't really respond to user input, e.g. a collection of web pages, i.e. no scripting
  - back-end: created once, and not changed often, e.g. the data for a campus directory
- dynamic:
  - front-end: doesn't really respond to user input, e.g. a collection of web pages
  - back-end: updated often, e.g. a campus dating app

__Resources for ideating__
- wolframalpha hackathon project generator [link](https://www.wolframcloud.com/objects/microsites/ProjectGenerator/)
- devpost projects [link](https://devpost.com/software)
- quora answers, suggests your group  [link](https://www.quora.com/What-are-some-cool-ideas-for-a-hackathon-I-have-to-code-and-deliver-the-project-in-two-days-Any-ideas-to-get-the-creative-juices-flowing-You-will-be-credited-if-I-use-your-idea)
-

__Resources for building__
- boilerplates from hackoose [link](http://hackoose.github.io/boilerplates.html)

### App1: a blind-dating app
- user visits website
- user takes Google Form, enters available times for lunch/dinner within the immediate week
- user returns to website and enters his/her name and gets a time/place if there's a match

#### Step 0: cloning a boilerplate
Commit hash: 3c59a05dff02e9a06657be6eb8509e739f513d0b
- we use [this boilerplate](https://github.com/realpython/flask-boilerplate), which is certainly over-engineered for our purposes
- it's inside the boilerplate folder, note there is some set-up required, this is detailed inside the README, but essentially:

```
cd flask-boilerplate
virtualenv --no-site-packages env
source env/bin/activate
pip install -r requirements.txt
python app.py
```

Structure:
```
hack-workshops
|-- apps2templates1
  |-- boilerplate
    |-- ~the project~
  |-- README.md
|-- other workshops
```

- take some time to understand how the current project is set-up, go through the pages, view the console, etc.

#### Step 1: Google Form and Google Sheet
Commit hash: 1738268e516ce14bfd3cc1f2d92778f7e0acac8e
Commit diff: [link](https://github.com/danielnjoo/hackamherst_workshops/commit/1738268e516ce14bfd3cc1f2d92778f7e0acac8e)

- create a simple Google Form, and attach the results to a Google Sheet
  - Publish the Google Sheet to the web as a CSV, and
- get the Form's link then:
  - we have a two page app, home/about and take, so we can uncomment out the third navBar option (comment out lines 56-68 in `templates/layouts/main.html`)
    - I renamed the second option in `main.html` from about to take
      - note that our layout file is still `placeholder.about.html`, we could rename this, but it's require some refactoring elsewhere - it's definitely good practice to do so
  - we edit both pages' HTMLs in `templates/pages/`
  - we create a form for `take.html` which just asks for a person's name by copying the layout of the other forms (liquid templating ftw)

  ```
  {% extends 'layouts/form.html' %}
  {% block title %}Login{% endblock %}
  {% block content %}
    <form method="post" class="form">
      <h3 class="form-heading">Take <a href="{{ url_for('home') }}" title="Back to homepage"><i class="fa fa-home pull-right"></i></a></h3>
      {{form.name( placeholder=form.name.label.text, required=true)}}
    </form>
  {% endblock %}
  ```

  - we add this class to our `forms.py`:

  ```
  class TakeForm(Form):
    name = TextField('name')
    password = PasswordField()
  ```

  - and then update our `apps.py` routes:

  ```
  @app.route('/take', methods=['GET', 'POST'])
  def about():
      if request.method == "GET":
          form = TakeForm(request.form)
          return render_template('forms/take.html', form=form)
      if request.method == "POST":
          print(request.values)
          return render_template('pages/placeholder.about.html', data=request.values)
  ```

#### Step 2: Pull Data From the Google Sheet

- we import `csv` and `requests` and make a GET request to our Google Sheet URL to grab the data, check that this works

```
url = '___your url ____'
r = requests.get(url)
text = r.iter_lines()
reader = list(csv.reader(text, delimiter=','))
print(reader)
```

#### Step 3: Apply Logic

- we need to do some matching:
  - we have a needle (person to match) that looks like  [0,1,1,0], and
  - a haystack (people to match with) that looks like [[1,1,0,0],[0,0,1,0]], in which case we'd want [1] and [2] (indices are 0-indexed) returned so we know which people to match with and on which days... we'd map these back to a dictionary with the days and meals
  - there are many ways to do this...
- 

__Potential improvements__
- most crucically: after matches are made, there's no confirmation that they'll go; further, they can't be removed from the spreadsheet / dating pool
- data privacy: people could enter other people's names and snoop in that way
  - implement a confirmation code
- also problematic is that users have to keep coming back to the website to check if they got a date
  - you could implement an email/text notification system
