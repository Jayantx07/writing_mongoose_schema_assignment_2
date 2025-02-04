const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    content: {
        type: String,
        required: true,
        minlength: 50
    },
    author: String,
    tags: [String],
    category: {
        type: String,
        default: 'General'
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date

    // Add comments as subdocuments
    // comments: [CommentSchema]
});

module.exports = mongoose.model('BlogPost', blogPostSchema);

// Sample code for the comment schema:

const commentSchema = new mongoose.Schema({
    username: String,
    message: {
        type: String,
        required: true
    },
    commentedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = commentSchema;

// Sample usage:

const BlogPost = require('./schema');

// Create a new blog post

const newBlogPost = new BlogPost({
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content.',
    author: 'user1'
});

newBlogPost.save()
    .then(result => {
        console.log('Blog post created:', result);
    })
    .catch(error => {
        console.error('Error creating blog post:', error);
    });
    
// Retrieve a blog post

BlogPost.findById('your_blog_post_id')
    .then(result => {
        console.log('Blog post found:', result);
    })
    .catch(error => {
        console.error('Error retrieving blog post:', error);
    });
    
// Update a blog post

BlogPost.findByIdAndUpdate('your_blog_post_id', {
    title: 'Updated Blog Post',
    content: 'This is the updated blog post content.'
}, { new: true })
    .then(result => {
        console.log('Blog post updated:', result);
    })
    .catch(error => {
        console.error('Error updating blog post:', error);
    });
    
// Delete a blog post

BlogPost.findByIdAndDelete('your_blog_post_id')
    .then(result => {
        console.log('Blog post deleted:', result);
    })
    .catch(error => {
        console.error('Error deleting blog post:', error);
    });
    
// Add a comment to a blog post

BlogPost.findById('your_blog_post_id')
    .updateOne({
        $push: {
            comments: {
                username: 'user2',
                message: 'This is a sample comment.'
            }
        }
    })
    .then(result => {
        console.log('Comment added to blog post:', result);
    })
    .catch(error => {
        console.error('Error adding comment to blog post:', error);
    });
    
// Retrieve comments for a blog post

BlogPost.findById('your_blog_post_id')
    .populate('comments')
    .exec()
    .then(result => {
        console.log('Blog post with comments:', result);
    })
    .catch(error => {
        console.error('Error retrieving blog post with comments:', error);
    });
    
// Like a blog post

BlogPost.findByIdAndUpdate('your_blog_post_id', {
    $push: {
        likes: 'user3'
    }
}, { new: true })
    .then(result => {
        console.log('Blog post liked:', result);
    })
    .catch(error => {
        console.error('Error liking blog post:', error);
    });
    
// Unlike a blog post

BlogPost.findByIdAndUpdate('your_blog_post_id', {
    $pull: {
        likes: 'user3'
    }
}, { new: true })
    .then(result => {
        console.log('Blog post unliked:', result);
    })
    .catch(error => {
        console.error('Error unliking blog post:', error);
    });