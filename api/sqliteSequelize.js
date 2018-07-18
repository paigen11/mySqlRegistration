import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelizeSqlite = new Sequelize('usersSqlite', 'test', 'test1234', {
    dialect: 'sqlite',
    storage: 'data/db/storage.sqlite'
});

const UserSqlite = UserModel(sequelizeSqlite, Sequelize);

sequelizeSqlite.sync()
    .then(() => {
        console.log(`Users db and user table have been created with Sqlite`)
    });

module.exports = UserSqlite;