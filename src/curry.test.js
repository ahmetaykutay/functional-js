const curry = require('./curry')

describe('curry', () => {
  it('should curry if not alll the parameters are passed', () => {
    const fn = (a, b, c) => a + b + c
    expect(curry(fn)(2)(5)(0)).toBe(7)
  })

  it('should call the function if all the paramaters are passed', () => {
    expect(curry((a, b, c) => a + b + c)(2, 5, 0)).toBe(7)
  })
})
