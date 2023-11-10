import * as Fuse from "fuse.js";
import { take } from 'lodash';

export const filterItems = (
  items?: any,
  limit: number = 10,
  offset: number = 0,
  text?: string,
  type?: string,
  collection?: string
): any => {
  let filteredItems = items;

  // Text filter
  const fuse = new Fuse(items, {
    threshold: 0.3,
    minMatchCharLength: 2,
    keys: ['name'],
  });

  if (text && text !== '') {
    filteredItems = fuse.search(text);
  }
  // Type filter
  if (type) {
    filteredItems = filteredItems.filter((item: any) => item.type === type);
  }
  // Category filter
  if (collection && collection.split(',').length) {
    filteredItems = filteredItems.filter((item: any) => {
      const isAvailable = item.collections.find((cat: any) =>
        collection.split(',').includes(`${cat.slug}`)
      );
      if (isAvailable) {
        return true;
      }
      return false;
    });
  }
  const hasMore = offset + limit < filteredItems.length;

  // filteredItems = filteredItems.slice(offset, offset + limit);
  return { items: filteredItems, hasMore, offset };
};

export const getRelatedItems = async (
  type?: string,
  slug?: string,
  items?: any
): Promise<any> => {
  let filteredItems = items;
  const findRelated = take(
    await filteredItems.filter(
      (item: any) => item.type === type && item.slug !== slug
    ),
    10
  );
  return findRelated;
};
