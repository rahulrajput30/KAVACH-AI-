import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Analysis } from './models/Analysis.js'
import { ANALYSIS_SAMPLE, MESSAGE_TYPES, analyzeMessage } from './services/analyzer.js'

export function createApp({ env = process.env, analysisModel = Analysis } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({
    origin: env.WEB_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }))
  app.use(express.json({ limit: '24kb', strict: true }))

  const analysisLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.get('/api/analyses/sample', (_request, response) => {
    response.json({
      analysis: {
        ...ANALYSIS_SAMPLE,
        trustScore: 100 - ANALYSIS_SAMPLE.scamProbability,
        status: 'Fraudulent',
        source: 'demo',
      },
      persisted: false,
    })
  })

  app.post('/api/analyses', analysisLimiter, async (request, response, next) => {
    try {
      const { message, messageType } = request.body ?? {}
      if (typeof message !== 'string' || !message.trim()) {
        return response.status(400).json({ error: 'Paste a message before analyzing it.' })
      }
      if (message.trim().length > 12000) {
        return response.status(413).json({ error: 'Messages must be 12,000 characters or fewer.' })
      }
      if (!MESSAGE_TYPES.includes(messageType)) {
        return response.status(400).json({ error: 'Choose a supported message type.' })
      }

      const analysis = await analyzeMessage({
        message: message.trim(),
        messageType,
        apiKey: configuredValue(env.GEMINI_API_KEY, 'GEMINI_API_KEY_HERE'),
        model: env.GEMINI_MODEL || 'gemini-2.5-flash',
      })
      let persisted = false
      if (configuredValue(env.MONGODB_URI, 'MONGODB_URI_HERE')) {
        let saved
        try {
          saved = await analysisModel.create({
            messageType,
            message: message.trim(),
            ...analysis,
          })
        } catch (error) {
          console.error('Could not persist analysis:', error?.name || 'Unknown error')
          return response.status(503).json({ error: 'The analysis completed, but could not be saved. Please try again.' })
        }
        persisted = true
        return response.status(201).json({ analysis, persisted, id: saved.id })
      }
      return response.status(200).json({ analysis, persisted })
    } catch (error) {
      next(error)
    }
  })

  app.use((error, _request, response, _next) => {
    if (error?.type === 'entity.too.large') {
      return response.status(413).json({ error: 'Request is too large. Keep messages under 12,000 characters.' })
    }
    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({ error: 'Request body must be valid JSON.' })
    }
    if (error?.name === 'ValidationError') {
      return response.status(400).json({ error: 'The analysis result could not be saved.' })
    }
    console.error('API request failed:', error?.name || 'Unknown error')
    const message = error instanceof Error ? error.message : 'Unexpected server error.'
    return response.status(502).json({ error: message })
  })

  return app
}

function configuredValue(value, placeholder) {
  return typeof value === 'string' && value.trim() !== '' && value.trim() !== placeholder
}
