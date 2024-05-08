import DataTypes from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize) => {
  // defino el modelo
sequelize.define('group', {
    // ID: {
    //     type: DataTypes.INTEGER,
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
};