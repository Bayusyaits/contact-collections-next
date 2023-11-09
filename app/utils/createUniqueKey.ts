export const createUniqueKey = () =>
  `key-${Math.random() * 100}-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
