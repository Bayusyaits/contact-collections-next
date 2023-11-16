project: contact-collection
ref: bayusyaits.medium.com

# Specify the type of commit:
> feat: The new feature you're adding to a particular application
> fix: A bug fix
> style: Feature and updates related to styling
> perf: A performance-enhancing tweak to the code
> revert: Reverts a previous commit
> initial: Initial Commit
> refactor: Refactoring a specific section of the codebase
> test: Everything related to testing
> docs: Everything related to documentation
> chore: Regular code maintenance.[ You can also use emojis to represent commit types]

```bash
$ git commit -m "chore: update npm dependency to the latest"
```

## Running Apps

```bash
# run docker compose
$ docker-compose up -d

```

## 1 Build Setup App

```bash
# open folder app
$ cd app

# copy env
$ sudo cp .env.example .env

# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
# run lint fix
$ yarn lint:fix

# run prettier
$ yarn format

## docker
# build
$ docker build -t contact-collection:1.0.0 .
# run
$ docker run -d -p 3003:3003 contact-collection:1.0.0

$ docker tag contact-collection:1.0.0 {username}/contact-collection:1.0.0
$ docker push {username}/contact-collection:1.0.0

```


## 2 Running SQL

```bash
# open folder db
$ cd db

# copy query
# run & paste query in sequel ace
$ yarn format

## docker
# build
$ docker build -t mysql/db_phone_book:1.0.0 .
# run
$ docker run mysql/db_phone_book:1.0.0
```

## 3 Build Setup Api (graphql)

```bash
# open folder api
$ cd api

# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn app

# build for production and launch server
$ yarn build
# run lint fix
$ yarn lint:fix

# run prettier
$ yarn format
## docker
# build
$ docker build -t api-app:1.0.0 .
# run
$ docker run -d -p 4003:4003 api-app:1.0.0
```
