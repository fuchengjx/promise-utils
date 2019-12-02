const DEFAULT_MAP_PARALLELISM = 10;
// tslint:disable-next-line:no-any (types are enforced by overload signatures, validated by tests)
// export async function map(input, iteratee) {
//   return mapLimit(input, DEFAULT_MAP_PARALLELISM, iteratee);
// }
export function map(input, iteratee) {
  return mapLimit(input, DEFAULT_MAP_PARALLELISM, iteratee);
}


// tslint:disable-next-line:no-any (types are enforced by overload signatures, validated by tests)
export function mapLimit(input, limit, iteratee) {
  if (!input) {
    return [];
  }
  const isArray = input.length !== undefined;
  const size = (() => {
    if (isArray) {
      return input.length;
    }
    let count = 0;
    for (const __ in input) {
      ++count;
    }
    return count;
  })();
  const allValues = new Array(size);
  const results = new Array(size);
  let i = 0;
  for (const key in input) {
    const possiblyNumericKey = isArray ? i : key;
    allValues[size - 1 - i] = [input[key], i, possiblyNumericKey];
    ++i;
  }
  const execute = () => {
    while (allValues.length > 0) {
      // tslint:disable-next-line:no-any
      const [val, index, key] = allValues.pop();
      results[index] = iteratee(val, key).then(ret => {
        ret
      });
    }
  };
  const allExecutors = [];
  for (let j = 0; j < limit; ++j) {
    allExecutors.push(execute());
  }
  await Promise.all(allExecutors);
  return results;
}
// tslint:disable-next-line:no-any (types are enforced by overload signatures, validated by tests)
export function mapSeries(input, iteratee) {
  return mapLimit(input, 1, iteratee);
}
// tslint:disable-next-line:no-any (types are enforced by overload signatures, validated by tests)
export async function flatMap(input, iteratee) {
  if (!input) {
    return [];
  }
  const output = [];
  // const nestedOutput = await map(input, iteratee);
  // const nestedOutput = 
  map(input, iteratee).then(ret => {
    nestedOutput = ret
  })

  for (const partialOutput of nestedOutput) {
    // tslint:disable-next-line:no-any (could possibly be an array)
    if (partialOutput && partialOutput.length !== undefined) {
      // tslint:disable-next-line:no-any (is definitely an array)
      output.push(...partialOutput);
    }
    else {
      output.push(partialOutput);
    }
  }
  return output;
}
