const express = require("express");
const router = express.Router();
const posts = require("../Model/post");

router.use(express.json());

// to add blog
router.post("/add", async (req, res) => {
  try {
    const post = req.body;
    const data = await posts(post).save();
    res.status(200).send({ message: "blog addedd" });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogs", async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const allPosts = await posts.find();
    res.status(200).json(allPosts); // Send the fetched data as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching blogs" });
  }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await posts.findByIdAndDelete(blogId);
      
      if (!deletedBlog) {
        return res.status(404).send({ message: "Blog not found" });
      }
  
      res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error deleting blog" });
    }
  });
  
// To update the blog
router.put("/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get blog ID from the URL
      const updatedData = req.body; // Get updated data from the request body
  
      // Find the blog by ID and update it
      const updatedBlog = await posts.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBlog) {
        return res.status(404).send({ message: "Blog not found" });
      }
  
      res.status(200).send({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error updating blog" });
    }
  });
module.exports = router;
