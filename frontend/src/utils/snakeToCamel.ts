export const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
}

export const convertKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),
        convertKeysToCamelCase(value)
      ])
    )
  }
  return obj
}
