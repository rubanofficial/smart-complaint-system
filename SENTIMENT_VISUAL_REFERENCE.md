# Sentiment Analysis - Visual Reference & Examples

## 📊 Sentiment Analysis System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   User Submits Complaint                    │
│                (ComplaintForm / API Call)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              POST /api/complaints                           │
│            (Backend: app.js routes)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│       complaint.controller.js                               │
│       createComplaint() function                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│    sentimentAnalysis.js                                     │
│    performCompleteAnalysis()                                │
│                                                              │
│    ├─ analyzeSentiment()        → Emotional tone            │
│    ├─ extractKeywords()         → Top terms                 │
│    ├─ analyzePriority()         → Urgency level             │
│    ├─ detectFlags()             → Alert flags               │
│    └─ categorizeComplaint()     → Category classification   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│            Returns Analysis Object                          │
│                                                              │
│  {                                                           │
│    priority: "high",                                        │
│    sentiment: "negative",                                   │
│    keywords: [...],                                         │
│    category: "hostel",                                      │
│    flags: { safety: true, ... },                           │
│    confidence: 0.92                                         │
│  }                                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     Stored in MongoDB                                       │
│     Complaint.mlOutput = analysis                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     Response to Frontend                                    │
│     { success: true, complaintId, analysis }               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     Admin Views Complaint Detail                            │
│     ComplaintDetailPage.jsx                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│          AI Analysis Card Rendered                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ AI Analysis & Insights                       ⚡    │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ Priority: HIGH          Confidence: 92%            │  │
│  │ [Alert icon] Critical   [Progress bar filled]      │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ Sentiment: NEGATIVE     Category: Hostel           │  │
│  │ [Frown icon] Negative   [Badge]                    │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ Alert Flags:                                        │  │
│  │ [🚨 Urgent] [🛡️ Safety Related]                    │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ Extracted Keywords:                                 │  │
│  │ [hostel] [room] [broken] [ventilation] [unsafe]   │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 UI Component Display

### AI Analysis Section - Detailed View

```
┌────────────────────────────────────────────────────────────────┐
│                   AI Analysis & Insights                   ⚡  │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Priority     │  │ Confidence   │  │ Sentiment    │         │
│  │ Level        │  │              │  │              │         │
│  │              │  │              │  │              │         │
│  │  ⚠️ HIGH     │  │  92%         │  │  😞 Negative │         │
│  │              │  │ ▓▓▓▓▓▓▓▓░░░░ │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐                                              │
│  │ Category     │                                              │
│  │              │                                              │
│  │ Hostel       │                                              │
│  │              │                                              │
│  └──────────────┘                                              │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│  Alert Flags:                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  🚨 Urgent   │  │ 🛡️ Safety    │  │ ⚠️ Duplicate │         │
│  │   Related    │  │   Related    │  │   (if any)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│  Extracted Keywords:                                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ [hostel] [room] [broken] [ventilation] [maintenance]    │ │
│  │ [unsafe] [poor] [issue] [facility]                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 📈 Sentiment Scale Visualization

```
Very Negative ←────────────────────────────→ Very Positive
    -1.0        -0.5         0.0        +0.5        +1.0
     │           │            │           │           │
     │           │            │           │           │
   😠           😞            😐          🙂           😊
  Angry      Negative       Neutral     Positive    Happy

Example Scores:
─────────────────────────────
Text: "Terrible conditions"        Score: -0.85
Text: "Poor service"               Score: -0.70
Text: "Average quality"            Score: -0.10
Text: "Nice improvement"           Score: +0.65
Text: "Excellent facilities"       Score: +0.90
```

---

## 🎯 Priority Level Hierarchy

```
PRIORITY LEVEL      COLOR       ICON          URGENCY
────────────────────────────────────────────────────────
Critical            🔴 Red      ⚠️ Alert       IMMEDIATE
High                🟠 Orange   ⚠️ Alert       SOON
Medium              🟡 Yellow   ℹ️ Info        NORMAL
Low                 🟢 Green    ✓  Check       LATER

