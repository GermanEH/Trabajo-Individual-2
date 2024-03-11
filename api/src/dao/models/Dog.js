import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter your name"
        }
      },
      validate: {
        customValidator(value) {
          if(/[0-9.-/]/.test(value))
          return "name must be a valid string"
        }
      }
    },
    height: {
      type: DataTypes.STRING, 
      allowNull: false,
      get() {
        let val = this.getDataValue('height')
        val = Array.from(val.split(','))
        return {"imperial": `${val[0]} - ${val[1]}`, "metric": `${Math.floor(val[0]*2,55)} - ${Math.floor(val[1]*2,55)}`}
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) < 1 || parseInt(value[0]) > 1000) {
          throw new Error('Minimum must be between 1 and 1000!');
        }
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[1]) < 1 || parseInt(value[1]) > 1000) {
          throw new Error('Maximum must be between 1 and 1000!');
        }
      },
      isGreaterThanMaximun(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) > parseInt(value[1])) {
          throw new Error('Minimum must be equal or lower than maximum');
        }
      },
      isLowerThanMinimun(value) {
        if (parseInt(value[0]) < parseInt(value[1])) {
          throw new Error('Maximum must be equal or higher than minimum');
        }
      }
    },
    weight: {
      type: DataTypes.STRING, 
      allowNull: false,
      get() {
        let val = this.getDataValue('weight')
        val = Array.from(val.split(','))
        return {"imperial": `${val[0]} - ${val[1]}`, "metric": `${Math.floor(val[0]/2.25)} - ${Math.floor(val[1]/2.25)}`}
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) < 1 || parseInt(value[0]) > 1000) {
          throw new Error('Minimum must be between 1 and 1000!');
        }
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[1]) < 1 || parseInt(value[1]) > 1000) {
          throw new Error('Maximum must be between 1 and 1000!');
        }
      },
      isGreaterThanMaximun(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) > parseInt(value[1])) {
          throw new Error('Minimum must be equal or lower than maximum');
        }
      },
      isLowerThanMinimun(value) {
        if (parseInt(value[0]) < parseInt(value[1])) {
          throw new Error('Maximum must be equal or higher than minimum');
        }
      }
    },
    life_span: {
      type: DataTypes.STRING,
      get() {
        let val = this.getDataValue('life_span')
        val = Array.from(val.split(','))
        return `${val[0]} - ${val[1]} years`
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) < 1 || parseInt(value[0]) > 50) {
          throw new Error('Minimum must be between 1 and 50!');
        }
      },
      isInRange(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[1]) < 1 || parseInt(value[1]) > 50) {
          throw new Error('Maximum must be between 1 and 50!');
        }
      },
      isGreaterThanMaximun(value) {
        value = Array.from(value.split(','))
        if (parseInt(value[0]) > parseInt(value[1])) {
          throw new Error('Minimum must be equal or lower than maximum');
        }
      },
      isLowerThanMinimun(value) {
        if (parseInt(value[0]) < parseInt(value[1])) {
          throw new Error('Maximum must be equal or higher than minimum');
        }
      }
    },
    image: {
      type: DataTypes.TEXT,
      isUrl: true,
    },
    temperament: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    apiId: {
      type: DataTypes.INTEGER
    }
  });
};
