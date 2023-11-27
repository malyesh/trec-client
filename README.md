# TravelRec - Client Side

Server Side - [https://github.com/malyesh/trec-server](https://github.com/malyesh/trec-server)

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Preview](#preview)

## Overview

Welcome to TravelRec! this is an application where users can post travel landmark photos in a social media style while giving real tips, recommendations, and ratings to those locations. Other users are able to browse these posts, favorite the ones that may be helpful for an upcoming trip, and can use these recommendations to guide their itinerary creation! Users can view a feed of all posts to gain ideas, or choose to look at the post feed of one specific landmark. They can also view their own posts on their profile page. A user does not need to be logged in to browse the posts, but must be logged in in order to create posts and to favorite posts.

This process consolidates the research that a traveler would need to do when creating an itinerary and deciding where they should go, how much time to spend there, and what is worth the wait.

I hope you find this helpful too!

## Technologies Used

- HTML/SCSS
- React
- Node + Express
- Axios
- MySQL + Knex
- react-select library
- jsonwebtoken and bcrypt libraries
- busboy library

## Features

1. **User Authentication:**
   Users can sign up and log in to personalized accounts where they have access to all their account information.

2. **Create Posts:**
   Users can create new posts and upload their own pictures that are all saved in the database.

3. **Favorite Posts:**
   Users can favorite posts that they want to save for later, this is also saved in the database.

4. **Landmark and Post Feeds**
   Users can search for and view landmarks to look at as well as specific post feeds for each chosen landmark.

## Getting Started

Clone this repository

```bash
git clone https://github.com/malyesh/trec-client.git
```

Install the dependencies and start the client side React app

```bash
npm i
npm start
```

## Preview

home page
![Screenshot 2023-11-26 222449](https://github.com/malyesh/trec-server/assets/74512928/6f054454-1fa2-41d6-8013-b72a67162358)
see popular posts feed
![Screenshot 2023-11-26 222506](https://github.com/malyesh/trec-server/assets/74512928/9d3b61e7-c5fe-4802-8c1b-98535d98f3a6)
search for landmarks in a country and city from the drop down menus
![Screenshot 2023-11-26 222522](https://github.com/malyesh/trec-server/assets/74512928/757bf01a-4fe9-4f3d-a063-d7f4a688e676)
pick a landmark to view it's post feed
![Screenshot 2023-11-26 222551](https://github.com/malyesh/trec-server/assets/74512928/1e8fb66c-4f35-4fa3-bb7d-7283eb6acffa)
sign up
![Screenshot 2023-11-26 222604](https://github.com/malyesh/trec-server/assets/74512928/ef887ad3-0a1a-4452-902d-679f40f3aafd)
log in
![Screenshot 2023-11-26 222615](https://github.com/malyesh/trec-server/assets/74512928/b8eb2f66-1cef-4c5d-af04-910825983880)
create a post
![Screenshot 2023-11-26 222716](https://github.com/malyesh/trec-server/assets/74512928/682e3312-0e8c-49f2-a542-dd7a5cb27fb8)
