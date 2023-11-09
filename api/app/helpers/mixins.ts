export const setSpaceToDash = (val: string, operator: string = '-') => {
  if (!val) {
    return
  }
  return val?.toString().replace(/\s+/g, operator).toLowerCase()
}

export const generateKey = (val: number = 100) => Math.random() * val
