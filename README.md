<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Description

This is a small TimeTracker API written in NestJS, that allows you to register and authenticate users and track time.

##### API main endpoints

**`root/time (requires JTW)`** - Endpoint for manipulating time
  - `GET` - Gets all authenticated users time rows
  - `/:id`
    - `GET` Gets user specific time row (`id`)
    - `PATCH` - Allows to edit users specific time row (`id`)
  - `/:id/end`
    - `PATCH` - Ends user specific time row (`id`)
  - `/create`
    - `POST` - Allows to create new time for user. Requires `title` to be set in body.

**`root/user`** - User creation
  - `POST` - Allows to create user
  - `/profile`
    - `GET` - Gets authenticated user information (profile)

**`root/auth/login`** - To authenticate user, which will produce JWT token
  - `POST` - Requires correct username (email) and password.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

  Nest is [MIT licensed](LICENSE).
