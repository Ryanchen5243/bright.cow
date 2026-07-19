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
      const { firebaseUid, userName, userDisplayName, profilePhotoUrl } = req.body;
      if (!firebaseUid || !userName) {
        return res.status(400).json({ error: 'firebaseUid and userName are required' });
      }
      await User.upsertByFirebaseUid({ firebaseUid, userName, userDisplayName: userDisplayName ?? null, profilePhotoUrl: profilePhotoUrl ?? null });
      // Always return the full profile row after sync
      const user = await User.findByFirebaseUid(firebaseUid);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};
export default UserController; 
