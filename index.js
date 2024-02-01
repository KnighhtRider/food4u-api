const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://food4u:vivek1234@cluster0.g2agcgn.mongodb.net/food4u?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/OrderData"));


app.get('/api/foodData', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    const food_items = await db.collection('food_items').find({}).toArray();
    const food_category = await db.collection('food_category').find({}).toArray();

    const data = {
      food_items: food_items,
      food_category: food_category,
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.send('Server Error');
  }
});





app.get("/", (req, res) => {
  res.send("Hello API!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
