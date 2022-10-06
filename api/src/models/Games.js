const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('games', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type:DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey:true,
      unique:true,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    lanzamiento: {
      type:DataTypes.DATEONLY,
      allowNull:false,
    },
    rating: {
      type:DataTypes.REAL,
      allowNull:false
    },
    plataformas:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    imagen:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },{
    timestamps:true,
    createdAt:false,
    updatedAt:false,
  });
};
