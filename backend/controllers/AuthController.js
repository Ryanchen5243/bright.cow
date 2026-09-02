import User from '../models/User.js';

const AuthController = {
  syncUser: async (req, res) => {
    try {
      const { userName, userDisplayName, profilePhotoUrl } = req.body;
      const firebaseUid = req.firebaseUid; // set by verifyFirebaseToken middleware
      if (!userName) {
        return res.status(400).json({ error: 'userName is required' });
      }
      const user = await User.upsertByFirebaseUid({ firebaseUid, userName, userDisplayName: userDisplayName ?? null, profilePhotoUrl: profilePhotoUrl ?? null });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AuthController;
