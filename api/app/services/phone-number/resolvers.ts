import { v4 } from "uuid";
import Args, { PhoneNumberResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { PhoneNumber as PhoneNumberEntity } from "./entity";
import { filterItems } from "../../helpers/filter";

// Provide resolver functions for your schema fields
export const Query = {
  getPhoneNumber: async (_: any, args: any) => {
    const { uuid } = args;
    if (!uuid) {
      return {}
    }
    const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
    return await bookCollectionEntity.findOne({ where: { uuid: uuid } });
  },
  getPhoneNumbers: async (_: any, args: Args): Promise<PhoneNumberResponse> => {
    const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
    const { offset = 0, limit = 10, uuid, orderBy } = args;
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
    if (orderBy) {
      Object.assign(order, {
        [orderBy]: 'DESC'
      })
    }
    const [data, total] = await bookCollectionEntity.findAndCount({
      where,
      order,
      take: limit,
      skip: offset
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      '',
      ''
    );
    const res = new PhoneNumberResponse({
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
  addPhoneNumber: async (_: any, args: any) => {
    try {
      const { userUuid, bookUuid, phoneNumber } = args;
      console.log('userUuid', userUuid)
      const bookCollection = new PhoneNumberEntity()
      bookCollection.userUuid = userUuid || 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
      bookCollection.uuid = v4()
      bookCollection.bookUuid = bookUuid
      bookCollection.phoneNumber = phoneNumber
      const bookCollectionRepository = AppDataSource.getRepository(PhoneNumberEntity)
      return await bookCollectionRepository.save(bookCollection);
    } catch (error) {
      return false;
    }
  },
  bulkPhoneNumber: async (_: any, args: any) => {
    try {
      let arr = []
      const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
      try {
        const { payload } = args;
        for (let i = 0; i < payload.length; i++) {
          const val = payload[i] || null
          if (!val?.phoneNumber || !val?.bookUuid || !val?.userUuid) {
            continue;
          }
          const el = {
            userUuid: val.userUuid,
            bookUuid: {
              uuid: val.bookUuid
            },
            phoneNumber: val.phoneNumber
          }
          const check =  await bookCollectionEntity.findOne({ 
            where: {...el},
            relations: {
              bookUuid: true,
            },
          });
          if (!check) {
            const res = await Mutation.addPhoneNumber('', {
              userUuid: val.userUuid,
              bookUuid: val.bookUuid,
              phoneNumber: val.phoneNumber
            })
            arr.push(res)
          } else if (check && check?.uuid && val?.action === 'delete') {
            await Mutation.deletePhoneNumber('', {
              userUuid: val.userUuid,
              uuid: check.uuid
            })
          } else if (check && val?.action === 'edit' && val?.uuid) {
            const res = await Mutation.editPhoneNumber('', {
              userUuid: val.userUuid,
              bookUuid: val.bookUuid,
              phoneNumber: val.phoneNumber,
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
  addBulkPhoneNumber: async (_: any, args: any) => {
    try {
      let arr = []
      try {
        const { phoneNumber, books, userUuid } = args;
        if (phoneNumber && phoneNumber.length &&
          books && Array.isArray(books) && books.length && userUuid) {
          const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
          for (let i = 0; i < books.length; i++) {
            if (!books[i]) {
              continue;
            }
              const el = {
                userUuid: userUuid,
                bookUuid: {
                  uuid: books[i]
                },
                phoneNumber
              }
              const check =  await bookCollectionEntity.findOne({ 
                where: {...el},
                relations: {
                  bookUuid: true,
                },
              });
              if (!check) {
                const res = await Mutation.addPhoneNumber('', {
                  userUuid: userUuid,
                  bookUuid: books[i],
                  phoneNumber
                })
                arr.push(res)
              } else {
                continue;
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
  editPhoneNumber: async (_: any, args: any) => {
    try {
      const { userUuid, uuid, bookUuid, phoneNumber } = args;
      const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
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
      if (phoneNumber) {
        bookCollection.phoneNumber = phoneNumber
      }
      return await bookCollectionEntity.save(bookCollection);
    } catch (error) {
      return {};
    }
  },
  deletePhoneNumber: async (_: any, args: any) => {
    try {
      const { uuid, userUuid } = args;
      const bookCollectionEntity = AppDataSource.getRepository(PhoneNumberEntity)
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
