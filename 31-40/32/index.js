const sortByKeys = (json, options) => {
  // handle parsed or unparsed json
  let keyArray;
  typeof json === 'string' ? keyArray = JSON.parse(json) : keyArray = json;

  // sort the array
  keyArray.sort((a, b) => {
    const key1 = Object.keys(a)[0];
    const key2 = Object.keys(b)[0];
    // handle options
    if (options && options.sort === 'desc') {
      if (key1 < key2) { return 1; }
      if (key1 > key2) { return -1; }
    }
    else {
      if (key1 < key2) { return -1; }
      if (key1 > key2) { return 1; }
    }
    return 0;
  });
  return keyArray;
}

module.exports = sortByKeys;
