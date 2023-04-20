# Project-3

** Project Title: Movie Box Office Revenue Analysis (2000 to 2022)**

Collaborators:
1. **Miguel Ari** - https://github.com/Miguel-Ari
2. **Grace Barnett** - https://github.com/gbarn777
3. **Crisaldry Brito** - https://github.com/Crisaldry
4. **Angela Narag** - https://github.com/angelanarag
5. **Darya Naymon** - https://github.com/DaryaNaymon

**Project Description:**
- Analyze box office movie revenue from 2000 to 2022 and identify key factors that contribute to a movie’s success.  
The project aims to address the need for understanding the underlying factors that drive box office success by creating an interface that would allow the user to sort through movie data across a specified timeline using various pre-selected metrics.

**How to Use the Project:**

##### Each team member contributed their own JavaScript and HTML to create different visualizations while using the same Flask, SQLite database and an Index.HTML file

1. movies.db SQLite database**
    - We created an API to retrieve data from the TMDB website and stored the data into an SQLite database. 
    - Our data includes: 
        - Movie Title
        - Genre
        - Language
        - Budget
        - Box Office Revenue
        - Rating
        - Director
        - Certification (G, PG, PG-13, NC-17, R)
        - Runtime
        - Movie Popularity
    - We loaded the data retrieved in the SQLite database 'movies.db'
2. app.py - sets up a Flask application and defines several routes that render different HTML templates. The templates are used to display different views of data visualizations on the frontend. The code also defines API endpoints that retrieve data from the ‘movies.db’ SQLite database.  Then the retrieved data is converted into to a list of dictionaries and returned as a JSON.
3. index.html - displays a webpage that contains hyperlinks that link to other pages of data visualizations within the same application
4. JavaScript files - each project team member created a JavaScript file to create data visualizations that help to identify the key factors behind box office success
5. HTML files - each project team member also have their own HTML file to display their data visualization

**Data Source:**
The Movie DB
https://www.themoviedb.org/?language=en-US

