import express from "express";
import {
    analyzeSentimentText,
    analyzeBatchSentiment,
} from "../controllers/sentiment.controller.js";

const router = express.Router();

// Analyze single text
router.post("/analyze", analyzeSentimentText);

// Batch analyze multiple texts
router.post("/analyze/batch", analyzeBatchSentiment);

export default router;
