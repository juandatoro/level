export const organizeObject = (data: Record<string, unknown>[]) => {
  const keys = Object.keys(data[0])
  return data.map((item) => {
    const obj = {} as Record<string, unknown>
    keys.forEach((key: string) => {
      obj[key] = item[key]
    })
    return obj
  })
}
