const Identity = require('./functor')

describe('functor', () => {
  it('Identity', () => {
    const functor = Identity.of(1)
    const initial = functor.inspect()
    const result = functor.map(x => x)
    expect(initial).toBe(result.inspect())
  })

  it('composition', () => {
    const functor = Identity.of(1)
    const f = x => x + 2
    const g = x => x * 2
    const r1 = functor.map(x => f(g(x)))
    const r2 = functor.map(g).map(f)
    const result =  r1.inspect() === r2.inspect()
    expect(result).toBe(true)
  })
})
