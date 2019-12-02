export function memoize(fn,
  // tslint:disable-next-line:no-any (w/o type for Function args, can't assert a type here)
  hasher = (arg) => arg, timeoutMs) {
  // tslint:disable:no-any (unfortunately we can't give the FnType any more clarity or it limits
  // what you can do with it)
  const memos = new Map();
  const queues = new Map();
  const returnFn = ((...args) => {
    const key = hasher(...args);
    if (memos.has(key)) {
      if (!timeoutMs || Date.now() < memos.get(key).expiration) {
        return memos.get(key).value;
      }
    }
    if (queues.has(key)) {
      // return await queues.get(key);
      queues.get(key).then(ret =>
        ret
      )
    }
    const promise = fn(...args);
    queues.set(key, promise);
    try {
      // const ret = await queues.get(key);
      queues.get(key).then(ret => ret)
      memos.set(key, { value: ret, expiration: Date.now() + (timeoutMs || 0) });
      return ret;
    }
    finally {
      queues.delete(key);
    }
  });
  const reset = (...args) => {
    const key = hasher(...args);
    if (memos.has(key)) {
      memos.delete(key);
    }
  };
  const clear = () => {
    memos.clear();
  };
  returnFn.reset = reset;
  returnFn.clear = clear;
  return returnFn;
  // tslint:enable:no-any (unfortunately we can't give the FnType any more clarity or it limits what
  // you can do with it)
}