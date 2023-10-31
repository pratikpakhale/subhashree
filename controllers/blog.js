const Blog = require('../models/blog');

exports.getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.file ? req.file?.path : null,
    });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.file ? req.file?.path : null,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (
      blog.doctor.toString() === req.payload.id ||
      req.payload.type === 'admin'
    ) {
      await Blog.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: 'Blog deleted successfully',
      });
    }

    throw new Error('Unauthorized');
  } catch (err) {
    next(err);
  }
};

exports.like = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.meta.likes.includes(req.payload.id.toString())) {
      blog.meta.likes = blog.meta.likes.filter(
        like => like.toString() !== req.payload.id.toString()
      );
    } else {
      blog.meta.likes.push(req.payload.id.toString());
    }
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.view = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog.meta.views.includes(req.user._id)) {
      blog.meta.views.push(req.user._id);
    }
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};
