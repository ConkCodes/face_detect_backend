# Face Detect backend
Backend of the Face Detect application.

# Setup
The project uses Node.JS version 16.13.0. Ensure that this version is installed on your computer, along with NPM (which installs by default with Node).  

Once the repository is cloned, there are a couple steps needed to get going on your local machine:  

Install the required dependencies through npm i  
Create and run a locally-hosted PostgreSQL database  
Create a file named .env at the root directory of the project  
The file must contain six variables  
PORT: The port on localhost for the server  
PGPORT: The port on localhost for the database  
PGHOST: Where the database is hosted (should be localhost)  
PGUSER: The username used to access the database (Set when configuring the Postgres database)   
PGPASSWORD: The password used to access the database (Set when configuring the Postgres database)  
PGDATABASE: The database name (Set when configuring the Postgres database)  
Variables are denoted with the notation TEST=1 (variable TEST is equal to 1) and should be on separate lines in the file  
From here you should be able to run the project with npm start. The project is accessible on http://localhost:process.env.PORT/  

# Scripts
There are some built-in scripts that make managing the database a bit easier:  

npm run clean: Clears all info in the database  
npm run populate: Populates the database with the following information  
Around 100 movies  
Five test users named testuser0 through testuser4, all have the password password123  
