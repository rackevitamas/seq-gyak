import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite",
	define: {
		timestamps: false,
	},
    logging: false,
});

const Staff = sequelize.define(
	"staff", 
	{
		staff_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
	}
);

// console.log(sequelize.models.students);

Staff.sync()
	.then(() => {
		console.log("Table and model synced successful");    
        Staff.bulkCreate([
            {
                "lastName" : "LOL",
                "firstName" : "KIRÁLY",
                "position" : "NET Admin",
                "salary" : 1489000
            },
            {
                "lastName" : "Brightest",
                "firstName" : "Woman",
                "position" : "Project manager",
                "salary" : 1289000
            },
            {
                "lastName" : "Darkest",
                "firstName" : "Guy",
                "position" : "Cyber Security",
                "salary" : 1288000
            }
        ]);
    })
    .catch((err) => {
		console.log("Error syncing the table and model");
});

Staff.sync({alert: true})
        .then(() => {
            return Staff.findAll();

        })
        .then((data) => {
            data.forEach((element) => {
                console.log(element.toJSON());
            });
            return Staff.findOne({ where: { lastName: 'Brightest' } });
        })
        .then((data) => {
            console.log(data.toJSON());
            return Staff.create({ lastName: 'Freest', firstName: 'Creature', position: 'Sale manager', salary: '4980000' });
        })
        .then(() => {
            return Staff.update({ firstName: 'Girl' }, {
                where: { lastName: 'Brightest' }
            })
        })
        .then(() => {
            Staff.destroy({ where: { lastName: 'LOL' } });
        })
        .catch((err) => {
            console.log(err)
        })