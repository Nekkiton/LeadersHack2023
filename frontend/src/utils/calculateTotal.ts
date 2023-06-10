export const calculateTotal = (listNumbers?: Record<string, number | null>) => {
  return Object.values(listNumbers ?? {}).reduce(
    (previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0),
    0
  )
}
