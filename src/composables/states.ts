export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
export const useFoo = () => {
  return useState('foo', () => 'bar')
}
