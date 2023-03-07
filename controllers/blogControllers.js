const Blog = require('../models/blog')
//blog_index ,blog details,blog_create_post,blog_delete

const blog_index = (req,res) => { 
    Blog.find().sort({createdAt:-1})
   .then(resp => res.render('index',{title:'All Blogs',blogs:resp}))
   .catch(err => console.log(err.message))
}

const blog_details = (req,res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
    .then(() => { 
       res.redirect('/blogs')
    })
    .catch(err => console.log(err.message ))
}
const get_single_blog = (req,res) => { 
    const id = req.params.id;
    console.log('id in single blog is',id)
    
    Blog.findById(id)
    .then(resp => { 
        // console.log(resp)
        res.render('details',{ blog:resp, title:'Blog details' })
    })
    .catch(err => { 
        res.status(404).render('404',{ title:'Blog not found'})
    })
}

const delete_single_blog = (req,res) => { 
    const id = req.params.id;
    console.log('id in delete part is ' ,id)

    Blog.findByIdAndDelete(id)
    .then(resp => { 
        // console.log(res)
        res.json({
            redirect: '/blogs'
        })
    })
    .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    get_single_blog,
    delete_single_blog
}