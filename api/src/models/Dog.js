const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING, 
      allowNull: false,
      get() {
        let val = this.getDataValue('height')
        val = Array.from(val.split(','))
        return {"imperial": `${val[0]} - ${val[1]}`, "metric": `${Math.floor(val[0]*2,55)} - ${Math.floor(val[1]*2,55)}`}
      }
    },
    weight: {
      type: DataTypes.STRING, 
      allowNull: false,
      get() {
        let val = this.getDataValue('weight')
        val = Array.from(val.split(','))
        return {"imperial": `${val[0]} - ${val[1]}`, "metric": `${Math.floor(val[0]/2.25)} - ${Math.floor(val[1]/2.25)}`}
      }
    },
    life_span: {
      type: DataTypes.STRING,
      get() {
        let val = this.getDataValue('life_span')
        val = Array.from(val.split(','))
        return `${val[0]} - ${val[1]} years`
      }
    },
    image: {
      type: DataTypes.TEXT,
      isUrl: true,
    }
  });
};
