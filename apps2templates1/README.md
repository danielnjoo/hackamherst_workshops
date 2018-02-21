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
- we use [this boilerplate](https://github.com/realpython/flask-boilerplate), which is certainly over-engineered for our purposes, , `git clone` it
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
Commit hash: 135c6b2754208fae2a913e8c6d219722f4fd94ca
Commit diff: [link](https://github.com/danielnjoo/hackamherst_workshops/commit/135c6b2754208fae2a913e8c6d219722f4fd94ca)

- we need to do some matching:
  - we have a needle (person to match) that looks like  [0,1,1,0], and
  - a haystack (people to match with) that looks like [[1,1,0,0],[0,0,1,0]], in which case we'd want [1] and [2] (indices are 0-indexed) returned so we know which people to match with and on which days... we'd map these back to a dictionary with the days and meals
  - there are many ways to do this...

I ended up amending the `about.html` thus:
```
<p class="lead">hello {{name}}</p>

<p>{{result}}</p>
 ```
and adding the following to `app.py`:

```
if request.method == "POST":

    nameToSearch = request.form['name']
    print(nameToSearch)

    url = '___your url____'
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
 ```

__Potential improvements__
- most crucically: after matches are made, there's no confirmation that they'll go; further, they can't be removed from the spreadsheet / dating pool
- data privacy: people could enter other people's names and snoop in that way
  - implement a confirmation code
- also problematic is that users have to keep coming back to the website to check if they got a date
  - you could implement an email/text notification system


### App2: Image Blog
- user visits website
- user uploads photo
- users can view all uploaded photos

#### Step 4: Cloning A Boilerplate
Commit hash: c41a2a2a69b49fe34cb2a9509d093d90a52d8bf2

- we previously used a Flask boilerplate, this time we're going to use a nodeJS boilerplate :), we use [this](https://github.com/sahat/hackathon-starter) one, `git clone` it
- cd into the folder and install the requirements `npm install`
- try running `npm start`, it'll bug out as you need a local mongodb server running, if you haven't this up on your computer before then
  - use brew, a Mac package manager to install mongodb, `brew install mongodb`
  - then try running `mongod`, note it's not mongodb, but just mongod (no b)
    - this might bug out, complaining there is no db folder, [ta-dah!](https://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder), yeah I had this exact problem years ago
    - create a new Terminal window, and make the data/db folder with admin permissions, and give yourself permissions to this folder, the command is `sudo mkdir -p /data/db`
- now try running `mongod`, `mongod --dbpath /data/db`, `mongod --dbpath ~/data/db`
- `npm start` again
- isn't the template beautiful? View it in `localhost:8080`

#### Step 5: Fixing Uploads
Commit hash:
Commit diff: [link]()

- try uploading a photo in the API page, see how it goes to the upload folder automatically? Try opening a file
- current problem: the files aren't encoded, i.e. have no file type, and thus all we get is binary
- let's add an uploads folder to public an consider our problem...
  - you might Google 'multer file uploading without extension', and find [this](https://github.com/expressjs/multer/issues/170), which tells us to
  - replace the multer and upload declarations in `app.js` with:

```
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'))
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage });
```

- cool this works

__Potential improvements__
- up/down vote photos, prioritize highly voted photos
- allow submitters to tag photos and implement search by tag
- general front-end beautification
