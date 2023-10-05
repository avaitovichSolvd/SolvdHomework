# myJSONParse - String Parser

## Description
`myJSONParse` myJSONParse function is implemented to emulate the behavior of a JSON parser, converts a string to an object.
This function uses regular expressions to tokenize and parse input JSON strings.

*Supports processing of numbers, strings, booleans, zero, arrays of any nesting and objects of any nesting.*


## Parameters
- string: The JSON string to parse.

## Return Value
#### Succsess
- object: Parsed JavaScript object, JSON format.
#### Fail
- error: An error message if the input is not in a valid JSON or object format.

## Usage Examples
```javascript
// Valid JSON-like input
const jsonString = '{"key": "value", "key1": {"keyNesting": 42}}';
const parsedObject = myJSONParse(jsonString);
console.log(parsedObject);

// Output: { key: 'value', key1: {keyNesting: 42} }


// Invalid input
const invalidInput = 'Some text';
const errorMessage = myJSONParse(invalidInput);
console.log(errorMessage);

// Output: "This is not a JSON format"
