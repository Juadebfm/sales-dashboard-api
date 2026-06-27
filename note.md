fe (request - http request POST,PATCH/PUT,DELETE,GET) (axios, fetch) -> Be Code (process the request and returns a response) ---> DB (stores data which can be updated, deleted).


BE 
    1. Write logic that tells the DB how data should be stored, SCHEMA / MODELS
    2. how data should be processed, TRY/CATCH, STATUS CODES, CONTROLLER
    3. what type of response should the BE send out, 
    4. confirms that the request even follows the BE's needed way of strcuturing the data, VALIDATION, SECURITY etc 
    
    ---> DB
    1. What type am i, Am i document (or object) type DB like mongodb, render etc
    2. Am i table like DB for example SQL, mySQL or postgres

    NB: Postgres is actually fluid and allows us to write table or documents type of data into the DB
