module.exports = function curry(fn) {
  return (...args) => {
    if (args.length < fn.length) {
      return curry(fn.bind(null, ...args))
    }

    return fn.apply(null, args)
  }
}
