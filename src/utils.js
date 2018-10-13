const stringify = (value) => {
  if (value instanceof Object) {
    const objAtrrs = Object.keys(value).map(key => `${' '.repeat(4)}${key}: ${value[key]}`);
    return `{\n${objAtrrs.join('\n')}\n${' '.repeat(2)}}`;
  }
  return value;
};

export default stringify;
