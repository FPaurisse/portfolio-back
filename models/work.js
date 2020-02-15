'use strict';
module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define('Work', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    context: DataTypes.STRING,
    tools: DataTypes.STRING,
    categories: DataTypes.STRING
  }, {});
  Work.associate = function(models) {
    // associations can be defined here
  };
  return Work;
};