# NEST.JS BASED API

Required features

- Authentication ✅
- Authorization 🔴
- Activity Logging 🔴
- Graphql Server 🔴

NEEDS

- Google app created on developer console to use OAUTH

## OVERVIEW

---

This repository is built by [omadoye abraham](http://omadoyeabraham.com) to serve as good starting point for building APIs using Node.js and the [Nest.js](https://nestjs.com/) framework.

## TECH STACK AND NOTABLE PACKAGES

---

- [Nest.js](https://nestjs.com/) Node.js framework
- [Objection](https://vincit.github.io/objection.js/) as the ORM.
- Postgresql for the database
- Redis for caching
- [Passport-local](http://www.passportjs.org/packages/passport-local/) and [Passport-jwt](http://www.passportjs.org/packages/passport-jwt/) for authentication
- [Helmet](https://helmetjs.github.io/) for security HTTP headers.
- [class-validator](https://github.com/typestack/class-validator) for validation
- winston for logging
- [Knex.js](https://knexjs.org/) for database migration and seeding
- [CASL](https://stalniy.github.io/casl/v4/en/) for role based access control

## BASE FUNCTIONALITY

---

The repository has the following functionality already implemented:

- [ ] Authentication using [passport-local](http://www.passportjs.org/packages/passport-local/) and JWT auth tokens. See [Nest.js authentication docs here](https://docs.nestjs.com/techniques/authentication)

  - [x] User Registration
  - [x] User Login
  - [ ] User Logout

- [ ] Access control and authorization

  - [ ] Predefined roles are defined for users
  - [ ] Predefined permissions are granted to each role

- [ ] Activity logging for actions carried out in the system

- [ ] GraphQL server built using the code first approach. See [Nest.js GraphQL docs here](https://docs.nestjs.com/graphql/quick-start#code-first)

- [ ] CI/CD using github actions

- [ ] Automated tests for existing functionality.

- [ ] Database
  - [x] Migrations
  - [x] Seeds
  - [ ] Env switching during testing

## CONFIGURING THE PROJECT

Run this script `sh ./tools/configure.sh` when setting up the project. It performs the following actions:

- Install dependencies using `npm install`
- Create a `envs/.env` file with the contants from `envs/.env.example`
