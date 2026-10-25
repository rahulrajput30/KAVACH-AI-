import 'dotenv/config'
import mongoose from 'mongoose'
import { createApp } from './app.js'

const port = Number(process.env.PORT || 3001)
const mongoUri = process.env.MONGODB_URI

async function start() {
  if (mongoUri && mongoUri !== 'MONGODB_URI_HERE') {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10_000 })
    console.info('MongoDB connection established.')
  } else {
    console.warn('MONGODB_URI is not configured; analysis history will not be persisted.')
  }

  const app = createApp()
  app.listen(port, () => {
    console.info(`Kavach AI API listening on port ${port}.`)
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'GEMINI_API_KEY_HERE') {
      console.warn('GEMINI_API_KEY is not configured; analyzer requests use clearly labeled local demo results.')
    }
  })
}

start().catch((error) => {
  console.error('Could not start Kavach AI API:', error.message)
  process.exitCode = 1
})
