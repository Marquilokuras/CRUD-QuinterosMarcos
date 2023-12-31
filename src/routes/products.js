// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/** MULTER config **/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathImage = path.join(__dirname, '..','..','public', 'images', 'products')
        cb(null, pathImage)
    },

    filename: (req, file, cb) =>{
        const newFileName = 'img-' + Date.now() + path.extname(file.originalname) ;
        
        cb(null, newFileName)
    }
})

const upload = multer({ storage });

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('image') , productsController.store);  

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 
 
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 
 

module.exports = router;
