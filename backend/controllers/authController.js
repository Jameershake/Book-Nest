import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'Email already in use' })
  }
  const hashed = await bcrypt.hash(password, 12)
  const user = await User.create({ name, email, password: hashed })
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.status(201).json({ user: { id: user._id, name, email }, token })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: { id: user._id, name: user.name, email }, token })
}
