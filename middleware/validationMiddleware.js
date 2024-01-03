const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const validateUser = async (req, res, next) => {
  const { email, password } = req.headers;

  const hardcodedEmail = 'admin@test.com';
  const hardcodedPassword = '123';
  const hashedPassword = await hashPassword(hardcodedPassword);

  if (!email || !password) {
    return res.status(401).json({
      error: 'Authentication failed. Email and password are required.',
    });
  }

  if (email !== hardcodedEmail) {
    return res
      .status(401)
      .json({ error: 'Authentication failed. Invalid email or password.' });
  }

  try {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      return res
        .status(401)
        .json({ error: 'Authentication failed. Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }

  const user = req.body;

  if (!user || typeof user.name !== 'string' || user.name.trim() === '') {
    return res.status(400).json({
      error:
        'Invalid user data. Name is required and must be a non-empty string.',
    });
  }

  if (
    !user.email ||
    typeof user.email !== 'string' ||
    !isValidEmail(user.email)
  ) {
    return res.status(400).json({
      error:
        'Invalid user data. Email is required and must be a valid email address.',
    });
  }

  if (user.phone && isNaN(parseInt(user.phone))) {
    return res
      .status(400)
      .json({ error: 'Invalid user data. Phone must be a number.' });
  }

  next();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validateUser,
};
