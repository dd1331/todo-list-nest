export class RefinerFactory {
  constructor(private refiners) {}
  getRefiner() {
    return (source) =>
      this.refiners.reduce(
        (value, refiner) => refiner.processJobs(value),
        source,
      );
  }
  setRefiners(refiners) {
    this.refiners = refiners;
  }
}
