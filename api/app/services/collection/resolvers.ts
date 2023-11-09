import { v4 } from "uuid";
import Args, { CollectionResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Collection as CollectionEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";
import { Raw } from "typeorm";

// Provide resolver functions for your schema fields
export const Query = {
  getCollection: async (_: any, args: any) => {
    const { uuid } = args;
    const collectionEntity = AppDataSource.getRepository(CollectionEntity)
    return await collectionEntity.findOne({ where: { uuid: uuid } });
  },
  getListCollection: async (_: any, args: any) => {
    const { slug, orderBy } = args;
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
    const collectionEntity = AppDataSource.getRepository(CollectionEntity)
    return await collectionEntity.find(
      {
        where,
        order
      }
    );
  },
  getCollections: async (_: any, args: Args): Promise<CollectionResponse> => {
    const collectionEntity = AppDataSource.getRepository(CollectionEntity)
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
    const [data, total] = await collectionEntity.findAndCount({
      where,
      order,
      take: limit,
      skip: offset
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      // slug,
      type
    );
    const res = new CollectionResponse({
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
  addCollection: async (_: any, args: any) => {
    try {
      const generate = Math.floor(generateKey(100))
      const { name, image } = args;
      const collection = new CollectionEntity()
      collection.name = name
      collection.uuid = v4()
      collection.slug = slugify(name) ? `${setSpaceToDash(slugify(name))}_${generate}` : 
      `${setSpaceToDash(name)}_${generate}`
      collection.image = image
      const collectionRepository = AppDataSource.getRepository(CollectionEntity)
      return await collectionRepository.save(collection);
    } catch (error) {
      return {};
    }
  },
  editCollection: async (_: any, args: any) => {
    try {
      const { name, slug } = args;
      const collectionEntity = AppDataSource.getRepository(CollectionEntity)
      const collection = await collectionEntity.findOneBy({
        slug: slug,
      })
      if (!collection || !slug || slug.length == 0) {
        return {};
      }
      if (name) {
        collection.name = name
      }
      return await collectionEntity.save(collection);
    } catch (error) {
      return {};
    }
  },
  deleteCollection: async (_: any, args: any) => {
    try {
      const {slug } = args;
      const collectionEntity = AppDataSource.getRepository(CollectionEntity)
      const collection = await collectionEntity.findOneBy({
        slug: slug,
      })
      if (!collection || !slug || slug.length == 0) {
        return false;
      }
      collection.softRemove()
      await collectionEntity.save(collection)
      return true;
    } catch (error) {
      return false;
    }
  }
}
