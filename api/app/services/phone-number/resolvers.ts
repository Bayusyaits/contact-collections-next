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
    const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
    return await phoneNumberEntity.findOne({ where: { uuid: uuid } });
  },
  getPhoneNumbers: async (_: any, args: Args): Promise<PhoneNumberResponse> => {
    const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
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
    const [data, total] = await phoneNumberEntity.findAndCount({
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
      const phoneNumberTable = new PhoneNumberEntity()
      phoneNumberTable.userUuid = userUuid || 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
      phoneNumberTable.uuid = v4()
      phoneNumberTable.bookUuid = bookUuid
      phoneNumberTable.phoneNumber = phoneNumber
      const phoneNumberTableRepository = AppDataSource.getRepository(PhoneNumberEntity)
      return await phoneNumberTableRepository.save(phoneNumberTable);
    } catch (error) {
      return false;
    }
  },
  bulkPhoneNumber: async (_: any, args: any) => {
    let arr = []
    const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
    try {
      const { payload } = args;
      for (let i = 0; i < payload.length; i++) {
        const val = payload[i] || null
        if (!val?.phoneNumber || !val?.bookUuid || !val?.userUuid) {
          continue;
        }
        const el = {
          userUuid: val.userUuid,
          bookUuid: val.bookUuid,
          phoneNumber: val.phoneNumber
        }
        const check =  await phoneNumberEntity.findOne({ 
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
  },
  editBulkPhoneNumber: async (_: any, args: any) => {
    try {
      let arr = []
      const { phoneNumbers, bookUuid, userUuid } = args;
      if (phoneNumbers && phoneNumbers.length &&
        bookUuid && Array.isArray(phoneNumbers) && userUuid) {
        for (let i = 0; i < phoneNumbers.length; i++) {
          let res = {}
          const phoneNumber =  phoneNumbers[i] && typeof phoneNumbers[i] === 'string' ? 
          phoneNumbers[i] : phoneNumbers[i]?.phoneNumber
          if (!phoneNumber) {
            continue;
          } else if (!phoneNumbers[i]?.uuid && bookUuid && phoneNumber) {
            res = await Mutation.addPhoneNumber('', {
              userUuid,
              bookUuid: {
                uuid: bookUuid
              },
              phoneNumber
            })
          } else if (phoneNumbers[i]?.uuid) {
            const el = {
              uuid: phoneNumbers[i]?.uuid,
              userUuid,
              bookUuid: {
                uuid: bookUuid
              },
              phoneNumber
            }
            res = await Mutation.editPhoneNumber('', el)
            arr.push(res)
          }
        }
      }
      return arr
    } catch (error) {
      return {};
    }
  },
  addBulkPhoneNumber: async (_: any, args: any) => {
    try {
      let arr = []
      const { phoneNumbers, bookUuid, userUuid } = args;
      if (phoneNumbers && phoneNumbers.length &&
        bookUuid && Array.isArray(phoneNumbers) && userUuid) {
        const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
        for (let i = 0; i < phoneNumbers.length; i++) {
          if (!phoneNumbers[i]) {
            continue;
          }
          const el = {
            userUuid,
            bookUuid: {
              uuid: bookUuid
            },
            phoneNumber: phoneNumbers[i]
          }
          const check =  await phoneNumberEntity.findOne({ 
            where: {...el},
            relations: {
              bookUuid: true,
            },
          });
          if (!check) {
            const res = await Mutation.addPhoneNumber('', el)
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
  },
  editPhoneNumber: async (_: any, args: any) => {
    try {
      const { userUuid, uuid, bookUuid, phoneNumber } = args;
      const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
      const phoneNumberTable = await phoneNumberEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!phoneNumberTable || !uuid || uuid.length == 0) {
        return {};
      }
      if (bookUuid) {
        phoneNumberTable.bookUuid = bookUuid
      }
      if (phoneNumber) {
        phoneNumberTable.phoneNumber = phoneNumber
      }
      return await phoneNumberEntity.save(phoneNumberTable);
    } catch (error) {
      return {};
    }
  },
  deletePhoneNumber: async (_: any, args: any) => {
    try {
      const { uuid, userUuid } = args;
      const phoneNumberEntity = AppDataSource.getRepository(PhoneNumberEntity)
      const phoneNumberTable = await phoneNumberEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!phoneNumberTable || !uuid || uuid.length == 0) {
        return false;
      }
      phoneNumberTable.softRemove()
      await phoneNumberEntity.save(phoneNumberTable)
      return true;
    } catch (error) {
      return false;
    }
  }
}
