const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/crudElectron')
.then(()=>{
    console.log('Se ha concetado correctamente');
})
.catch(err => console.log(err));

