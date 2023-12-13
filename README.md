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

- HTML
- SCSS
- React
- Axios
- react-select library
- reactjs-popup

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

To test login and view from an authenticated user account with posts

```bash
login -> ma@gmail.com
password -> password
```

## Preview

home page to search for a country, city, or landmark
![Screenshot 2023-12-13 120514](https://github.com/malyesh/trec-client/assets/74512928/62f09477-2555-4876-afa8-aaa6a316d448)
look through landmarks that correspond with your previous search
![Screenshot 2023-12-13 120945](https://github.com/malyesh/trec-client/assets/74512928/0de0d6de-22fa-48c0-aaf3-1ae08e52d5e1)
pick a landmark to view it's post feed
![Screenshot 2023-12-13 120959](https://github.com/malyesh/trec-client/assets/74512928/abf7b100-7c61-4bf7-a73d-61f2f6a0a886)
see popular posts feed
![Screenshot 2023-12-13 120748](https://github.com/malyesh/trec-client/assets/74512928/8ab730a7-9b23-4ee1-aff0-a7aa6f749bb6)
sign up
![Screenshot 2023-12-13 120606](https://github.com/malyesh/trec-client/assets/74512928/997d4a95-3b31-4f68-a540-9231352e3ad8)
log in
![Screenshot 2023-12-13 120554](https://github.com/malyesh/trec-client/assets/74512928/ac6afc9e-da96-4161-a5d1-a72efa47cae9)
create a post
![Screenshot 2023-11-26 222716](https://github.com/malyesh/trec-server/assets/74512928/682e3312-0e8c-49f2-a542-dd7a5cb27fb8)
go to your profile page to check out your own posts
![Screenshot 2023-12-13 120814](https://github.com/malyesh/trec-client/assets/74512928/101bf01f-bb04-4573-87d5-ff191cd48972)
click on posts to get all the details about it, and get the option to delete the post
![Screenshot 2023-12-13 120852](https://github.com/malyesh/trec-client/assets/74512928/31ca2bb3-15ff-455f-9eed-68f3a955b948)
also view posts that you have favorited 
![Screenshot 2023-12-13 120825](https://github.com/malyesh/trec-client/assets/74512928/fd1df265-173e-4fe4-8d6f-d32b9eb7f679)
