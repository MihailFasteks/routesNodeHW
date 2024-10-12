var express = require('express');

var app = express();
var main=express();
var news=express();
var about=express();
var login=express();
var register=express();
var product=express();
var path = require('path');
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/index.html')); 
});

main.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/index.html')); 
});
main.post('/submit', function(req, res){ 
    const email = req.body.eml;
    const password = req.body.pswrd;
    
  
    fs.appendFile('inf.txt', `Email: ${email}, Password: ${password}\n`, function(err) {
        if (err) {
            console.error('Ошибка записи в файл', err);
            return res.status(500).send('Ошибка сервера');
        }
        
      
        res.redirect('/index.html');
    });
});

news.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/news.html')); 
});
about.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/about.html')); 
});
register.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/register.html')); 
});
login.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/login.html')); 
});
product.get('/:productN/price/:price', function(req, res){
    var product = req.params['productN'];
    var price = req.params['price'];
    
    fs.appendFile('products.txt', `product: ${product}, price: ${price}\n`, function(err) {
        if (err) {
            console.error('Ошибка записи в файл', err);
            return res.status(500).send('Ошибка сервера');
        }

        res.sendFile(path.join(__dirname, 'pages/index.html')); 
    });
});
app.use('/main', main);
app.use('/news', news);
app.use('/about', about);
app.use('/register', register);
app.use('/login', login);
app.use('/product', product);

app.listen(8080, function(){
    console.log('Server started on port: 8080');
})