"use strict";

const http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  csp = require("helmet-csp"),
  session = require("express-session"),
  /*   cors = require("cors"), */
  helmet = require("helmet");

module.exports = function () {
  let app = express(),
    server,
    create,
    start;

  const auth = require("./auth/")();

  create = function (config) {
    let routes = require("./routes");

    // Settings
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);

    // Set up helmet middleware
    // Ensure we only access the application via https in production:
    if (app.get("env") === "production") {
      app.use(helmet.hsts());
    }

    // Prevent the app from being loaded in iframes (for clickjacking)
    app.use(helmet.frameguard());

    // Prevent browser from changing MIME types specified in Content-Type header
    app.use(helmet.noSniff());

    // Help browsers prevent page load on reflected xss attacks
    app.use(helmet.xssFilter());

    // Sets "X-Download-Options: noopen".
    app.use(helmet.ieNoOpen());

    // Sets "X-DNS-Prefetch-Control: off".
    app.use(helmet.dnsPrefetchControl());

    // Don't advertise what framework we are using
    app.disable('x-powered-by');

    // Set up content-security-policy
    // For more information: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
    app.use(csp({
      directives: {
        defaultSrc: ["'self'"],  // default value for all directives that are absent
        scriptSrc: ["'self'"],   // helps prevent XSS attacks
        frameAncestors: ["'none'"],  // helps prevent Clickjacking attacks
        imgSrc: ["'self'"],
        styleSrc: ["'none'"]
      }
    }));

    // Set up static dir (if applicable) 
    if (config.staticDir) {
      app.use(express.static(config.staticDir));
    }

    const sess = session(
      {
        secret: config.cookie_secret,
        resave: false,
        saveUninitialized: true
      }
    );

    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }

    app.use(sess);

    // Returns middleware that parses json
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    app.use(bodyParser.json());

    //Logging (for dev)
    app.use(morgan("dev"));

    // Set up CORS here
    //app.use(cors());

    // Set up auth strategies
    const passport = auth.initialize(config);
    app.use(passport.initialize());
    app.use(passport.session());

    // Add error handling middleware for auth issues
    app.use((err, req, res, next) => {
      if (err) {
        req.logout(); // If an error occurs, ensure we clean up by loggin folks out first so that deserialization won't keep failing
        // (TO-DO): Ensure this issue is logged properly
        next(); // Default behavior: attempt to continue flow (could instead be a custom render of a login page with a warning)
      } else {
        next();
      }
    });

    // Set up routes
    // ====== Routing ======
    app.use(routes);

    // Create a separate server for our app
    server = http.createServer(app);
  };

  // Method that starts the http server itself:
  start = function () {
    const hostname = app.get("hostname");
    const PORT = app.get("port");

    server.listen(PORT, function () {
      console.log(`App listening on ${hostname}:${PORT}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
