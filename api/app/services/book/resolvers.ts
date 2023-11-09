import { isEmpty } from "lodash";
import { v4 } from "uuid"
import Args, { BookResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Book as BookEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";

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
        bookCategories: true
      },
      where: { 
        slug: setSpaceToDash(slug)
      } 
    });
  },
  getListBooks: async (_: any, args: any) => {
    const { slug, sortBy } = args;
    const where = {}
    const order = {}
    if (slug) {
      Object.assign(where, {
        slug
      })
    }
    if (sortBy) {
      Object.assign(order, {
        [sortBy]: 'DESC'
      })
    }
    const bookEntity = AppDataSource.getRepository(BookEntity)
    return await bookEntity.find({where, order});
  },
  getBooks: async (_: any, args: Args): Promise<BookResponse> => {
    const bookEntity = AppDataSource.getRepository(BookEntity)
    const { offset = 0, limit = 10, slug, type, sortBy } = args;
    const where = {}
    const order = {}
    if (slug) {
      Object.assign(where, {
        slug
      })
    }
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
    const [data, total] = await bookEntity.findAndCount({
      relations: {
          bookCollections: true,
          bookCategories: true
      },
      where,
      take: 10,
      skip: 0
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      slug,
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
      try {
        const generate = Math.floor(generateKey(100))
        const { 
          payload: {
            fullName, image, type, address, email, phoneNumber,
            status, description, gallery, userUuid, slug
          }
        } = args;
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
        if (phoneNumber) {
          book.phoneNumber = phoneNumber
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
        book.image = image
        const bookRepository = AppDataSource.getRepository(BookEntity)
        return await bookRepository.save(book);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editBook: async (_: any, args: any) => {
    try {
      const { 
        payload: {
          fullName, uuid, image, type, address, email, phoneNumber,
          status, description, gallery, slug
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
      if (phoneNumber) {
        book.phoneNumber = phoneNumber
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
      return await bookEntity.save(book);
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
