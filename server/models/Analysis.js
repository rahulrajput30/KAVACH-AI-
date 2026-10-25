import mongoose from 'mongoose'
import { MESSAGE_TYPES } from '../services/analyzer.js'

const analysisSchema = new mongoose.Schema({
  messageType: { type: String, enum: MESSAGE_TYPES, required: true },
  message: { type: String, required: true, maxlength: 12000 },
  scamProbability: { type: Number, required: true, min: 0, max: 100 },
  trustScore: { type: Number, required: true, min: 0, max: 100 },
  fraudCategory: { type: String, required: true },
  threatLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  status: { type: String, enum: ['Low risk', 'Suspicious', 'Fraudulent'], required: true },
  explanation: { type: String, required: true, maxlength: 1500 },
  riskIndicators: { type: [String], required: true },
  recommendations: { type: [String], required: true },
  source: { type: String, enum: ['gemini', 'demo'], required: true },
}, { timestamps: true, versionKey: false })

export const Analysis = mongoose.models.Analysis ?? mongoose.model('Analysis', analysisSchema)
