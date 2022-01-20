const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Data
var mydata = [
  {
    food: [
      {
        id: 100,
        budget: [250, 200],
      },
    ],
  },
  {
    entertainment: [
      {
        id: 101,
        budget: [200, 120],
      },
    ],
  },
  {
    groceries: [
      {
        id: 102,
        budget: [100, 120],
      },
    ],
  },
];

//Routes
app.get("/", (req, res) => {
  console.log(mydata);
  res.status(200).send(mydata);
});

app.get("/data/:id", (req, res) => {
  const item = req.params.id;
  //console.log(item);
  for (let data of mydata) {
    //console.log(d, ":::", item, ":::");
    if (data[item]) {
      console.log(":::", data[item]);
      res.json(data[item]);
      return;
    }
  }
  res.status(404).send("Not found");
});

/*app.get("/data/:id", (req, res) => {
  //console.log(data);
  const item = req.params.id;
  for (let data of mydata) {
    //console.log(data[item]);
    console.log(item);
    if (data[item]) {
      res.json(data[item]);
      return;
    } else {
      res.status(404).send("Not found");
    }
  }
});
*/
app.post("/", (req, res) => {
  console.log(req.body);
  mydata.push(req.body);
  res.status(200).send("OK");
});

app.delete("/delete", (req, res) => {
  data[0].food.pop();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
