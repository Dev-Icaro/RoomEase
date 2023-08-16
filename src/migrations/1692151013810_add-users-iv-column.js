/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("users", {
    iv: {
      type: "VARCHAR(100)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("users", ["iv"]);
};
