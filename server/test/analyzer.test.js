import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import { createApp } from '../app.js'
import { analyzeMessage, normalizeAnalysis } from '../services/analyzer.js'

describe('analysis normalization', () => {
  it('derives an inverse trust score and status from risk probability', () => {
    const result = normalizeAnalysis({
      scamProbability: 92,
      fraudCategory: 'Banking Fraud',
      threatLevel: 'Critical',
      explanation: 'Urgent account verification with an unverified link.',
      riskIndicators: ['Urgency language'],
      recommendations: ['Contact your bank through its official channel.'],
    })
    assert.equal(result.trustScore, 8)
    assert.equal(result.status, 'Fraudulent')
  })

  it('rejects out-of-contract analyzer values', () => {
    assert.throws(() => normalizeAnalysis({ scamProbability: 'high' }), /invalid score/)
  })

  it('provides an explicit local demo analysis when no API key is configured', async () => {
    const result = await analyzeMessage({
      message: 'Urgent: verify your bank account at https://fake.example',
      messageType: 'SMS',
    })
    assert.equal(result.source, 'demo')
    assert.ok(result.riskIndicators.includes('Urgency language'))
    assert.ok(result.trustScore < 50)
  })

  it('uses Gemini JSON output when an API key is configured', async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (_url, options) => {
      assert.equal(options.headers['x-goog-api-key'], 'test-api-key')
      return {
        ok: true,
        json: async () => ({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  scamProbability: 91,
                  fraudCategory: 'UPI Scam',
                  threatLevel: 'High',
                  explanation: 'The message requests an urgent payment to an unknown recipient.',
                  riskIndicators: ['Urgent payment request'],
                  recommendations: ['Verify the recipient using an official channel.'],
                }),
              }],
            },
          }],
        }),
      }
    }
    try {
      const result = await analyzeMessage({
        message: 'Please send money now.',
        messageType: 'UPI Message',
        apiKey: 'test-api-key',
      })
      assert.equal(result.source, 'gemini')
      assert.equal(result.threatLevel, 'Critical')
      assert.equal(result.trustScore, 9)
    } finally {
      globalThis.fetch = originalFetch
    }
  })
})

describe('analysis API', () => {
  let server
  let baseUrl
  let savedDocuments

  before(async () => {
    savedDocuments = []
    const app = createApp({
      env: { WEB_ORIGIN: 'http://localhost:5173' },
      analysisModel: {
        create: async (document) => {
          savedDocuments.push(document)
          return { id: 'test-analysis-id' }
        },
      },
    })
    server = await new Promise((resolve) => {
      const listener = app.listen(0, '127.0.0.1', () => resolve(listener))
    })
    baseUrl = `http://127.0.0.1:${server.address().port}`
  })

  after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  })

  it('returns demo results and an explicit non-persisted status when services are unconfigured', async () => {
    const response = await fetch(`${baseUrl}/api/analyses`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messageType: 'SMS', message: 'Urgent: verify your account immediately.' }),
    })
    const payload = await response.json()
    assert.equal(response.status, 200)
    assert.equal(payload.analysis.source, 'demo')
    assert.equal(payload.persisted, false)
    assert.equal(savedDocuments.length, 0)
  })

  it('rejects invalid message types', async () => {
    const response = await fetch(`${baseUrl}/api/analyses`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messageType: 'unsupported', message: 'A message' }),
    })
    assert.equal(response.status, 400)
  })

  it('provides a sample response for the demo', async () => {
    const response = await fetch(`${baseUrl}/api/analyses/sample`)
    const payload = await response.json()
    assert.equal(response.status, 200)
    assert.equal(payload.analysis.scamProbability, 92)
    assert.equal(payload.analysis.trustScore, 8)
    assert.equal(payload.analysis.source, 'demo')
  })

  it('persists the analysis when the database is configured', async () => {
    const app = createApp({
      env: { MONGODB_URI: 'mongodb://configured', GEMINI_API_KEY: '' },
      analysisModel: {
        create: async (document) => {
          savedDocuments.push(document)
          return { id: 'saved-analysis-id' }
        },
      },
    })
    const testServer = await new Promise((resolve) => {
      const listener = app.listen(0, '127.0.0.1', () => resolve(listener))
    })
    try {
      const response = await fetch(`http://127.0.0.1:${testServer.address().port}/api/analyses`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messageType: 'Email', message: 'A salary offer for a job.' }),
      })
      const payload = await response.json()
      assert.equal(response.status, 201)
      assert.equal(payload.persisted, true)
      assert.equal(payload.id, 'saved-analysis-id')
      assert.equal(savedDocuments.at(-1).messageType, 'Email')
    } finally {
      await new Promise((resolve, reject) => testServer.close((error) => error ? reject(error) : resolve()))
    }
  })
})
