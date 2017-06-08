[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

[![Writr screenshot](http://i.imgur.com/erdJIjoh.png)]

# Links

[Front End Repo](https://github.com/jscohen/capstone_front_end)

[Back End Repo] (https://github.com/jscohen/capston_backend)

[Front End Deployment] (https://jscohen.github.io/capstone_front_end/)

[API Deployment] (https://young-savannah-37906.herokuapp.com/)

# YourDocs

YourDocs is a functioning word processor and text translator.

## Wireframes
[Wireframe for Front Page](http://i.imgur.com/WjeDppb.jpg)
[Wireframe for Get Docs](http://i.imgur.com/Lw5Orr9.jpg)

## Technologies

YourDocs is a word processor and translator that uses Ember.js and Express.js to run.  In ember, the client-side functionality is handled via routes, services and components.  ExpressJS provides RESTFUL routes for the API.  On the back end, the Yandex API provides translation.

Using ember, the application is broken down into three main components: authentication, creating and editing documents, and translation.  Authentication occurs on the index page with routes and components for each authentication action: signing in, signing up, changing passwords and signing out.  For documents, creating a new document is done on the new-document route using the new-document and add-doc components.  Here you create a document (a POST call to the API) and edit it and translate (PATCH calls).

On the docs route, the doc resource is called via Ember's get system, which greatly simplifies API calls.  Using a handlebars template, each document is listed and the components in HTML are given the document ID to distinguish one from the other.  The edit and translation features have their own Ember components.  In sum, I relied primarily on components for my app's functionality rather than routes or controllers.  In addition, I made some of my API calls (translate, POST and PATCH) from the docs service using the authentication service as an example.  The data for each request is passed via an action to the component, which calls functions in the docs service to make the API calls.  In general, this app follows Ember conventions of actions going down and data going up, although it is inconsistent.

[Yandex API Documentation] (https://tech.yandex.com/translate/doc/dg/concepts/About-docpage/)

The major functionality aside from the doc resources' RESTful routes is the translation feature.  The translation is a patch request at a custom route /translate/:doc_id.  From that route, expressJS sends an API call to yandex with the API key, text, current language, and translation language and returns a JSON value.  That value is cleaned and put into the text field of the doc using the Mongoose update function.  On the front end, that value is dynamically added to the Ember textarea.

## General Approach
I attempted to make this a client-focused app and minimize the calls on the back end.  There is only one resource, docs, to contain the document.  On the front end, you can access the New Document view which prompts you to write a document, create it, and then allows you to translate and save.  You can access your docs to edit them as well.  The translation involves selecting the langugae you are translating from and then the language you are translating to.  The translation occurs dynamically, and will update your text immediately.

I originally wanted to make this app a full word processor like Google Docs, but I couldn't find a framework that would work with Ember.  Ember uses its own custom text field components instead of the normal HTML textarea and it is impossible to add CSS to the text inside.  So I abandoned this idea and reused the Yandex translation service from my second project to make the app a text translator.

Because of the flexibility of expressJS (which I prefer to Rails), I was able to focus on Ember on the front end and make changes on the fly, especially when I shifted focus from word processing to translation.  I generated routes and components for each piece of functionality, and worked on building the views and the logic using "the Ember way".  Although Ember is convention over configuration unlike expressJS, I was still able to make the functionality I needed, even if it is sometimes inelegant or not necessarily "the Ember way".  An example of this is the API calls: for the GET request to retrieve a user's documents, I made use of Ember's native features to make the call in the route model and then use a handlebars template to populate each document.  However, I also needed to make other API calls such as translation and updating and I made those in the docs service with custom API requests.  Overall, I got the functionality done that needed to be there although I'm sure there are better ways using Ember's capabilities.

## Hurdles and Unresolved Issues

I am fairly happy with the final product of the app, but it was not entirely smooth.  I originally planned to make a word processor with a Google Docs style interface where the user could edit and style text.  I was using standard HTML textarea elements for this.  I decided to build the core of the app (i.e. CRUD, authentication, building out routes and components) before working on the interface.  When I tried to work with the HTML textarea, I couldn't get it to work and after some researched I discovered Ember actually uses custom components in place of the HTML textarea and input fields and that it was impossible to edit the text in the way that a word processor would need.

I switched focus to add a translation feature, which proved challenging but doable.  My primary difficulty was making the actual call to the third party API within an express API route.  I created a custom route called translate/:doc_id to do this with a standard javascript function providing the call to the translation API.  I had a lot of difficulty making this work, because the process consisted of:

1. API call to custom translate route
2. Using Mongoose findById to get the right doc, which is asynchronous
3. Calling a synchronous function with the text and language as paramters to call the Yandex API asynchronously and get the translation
4. Using Mongoose update function asynchronously to change the document's text to the result of the translation

Essentially when I set up this process, nothing ran in the order that I expected it to and it didn't work.  I finally settled on a regular function within the translate route that had the URL for the API call and a callback function that updated the doc.  Inside that function, I used Node's request module to make the API call and parse the returned JSON into the callback function passed into it.  In the callback, I updated the Doc's text.  See the docs.js controller on the back-end repo for code.

## Installation Instructions

Client Side:

On the command line, type in ember install followed by npm install.  You can type in ember serve to run the client side of the app.

## User Stories

1. I, as a user, want to be able to create documents to type my writing into.

2. I, as a user, want to be able to retrieve my past writing.

3. I as a user wish to delete writing that I don't like anymore by deleting documents.

4. I as a user wish to translate my writing from one language to another

5. I as a user wish to translate my writing from a foreign langauge back to English.

6. (Stretch) I as a user want to be able to export my documents

7. (Stretch) I as a user want to be able to format and style my documents.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
