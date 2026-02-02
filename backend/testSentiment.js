/**
 * Dynamic Sentiment Analysis Test Suite
 * Tests based on negative word list scoring
 * Run: node testSentiment.js
 */

import { performCompleteAnalysis } from "./src/utils/sentimentAnalysis.js";

// Negative words list - same as in sentimentAnalysis.js
const negativeWords = [
    "bad", "terrible", "poor", "worst", "horrible", "dirty", "broken", "damaged",
    "issue", "problem", "complaint", "unhappy", "disgusting", "filthy", "unsafe",
    "hazardous", "urgent", "critical", "emergency", "fail", "malfunction",
    "ineffective", "incompetent", "unskilled", "weak", "inadequate", "insufficient",
    "lack", "lacking", "poor teaching", "not teaching", "don't teach", "can't teach",
    "unable", "incapable"
];

const positiveWords = [
    "good", "great", "excellent", "improve", "better", "positive", "happy",
    "satisfied", "resolved", "thanks", "appreciate", "well-maintained", "nice",
    "wonderful", "amazing", "brilliant"
];

// Function to score text based on negative/positive words
function scoreText(text) {
    const lowerText = text.toLowerCase();
    let negativeCount = 0;
    let positiveCount = 0;

    negativeWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        const matches = text.match(regex);
        if (matches) negativeCount += matches.length;
    });

    positiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        const matches = text.match(regex);
        if (matches) positiveCount += matches.length;
    });

    return { negativeCount, positiveCount };
}

// Generate comprehensive test cases
const predefinedTests = [
    { text: "Teachers are not good at teaching", category: "academic", expectedSentiment: "negative" },
    { text: "The teachers are excellent and very helpful", category: "academic", expectedSentiment: "positive" },
    { text: "Poor teaching quality and incompetent teachers", category: "academic", expectedSentiment: "negative" },
    { text: "Not bad, but could be better", category: "academic", expectedSentiment: "neutral" },
    { text: "The hostel is dirty and poorly maintained", category: "hostel", expectedSentiment: "negative" },
    { text: "Great hostel facilities!", category: "hostel", expectedSentiment: "positive" },
    { text: "Teachers don't care about students", category: "academic", expectedSentiment: "negative" },
    { text: "Teachers cannot teach effectively", category: "academic", expectedSentiment: "negative" },
    { text: "This is not good at all", category: "other", expectedSentiment: "negative" },
    { text: "Infrastructure is broken and damaged everywhere", category: "infrastructure", expectedSentiment: "negative" },
];

// Generate dynamic tests from negative words
const dynamicTests = negativeWords.slice(0, 15).map((word, idx) => ({
    text: `The ${word} situation needs immediate attention and resolution`,
    category: "other",
    expectedSentiment: "negative",
    generatedFrom: word
}));

const allTests = [...predefinedTests, ...dynamicTests];

console.log("\n🧪 COMPREHENSIVE SENTIMENT ANALYSIS TEST SUITE");
console.log("═".repeat(100));
console.log(`Total Tests: ${allTests.length} (${predefinedTests.length} Predefined + ${dynamicTests.length} Dynamic)\n`);

let passCount = 0;
let failCount = 0;
const failedTests = [];

allTests.forEach((test, index) => {
    const analysis = performCompleteAnalysis(test.text, test.category);
    const { negativeCount, positiveCount } = scoreText(test.text);

    const passed = analysis.sentiment === test.expectedSentiment;
    const status = passed ? "✅" : "❌";

    if (passed) passCount++;
    else {
        failCount++;
        failedTests.push({
            text: test.text,
            expected: test.expectedSentiment,
            got: analysis.sentiment,
            negWords: negativeCount,
            posWords: positiveCount
        });
    }

    // Print in compact format
    console.log(
        `${status} Test ${String(index + 1).padStart(3, ' ')} | ` +
        `Neg:${String(negativeCount).padStart(2, ' ')} Pos:${String(positiveCount).padStart(2, ' ')} | ` +
        `Expected: ${String(test.expectedSentiment).padEnd(8)} Got: ${String(analysis.sentiment).padEnd(8)} | ` +
        `Priority: ${String(analysis.priority).padEnd(8)} | ` +
        `Conf: ${(analysis.confidence * 100).toFixed(0)}%` +
        (test.generatedFrom ? ` [from: ${test.generatedFrom}]` : "")
    );
});

console.log("\n" + "═".repeat(100));
console.log(`\n📊 TEST RESULTS:`);
console.log(`   ✅ Passed:  ${passCount}/${allTests.length}`);
console.log(`   ❌ Failed:  ${failCount}/${allTests.length}`);
console.log(`   📈 Success Rate: ${Math.round((passCount / allTests.length) * 100)}%`);

if (failedTests.length > 0) {
    console.log(`\n⚠️  FAILED TEST DETAILS:`);
    failedTests.forEach((test, idx) => {
        console.log(`\n   ${idx + 1}. Text: "${test.text}"`);
        console.log(`      Negative Words Found: ${test.negWords} | Positive Words Found: ${test.posWords}`);
        console.log(`      Expected: ${test.expected} | Got: ${test.got}`);
    });
}

console.log("\n" + "═".repeat(100) + "\n");
