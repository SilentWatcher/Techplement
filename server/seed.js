import 'dotenv/config'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import Profile from './models/Profile.js'
import Project from './models/Project.js'

const projects = [
  { title: 'Currency Converter', tag: 'API integration', image: '/assets/projectPreview/currency_converter.png', liveUrl: 'https://silentwatcher-currency-convetor.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Currency_Convetor', bgColor: '#E4A87F', order: 1 },
  { title: 'Upskill', tag: 'Ui Design', image: '/assets/projectPreview/upskill_edu.png', liveUrl: 'https://upskill-edu.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/SilentWatcher-upskill-edu', bgColor: '#B2B6FE', order: 2 },
  { title: 'Weather App', tag: 'API integration and Development', image: '/assets/projectPreview/weather_app.png', liveUrl: 'https://silentwatcher.github.io/Real-Time-Weather-App/', sourceCodeUrl: 'https://github.com/SilentWatcher/Real-Time-Weather-App', bgColor: '#C1E1FF', order: 3 },
  { title: 'Password Generator', tag: 'Development', image: '/assets/projectPreview/password_generator.png', liveUrl: 'https://silentwatcher-password-generator.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Password_Generator', bgColor: '#96ABE4', order: 4 },
  { title: 'Fountain Force', tag: 'Ui Design', image: '/assets/projectPreview/fountain_force.png', liveUrl: 'https://fountain-force.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/FountainForce', bgColor: '#AA978A', order: 5 },
  { title: 'Simon Says', tag: 'Game', image: '/assets/projectPreview/simon_says.png', liveUrl: 'https://silentwatcher.github.io/simon-says/', sourceCodeUrl: 'https://github.com/SilentWatcher/simon-says', bgColor: '#DCC776', order: 6 },
  { title: 'KartFlip', tag: 'E-Commerce', image: '/assets/projectPreview/ecommerce.jpg', liveUrl: 'https://e-commerce-app-with-auth.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/e-commerce-with-auth-and-procted-route', bgColor: '#C5DBE4', comingSoon: true, order: 7 },
  { title: 'Flip Card', tag: 'Game', image: '/assets/projectPreview/avenger.png', liveUrl: 'https://silentwatcher.github.io/AVENGER-flip-card-game/', sourceCodeUrl: 'https://github.com/SilentWatcher/AVENGER-flip-card-game', bgColor: '#ED809B', order: 8 },
  { title: 'Business Card', tag: 'Ui Design', image: '/assets/projectPreview/business_card.png', sourceCodeUrl: 'https://github.com/SilentWatcher/portfolio', bgColor: '#9AC8C8', order: 9 },
  { title: 'Background Changer', tag: 'Ui Design', image: '/assets/projectPreview/background_changer.png', liveUrl: 'https://background-changer-btn-react.netlify.app/', sourceCodeUrl: 'https://github.com/SilentWatcher/Background_Changer', bgColor: '#aeecf7', order: 10 },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected')

  const exists = await Admin.findOne({ email: 'admin@portfolio.com' })
  if (!exists) {
    await Admin.create({ email: 'admin@portfolio.com', password: 'admin123' })
    console.log('Admin created: admin@portfolio.com / admin123')
  }

  const profile = await Profile.findOne()
  if (!profile) {
    await Profile.create({
      name: 'Vikas Sr Vitekari',
      aboutParagraph: 'This is Vikas Shankar Vitekari, 2023 pass out hold Computer science Engineering from Bharati Vidyapeeth\'s Engineering College, Kolhapur, India. Also I am a self taught UI designer and Frontend developer.',
      email: 'vitekarvikas55@gmail.com',
      resumeUrl: 'https://drive.google.com/file/d/1RJnp6a9lYDaeESuzf-SW-1-OwYUfjpfg/view?usp=sharing',
      quote: '"As a coder, I create and learn, each line of code a move on the chessboard of challenges..."',
      socialLinks: { github: 'https://github.com/SilentWatcher', linkedin: 'https://www.linkedin.com/in/vikas-vitekari/', instagram: 'https://www.instagram.com/vitekarivikas/', twitter: 'https://twitter.com/VitekariVikas' },
      aboutCards: [
        { title: 'Designing', description: 'Design posters, thumbnails, web UI using Figma, photoshop, illustrator.', icon: '/assets/aboutIcons/Design.png' },
        { title: 'Development', description: 'Html, css, Tailwind css, Javascript, React.js, Next.js, Node.js, Express.js, Rest api', icon: '/assets/aboutIcons/code.png' },
        { title: 'Chess', description: 'Chess lover, where each move tells a story of strategy and intellect.', icon: '/assets/aboutIcons/chess.png' },
      ],
      techStacks: [
        { title: 'React.js', icon: 'react', description: '', tier: 'primary' },
        { title: 'Next.js', icon: 'nextjs', description: '', tier: 'primary' },
        { title: 'JavaScript', icon: 'javascript', description: '', tier: 'primary' },
        { title: 'HTML5', icon: 'html5', description: '', tier: 'primary' },
        { title: 'CSS3', icon: 'css3', description: '', tier: 'primary' },
        { title: 'Tailwind', icon: 'tailwind', description: '', tier: 'primary' },
        { title: 'Node.js', icon: 'nodejs', description: '', tier: 'primary' },
        { title: 'NestJS', icon: 'nestjs', description: '', tier: 'primary' },
        { title: 'Express', icon: 'express', description: '', tier: 'primary' },
        { title: 'WebSockets', icon: 'websockets', description: '', tier: 'secondary' },
        { title: 'MongoDB', icon: 'mongodb', description: '', tier: 'primary' },
        { title: 'PostgreSQL', icon: 'postgresql', description: '', tier: 'secondary' },
        { title: 'MySQL', icon: 'mysql', description: '', tier: 'secondary' },
        { title: 'Prisma', icon: 'prisma', description: '', tier: 'secondary' },
        { title: 'Redis', icon: 'redis', description: '', tier: 'secondary' },
        { title: 'Redux', icon: 'redux', description: '', tier: 'secondary' },
        { title: 'Zustand', icon: 'zustand', description: '', tier: 'other' },
        { title: 'GraphQL', icon: 'graphql', description: '', tier: 'secondary' },
        { title: 'AWS', icon: 'aws', description: '', tier: 'secondary' },
        { title: 'Docker', icon: 'docker', description: '', tier: 'secondary' },
        { title: 'S3', icon: 's3', description: '', tier: 'other' },
        { title: 'Cloudinary', icon: 'cloudinary', description: '', tier: 'other' },
        { title: 'Git', icon: 'git', description: '', tier: 'secondary' },
        { title: 'GitHub', icon: 'github', description: '', tier: 'secondary' },
        { title: 'React Native', icon: 'reactnative', description: '', tier: 'secondary' },
        { title: 'MERN', icon: 'mern', description: '', tier: 'primary' },
      ],
    })
    console.log('Profile seeded')
  }

  const count = await Project.countDocuments()
  if (count === 0) {
    await Project.insertMany(projects)
    console.log('Projects seeded')
  }

  await mongoose.disconnect()
  console.log('Done')
}

seed().catch(console.error)
