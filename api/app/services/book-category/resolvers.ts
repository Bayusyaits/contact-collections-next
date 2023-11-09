import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { BookCategoryResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { BookCategory as BookCategoryEntity } from "./entity";
import { filterItems } from "../../helpers/filter";

// Provide resolver functions for your schema fields
export const Query = {
  getBookCategory: async (_: any, args: any) => {
    const { uuid } = args;
    const bookCategoryEntity = AppDataSource.getRepository(BookCategoryEntity)
    return await bookCategoryEntity.findOne({ where: { uuid: uuid } });
  },
  getBookCategories: async (_: any, args: Args): Promise<BookCategoryResponse> => {
    const bookCategoryEntity = AppDataSource.getRepository(BookCategoryEntity)
    const { offset = 0, limit = 10, uuid, sortBy } = args;
    const where = {}
    const order = {}
    if (uuid) {
      Object.assign(where, {
        uuid
      })
    }
    // if (bookUuid) {
    //   Object.assign(where, bookUuid: {
    //     uuid: bookUuid
    //   })
    // }
    // if (categoryUuid) {
    //   Object.assign(where, categoryUuid: {
    //     uuid: categoryUuid
    //   })
    // }
    if (sortBy) {
      Object.assign(order, {
        [sortBy]: 'DESC'
      })
    }
    const obj = {}
    if (order && !isEmpty(order)) {
      Object.assign(obj, order)
    }
    if (where && !isEmpty(where)) {
      Object.assign(obj, where)
    }
    const [data, total] = await bookCategoryEntity.findAndCount({
      ...obj,
      take: 10,
      skip: 0
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      '',
      ''
    );
    const res = new BookCategoryResponse({
      total: total,
      ...filteredData,
    })
    return {
      ...res,
      limit: limit | 10,
      page: filteredData ? Number(offset * limit / filteredData.length ) : 0
    };
  }
}

export const Mutation = {
  addBookCategory: async (_: any, args: any) => {
    try {
      try {
        const { userUuid, bookUuid, categoryUuid } = args;
        const bookCategory = new BookCategoryEntity()
        bookCategory.userUuid = userUuid || 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
        bookCategory.uuid = v4()
        bookCategory.bookUuid = bookUuid
        bookCategory.categoryUuid = categoryUuid
        const bookCategoryRepository = AppDataSource.getRepository(BookCategoryEntity)
        return await bookCategoryRepository.save(bookCategory);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  addBulkBookCategory: async (_: any, args: any) => {
    try {
      let arr = []
      try {
        const { categories, books, userUuid } = args;
        if (categories && Array.isArray(categories) && categories.length &&
          books && Array.isArray(books) && books.length && userUuid) {
          const bookCategoryEntity = AppDataSource.getRepository(BookCategoryEntity)
          for (let i = 0; i < books.length; i++) {
            for (let k = 0; k < categories.length; k++) {
              const el = {
                userUuid: userUuid,
                bookUuid: {
                  uuid: books[i]
                },
                categoryUuid: {
                  uuid: categories[k]
                }
              }
              const check =  await bookCategoryEntity.findOne({ 
                where: {...el},
                relations: {
                  bookUuid: true,
                },
              });
              if (!check) {
                const res = await Mutation.addBookCategory('', {
                  userUuid: userUuid,
                  bookUuid: books[i],
                  categoryUuid: categories[k]
                })
                arr.push(res)
              }
            }
          }
        }
        return arr
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editBookCategory: async (_: any, args: any) => {
    try {
      const { userUuid, uuid, bookUuid, categoryUuid } = args;
      const bookCategoryEntity = AppDataSource.getRepository(BookCategoryEntity)
      const bookCategory = await bookCategoryEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!bookCategory || !uuid || uuid.length == 0) {
        return {};
      }
      if (bookUuid) {
        bookCategory.bookUuid = bookUuid
      }
      if (categoryUuid) {
        bookCategory.categoryUuid = categoryUuid
      }
      return await bookCategoryEntity.save(bookCategory);
    } catch (error) {
      return {};
    }
  },
  deleteBookCategory: async (_: any, args: any) => {
    try {
      const { uuid, userUuid } = args;
      const bookCategoryEntity = AppDataSource.getRepository(BookCategoryEntity)
      const bookCategory = await bookCategoryEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!bookCategory || !uuid || uuid.length == 0) {
        return false;
      }
      bookCategory.softRemove()
      await bookCategoryEntity.save(bookCategory)
      return true;
    } catch (error) {
      return false;
    }
  }
}
