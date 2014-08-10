var test = require('tape');

var schemaHasRef;

test("require module", function (t) {
  schemaHasRef = require('../');
  t.ok(schemaHasRef);
  t.end();
});

test("non schemas throw", function (t) {
  [true, false, null, undefined, [1,2,3], "123", 123]
  .forEach(function (value) {
    t.throws(
      function () { schemaHasRef(value) },
      new Error("schema-is-schema: invalid schema"),
      value + " is not schema and throws error"
    );
  });
  t.end();
});

test("empty schema", function (t) {
  t.equal(schemaHasRef({}), false, "empty schema does not have ref");
  t.end();
});

test("simple schemas", function (t) {
  t.equal(schemaHasRef({
    type: "string",
  }), false, "type string schema does not have ref");
  t.equal(schemaHasRef({
    $ref: "Person",
  }), true, "Person ref schema does have ref");
  t.end();
});

test("array items schemas", function (t) {
  t.equal(schemaHasRef({
    type: "array",
    items: {
      type: "string",
    },
  }), false, "array of type string schema does not have ref");
  t.equal(schemaHasRef({
    type: "array",
    items: {
      $ref: "Person",
    }
  }), true, "array of Person ref schema does have ref");
  t.end();
});

test("allOf/anyOf/oneOf schemas", function (t) {
  t.equal(schemaHasRef({
    type: "string",
    allOf: [{
      minLength: 10,
    }, {
      maxLength: 30,
    }],
  }), false, "anyOf type string or number schema does not have ref");
  t.equal(schemaHasRef({
    oneOf: [{
      $ref: "Person",
    }, {
      $ref: "Group",
    }],
  }), true, "oneOf Person or Group schema does have ref");
  t.end();
});

test("array items allOf/anyOf/oneOf schemas", function (t) {
  t.equal(schemaHasRef({
    type: "array",
    items: {
      oneOf: [{
        $ref: "Resource",
      }, {
        $ref: "Document",
      }],
    },
  }), true, "array of anyOf Person ref schema does have ref");
  t.end();
});
