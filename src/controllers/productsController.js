const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
 */

const products = require('../data/productsDataBase.json')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{productList: products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const { id } = req.params;
		const findProduct = products.find((prod) => prod.id === id);
		res.render('detail',{ product : findProduct })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newProduct = {
			id:`${products.length + 1}`,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png"
		}

		products.push(newProduct);
		fs.writeFileSync(productsFilePath,JSON.stringify(products));
		res.redirect('/products'); 
	},

	// Update - Form to edit
	edit: (req, res) => {
		const { id } = req.params;
		const productFind = products.find((prod) => prod.id === id);
		res.render('product-edit-form',{productToEdit: productFind})
	},

	// Update - Method to update
	update: (req, res) => {
		const { id } = req.params;
		const productFind = products.find((prod) => prod.id === id);
		const indexProduct = products.indexOf(productFind);

		products[indexProduct] =  {
			id: productFind.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: productFind.image
		}
		
		fs.writeFileSync(productsFilePath,JSON.stringify(products));
		res.redirect('/products'); 
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;