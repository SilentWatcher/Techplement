import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Vikas Sr Vitekari' },
  title: { type: String, default: 'UI Designer and Frontend Developer' },
  bio: { type: String, default: 'I design and build beautiful websites...' },
  aboutParagraph: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  email: { type: String, default: 'vitekarvikas55@gmail.com' },
  quote: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  aboutCards: [
    {
      title: String,
      description: String,
      icon: { type: String, default: '' },
    },
  ],
  techStacks: [
    {
      title: String,
      description: String,
      icon: { type: String, default: '' },
      tier: { type: String, enum: ['primary', 'secondary', 'other'], default: 'primary' },
    },
  ],
})

export default mongoose.model('Profile', profileSchema)
