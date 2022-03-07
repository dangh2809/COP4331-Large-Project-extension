
<h1 align="center">
    <img src="https://cdn.discordapp.com/attachments/944980484591591474/948288670266437662/thirdLogo.png" alt="GitFit-logo" width="250px"/>
    <br/>
    GitFit
</h1>

<h4 align="center">
    A fitness app to set and meet nutrition goals.
</h4>


# Table of Contents

- [About](#about)
- [Setup](#setup)
- [Authors](#authors)
- [Building](#building)
- [License](#license)


# About

GitFit is a fitness app that works on desktop and mobile. Users can sign up with their email and start tracking their diet. Nutrition profiles are taken from the USDA database, and users can add their own custom foods and recipes.


# Setup

You'll need to set up your environment variables to match the specs as seen in the file *environment.d.ts*. This project uses dotenv so you can just set a *.env* file in the root of the project, e.g.:

```sh
NODE_ENV=development
PORT=8080
MONGODB_URI=mongodb+srv://example.mongodb.net/Example
# and so on...
```


# Building

In development mode:
- Run `yarn start` from the root directory to compile + run the API server.
- Run `yarn start` from the *frontend* directory to run the react sever.

Production mode is not complete as of yet.


# Team

We are group 16 of Dr. Leinecker's POOSD class.

Our members:
- Hieu Dang
- Kevin Cahalan
- Kyle McKibben
- Noah Seligson
- Michael Richter
- Santiago Gutierrez
- Stephan Hartig


# License
MIT

