var isSchema = require('schema-is-schema');

module.exports = function schemaHasRef (schema) {
  // if no schema, then not relation
  if (isSchema(schema) !== true) return null;

  // if array of items, recurse into items schema
  if (schema.type === 'array' && schema.items) {
    return schemaHasRef(schema.items);
  }
  // if schema composed of many schemas, recurse into each and combine with OR
  if (schema.allOf || schema.anyOf || schema.oneOf) {
    return (schema.allOf || schema.anyOf || schema.oneOf).some(schemaHasRef);
  }

  // if has reference, it is relation!
  if (schema.$ref) {
    return true;
  }
  // must not be relation
  return false;
};
