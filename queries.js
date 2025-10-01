const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb+srv://jumbamarther_db_user:L35ph1Ne2020@cluster0.wlfwncl.mongodb.net/"; // replace with your connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1. Find books from a specific genre
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("Fiction Books:", fictionBooks);

    // 2. Find books after a certain year
    const recentBooks = await books.find({ published_year: { $gt: 1960 } }).toArray();
    console.log("Books after 1960:", recentBooks);

    // 3. Update price of a specific book
    await books.updateOne({ title: "Pride and Prejudice" }, { $set: { price: 12.0 } });

    // 4. Delete book by title
    await books.deleteOne({ title: "Moby Dick" });

    // 5. Projection example
    const projectionExample = await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray();
    console.log("Projection:", projectionExample);

    // 6. Sorting (ascending and descending)
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("Sorted Asc:", sortedAsc);
    console.log("Sorted Desc:", sortedDesc);

    // 7. Pagination (page 1, 5 books per page)
    const page = 1;
    const limit = 5;
    const paginatedBooks = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } })
      .sort({ price: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    console.log("Paginated Books:", paginatedBooks);

    // 8. Aggregation - average price by genre
    const avgByGenre = await books.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Average Price by Genre:", avgByGenre);

    // 9. Aggregation - author with most books
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("Top Author:", topAuthor);

    // 10. Aggregation - group by decades
    const byDecade = await books.aggregate([
      {
        $group: {
          _id: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("Books by Decade:", byDecade);

    // 11. Index creation
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: 1 });

    // 12. Using explain
    const explainResult = await books.find({ author: "George Orwell", published_year: 1949 })
      .explain("executionStats");
    console.log("Explain Result:", explainResult);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
