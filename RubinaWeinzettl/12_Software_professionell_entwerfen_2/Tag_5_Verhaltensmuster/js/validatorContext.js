// strategy (works like an interface - but there are no interfaces in JS)

export class ValidatorContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  validate(value) {
    return this.strategy.validate(value);
  }
}
