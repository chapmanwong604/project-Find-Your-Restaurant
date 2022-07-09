# **Find-Your-Restaurant (AI Image Project)**

## **Overview:**
---

This is an **AI image-related beginner project** which can recognize **73 types of food** in different cuisines.

Please upload a food image to find the nearest type among those 73 kinds of food, then a list of restaurants with related cuisines will be generated.

<br>

**Contributors:**

-   William Chi
-   Hang Tsui
-   Chapman Wong

<br>

## **Setup for the Project:**
---

1. Install the dependencies of requirements.txt inside a **Python** virtual environment.
    
        cd web-server/
        pip install -r requirements.txt

2. Install the dependencies in package.json.
   
        npm install

3. Follow `example.sql` to create a new **PostgreSQL** database for storing restaurants and food data.

4. Follow `example.env` to create new `.env` file for connection to database.

5. Run **Knex** `migration` and `seed` to create tables and required data of the database.
   
        npx knex migrate:latest
    
        npx knex seed:run

6. Activate the **Python** virtual environment and run the **Sanic** server.
   
        python app.py

7. Run the **Express** server.
   
        npm start

    or

        npx ts-node main.ts
    
8. Go to http://localhost:8000/ and try it out!