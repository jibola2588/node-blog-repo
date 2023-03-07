const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// register view engine 
app.set('view engine','ejs')

const uri = 'mongodb+srv://jheebolar:LrbxtcsnpAbb7Nz5@blogs.1jefpxl.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect( 
    uri,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then((res) => {
    console.log('connected successfully.....');
    app.listen(3000)
})
.catch((err) => console.log('connection failed',err.message))


// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(logger('tiny'))

//routes
app.get('/',(req,res) => { 
   res.redirect('/blogs')
})

app.get('/create',(req,res) => { 
    res.render('create',{title : 'create a new blog'})
})

//blog routes
app.use('/blogs', blogRoutes)

app.get('/about',(req,res) => { 
    res.render('about',{title : 'About'})
})

app.use(express.static( __dirname + "/public"))

app.use((req,res) => { 
   res.status(404).render('404',{title : '404'})
})

