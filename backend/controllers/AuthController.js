import User from '../models/User.js';

const AuthController = {
  syncUser: async (req, res) => {
    try {
      const { firebaseUid, userName, userDisplayName, profilePhotoUrl } = req.body;
      if (!firebaseUid || !userName) {
        return res.status(400).json({ error: 'firebaseUid and userName are required' });
      }
      const user = await User.upsertByFirebaseUid({ firebaseUid, userName, userDisplayName: userDisplayName ?? null, profilePhotoUrl: profilePhotoUrl ?? null });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AuthController;
