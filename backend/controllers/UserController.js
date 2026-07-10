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

  getMyProfile: async (req, res) => {
    try {
      const { firebaseUid } = req.params;
      const user = await User.findByFirebaseUid(firebaseUid);
      if (!user) return res.status(404).json({ error: 'Profile not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  syncUser: async (req, res) => {
    try {
      const { firebaseUid, username } = req.body;
      if (!firebaseUid || !username) {
        return res.status(400).json({ error: 'firebaseUid and username are required' });
      }
      await User.upsertByFirebaseUid({ firebaseUid, username });
      // Always return the full profile row after sync
      const user = await User.findByFirebaseUid(firebaseUid);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};
export default UserController;

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email, password_hash } = req.body;
    if (!name || !email || !password_hash) {
      return res.status(400).json({ error: 'name, email, and password_hash are required' });
    }
    const user = await User.create({ name, email, password_hash });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email } = req.body;
    const user = await User.update(req.params.id, { name, email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const deleted = await User.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 
