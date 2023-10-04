const regKeyValue =
/"(\w+|-?\d+(\.\d+)?|\[[^\[\]]*\]|{[^{}]*})":\s*(?:(?:"(?:[^"\\]|\\.)*")|(true|false|null|-?\d+(\.\d+)?|\[[^\[\]]*\]|{[^{}]*}))/g;
const doubleQuoteRg = /"/g;

const returnTrueType = (str) => {
  if (str === "true" || str === "false") {
    str = str === "true";
  } else if (str === "null") {
    str = null;
  } else if (/^\d+(\.\d+)?$/.test(str)) {
    str = parseFloat(str);
  } else if (/^".*"$/.test(str)) {
    str = str.replace(doubleQuoteRg, "");
  } else if (/^\[.*\]$/.test(str)) {
    if (str === '[]') {
      return [];
    }
    str = str
      .slice(1, -1)
      .split(",")
      .map((item) => item = returnTrueType(item));
  } else {
    return str
  }
  return str;
};

const myJSONParse = (str) => {
  if (regKeyValue.test(str)) {
    const arr = str.match(regKeyValue);
    let result = {};
    arr.map((el) => {
      if (/[{}]/g.test(el)) {
        let key = el.match(/"([^"]+)"/g);
        key = key[0].replace(doubleQuoteRg, "");
        el = el.match(/\{([^}]+)\}/g);
        el = myJSONParse(el.toString());
        result[key] = el;
      } else {
        el = el.split(":");
        let nameProp = el[0].replace(doubleQuoteRg, "");
        let value = el[1]
        value = returnTrueType(value);

        result[nameProp] = value;
      }
    });
    return result;
  } else return "This is not a JSON format";
};


const Obj = JSON.stringify({
  id: "647ceaf3657eade56f8224eb",
  index: 10,
  negativeIndex: -10,
  anEmptyArray: [],
  notEmptyArray: [1, 2, 3, "string", true, null],
  boolean: true,
  nullValue: null,
  nestedObject: {
    nestedString: "Hello World",
    nestedNumber: 42,
    nestedArray: [true, false],
  },
  complexArray: [
    {
      name: "Alice Alice",
      age: 28,
      hobbies: ["Reading", "Painting"],
    },
    {
      name: "Bob Bob",
      age: 32,
      hobbies: ["Gaming", "Cooking"],
    },
  ],
});
console.log(myJSONParse(Obj));

