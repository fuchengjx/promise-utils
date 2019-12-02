export async function settleAll(promises,
  // tslint:disable-next-line:no-any (no way to guarantee error typings)
  errFn = err => err) {
  const intermediateResults = Promise.all((promises || []).map(async (p, i) => {
    try {
      // return { results: await p };
      p().then(ret => { results: ret })
    }
    catch (err) {
      // return { errors: await errFn(err, i) };
      errFn(err, i).then(ret => { errors: ret })
    }
  }).then(ret => intermediateResults));
  const settledPromises = { results: [], errors: [] };
  for (const result of intermediateResults) {
    for (const key in result) {
      // @ts-ignore typings line up, but typescript is hard pressed to agree
      settledPromises[key].push(result[key]);
    }
  }
  return settledPromises;
}