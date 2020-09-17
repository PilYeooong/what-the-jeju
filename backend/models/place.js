const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Place extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    }, {
      modelName: 'Place',
      tableName: 'Places',
      // timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize
    })
  }

  static associate(db) {
    db.Place.belongsTo(db.User);
    db.Place.belongsTo(db.Category);
    db.Place.hasMany(db.Image);
  }
}