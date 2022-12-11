## About

FileManager is a simple project to store your files. You can upload any file by giving a URL, or upload it directly on the server. Also you can create new directories in a given directory. More features are going to be implemented.

It's built with [AdonisJS](https://docs.adonisjs.com/guides/introduction), [Inertia](https://inertiajs.com/), [ReactJS](https://reactjs.org/docs/getting-started.html), and [TailwindCSS](https://tailwindcss.com/).

You can also use it as a test project to know how to use ReactJS and TailwindCSS alongside with Inertia on top of AdonisJS. It's also a good practive for using pm2 as a node process manager and using mysql running with docker (docker-compose).

## Installation

### Requirements

- node >= 16
- docker and docker-compose plugin
- (optional) pm2 installed globally
  - `npm insatll -g pm2`

### Running the project

run

```bash
npm install
```

or if you have yarn installed

```bash
yarn
```

create the env file

```bash
cp .env.example .env
```

change the environment variables

then run the database service (mysql)

```bash
docker compose up -d
```

- if you have already installed mysql, then you don't need to run the code above.

migrate the database schemas

```bash
node ace migration:run
```

- for more information read on AdonisJS

for development environments run

```bash
yarn dev
```

or directly run the adonis ace command

```bash
node ace serve --watch
```

for production environments

```bash
yarn build
```

or using adonis ace command

```bash
node ace build --production
```

you should copy the env file into build directory

```bash
cp .env build/.env
```

then `cd` to the build directory, and

```bash
yarn install --production
```

run

```bash
node server.js
```

### Using PM2

you can use pm2 to manage the node processes instead of running the command `node server.js` for production.

in the root directory of the project run

```bash
pm2 start ecosystem.config.js
```

for more information and tutorials see https://github.com/

## Contributing

Thank you for considering contributing to the project!
You can fork the repo and make your changes on a new branch then send a pull request. Any suggestions and pull requests would be appreciated <3.
