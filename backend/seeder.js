const dotenv = require('dotenv')
const mongodb = require('./db')
const fs = require('fs')
const Blogs = JSON.parse(fs.readFileSync('./data/blogs.json', 'utf-8'))
const blogModel = require('./models/blogModel')
const cloudinary = require('cloudinary')
dotenv.config()
mongodb();

//Setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageToCloudinary = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'blogapp',
        });

        let imageLinks = { "public_id": result.public_id, "url": result.secure_url }
        return imageLinks; // Return the uploaded image's
    } catch (error) {
        console.error(`Error uploading image: ${imagePath}`, error);
        throw error;
    }
};

const seedBlogs = async () => {
    try {
        for (const blog of Blogs) {

            // Upload each image to Cloudinary
            const uploadedImage = await uploadImageToCloudinary(blog.image);
            blog.image = uploadedImage;

            // Save the product to the database
            const newBlog = new blogModel(blog);
            await newBlog.save();
        }

        console.log('All products added successfully!');

        process.exit()
    }
    catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedBlogs()

