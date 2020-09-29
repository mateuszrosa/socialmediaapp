"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 3500;
var app = (0, _express["default"])();
var baseUrl = "mongodb+srv://parik:piechy8@favnote-bruxz.mongodb.net/test?retryWrites=true&w=majority";

_mongodb["default"].connect(baseUrl, {
  useUnifiedTopology: true
}).then(function (client) {
  console.log("Connected to database");
  var db = client.db("social-media-app");
  var usersCollection = db.collection("users");
  app.use(_bodyParser["default"].urlencoded({
    extended: true
  }));
  app.use(_bodyParser["default"].json());
  app.use((0, _cors["default"])());
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });
  app.post("/login", function (req, res) {
    var cursor = db.collection("users").findOne(req.query).then(function (response) {
      if (response !== null) {
        console.log("Logged in");
        res.json({
          userId: response._id
        });
      } else {
        res.sendStatus(500);
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  });
  app.post("/register", function _callee(req, res) {
    var user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(usersCollection.findOne({
              login: req.query.login
            }));

          case 2:
            user = _context.sent;

            if (!user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).send("That user already exists"));

          case 7:
            usersCollection.insertOne(req.query).then(function (response) {
              return console.log(response);
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  app.post("/post", function (req, res) {
    var _req$body = req.body,
        userId = _req$body.userId,
        text = _req$body.text,
        login = _req$body.login;
    var cursor = db.collection("posts").insertOne({
      userId: userId,
      text: text,
      login: login
    }).then(function (response) {
      res.json(req.body);
    });
  });
  app.get('/posts', function (req, res) {
    db.collection("posts").find().toArray().then(function (response) {
      res.json(response);
    })["catch"](function (err) {
      return console.log(err);
    });
  });
  app.listen(port, function () {
    console.log("Express listening " + port);
  });
})["catch"](function (error) {
  return console.error(error);
});