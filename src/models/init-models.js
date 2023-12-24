import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _image_collection from  "./image_collection.js";
import _image_comment from  "./image_comment.js";
import _images from  "./images.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const image_collection = _image_collection.init(sequelize, DataTypes);
  const image_comment = _image_comment.init(sequelize, DataTypes);
  const images = _images.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  image_collection.belongsTo(images, { as: "img", foreignKey: "img_id"});
  images.hasMany(image_collection, { as: "image_collections", foreignKey: "img_id"});
  image_comment.belongsTo(images, { as: "img", foreignKey: "img_id"});
  images.hasMany(image_comment, { as: "image_comments", foreignKey: "img_id"});
  image_comment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(image_comment, { as: "image_comments", foreignKey: "user_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});

  return {
    image_collection,
    image_comment,
    images,
    users,
  };
}
