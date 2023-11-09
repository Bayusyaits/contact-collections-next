import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { BookCollectionResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { BookCollection as BookCollectionEntity } from "./entity";
import { filterItems } from "../../helpers/filter";

// Provide resolver functions for your schema fields
export const Query = {
  getBookCollection: async (_: any, args: any) => {
    const { uuid } = args;
    const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
    return await bookCollectionEntity.findOne({ where: { uuid: uuid } });
  },
  getBookCollections: async (_: any, args: Args): Promise<BookCollectionResponse> => {
    const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
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
    // if (collectionUuid) {
    //   Object.assign(where, collectionUuid: {
    //     uuid: collectionUuid
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
    const [data, total] = await bookCollectionEntity.findAndCount({
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
    const res = new BookCollectionResponse({
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
  addBookCollection: async (_: any, args: any) => {
    try {
      try {
        const { userUuid, bookUuid, collectionUuid } = args;
        const bookCollection = new BookCollectionEntity()
        bookCollection.userUuid = userUuid || 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
        bookCollection.uuid = v4()
        bookCollection.bookUuid = bookUuid
        bookCollection.collectionUuid = collectionUuid
        const bookCollectionRepository = AppDataSource.getRepository(BookCollectionEntity)
        return await bookCollectionRepository.save(bookCollection);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  bulkBookCollection: async (_: any, args: any) => {
    try {
      let arr = []
      const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
      try {
        const { payload } = args;
        for (let i = 0; i < payload.length; i++) {
          const val = payload[i] || null
          if (!val?.collectionUuid?.uuid || !val?.bookUuid || !val?.userUuid) {
            continue;
          }
          const collectionUuid = val?.collectionUuid?.uuid || val?.collectionUuid
          const el = {
            userUuid: val.userUuid,
            bookUuid: {
              uuid: val.bookUuid
            },
            collectionUuid: {
              uuid: collectionUuid
            }
          }
          const check =  await bookCollectionEntity.findOne({ 
            where: {...el},
            relations: {
              bookUuid: true,
            },
          });
          if (!check) {
            const res = await Mutation.addBookCollection('', {
              userUuid: val.userUuid,
              bookUuid: val.bookUuid,
              collectionUuid: collectionUuid
            })
            arr.push(res)
          } else if (check && check?.uuid && val?.action === 'delete') {
            await Mutation.deleteBookCollection('', {
              userUuid: val.userUuid,
              uuid: check.uuid
            })
          } else if (check && val?.action === 'edit' && val?.uuid) {
            const res = await Mutation.editBookCollection('', {
              userUuid: val.userUuid,
              bookUuid: val.bookUuid,
              collectionUuid,
              uuid: val.uuid
            })
            arr.push(res)
          } else if (check) {
            arr.push({...check})
          } else {
            continue
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
  addBulkBookCollection: async (_: any, args: any) => {
    try {
      let arr = []
      try {
        const { collections, books, userUuid } = args;
        if (collections && Array.isArray(collections) && collections.length &&
          books && Array.isArray(books) && books.length && userUuid) {
          const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
          for (let i = 0; i < books.length; i++) {
            if (!books[i]) {
              continue;
            }
            for (let k = 0; k < collections.length; k++) {
              if (!collections[k]) {
                continue;
              }
              const el = {
                userUuid: userUuid,
                bookUuid: {
                  uuid: books[i]
                },
                collectionUuid: {
                  uuid: collections[k]
                }
              }
              const check =  await bookCollectionEntity.findOne({ 
                where: {...el},
                relations: {
                  bookUuid: true,
                },
              });
              if (!check) {
                const res = await Mutation.addBookCollection('', {
                  userUuid: userUuid,
                  bookUuid: books[i],
                  collectionUuid: collections[k]
                })
                arr.push(res)
              } else {
                continue;
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
  editBookCollection: async (_: any, args: any) => {
    try {
      const { userUuid, uuid, bookUuid, collectionUuid } = args;
      const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
      const bookCollection = await bookCollectionEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!bookCollection || !uuid || uuid.length == 0) {
        return {};
      }
      if (bookUuid) {
        bookCollection.bookUuid = bookUuid
      }
      if (collectionUuid) {
        bookCollection.collectionUuid = collectionUuid
      }
      return await bookCollectionEntity.save(bookCollection);
    } catch (error) {
      return {};
    }
  },
  deleteBookCollection: async (_: any, args: any) => {
    try {
      const { uuid, userUuid } = args;
      const bookCollectionEntity = AppDataSource.getRepository(BookCollectionEntity)
      const bookCollection = await bookCollectionEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!bookCollection || !uuid || uuid.length == 0) {
        return false;
      }
      bookCollection.softRemove()
      await bookCollectionEntity.save(bookCollection)
      return true;
    } catch (error) {
      return false;
    }
  }
}
