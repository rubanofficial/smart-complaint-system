/**
 * Sentiment Analysis API Controller
 * Provides endpoints for analyzing text sentiment and generating insights
 */

import { performCompleteAnalysis } from "../utils/sentimentAnalysis.js";

// Analyze sentiment for any text
export const analyzeSentimentText = async (req, res) => {
    try {
        const { text, category } = req.body;

        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({
                message: "Text is required and must be a non-empty string",
            });
        }

        const analysis = performCompleteAnalysis(text, category);

        res.json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error("Sentiment analysis error:", error);
        res.status(500).json({ message: "Failed to analyze sentiment" });
    }
};

// Batch analyze multiple texts
export const analyzeBatchSentiment = async (req, res) => {
    try {
        const { texts } = req.body;

        if (!Array.isArray(texts) || texts.length === 0) {
            return res.status(400).json({
                message: "Texts array is required and must not be empty",
            });
        }

        if (texts.length > 100) {
            return res.status(400).json({
                message: "Maximum 100 texts allowed per request",
            });
        }

        const results = texts.map((item) => ({
            text: item.text,
            category: item.category || null,
            analysis: performCompleteAnalysis(item.text, item.category),
        }));

        res.json({
            success: true,
            count: results.length,
            results,
        });
    } catch (error) {
        console.error("Batch sentiment analysis error:", error);
        res.status(500).json({ message: "Failed to analyze batch sentiment" });
    }
};
