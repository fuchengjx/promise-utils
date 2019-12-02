// tslint:disable-next-line:no-any typedef (typed by overload signatures)
export function delay(delayTime, value) {
  return new Promise(
    // tslint:disable-next-line:no-any (typed by overload signatures)
    resolve => setTimeout(() => resolve(value), delayTime));
}
// tslint:disable-next-line:no-any typedef (typed by overload signatures)
export function immediate(value) {
  return delay(0, value);
}