Critical Examples:
  • Electrical hazard
  • Fire danger
  • Assault/violence
  • Life-threatening situation

High Examples:
  • Broken infrastructure
  • Unsafe conditions
  • Severe discomfort

Medium Examples:
  • Regular complaints
  • Standard maintenance issues
  • General feedback

Low Examples:
  • Suggestions
  • Minor inconveniences
  • Compliments
```

---

## 🏷️ Category Detection Examples

```
┌───────────────────────────────────────────────────────┐
│ COMPLAINT TEXT                    → CATEGORY          │
├───────────────────────────────────────────────────────┤
│ "The exam was unfair..."          → ACADEMIC          │
│ "Hostel room is dirty..."         → HOSTEL            │
│ "Broken pipe in building..."      → INFRASTRUCTURE    │
│ "Safety issue with wiring..."     → SAFETY            │
│ "Being harassed by roommate..."   → HARASSMENT        │
│ "Fee calculation is wrong..."     → FINANCIAL         │
│ "Bus is always late..."           → TRANSPORT         │
│ "Library books are missing..."    → LIBRARY           │
│ "Certificate process too slow..." → ADMINISTRATIVE    │
│ "General feedback..."             → OTHER             │
└───────────────────────────────────────────────────────┘
```

---

## 🔍 Keyword Extraction Process

```
Input Text:
"The hostel room has broken ventilation and is very uncomfortable!"

Step 1: Tokenization
────────────────────────────────────────────────────────
The | hostel | room | has | broken | ventilation | and | is | very | uncomfortable

Step 2: Remove Stop Words (the, and, is, has, etc.)
────────────────────────────────────────────────────────
hostel | room | broken | ventilation | very | uncomfortable

Step 3: Count Frequency & Relevance
────────────────────────────────────────────────────────
hostel ........................... (frequency: 1, relevance: 5)
room   ........................... (frequency: 1, relevance: 4)
broken ........................... (frequency: 1, relevance: 4)
ventilation ...................... (frequency: 1, relevance: 5)
uncomfortable .................... (frequency: 1, relevance: 3)

Step 4: Sort & Select Top 5
────────────────────────────────────────────────────────
1. ventilation (score: 5)
2. hostel (score: 5)
3. room (score: 4)
4. broken (score: 4)
5. uncomfortable (score: 3)

Output Keywords:
[ventilation, hostel, room, broken, uncomfortable]
```

---

## 🚩 Flag Detection Logic

```
                        Complaint Text
                             │
                 ┌───────────┼───────────┐
                 │           │           │
                 ↓           ↓           ↓
           Safety Check  Urgent Check  Duplicate Check
                 │           │           │
              SAFETY       URGENT      DUPLICATE
             Keywords     Keywords    Keywords
              ├─Safety    ├─Emergency  ├─Duplicate
              ├─Danger    ├─Critical   ├─Same
              ├─Hazard    ├─Immediate  ├─Already
              ├─Unsafe    ├─Urgent     ├─Previous
              ├─Injury    ├─ASAP       ├─Similar
              └─...       └─...        └─...
                 │           │           │
                 ↓           ↓           ↓
              Detected?   Detected?   Detected?
             YES   NO    YES   NO    YES   NO
              │     │     │     │     │     │
              T     F     T     F     T     F

