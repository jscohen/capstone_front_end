[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Links

[Front End Repo] (https://github.com/jscohen/capstone_front_end)
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

[Yandex API Documentation] (https://tech.yandex.com/translate/doc/dg/concepts/About-docpage/)

The major functionality aside from the doc resources' RESTful routes is the translation feature.  The translation is a patch request at a custom route /translate/:doc_id.  From that route, expressJS sends an API call to yandex with the API key, text, current language, and translation language and returns a JSON value.  That value is cleaned and put into the text field of the doc using the Mongoose update function.  On the front end, that value is dynamically added to the Ember textarea.

## General Approach
I attempted to make this a client-focused app and minimize the calls on the back end.  There is only one resource, docs, to contain the document.  On the front end, you can access the New Document view which prompts you to write a document, create it, and then allows you to translate and save.  You can access your docs to edit them as well.  The translation involves selecting the langugae you are translating from and then the language you are translating to.  The translation occurs dynamically, and will update your text immediately.

I originally wanted to make this app a full word processor like Google Docs, but I couldn't find a framework that would work with Ember.  Ember uses its own custom text field components instead of the normal HTML textarea, so it is impossible to add CSS to the text inside.  So I abandoned this idea and reused the Yandex translation service from my second project to make the app a text translator.

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
