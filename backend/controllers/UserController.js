import User from '../models/User.js';

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getMe: async (req, res) => {
    try {
      const user = await User.findByUUID(req.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getUserByUUID: async (req, res) => {
    try {
      const user = await User.findByUUID(req.params.uuid);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateDisplayName: async (req, res) => {
    try {
      const { userDisplayName } = req.body;
      if (!userDisplayName) return res.status(400).json({ error: 'userDisplayName is required' });
      const user = await User.updateDisplayName(req.userId, userDisplayName);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
export default UserController; 
