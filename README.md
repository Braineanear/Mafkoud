<!-- PROJECT LOGO -->
<br />
<h1 align="center">
  <a href="https://github.com/Braineanear/MafkoudAPI">
    <img src="https://i.ibb.co/yp32N8S/Home-1.png" alt="Logo" width="300" height="120">
  </a>

  <h3 align="center">Mafkoud API</h3>
</h1>

<h4 align="center">An API for Mobile Application that helps parents to find their kids throw ip cameras</h4>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#deployment">Deployment</a>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#demonstration">Demonstration</a>
    </li>
    <li>
      <a href="#how-to-use">How To Use</a>
    </li>
    <li>
      <a href="#api-usage">API Usage</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#to-do">To Do</a>
    </li>
    <li>
      <a href="#known-bugs">Known Bugs</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>

  </ol>
</details>

## Deployment

This article will help you on the deployment process [How to Run your API Builder Docker Image on AWS EC2
](https://devblog.axway.com/apis/run-api-builder-docker-image-aws-ec2/)

First change the config.example.env to config.env and put the configuration data inside it

You can deploy this API on AWS EC2 by making an instance and start choosing a linux device then finish the configurations and start to connect to the device from your terminal.

After connecting and following AWS steps run:

```
sudo apt update

sudo apt upgrade

sudo apt install curl

curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh

sudo sh ./setup_14.sh

sudo apt install nodejs

node -v

sudo apt install git

sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker–compose –version

git clone (respository)

cd MafkoudAPI

docker-compose build

docker-compose up
```

Now you successfully have a deployed API.

## Key Features

* Authentication and Authorization
  * Login
  * Logout
  * Register
  * Reset password
  * Re-Generate refresh token
  * Verify phone number
* User
  * There are three types of people: User | Admin | Security
  * Create new user account
  * Get users data
  * Get user data
  * Update user profile data
  * Update user profile image
  * Add new user profile image
  * Delete user data
* SMS
  * Sending SMS message with sign up verification code
  * Send child location
* Child
  * Add lost child
  * Add found child
  * Get childs data
  * Delete child Data
* Camera
  * Get all camera faces
* Match
  * Matching childs with camera faces
  * Get Matching Result

## Demonstration

### Home Screen

![Home Screen](https://i.ibb.co/ySjnyrG/Home-2.png)

### Found Person Screen

![Found Person Screen](https://i.ibb.co/CPzHmKZ/Found-person.png)

### Lost Person Screen

![Lost Person Screen](https://i.ibb.co/5h4ZLsq/Lost-person.png)

### Login Screen

![Login Screen](https://i.ibb.co/5xR2btY/Login.png)

### Sign Up Screen

![Sign Up Screen](https://i.ibb.co/dbdVVdz/Signup.png)

### Settings Screen

![Settings Screen](https://i.ibb.co/GRb4s34/Setting-Example.png)

### Notifications Screen

![Notifications Screen](https://i.ibb.co/wszwwH3/Notifications.png)

### SMS Verification Code Screen

![SMS Verification Code Screen](https://i.ibb.co/wdMy5RQ/Verification-code.png)

### Forgot Password Screen

![Forgot Password Screen](https://i.ibb.co/0Bk5JJD/Forget-password.png)

## How To Use

### Signup

* Open the app.
* Choose sign-up.
* Enter your data, then next.
* The app will send a verification code to your mobile.
* Enter the verification code.
* Finished

### Login

* Open the app.
* Enter your email and password.
* Finished.

### Lost Child

* Click on i lost someone button on the homepage screen.
* Enter an image for your lost child.
* Enter some basic data about your child.
* Finished.

### Found Child

* Click on i found someone button on the homepage screen.
* Enter an image for the kid you found.
* Enter some basic data about the kid.
* Finished.

### Notifications

* When the system find the child or someone entered a data of child he found, the system will send an SMS message to child parents to notify them with the child location.

## API Usage

Check [Mafkoud API Documentation](https://documenter.getpostman.com/view/11050349/Tzm2HxUB) for more info.

## Built With

List of any major frameworks used to build the project.

* [NodeJS](https://nodejs.org/) - JS runtime environment
* [ExpressJS](https://expressjs.com/) - The NodeJS framework used
* [MongoDB](https://www.mongodb.com/) - NoSQL Database uses JSON-like documents with optional schemas
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and NodeJS
* [Docker](https://www.docker.com/) - An open platform for developing, shipping, and running applications
* [Docker Compose](https://docs.docker.com/compose/) - Compose is a tool for defining and running multi-container Docker applications
* [PM2](https://pm2.keymetrics.io/) - Advanced process manager for production Node.js applications
* [Argon2](https://www.npmjs.com/package/argon2) - Encryption & Decryption Algorithm
* [Vonage-Nexmo](https://www.vonage.com/communications-apis/) - Offers communications APIs
* [Cloudinary](https://cloudinary.com/) - Cloud-based service
* [Compression](https://www.npmjs.com/package/compression) - NodeJS compression middleware
* [Cors](https://www.npmjs.com/package/cors) - NodeJS package for providing a Connect/Express middleware that can be used to enable CORS with various options
* [Datauri](https://www.npmjs.com/package/datauri) - Create DataURI scheme easily
* [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env
* [Rate Limiter](https://www.npmjs.com/package/express-rate-limit) - Basic IP rate-limiting middleware for Express
* [Helmet](https://www.npmjs.com/package/helmet) - Secure Express apps by setting various HTTP headers
* [JWT](https://jwt.io/) - Compact URL-safe means of representing claims to be transferred between two parties
* [Method Override](https://www.npmjs.com/package/method-override) - Use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
* [Moment](https://momentjs.com/) - JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way
* [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for NodeJS
* [Multer](https://www.npmjs.com/package/multer) - NodeJS middleware for handling multipart/form-data
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Easy as cake e-mail sending from your Node.js applications
* [Passport](http://www.passportjs.org/) - Express-compatible authentication middleware for NodeJS
* [Passport JWT](http://www.passportjs.org/packages/passport-jwt/) - Creates a new extractor that looks for the JWT in the given URL query parameter
* [Validator](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers.
* [WebSocket](https://www.npmjs.com/package/websocket) - Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.
* [WS](https://www.npmjs.com/package/ws) - Simple to use, blazing fast and thoroughly tested websocket client and server for NodeJS
* [Winston](https://www.npmjs.com/package/winston) - A logger for just about everything.
* [XSS Clean](https://www.npmjs.com/package/xss-clean) - Middleware to sanitize user input

## To-do

* Using MicroServices with Event-Driven.

* Using TypeScript.

## Known Bugs

Feel free to email me at mle.mahmoud.yasser@gmail.com if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Twitter - [@Mahmoud03203227](https://twitter.com/Mahmoud03203227)

Email - [mle.mahmoud.yasser@gmail.com]()

Facebook - [MahmoudYasserMLE](https://www.facebook.com/MahmoudYasserMLE/)

Project: [https://github.com/Braineanear/MafkoudAPI](https://github.com/Braineanear/MafkoudAPI)
