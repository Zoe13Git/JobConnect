const User = require('./userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role
      });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
  };