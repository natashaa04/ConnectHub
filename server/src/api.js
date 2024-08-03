/* Modules */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const colors = require("colors");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const serverless = require("serverless-http");
// Code to create api documentation with swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//importing function to get authentication for 'api-docs'
// Extended: https://swagger.io/specification/#infoObject
const fileUpload = require("express-fileupload");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Life Is Meeting",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
          description: "Basic Authroization header.",
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ["app.js", "../app/routes.js", "../app/controllers/user/index.js"],
};

//db connections
const dbConnection = require("../config/dbConnection");
dbConnection();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const config = require("../config/config");

app.all("*", function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, PUT, GET, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, uid, admin"
  );
  next();
});
const router = express.Router();

router.get("/",function(req, res){
  return res.json({
    success: true,
    message: "Get user details"
  });
})
// Public folder is not dependent on session
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  bodyParser.raw({
    limit: 10000000000,
  })
);

app.use(bodyParser.json({ limit: "100mb", strict: false }));
app.use(
  bodyParser.json({
    type: "application/vnd.api+json",
    limit: 10000000,
    strict: false,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  fileUpload({
    limits: {
      fileSize: 1 * 1024 * 1024,
      fields: 50,
      files: 1,
      parts: 51,
    },
  })
);

app.use(function (req, res, next) {
  // log each request to the console
  if (req.method === "GET") {
    console.log(colors.green(req.method), req.url);
  } else {
    console.log(colors.yellow(req.method), req.url);
  }
  // continue doing what we were doing and go to the route
  next();
});

require("../app/routes")(app);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
// pass our application into our routes
module.exports = app;

module.exports.handler = serverless(app);