import { map } from './map';
import { promises } from 'dns';
// tslint:disable-next-line:no-any (types are enforced by overload signatures, validated by tests)
// export async function filter(input, predicate) {
//   if (!input) {
//     return [];
//   }
//   // tslint:disable-next-line:no-any
//   const output = [];
//   // tslint:disable-next-line:no-any
//   await map(input, async (value, key) => {
//     if (await predicate(value, key)) {
//       output.push(value);
//     }
//   });
//   return output;
// }

export function filter(input, predicate) {
  if (!input) {
    return [];
  }
  const output = [];
  map(input, (value, key) => {
    predicate(value, key).then(res => {
      if (res) {
        output.push(value)
      }
    })
  })
  return output
}