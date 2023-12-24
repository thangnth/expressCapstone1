import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class image_collection extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    collect_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    img_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'images',
        key: 'img_id'
      }
    },
    saved_by_userID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    saved_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'image_collection',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "collect_id" },
        ]
      },
      {
        name: "img_id",
        using: "BTREE",
        fields: [
          { name: "img_id" },
        ]
      },
    ]
  });
  }
}
