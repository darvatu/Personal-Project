# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (nc_news_test and nc_news). Double check that these .env files are .gitignored.


Project Setup--------------------------------------------------------------
Making a public repo
Ensure that you have cloned down the repo first.

You will need to make your own public repo so that you can share this project as part of your portfolio by doing the following:

Create a new public GitHub repository. Do not initialise the project with a readme, .gitignore or license.

From your cloned local version of this project you'll want to push your code to your new repository using the following commands:

git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main
Creating the databases
We'll have two databases in this project: one for real-looking dev data, and another for simpler test data.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point.

Please do not install specific packages as you can do this down the line when you need them.


You have also been provided with a db folder with some data, a setup.sql file and a seeds folder.

Please take some to familiarise yourself with the project structure. The seed function has been written for you, but you should take a look at the table creations to see the structure of the database you'll be working with. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of index.js in each of the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement to the index file, rather than having to require each file individually. Think of it like the index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

topicData
articleData
userData
commentData
Update the readme
As .env.* is added to the .gitignore, anyone who wishes to clone your repo will not have access to the necessary environment variables. Update your readme to explain what files a developer must add in order to successfully connect to the two databases locally.

Edit the README.md to remove the link to the initial instructions. Replace this with instructions on how to create the environment variables for anyone who wishes to clone your project and run it locally.

---------------------------------------------------------------------------------------------
CORE: GET /api/topics
Before you begin, don't forget to branch!

Description
Should:

be available on endpoint /api/topics.
get all topics.
Responds with:

an array of topic objects, each of which should have the following properties:
slug
description
As this is the first endpoint, you will need to set up your testing suite.

Consider what errors could occur with this endpoint. As this is your first endpoint you may wish to also consider any general errors that could occur when making any type of request to your api. The errors that you identify should be fully tested for.

Note: although you may consider handling a 500 error in your app, we would not expect you to explicitly test for this.

----------------------------------------------------------------------------
CORE: GET /api
Description
Should:

be available on /api.
provide a description of all other endpoints available.
Responds with:

An object describing all the available endpoints on your API
You can find an (incomplete) example of this response in the endpoints.json file which should be built upon as more features are added to your app. Hint - this file is not just a guide for what your response should look like, but can actually be used when implementing the endpoint.

This /api endpoint will effectively act as documentation detailing all the available endpoints and how they should be interacted with.

Each endpoint should include:

a brief description of the purpose and functionality of the endpoint.
which queries are accepted.
what format the request body needs to adhere to.
what an example response looks like.
You will be expected to test for this endpoint responding with an accurate JSON object. You will also be expected to update this JSON object for every endpoint you complete. This will be very helpful to your future self when it comes to using your API in the Front End block of the course! Note: how might you make this test dynamic so that it doesn't need to be updated whenever new endpoint info is added to the JSON object?

----------------------------------------------------------------------------------------------
CORE: GET /api/articles/:article_id
Description
Should:

be available on /api/articles/:article_id.
get an article by its id.
Responds with:

an article object, which should have the following properties:
author
title
article_id
body
topic
created_at
votes
article_img_url
Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint.
--------------------------------------------------------------------------------------
CORE: GET /api/articles
Description
Should:

be available on /api/articles.
get all articles.
Responds with:

an articles array of article objects, each of which should have the following properties:
author
title
article_id
topic
created_at
votes
article_img_url
comment_count, which is the total count of all the comments with this article_id. You should make use of queries to the database in order to achieve this.
In addition:

the articles should be sorted by date in descending order.
there should not be a body property present on any of the article objects.
Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint.
-------------------------------------------------------------------------------
CORE: GET /api/articles/:article_id/comments
Description
Should:

be available on /api/articles/:article_id/comments.
get all comments for an article.
Responds with:

an array of comments for the given article_id of which each comment should have the following properties:
comment_id
votes
created_at
author
body
article_id
Comments should be served with the most recent comments first.

Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint.