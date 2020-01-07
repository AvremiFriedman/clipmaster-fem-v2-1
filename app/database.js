import 'sqlite3';

import { remote } from 'electron';
import path from 'path';
import knex from 'knex';

const { app } = remote;

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(app.getPath('userData'), 'clipmaster-clippings.sqlite'),
  },
  useNullAsDefault: true,
});

// eslint-disable-next-line consistent-return
database.schema.hasTable('clippings').then((exists) => {
  if (!exists) {
    return database.schema.createTable('clippings', (table) => {
      table.increments('id').primary();
      table.text('content');
    });
  }
});

export default database;
