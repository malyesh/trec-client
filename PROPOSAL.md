# TravelRec

### _Create and see the best travel reccomendations!_

## Overview

An application where users post recommendations for specific tourist attractions and famous landmarks, giving their opinion about if its overrated or underrated, how much time a person needs there etc. so that when other people are looking to go on a trip they can get all their reccomendations in one spot, and even create their own on vacation!

## Problem

Researching for travel can get very confusing and its mostly just long-winded blogs or paid-for tour groups advertising. With this app, public opinion for each of the places a person would want to travel to is in one place and can even show them somewhere they didn't think to go before!

## User Profile

Two kinds of users will use this application

- People who like to travel and have a lot of insights on many of the cities and landmarks
- People who have a hard time sifting through research before a big trip.

## Features

- search for country and city
- look through a list of all the landmarks and tourist attractions in that city to pick from
- view all posts in that landmark category
- create an account to create posts and like other posts
- create a post - upload a picture, rating, and caption recommendation

## Implementation

---

### Tech Stack and Libraries

- HTML/SCSS
- React
- Node + Express
- Axios
- MySQL + Knex
- react-select library
- jsonwebtoken and bcrypt libraries
- busboy library

### APIs

No outside APIs, create my own database and tables to hold all data regarding the countries, cities, landmarks, users and posts.

### Sitemap

- sign up page to create account
- login page to log into user account
- home page / search page - where the user searches for the country and city (drop down)
- feed page - where all the posts can be seen regardless of the landmark
- landmark list page - all the landmarks for that city show up to link to that landmark's feed page
- landmark feed page - all the posts for that landmark are rendered here
- create post page - (only if logged in) where the user can upload info to post to a landmark page
- profile page - (only if logged in) - where the user can see their information and all their posts, as well as have the option to log out
- favorites page - (only if logged in) - user can view postst hat they have favorited for future use

### Original Mockups

![pic1](https://github.com/malyesh/trec-client/assets/74512928/346fb558-0ca2-4bc8-9b59-d5c40f796b02) ![pic2](https://github.com/malyesh/trec-client/assets/74512928/aa1283d2-11d2-4537-8d63-2d6c4094c092)
![pic4](https://github.com/malyesh/trec-client/assets/74512928/19cb1d80-09a7-4e2c-a33e-cab53a4291ce)

![pic5](https://github.com/malyesh/trec-client/assets/74512928/ca63dad2-4ce0-4905-99bb-3e463f64766d) ![pic6](https://github.com/malyesh/trec-client/assets/74512928/31b1be56-550c-4a17-9eba-7e25e5af94bd)
![pic8](https://github.com/malyesh/trec-client/assets/74512928/4bd76f69-e654-4b1e-a979-6395b52c2faf)

### Data

Have an API that provides country data with the cities in it
Create a database with three tables -

| Country |             |
| ------- | ----------- |
| id      | primary key |
| name    |             |

| City       |             |
| ---------- | ----------- |
| id         | primary key |
| country_id | foreign key |
| name       |             |

| Landmark   |             |
| ---------- | ----------- |
| id         | primary key |
| country_id | foreign key |
| city_id    | foreign key |
| name       |             |

| User     |             |
| -------- | ----------- |
| id       | primary key |
| name     |             |
| email    |             |
| password |             |
| picture  |             |

| Post        |             |
| ----------- | ----------- |
| id          | primary key |
| landmark_id | foreign key |
| user_id     | foreign key |
| picture     |             |
| caption     |             |
| rating      |             |

| Favorite |             |
| -------- | ----------- |
| id       | primary key |
| post_id  | foreign key |
| user_id  | foreign key |

### Endpoints

- get /countries => get all countries in database
- get /countries/:countryId => get all cities within specific country
- get /landmarks/:landmarkId => get all posts with this landmark id
- get /landmarks/:countryId/:cityId => all landmarks in this specific country and city
- get /user => all info about a specific user
- post /user/signup => create a new user
- post /user/login => login to a user account to generate token
- get /user/posts => get all posts created by specific user
- get /user/favorites => get all posts that were liked by specific user
- get /posts => all posts
- post /posts/create => create a new post
- get /posts/:postId => get one post
- post /favorites => user favorites a post
- get /favorites/:postId => checks if specific post is favorited by current user

### Auth

Use JWT token for authorization and authentication to create user accounts, and only allow a user to do certain things if they are logged in. Also use bcrypt for added password protection.

## Roadmap

| Phases | Task                                                                                                      |
| ------ | --------------------------------------------------------------------------------------------------------- |
| 1      | design wireframes and database, API                                                                       |
| 2      | build out pages with HTML and scss, populate db with data, connect to API                                 |
| 3      | functionality for home/search page - get country and city for dropdown - linked to the Landmark list page |
| 4      | functionality for landmark list page - render landmarks from db as cards that link to Landmark feed page  |
| 5      | functionality for landmark feed page - render posts from db for that landmark                             |
| 6      | functionality for feed page - render all posts from db as general feed page                               |
| 7      | functionality for create post page - form to add a post to the db                                         |
| 8      | profile page with user posts (\*nice to have)                                                             |
| 9      | add popup modal for more details about each of the user's post on their profile page                      |
| 10     | add post liking functionality (\*nice to have)                                                            |

## Nice-to-haves

- hidden gems - when the landmark page renders the list of landmarks, it will also have a section for "hidden gems" -> users can post to a separate section of the not commonly known attractions
- star/favorite posts so that they can easily access at a later time on the favorites page (\*implemented)
- real upload image functionality rather than default image used for new posts (\*implemented)
- have a user profile page to view user information, user posts and favorited posts (\*implemented)
- add a map with markers to landmark list page to visualize the location of each landmark
