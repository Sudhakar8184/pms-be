const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users')


// Register user
const register = async (req) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    return {
      _id: user._id,
      username: user.username,
      token,
    }
  } catch (error) {
   throw error
  }
};

// Login user
const login =  async (req) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      return{
        _id: user._id,
        username: user.username,
        token,
      };
    } else {
   throw new Error('Invalid credentials' );
    }
  } catch (error) {
    throw error
  }
};

module.exports = {
    login,
    register
};
