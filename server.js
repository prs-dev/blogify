const express = require("express")
const cors = require("cors")
const db = require("./Models")
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const {SingleBlog} = db

// const url = process.env.URI

// db.mongoose.connect(url, {useNewUrlParser: true})
// .then(() => {
//     console.log("DB connected successfully!")
// })
// .catch(err => console.log(err))
const connectDB = async () => {
    try {
      const conn = await db.mongoose.connect(process.env.URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

app.post("/new-blog", async (req,res) => {
    let data = {
        title: req.body.title,
        description: req.body.description
    }
    try {
        const blog = new SingleBlog(data)
        const result = await blog.save()
        console.log(result)
        res.send({message: "Success created blog"})
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})
    app.get("/all-blogs", async (req, res) => {
        try {
            const result = await SingleBlog.find({})
            console.log(result)
            res.send(result)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    })

    app.get("/all-blogs/:id", async(req, res) => {
        try {
            const result = await SingleBlog.findById(req.params.id)
            console.log(result)
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    })

    connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("server is running....")
        })
    })


