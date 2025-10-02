This project shows how to run MongoDB queries using Node.js and MongoDB Atlas.

⚙️ Requirements

Node.js
 installed

MongoDB Atlas
 cluster set up

A queries.js file (with your queries written in it)

The mongodb driver installed

🚀 Steps to Run the Queries

Install dependencies
In your project folder, run:

npm install mongodb


Set your MongoDB Atlas connection string

Open queries.js

Replace the connection URI with your own Atlas URI:

const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";


Run the queries file
Simply execute:

node queries.js


View the results
Each query in queries.js will print its results in the terminal using console.log().

📂 Example
# Install the MongoDB driver
npm install mongodb

# Run the file
node queries.js
