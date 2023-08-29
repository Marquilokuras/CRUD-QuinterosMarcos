const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const products = require('../data/productsDataBase.json')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited = products.filter((product) => product.category === "visited");
		const inSale = products.filter((product) => product.category === "in-sale")
        res.render('index',{visitados: visited, ofertas: inSale});
	},
	search: (req, res) => {
		const {keywords} = req.query
		const productSearch = products.filter((product) => product.name.toLowerCase().includes(keywords.toLowerCase()))
		res.render('results',{search: productSearch})
	},
};

module.exports = controller;
