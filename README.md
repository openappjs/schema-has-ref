# schema-has-ref

returns whether or not a [json-schema](http://json-schema.org) has a $ref.

supports

- [ ] properties
- [ ] additionalProperties
- [ ] patternProperties
- [x] allOf
- [x] anyOf
- [x] oneOf
- [ ] not
- [ ] definitions
- [x] items schema
- [ ] items array of schemas
- [ ] additionalItems

pull requests welcome!

## install

with [npm](http://npmjs.org), do:

```
npm i --save schema-has-ref
```

## example

```
var schemaHasRef = require('schema-has-ref');
var _ = require('lodash');

var personSchema = {
  id: "Person",
  properties: {
    name: {
      type: "string",
    },
    resources: {
      type: 'array',
      items: {
        $ref: "Resource",
      },
    },
  },
};

var relations = _.omit(personSchema.properties, function (propSchema, propName) {
  return !schemaHasRef(propSchema);
});

console.log(JSON.stringify(relations, null, 2));
// {
//   "resources": {
//     "type": 'array',
//     "items": {
//       "$ref": "Resource"
//     }
//   }
// }
```

## license

AGPLv3
