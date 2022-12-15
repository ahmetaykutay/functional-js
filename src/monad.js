// util
function isNothing(value) { return value !== undefined && value !== null }

const compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// monads

class Identity {
  constructor(value) { this.$value = value }
  static of(value) { return new Identity(value) }
  map(fn) { return Identity.of(fn(this.$value)) }
  join() { return this.$value }
  chain(fn) { return this.map(fn).join() }
  ap(f) { return f.map(this.$value) }
  inspect() { return `Identity(${this.$value})` }
}

class Maybe {
  constructor(value) { this.$value = value }
  static of(value) { return new Maybe(value) }
  get isNothing() { isNothing(this.$value) }
  map(fn) { return this.isNothing ? this : Maybe.of(fn(this.$value)) }
  chain(fn) { return this.map(fn).join() }
  join() { return this.isNothing ? this : this.$value }
  inspect() { return this.isNothing ? 'Nothing' : `Just(${this.$value})` }
}

class Either {
  constructor(value) { this.$value = value }
  static of(value) { return new Right(value) }
}

class Right extends Either {
  map(fn) { return Either.of(fn(this.$value)) }
  chain(fn) { return fn(this.$value) }
  join() { return this.$value }
  inspect() { return `Left(${this.$value})` }
  get isLeft() { return false }
  get isRight() { return true }
}

class Left extends Either {
  map() { return this }
  chain() { return this }
  join() { return this }
  inspect() { return `Left(${this.$value})` }
  get isLeft() { return true }
  get isRight() { return false }
}

function left(value) { return new Left(value) }

class IO {
  constructor(effect) { this.unsafePerformIO = effect }
  static of(x) { return new IO(() => x) }
  map(fn) { return new IO(compose(fn, this.unsafePerformIO)) }
  chain(fn) { return this.map(fn).join() }
  join() { return new IO(() => this.unsafePerformIO().unsafePerformIO()) }
  inspect() { return "IO" }
}
class Task {
  constructor(fork) { this.fork = fork; }
  static rejected(x) { return new Task((reject, _) => reject(x)); }
  static of(x) { return new Task((_, resolve) => resolve(x)); }
  map(fn) {
    return new Task((reject, resolve) =>
                        this.fork(reject, compose(resolve, fn)));
  }
  chain(fn) {
    return new Task((reject, resolve) =>
                        this.fork(reject, x => fn(x).fork(reject, resolve)));
  }

  join() { return this.chain(identity); }
}

module.exports = {
  Identity,
  Maybe,
  Either,
  left,
  IO,
}
