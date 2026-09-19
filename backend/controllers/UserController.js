import User from '../models/User.js';

// Returns the trimmed text, undefined when the field was omitted, or null when it is unusable
function readText(value, maxLength) {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > maxLength ? null : trimmed;
}

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateProfile: async (req, res) => {
    const body = req.body ?? {};
    if (typeof body.firebaseUid !== 'string' || !body.firebaseUid) {
      return res.status(400).json({ error: 'firebaseUid is required' });
    }

    // Lengths mirror the users table: user_name(25), user_display_name(50), bio(250)
    const userName = readText(body.userName, 25);
    const userDisplayName = readText(body.userDisplayName, 50);
    const bio = readText(body.bio, 250);
    if (userName === null || userDisplayName === null || bio === null) {
      return res.status(400).json({ error: 'A profile field is invalid or too long' });
    }
    if (userName === '') {
      return res.status(400).json({ error: 'Username cannot be empty' });
    }

    try {
      const user = await User.updateProfileByFirebaseUid({
        firebaseUid: body.firebaseUid,
        userName,
        userDisplayName,
        bio,
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'That username is already taken' });
      }
      res.status(500).json({ error: err.message });
    }
  },
};
export default UserController; 
