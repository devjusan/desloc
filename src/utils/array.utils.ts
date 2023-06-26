type KeyExtractor<T> = (item: T) => string;

function sameFn<T>(item: T) {
  return item as unknown as string;
}

/** @returns a map of items by key */
export function keyMap<T>(items: Array<T>, keyExtractor?: KeyExtractor<T>) {
  const key = keyExtractor ?? sameFn;
  const obj = {} as Record<string, T>;

  for (let index = 0; index < items.length; index += 1) {
    const item = items[Number(index)];
    obj[key(item)] = item;
  }

  return obj;
}
