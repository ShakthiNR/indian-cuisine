# indian-cuisine application

## Web app used to explore the indian foods
>Tech stack used - React js, Fluent UI ,Node js, Express js, MongoDb


## Usage:
1. Listing the dishes + paginate the dishes,
2. Sort name, diet, prep_time, cooking_time in asc/dec,
3. Filtering dish based on diet, state, flavor, ingredients,
4. View the dish details on clicking the row of the table,
5. Button to reset the filter,
6. Store the filtering options in localstorage.


## Improvisation
1. Create/update/delete the dishes on the action column
2. Authentication
3. Card view instead of table view
4. Add caching layer to reduce the response time
5. User based ingredients list

## How to run the application
1. git clone and download the repo
2. cd backend/
3. npm run dev
4. npm run seed (to seed the data into db)
5. cd frontend/
6. npm run start


## .env of frontend
```sh
REACT_APP_BACKEND_URL=http://localhost:3001
```

## .env of backend
```sh
PORT=3001
MONGO_URI="mongodb+srv://shakthi:0eM0hbDO2TNBt0bz@cluster0.aegm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