Final Flags:
{
  safety: Boolean,      // T/F from safety check
  urgent: Boolean,      // T/F from urgent check
  duplicate: Boolean    // T/F from duplicate check
}
```

---

## 💾 Data Storage Example

### MongoDB Document Structure

```json
{
  "_id": ObjectId("5e7f..."),
  "complaintId": "GRV-1V2D3E4F-ABCD",
  "isAnonymous": true,
  "category": "hostel",
  "complaintText": "The hostel room has broken ventilation...",
  "status": "submitted",
  
  "mlOutput": {
    "category": "hostel",
    "priority": "high",
    "sentiment": "negative",
    "sentimentScore": -0.8,
    "keywords": [
      "ventilation",
      "hostel",
      "room",
      "broken",
      "uncomfortable"
    ],
    "flags": {
      "safety": false,
      "urgent": false,
      "duplicate": false
    },
    "confidence": 0.92
  },
  
  "createdAt": "2026-02-02T10:30:00Z",
  "updatedAt": "2026-02-02T10:30:00Z"
}
```

---

## 🧪 Test Cases & Expected Outputs

### Test 1: High Priority Safety Issue
```javascript
Input:
{
  text: "There is a live electrical wire hanging in the hostel room!",
  category: "infrastructure"
}

Expected Output:
{
  priority: "critical",
  sentiment: "negative",
  sentimentScore: -0.95,
  keywords: ["electrical", "wire", "hostel", "room", "danger"],
  category: "infrastructure",
  flags: {
    safety: true,
    urgent: true,
    duplicate: false
  },
  confidence: 0.98
}

Reason: Critical keywords detected (electrical, danger)
```

### Test 2: Academic Complaint
```javascript
Input:
{
  text: "The exam results were delayed. Still no clarity on marks.",
  category: "academic"
}

Expected Output:
{
  priority: "medium",
  sentiment: "negative",
  sentimentScore: -0.55,
  keywords: ["exam", "results", "delayed", "marks", "clarity"],
  category: "academic",
  flags: {
    safety: false,
    urgent: false,
    duplicate: false
  },
  confidence: 0.85
}

Reason: Negative but not urgent/safety related
```

### Test 3: Positive Feedback
```javascript
Input:
{
  text: "Great job on the new library renovation! Really appreciate it.",
  category: "library"
}

Expected Output:
{
  priority: "low",
  sentiment: "positive",
  sentimentScore: 0.85,
  keywords: ["library", "renovation", "appreciate", "great"],
  category: "library",
  flags: {
    safety: false,
    urgent: false,
    duplicate: false
  },
  confidence: 0.89
}

Reason: Positive keywords dominate
```

---

## 🎯 Integration Points

### 1. Complaint Creation
```javascript
POST /api/complaints
├─ Input: complaint text
├─ Analysis: performCompleteAnalysis()
├─ Output: mlOutput field populated
└─ Storage: Saved in MongoDB
```

### 2. Complaint Retrieval
```javascript
GET /api/complaints/:id
├─ Fetch: Complaint from database
├─ Include: mlOutput field
└─ Display: In ComplaintDetailPage
```

### 3. Manual Analysis (Optional)
```javascript
POST /api/sentiment/analyze
├─ Input: Any text
├─ Analysis: performCompleteAnalysis()
└─ Output: Analysis results
```

### 4. Batch Analysis
```javascript
POST /api/sentiment/analyze/batch
├─ Input: Array of texts (max 100)
├─ Analysis: Process each text
└─ Output: Array of results
```

---

## 📱 Responsive Layout

```
Desktop (>1024px)
├─ Main complaint info (2/3 width)
│  └─ AI Analysis card (full width)
│     ├─ 4-column metric grid
│     ├─ Flags section
│     └─ Keywords section
└─ Sidebar (1/3 width)
   └─ Status update panel

Tablet (768px-1023px)
├─ Main complaint info (full width)
│  └─ AI Analysis card
│     ├─ 2-column metric grid
│     ├─ Flags section
│     └─ Keywords section
└─ Status update panel

Mobile (<768px)
├─ Main complaint info (full width)
│  └─ AI Analysis card
│     ├─ 1-column metric grid
│     ├─ Flags section
│     └─ Keywords section
└─ Status update panel
```

---

**Visual Reference Complete**  
**Last Updated**: February 2, 2026
