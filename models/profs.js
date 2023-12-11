module.exports = (sequelize, DataTypes) => {
    const Profs = sequelize.define('Profs', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matiere: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Ajoutez d'autres champs selon vos besoins
    });

    return Profs;
};
