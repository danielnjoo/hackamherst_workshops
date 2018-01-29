## Web Development with Flask, 31st January

What you'll build: a website with two pages (1) home that takes a user's name and updates the view (2) a blog that extends the idea of (1) to take a user's name and comment and add it to the view.

Example: https://blooming-springs-99416.herokuapp.com/

### Step 0: setting up your environment

- Python
  - Python is a great human-readable language, which makes it perfect for a foray into web development
  - If you're using a Mac/Linux, python will already be pre-installed; you can check this in the command line with `python --version`. If you're using a Windows computer, I'd recommend downloading [Anaconda](https://anaconda.org/anaconda/python)
- pip
  - pip is the package manager for Python, we need it to download Flask
  - check if you already have it or not with `pip --version`, if you don't have it download it [here](https://pip.pypa.io/en/stable/installing/). Installing this requires downloading the Python script, then running it with `python get-pip.py`
- Flask
  - Flask is a 'micro web development framework' that uses Python, awesome
  - `pip install flask`
 
### Step 1: Hello World!
Commit hash: dc70356b8c173ab2782e3160e234fd81eb430afa

- We set up our project structure here thus:
  - note how the html files are inside another folder, templates, this is so we can use Flask's `render_template` — it'll look for the file in the template folder

```
flask
|-- app
|-- templates
     |-- index.html
|-- init__.py
|-- routes.py
|-- microblog.py
```

- To run our flask app we first need to `export` [(more info)](https://stackoverflow.com/questions/7328223/unix-export-command) the FLASK_APP variable (map our app file so Flask can find it)
  - `export FLASK_APP=microblog.py"
- We can now run it with `flask run`
  - Go to your browser and view [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
  
### Step 2: Take user input and update the view
Commit hash: 58f391ebe26c94a09c1ec1df1c6a67253b8dce2a

- Here we add a POST (an HTTP request, more on differences between POST and GET [here](https://www.w3schools.com/tags/ref_httpmethods.asp)) route to our single-page application
- This POST request takes input from an HTML form that is defined in our `index.html` file, more on HTML forms [here](https://www.w3schools.com/html/html_forms.asp)

### Step 3: Take user input and update the view
Commit hash: 517fddf44a0448234f2c9a40ba033ce36b6d0d65

- Extending on the idea of what we've already done, we add another web page `blog.html` here that also takes GET and POST requests, the HTML form here takes a user name and comment and adds it to a list

__Extension:__
- The list is in chronological order, which means that the newest ones are at the bottom; this isn't great — can you figure out how to fix it?

### Step 4: Add CSS, fix the chronology of the blog, and add date stamps!
Commit hash: 575de3b7579986dda39096945081aec4381f01f9

- We really flex our web development skills here, by using the `datetime` package to get the current time, format it, and then add this to our blog posts
- We fix the chronology by inserting the new blog posts at the start of our list, not appending them to the end
- We also add some CSS (`static/style.css`), a powerful scripting languages that styles our HTML, more [here](https://www.w3schools.com/css/)
  - Note that we added the CSS file to the `static` folder, this is the recommended place for Flask apps, but browsers cache this information, so to view changes, use Incognito mode (for Chrome)

__Extension:__
- Try changing the color of the header `<h1>` in the CSS file

### Step 5/6: Deploy!!
Commit hash: e6f2f3c7c6b53d19d1c98ed2f923a7d566d78faf

- Ignore Step5 (oops). Here we deploy our app to heroku, a freemium cloud platform service that allows us to host our Flask app
- We create some new files such as:
  - `runtime.txt` — tells heroku which Python version to use
  - `requirements.txt` - tells heroku which dependencies our application is using
  - `Procfile` — tells heroku how to start our web app
- You'll need to create a heroku account and [download](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) the heroku command line tools, which can be done via Brew / heroku's installer. Then:
  - Login: `heroku login`
  - Create an app with the Python buildpack: `heroku create --buildpack heroku/python`
  - Add your heroku remote to git: `git remote add heroku https://git.heroku.com/____your_app_____`
  - Push your files to that remote: `git push heroku master`
  
__Extension:__
- One of the issues with the current implementation is that it none of the comments persist! How might you go about fixing this?? Answer: database! Step 7 goes over this using MongoDB and a Python package called `pymongo`.
  
### Stretch: Step 7: Implement a DB!
Commit hash: e7a3ca2f25d911deda3a7d424b54b586c7583004

- First we download `pymongo` via `pip install pymongo`, we then add this to `requirements.txt` to make sure heroku knows to download it during deployment 
- Using heroku, we then attach a mLab MongoDB instance, and post comments (documents) to a collection inside our database, which we then pull every time somebody views the page    
  - DB hierarchy: DB > Collection > Documents

