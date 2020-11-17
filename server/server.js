/** Express */
const express = require('express');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');


const app = express();
const server = require('http').Server(app);

//app.use(expressValidator());

/** Routes */
const authRoutes = require('./routes/auth');
/** Routes Definitions */
//capp.use('/api/auth', authRoutes);

app.get('/hi',(req,res)=>{
    debugger;
    res.send('hixxx');
})
app.get('/', (req, res) => {
    res.send('hi');
  });

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server running at port 8000...');
       // logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}
//module.exports = { app };