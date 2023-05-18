"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		//Chèn 1 bảng dữ liệu vào db
		return queryInterface.bulkInsert("Users", [
			{
				email: "admin@gmail.com",
				password: "123456", //plaint text  -> hash password
				firstName: "HoiDanit",
				lastName: "Eric",
				address: "USA",
				gender: 1,
				typeRole: "ROLE",
				keyRole: "R1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
