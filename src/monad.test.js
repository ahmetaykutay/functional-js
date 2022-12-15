const {Identity, Maybe, Either} = require('./monad')

describe('monad', () => {
  const Monad = Either

  it('Left identity', () => {
    const f = x => x + 3
    const x = 2
    const result = Monad.of(x).chain(f) === f(x)
    expect(result).toBe(true)
  })

  it('Right identity', () => {
    const x = 5
    const result = Monad.of(x).chain(Monad.of).inspect() === Monad.of(x).inspect()
    expect(result).toBe(true)
  })

  it('Associativity', () => {
    const f = x => Monad.of(x + 5)
    const g = x => x * 3
    const x = 2
    const monad = Monad.of(x)
    const result = monad.chain(f).chain(g) == monad.chain(x => f(x).chain(g));
    expect(result).toBe(true)
  })
})
