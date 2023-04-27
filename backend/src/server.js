const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1LogRouter = require("./v1/routes/logRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// function connectionTemplate(connection, query) {
//   connection.connect();
//   query();
//   connection.end();
// }

app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/logs", v1LogRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error...");
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
