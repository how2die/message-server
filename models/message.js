module.exports = (sequelize, type) => {
    return sequelize.define('message', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        content: type.TEXT,
        sent: type.DATE
    });
};
