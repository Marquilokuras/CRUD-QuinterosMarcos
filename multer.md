## Multer

1. Instalar multer en nuestro proyecto

``````
npm install multer
``````

---------------------

2. Multer lo vamos  a implementar en donde lo vamos a utilizar -> "Router"

a.  En nuestros formularios agregar el  atributo enctype="multipart/form-data". Esto nos va a permitir enviar archivos en el formulario
EJ.
``````
<form action="/products" method="post" enctype="multipart/form-data">
``````

b. Requerir el  módulo y guardarlo en una variable

``````
const multer  = require('multer');
``````

c. En el archivo de la ruta: Vamos a  definir nuestro "diskstorage"  que nos va a permitir definir dónde vamos a guardar  los archivos que se  carguen en el formulario y con qué  nombre.
``````
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..','..','public', 'images', 'products'))
    },

    filename: (req, file, cb) =>{
        const newFileName = 'AR' + Date.now() + path.extname(file.originalname) ;
        
        cb(null, newFileName)
    }
})
``````

d. Vamos a  decirle  a  multer que vamos  a  usar la confirguración anterior como disco de almacenamiento de archivos.
Para  eso   vamos  a   guardar en una variable la  invocación de multer que va a recibir como  parámetro la variable donde guardamos nuestro diskStorage

``````
const upload = multer({ storage });
``````

e.  Vamos a agregar un parámetro a la ruta correspondiente (con método  post),entre el nombre de la ruta y el controlador que la procesa

``````
 upload.single('image')
```````

 EJEMPLO:
 ```````
 router.post('/create', upload.single('image'), productsController.store); 
 ``````````

 El  método single de la  variable  upload que creamos anteriormente,  va  a  recibir como parámetro el  valor  del  atributo "name=" del  - input type="file" -  del  formulario

 EJEMPLO
 ``````
 <input type="file" id="image" name="image" accept=".jpg, .png, .jpeg">
 ``````
 ------------------------

 3. En nuestro archivo controller: tenemos el atributo file en req para  acceder al  archivo que se guardó

 EJEMPLO
 ``````
 image: req.file?.filename || "default-image.png"
 ``````