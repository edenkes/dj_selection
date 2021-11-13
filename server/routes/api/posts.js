const express = require("express")
const mongodb = require("mongodb")


const router = express.Router()

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray())
})

// Add post
router.post("/", async (req, res) => {
    const posts = await loadPostsCollections()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })

    res.status(201).send()
})

// Delete Post
router.delete("/:id", async (req, res) => {
    const posts = await loadPostsCollections()
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadPostsCollections(url) {
    const client = await mongodb.MongoClient.connect("mongodb+srv://abc123:Aa123456@cluster0.3fovh.mongodb.net/vue_express?retryWrites=true&w=majority", {useNewUrlParser: true});

    // return client.db("sample_airbnb").collection("listingsAndReviews")
    return client.db("vue_express").collection("posts")
}

module.exports = router