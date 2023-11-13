# TRec

### _Create and see the best travel reccomendations!_

## Overview

An application where users post reccomendations for specific tourist attractions and famous landmarks, giving their opinion about if its overrated or underrated, how much time a person needs there etc. so that when other people are looking to go on a trip they can get all their reccomendations in one spot, and even create their own on vacation!

## Problem

Researching for travel can get very confusing and its mostly just long-winded blogs or paid-for tour groups advertising. With this app, public opinion for each of the places a person would want to travel to is in one place and can even show them somewhere they didn't think to go before!

## User Profile

Two kinds of users will use this application

- People who like to travel and have a lot of insights on many of the cities and landmarks
- People who have a hard time sifting through research before a big trip.

## Features

- search for country and city
- render a list of all the landmarks and tourist attractions in that city to pick from
- view all posts in that landmark category
- create a post - upload a picture, rating, comment

## Implementation

### Tech Stack

HTML/SCSS, React, Node, Express, Axios, MySQL, Knex

### APIs

Country names and their cities API
Create my own user and post tables in database

### Sitemap

- home page / search page - where the user searches for the country and city (drop down)
- landmark list page - all the landmarks for that city show up and are links to a ->
- landmark page - all the posts for that landmark are rendered here
- create post page - where the user can upload info to post to a landmark page

### Mockups
Mobile
![pic1](https://github.com/malyesh/trec-client/assets/74512928/346fb558-0ca2-4bc8-9b59-d5c40f796b02) ![pic2](https://github.com/malyesh/trec-client/assets/74512928/aa1283d2-11d2-4537-8d63-2d6c4094c092)
![pic4](https://github.com/malyesh/trec-client/assets/74512928/19cb1d80-09a7-4e2c-a33e-cab53a4291ce)

Desktop
![pic5](https://github.com/malyesh/trec-client/assets/74512928/ca63dad2-4ce0-4905-99bb-3e463f64766d) ![pic6](https://github.com/malyesh/trec-client/assets/74512928/31b1be56-550c-4a17-9eba-7e25e5af94bd)
![pic8](https://github.com/malyesh/trec-client/assets/74512928/4bd76f69-e654-4b1e-a979-6395b52c2faf)




### Data

Have an API that provides country data with the cities in it
Create a database with three tables -
| Landmark | |
| ------ | ------ |
| id | primary key |
| country | |
| city | |
| name | |

| User |             |
| ---- | ----------- |
| id   | primary key |
| name |             |

| Post          |              |
| ------------- | ------------ |
| id            | primary key  |
| landmark_id   | foreign key  |
| user_id       | foreign key  |
| image url     |              |
| title/comment |              |
| rating        |              |
| favorite      | boolean flag |

### Endpoints

- get /countries => all countries from api
- get /countries/:country/cities => cities from that country
- get /countries/:country/cities/:city/landmarks => from database to get all the landmark options in that country, city
- get /landmarks/:landmark => all posts from that landmark
- post /users/posts => post to a specific landmark

### Auth

I would like to have authorization implemented, as we have not learned it yet, I don't know how complicated it will be to implement in the limited time we will have after learning. But ideally, this application does depend on user login.

## Roadmap

| Phases | Task                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| 1      | design wireframes and database, find API                                                                    |
| 2      | build out pages with HTML and scss, populate db with data, connect to API                                   |
| 3      | functionality for home/search page - calling API to get country and city - linked to the Landmark list page |
| 4      | functionality for landmark list page - render landmarks from db as cards that link to Landmark feed page    |
| 5      | functionality for landmark feed page - render posts from db for that landmark                               |
| 6      | functionality for create post page - form to add a post to the db                                           |
| 7      | profile page with user posts                                                                                |

## Nice-to-haves

- hidden gems - when the landmark page renders the list of landmarks, it will also have a section for "hidden gems" -> users can post to a separate section of the not commonly known attractions
- star/favorite posts so that they can easily access at a later time on the user's page
- patch /users/posts/:post => like a post
- real upload image functionality rather than default image used for new posts
- have a user profile page to view user information and favorited posts
