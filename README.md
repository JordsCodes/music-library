# Music Library

This is an app designed to perform CRUD requests on a locally-hosted PostgreSQL database. 

The dependencies for this project are node, postgres, express, supertest, mocha, chai and docker.

## Installation

Pull and run a docker image of PostgreSQL:

`docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`

Navigate to the desired directory in your terminal and clone the project to your machine:

`git clone https://github.com/JordsCodes/music-library`

Navigate to the root directory of the project in your terminal and initialise node:

`npm install`

## Usage

Navigate to the root directory of the project in your terminal and run:

`npm start`

Now that the project is running, we can make CRUD requests to the routes specified in the routes files for artists and albums. 

This will update the locally-hosted Artists and Albums tables.

I recommend using Postman for this purpose. Requests must be written in JSON.

To view the Artist and Albums tables, I recommend using pgAdmin4.

If desired, the user can also access the testing suite by running:

`npm test`

### Create Requests

To add an artist to the database, make a POST request to:

`http://localhost:3000/artists`

Request body:

`{
    "name": "Oasis",
    "genre": "Rock"
}`

To add an album to the database, the user should have already added the relevant artist. The id of the album artist will then need to be provided as a query parameter:

`http://localhost:3000/artists/{id}/albums`

Request body:

`{
    "name": "Definitely Maybe",
    "year": 1994
}`

### Read Requests

To read all artist or albums from the database, make a GET request to:

`http://localhost:3000/artists/`

`http://localhost:3000/albums/`

To read a specific artist or album from the database, append the above routes with the desired artist or album id:

`http://localhost:3000/artists/{id}`

### Update Requests

To replace an album or an artist, make a PUT request to the desired id:

`http://localhost:3000/artists/{id}`

`{
    "name": "The Chemical Brothers",
    "genre": "Electronic",
}`

To update an album or an artist, make an PATCH request to the desired id:

`http://localhost:3000/albums/{id}`

Using patch requests, the user can update one or several properties:

`{
    "year": "1996"
}`

`{
    "name": "The Stone Roses",
    "genre": "Rock"
}`

Please note that id and artistid are unable to be changed. The user should instead make a delete request and replace the artist or album with a new post request.

### Delete Requests

To delete an album or an artist, make a DELETE request to the desired id:

`http://localhost:3000/artists/{id}`

## Credits

Command Shift:

https://github.com/CommandShiftHQ

Jordan Noble:

https://twitter.com/JordsCodes

https://www.linkedin.com/in/jordan-noble-a9b931267/




