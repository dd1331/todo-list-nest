export class RefinerFactory {
  constructor(private refiners) {}
  getRefiner() {
    if (!this.refiners) {
      throw new Error('refiners must be set before call getRefiner');
    }
    return (source) =>
      this.refiners.reduce(
        (value, refiner) => refiner.processJobs(value),
        source,
      );
  }
  setRefiners(refiners) {
    if (!refiners) {
      throw new Error('at least one refiner is required');
    }
    this.refiners = refiners;
  }
}
