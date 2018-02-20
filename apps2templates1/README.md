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
- we use [this boilerplate](https://github.com/realpython/flask-boilerplate), which is certainly over-engineered for our purposes
- it's inside the boilerplate folder, note there is some set-up required

Structure:
```
hack-workshops
|-- apps2templates1
  |-- boilerplate
    |-- ~the project~
  |-- README.md
|-- other workshops
```

#### Step 1: Google Form and Google Sheet
- create a simple Google Form, and attach the results to a Google Sheet

__Potential improvements__
- lack of data privacy: if you inspect the website and find the Google Sheet URL, you can access all the data
  - what you could do: implement a database; equally you could implement the whole project as a Messenger Bot and you no longer need to design a front-end
- additionally, people could enter other people's names and snoop in that way
  - implement a confirmation code
- also problematic is that users have to keep coming back to the website to check if they got a date
  - you could implement an email/text notification system
