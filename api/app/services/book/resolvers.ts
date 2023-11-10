import { v4 } from "uuid"
import {Raw} from "typeorm";
import Args, { BookResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Book as BookEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";
import { Mutation as MutationPhoneNumber } from '../phone-number/resolvers'
import { isEmpty } from "lodash";

// Provide resolver functions for your schema fields
export const Query = {
  getBook: async (_: any, args: any) => {
    const { slug } = args;
    if (!slug) {
      return null;
    }
    const bookEntity = AppDataSource.getRepository(BookEntity)
    return await bookEntity.findOne({ 
      relations: {
        bookCollections: true,
        bookCategories: true,
        phoneNumbers: true
      },
      where: { 
        slug: setSpaceToDash(slug)
      } 
    });
  },
  getListBooks: async (_: any, args: any) => {
    const { slug, orderBy } = args;
    const where = {}
    const order = {}
    if (slug) {
      Object.assign(where, {
        slug
      })
    }
    if (orderBy) {
      Object.assign(order, {
        [orderBy]: 'DESC'
      })
    }
    const bookEntity = AppDataSource.getRepository(BookEntity)
    return await bookEntity.find({where, order});
  },
  getBooks: async (_: any, args: Args): Promise<BookResponse> => {
    const bookEntity = AppDataSource.getRepository(BookEntity)
    const { offset = 0, limit = 10, slug, type, orderBy } = args;
    const where = {}
    const order = {}
    if (slug) {
      Object.assign(where, {
        slug: Raw((alias) => `${alias} LIKE :slug`, { slug: `%${slug}%` })
      })
    }
    if (orderBy) {
      Object.assign(order, {
        [orderBy]: 'DESC'
      })
    }
    const [data, total] = await bookEntity.findAndCount({
      relations: {
        bookCollections: true,
        bookCategories: true,
        phoneNumbers: true
      },
      where,
      order,
      take: limit,
      skip: offset
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      type
    );
    const res = new BookResponse({
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
  addBook: async (_: any, args: any) => {
    try {
      const generate = Math.floor(generateKey(100))
      const { 
        payload: {
          fullName, image, type, address, email, phoneNumbers,
          status, description, gallery, userUuid, slug
        }
      } = args;
      if (!fullName || !phoneNumbers || phoneNumbers.length === 0 || !userUuid) {
        return
      }
      const bookEntity = AppDataSource.getRepository(BookEntity)
      const check = await bookEntity.findOneBy({
        fullName,
        userUuid
      })
      if (!isEmpty(check)) {
        return check
      }
      const book = new BookEntity()
      book.uuid = v4()
      if (address) {
        book.address = address
      }
      if (email) {
        book.email = email
      }
      if (fullName) {
        book.fullName = fullName
      }
      if (slug) {
        book.slug = slug
      } else {
        book.slug = slugify(fullName) ? `${setSpaceToDash(slugify(fullName))}_${generate}` : 
        `${setSpaceToDash(fullName)}_${generate}`  
      }
      if (userUuid) {
        book.userUuid = userUuid
      }
      if (type) {
        book.type = type
      }
      if (description) {
        book.description = description
      }
      // offline just sms and call, online available in wa
      if (status && ['offline','online'].includes(status)) {
        book.status = status
      }
      if (gallery && Array.isArray(gallery)) {
        book.gallery = gallery
      }
      book.image = image
      const bookRepository = AppDataSource.getRepository(BookEntity)
      const res = await bookRepository.save(book);
      if (res && !isEmpty(res) && phoneNumbers && phoneNumbers.length) {
        await MutationPhoneNumber.addBulkPhoneNumber(_, {
          phoneNumbers,
          bookUuid: res.uuid,
          userUuid: res.userUuid
        })
      }
      return res
    } catch (error) {
      return {};
    }
  },
  editBook: async (_: any, args: any) => {
    try {
      const { 
        payload: {
          fullName, uuid, image, type, address, email,
          status, description, gallery, slug, phoneNumbers
        }
      } = args;      
      const bookEntity = AppDataSource.getRepository(BookEntity)
      const book = await bookEntity.findOneBy({
        uuid: uuid,
      })
      if (!book || !uuid || uuid.length == 0) {
        return {};
      }
      if (address) {
        book.address = address
      }
      if (email) {
        book.email = email
      }
      if (fullName) {
        book.fullName = fullName
      }
      if (slug) {
        book.slug = slug
      }
      if (image) {
        book.image = image
      }
      if (type) {
        book.type = type
      }
      if (description) {
        book.description = description
      }
      if (status && ['offline','online'].includes(status)) {
        book.status = status
      }
      if (gallery && Array.isArray(gallery)) {
        book.gallery = gallery
      }
      const res = await bookEntity.save(book);
      if (res && !isEmpty(res) && phoneNumbers && phoneNumbers.length) {
        await MutationPhoneNumber.editBulkPhoneNumber(_, {
          phoneNumbers,
          bookUuid: res.uuid,
          userUuid: res.userUuid
        })
      }
      return res
    } catch (error) {
      return {};
    }
  },
  deleteBook: async (_: any, args: any) => {
    try {
      const { uuid } = args;
      const bookEntity = AppDataSource.getRepository(BookEntity)
      const book = await bookEntity.findOneBy({
        uuid: uuid,
      })
      if (!book || !uuid || uuid.length == 0) {
        return false;
      }
      book.softRemove()
      await bookEntity.save(book)
      return true;
    } catch (error) {
      return false;
    }
  }
}
