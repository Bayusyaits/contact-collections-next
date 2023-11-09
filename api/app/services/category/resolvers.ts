import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { CategoryResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Category as CategoryEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";

// Provide resolver functions for your schema fields
export const Query = {
  getCategory: async (_: any, args: any) => {
    const { uuid } = args;
    const categoryEntity = AppDataSource.getRepository(CategoryEntity)
    return await categoryEntity.findOne({ where: { uuid: uuid } });
  },
  getCategories: async (_: any, args: Args): Promise<CategoryResponse> => {
    const categoryEntity = AppDataSource.getRepository(CategoryEntity)
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
    const [data, total] = await categoryEntity.findAndCount({
      ...obj,
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
    const res = new CategoryResponse({
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
  addCategory: async (_: any, args: any) => {
    try {
      try {
        const generate = Math.floor(generateKey(100))
        const { name, icon } = args;
        const category = new CategoryEntity()
        category.name = name
        category.uuid = v4()
        category.slug = slugify(name) ? `${setSpaceToDash(slugify(name))}_${generate}` : 
        `${setSpaceToDash(name)}_${generate}`
        category.icon = icon
        const categoryRepository = AppDataSource.getRepository(CategoryEntity)
        return await categoryRepository.save(category);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editCategory: async (_: any, args: any) => {
    try {
      const { 
        payload: {
          name, uuid, icon
        } 
      } = args;
      const categoryEntity = AppDataSource.getRepository(CategoryEntity)
      const category = await categoryEntity.findOneBy({
        uuid: uuid,
      })
      if (!category || !uuid || uuid.length == 0) {
        return {};
      }
      if (name) {
        category.name = name
      }
      if (icon) {
        category.icon = icon
      }
      return await categoryEntity.save(category);
    } catch (error) {
      return {};
    }
  },
  deleteCategory: async (_: any, args: any) => {
    try {
      const { uuid } = args;
      const categoryEntity = AppDataSource.getRepository(CategoryEntity)
      const category = await categoryEntity.findOneBy({
        uuid: uuid,
      })
      if (!category || !uuid || uuid.length == 0) {
        return false;
      }
      category.softRemove()
      await categoryEntity.save(category)
      return true;
    } catch (error) {
      return false;
    }
  }
}
