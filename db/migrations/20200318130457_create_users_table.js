
exports.up = async function (knex) {
  await knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('guid').defaultTo(knex.raw('uuid_generate_v4()'))
    t.string('first_name', 255)
    t.string('last_name', 255)
    t.string('email', 255)
    t.string('phone', 255)
    t.string('password', 255)
    t.unique(['email']);
    t.timestamps(true, true)
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('users');
};