module.exports = class Identity {
  constructor(value) { this.$value = value }
  static of(value) { return new Identity(value) }
  map(fn) { return Identity.of(fn(this.$value)) }
  inspect() { return `Identity(${this.$value})` }
}
