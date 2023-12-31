import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./services/user/entity"
import { Category } from "./services/category/entity"
import { Book } from "./services/book/entity"
import { Collection } from "./services/collection/entity"
import { BookCollection } from "./services/book-collection/entity"
import { PhoneNumber } from "./services/phone-number/entity"
import { BookCategory } from "./services/book-category/entity"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQLDB_HOST || '127.0.0.1',
    port: Number(process.env.MYSQLDB_LOCAL_PORT) || 3306,
    username: process.env.MYSQLDB_USER || 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE || 'db_phone_book',
    synchronize: true,
    logging: false,
    entities: [
        User, 
        Category, 
        Book, 
        Collection, 
        BookCollection,
        BookCategory,
        PhoneNumber
    ],
    migrations: [],
    subscribers: [],
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))