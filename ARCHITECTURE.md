# BODMAS Calculator - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      REACT NATIVE APP                   │
│                   (bodmas_calcultor)                    │
└─────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   App.js       │ (Entry Point)
                    │   StatusBar    │
                    │   Context      │
                    └───────┬────────┘
                            │
          ┌─────────────────▼─────────────────┐
          │  CalculatorProvider (Context)    │
          │  - State Management              │
          │  - Reducer Pattern               │
          └─────────────────┬─────────────────┘
                            │
          ┌─────────────────▼──────────────────┐
          │   CalculatorScreen                │
          │   (Main Layout Orchestrator)      │
          └─────────────────┬──────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌─────────┐        ┌──────────┐        ┌─────────┐
    │ Display │        │ButtonGrid│        │ History │
    │Component│        │Component │        │Component│
    └────┬────┘        └────┬─────┘        └────┬────┘
         │                  │                   │
         │          ┌───────▼─────────┐        │
         │          │CalculatorButton │        │
         │          │  (Reusable)     │        │
         │          └─────────────────┘        │
         │                                     │
         └─────────────────┬───────────────────┘
                           │
        ┌──────────────────▼──────────────────┐
        │         AdSpace Component          │
        │  (Advertisement Placeholder)       │
        └───────────────────────────────────┘
```

---

## 📦 Dependency Layers

```
                    ┌─────────────────┐
                    │   UI Components │
                    │   (*.js)        │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
    ┌────────┐        ┌─────────────┐        ┌──────────┐
    │Context │        │  Components │        │Constants │
    │Manager │        │             │        │ (Theme)  │
    └────┬───┘        └─────────────┘        └──────┬───┘
         │                                         │
         └────────────┬──────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │    Utility Functions       │
        │ - calculationEngine.js     │
        │ - historyManager.js        │
        └────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  External Dependencies     │
        │ - react-native            │
        │ - expo                     │
        │ - expr-eval               │
        └────────────────────────────┘
```

---

## 🔄 Data Flow

```
USER INPUT (Button Press)
        │
        ▼
┌──────────────────────────┐
│ CalculatorButton         │
│ onPress → addInput()     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ CalculatorContext (useCalculator)│
│ - addInput()                     │
│ - evaluate()                     │
│ - clear()                        │
│ - deleteLast()                   │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ Reducer (calculatorReducer)      │
│ Processes: ADD_INPUT             │
│            DELETE_LAST           │
│            EVALUATE              │
│            CLEAR                 │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ State Update                     │
│ - expression                     │
│ - result                         │
│ - history                        │
│ - error                          │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ Components Re-render             │
│ - Display (new result)           │
│ - ButtonsGrid (updates state)    │
│ - HistorySection (new item)      │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ UI Updates on Screen             │
│ User sees result instantly       │
└──────────────────────────────────┘
```

---

## 📊 State Structure

```
CalculatorContext State:
{
  ├── expression: string
  │   └── Current mathematical expression being typed
  │       Example: "5 + 3 * (2 + 1)"
  │
  ├── result: number | null
  │   └── Live calculated result
  │       Example: 14
  │
  ├── history: array
  │   └── Stack of previous calculations (newest first)
  │       Example: [
  │         { expression: "5 + 3", result: 8 },
  │         { expression: "10 * 2", result: 20 }
  │       ]
  │
  ├── error: string | null
  │   └── Error message if calculation failed
  │       Example: "Math error" or null
  │
  └── lastWasEquals: boolean
      └── Track if last action was equals (for chaining)
          Example: true or false
}
```

---

## 🔧 Component Relationships

```
┌─────────────────────────────────────────────────────────┐
│                   App.js                                │
│  Wraps with StatusBar, CalculatorProvider              │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────▼─────────────┐
        │  CalculatorScreen        │
        │  - Orchestrates layout   │
        │  - Manages scroll view   │
        │  - Positions components  │
        └────────┬────────┬────────┴────┬─────────┐
                 │        │             │         │
        ┌────────▼──┐    │       ┌──────▼───┐    │
        │  Header   │    │       │ AdSpace  │    │
        │ (Title)   │    │       │ (Bottom) │    │
        └───────────┘    │       └──────────┘    │
                         │                       │
            ┌────────────▼────────────┐          │
            │ Display Component       │          │
            │ ┌────────────────────┐ │          │
            │ │ Expression Text    │ │          │
            │ │ Live Result Text   │ │          │
            │ └────────────────────┘ │          │
            └────────────────────────┘          │
                         │                       │
            ┌────────────▼────────────┐          │
            │ ButtonsGrid Component   │          │
            │ ┌──────────────────┐   │          │
            │ │ Row 1: C DEL ( ) │   │          │
            │ │ Row 2: 7 8 9 /  │   │          │
            │ │ Row 3: 4 5 6 *  │   │          │
            │ │ Row 4: 1 2 3 -  │   │          │
            │ │ Row 5: 0 . + =  │   │          │
            │ └──────────────────┘   │          │
            │ All use: CalculatorBtn │          │
            └────────────────────────┘          │
                         │                       │
            ┌────────────▼────────────┐          │
            │ HistorySection Component│          │
            │ ┌────────────────────┐ │          │
            │ │ "5 + 3 = 8"        │ │          │
            │ │ "10 * 2 = 20"      │ │ Scrollable
            │ │ "20 / 4 = 5"       │ │          │
            │ └────────────────────┘ │          │
            └────────────────────────┘          │
                         │                       │
                    Uses: FlatList               │
                         │                       │
                    All components              │
                    access via:                 │
              useCalculator() hook
```

---

## 📁 File Organization & Responsibility

```
src/
│
├── components/          (UI Layer)
│   ├── CalculatorButton.js
│   │   └── Reusable button with type-based styling
│   │       type: digit, operator, equals, clear, delete
│   │
│   ├── CalculatorScreen.js
│   │   └── Main layout orchestrator
│   │       - SafeAreaView wrapper
│   │       - ScrollView for responsive layout
│   │       - Composes all other components
│   │
│   ├── Display.js
│   │   └── Expression & result display
│   │       - Shows: expression on top
│   │       - Shows: live result below
│   │       - Uses useCalculator() hook
│   │       - Real-time updates via useMemo
│   │
│   ├── ButtonsGrid.js
│   │   └── 5 rows × 4 columns of buttons
│   │       - Row 1: C, DEL, (, )
│   │       - Row 2: 7, 8, 9, ÷
│   │       - Row 3: 4, 5, 6, ×
│   │       - Row 4: 1, 2, 3, −
│   │       - Row 5: 0, ., +, =
│   │       - Uses CalculatorButton component
│   │       - Calls useCalculator() methods
│   │
│   ├── HistorySection.js
│   │   └── Scrollable calculation history
│   │       - Shows newest calculations first
│   │       - Max 50 items
│   │       - FlatList for performance
│   │       - Uses useCalculator() hook
│   │
│   └── AdSpace.js
│       └── Advertisement placeholder
│           - Fixed bottom area
│           - Ready for AdMob integration
│           - Does not scroll with content
│
├── context/             (State Layer)
│   └── CalculatorContext.js
│       ├── createContext()
│       ├── CalculatorProvider (wrapper component)
│       ├── useCalculator() (custom hook)
│       ├── calculatorReducer (action handler)
│       └── ACTIONS:
│           ├── ADD_INPUT
│           ├── DELETE_LAST
│           ├── EVALUATE
│           ├── CLEAR
│           ├── SET_ERROR
│           └── CONTINUE_CALCULATION
│
├── utils/               (Logic Layer)
│   ├── calculationEngine.js
│   │   ├── evaluateExpression()
│   │   ├── isValidExpression()
│   │   ├── isValidInput()
│   │   ├── removeLastCharacter()
│   │   ├── formatNumber()
│   │   └── addThousandsSeparator()
│   │
│   └── historyManager.js
│       ├── addToHistory()
│       ├── clearHistory()
│       ├── formatHistoryItem()
│       └── getRecentResult()
│
└── constants/           (Config Layer)
    └── theme.js
        ├── COLORS (20+ color definitions)
        ├── SPACING (6 sizes)
        ├── FONT_SIZES (9 sizes)
        ├── BORDER_RADIUS (4 sizes)
        ├── MAX_DISPLAY_LENGTH
        ├── MAX_RESULT_LENGTH
        ├── MAX_HISTORY_ITEMS
        ├── OPERATORS (list)
        └── DIGITS (list)
```

---

## 🔀 State Action Flow Diagram

```
User presses button
        │
        ▼
CalculatorButton.onPress()
        │
        ├─► addInput(digit)
        │   │
        │   ▼
        │   dispatch({ type: ADD_INPUT, payload: { input } })
        │   │
        │   ▼
        │   Reducer:
        │   ├─ Validate input
        │   ├─ Build expression
        │   ├─ Evaluate expression
        │   ├─ Update state
        │
        ├─► evaluate()
        │   │
        │   ▼
        │   dispatch({ type: EVALUATE })
        │   │
        │   ▼
        │   Reducer:
        │   ├─ Evaluate final expression
        │   ├─ Add to history
        │   ├─ Set lastWasEquals = true
        │
        ├─► deleteLast()
        │   │
        │   ▼
        │   dispatch({ type: DELETE_LAST })
        │   │
        │   ▼
        │   Reducer:
        │   ├─ Remove last character
        │   ├─ Re-evaluate expression
        │
        └─► clear()
            │
            ▼
            dispatch({ type: CLEAR })
            │
            ▼
            Reducer:
            ├─ Reset all state
            ├─ expression = ''
            ├─ result = null
            ├─ history = []
            ├─ error = null
```

---

## ⚙️ Calculation Engine Logic

```
User Input Validation:
    ├─ isValidInput(expression, input)
    │  ├─ Prevent: Multiple decimals in same number
    │  ├─ Prevent: Operator at start (except -)
    │  ├─ Prevent: Consecutive operators (except - for negatives)
    │  ├─ Prevent: Unbalanced brackets
    │  ├─ Prevent: Closing bracket before opening
    │  └─ Allow: Negative numbers with -
    │
    ▼
Expression Evaluation:
    ├─ isValidExpression(expression)
    │  ├─ Check: Not empty
    │  ├─ Check: Balanced brackets
    │  ├─ Check: Ends with number or )
    │  └─ Check: Valid syntax
    │
    ▼
Safe Evaluation:
    ├─ evaluateExpression(expression)
    │  ├─ Use: expr-eval library (NOT eval())
    │  ├─ Try: Parse and evaluate
    │  ├─ Catch: Invalid expressions
    │  ├─ Round: To avoid floating point errors
    │  └─ Return: { result, error }
    │
    ▼
Format for Display:
    ├─ formatNumber(num, maxLength)
    │  ├─ Handle: Very large/small numbers
    │  ├─ Show: Scientific notation if needed
    │  └─ Return: String for display
```

---

## 🎨 Theming System

```
src/constants/theme.js
│
├── COLORS (Color Scheme)
│   ├── primary: #FF9500 (Orange - main accent)
│   ├── backgroundColor: #1C1C1E (Dark background)
│   ├── displayBackground: #2C2C2E (Display area)
│   ├── historyBackground: #3A3A3C (History area)
│   ├── digitColor: #505052 (Number buttons)
│   ├── operatorColor: #FF9500 (Operator buttons)
│   └── ... (15+ more colors defined)
│
├── SPACING (Consistent Spacing)
│   ├── xs: 4
│   ├── sm: 8
│   ├── md: 12
│   ├── lg: 16
│   ├── xl: 20
│   └── xxl: 24
│
├── FONT_SIZES (Typography)
│   ├── xs: 12
│   ├── sm: 14
│   ├── md: 16
│   ├── lg: 18
│   ├── xl: 20
│   ├── xxl: 24
│   ├── xxxl: 32
│   └── display: 48
│
├── BORDER_RADIUS (Button Rounding)
│   ├── sm: 4
│   ├── md: 8
│   ├── lg: 12
│   ├── xl: 16
│   └── full: 50
│
└── CONSTANTS
    ├── MAX_DISPLAY_LENGTH: 30
    ├── MAX_RESULT_LENGTH: 20
    ├── MAX_HISTORY_ITEMS: 50
    ├── OPERATORS: ['+', '-', '*', '/', '(', ')']
    └── DIGITS: ['0'-'9', '.']

Used in all StyleSheets:
    StyleSheet.create({
        container: {
            backgroundColor: COLORS.backgroundColor,
            padding: SPACING.lg,
            borderRadius: BORDER_RADIUS.lg,
        }
    })
```

---

## 📊 Performance Optimization

```
Component Optimization:
├── React.memo() - Prevent unnecessary re-renders
├── useMemo() - Cache expensive calculations
├── useCallback() - Memoize callbacks
└── FlatList - Efficient list rendering for history

State Management:
├── Reducer Pattern - Predictable updates
├── Context API - Minimal re-renders
└── Single source of truth - Avoid prop drilling

Calculation:
├── expr-eval Library - Compiled, not interpreted
├── Input validation - Fail fast
├── Result caching - useMemo for display formatting
└── History limit - Max 50 items in memory

UI Rendering:
├── SafeAreaView - Proper layout
├── ScrollView - Smooth scrolling
├── FlatList - Optimized history list
└── Pressable - Native gesture handling
```

---

## 🚀 Build & Deployment Pipeline

```
Development:
  npm install       → Install dependencies
  npm start         → Start dev server
  npm run android   → Run on Android
  │
  └─► Test locally
      ├─ Verify calculations
      ├─ Check UI/UX
      ├─ Test edge cases
      └─ Performance check

Production Build:
  npm run build:android    → Build APK
  │
  ├─► Optimization
  │   ├─ Minification
  │   ├─ Code splitting
  │   └─ Asset compression
  │
  └─► Deployment
      ├─ Generate APK/AAB
      ├─ Sign with certificate
      └─ Ready for Play Store

Play Store Submission:
  npm run submit:android   → Submit
  │
  └─► Store Processing
      ├─ Review app
      ├─ Check compliance
      └─ Publish
```

---

## 🔐 Security Architecture

```
Input Validation:
├─ isValidExpression() → Before evaluation
├─ isValidInput() → Before adding to expression
└─ Error boundaries → Catch failures gracefully

Safe Evaluation:
├─ No eval() function → Uses expr-eval library
├─ Sandboxed evaluation → Parser checks syntax
├─ Error handling → Try-catch with messages
└─ No external calls → Fully offline

Data Protection:
├─ History in memory only → Not persisted
├─ No personal data → Anonymous usage
├─ No network calls → No data transmission
└─ No permissions needed → Minimal access

Code Quality:
├─ ESLint → Code standards
├─ Clear architecture → Easy to audit
├─ No third-party code → Trusted dependencies only
└─ Production ready → No debug statements
```

---

## Summary

This architecture provides:

- ✅ **Clean Separation**: UI, Logic, State clearly separated
- ✅ **Reusability**: Components and utilities designed for reuse
- ✅ **Scalability**: Easy to add features without refactoring
- ✅ **Maintainability**: Clear responsibility for each file
- ✅ **Performance**: Optimized rendering and calculations
- ✅ **Security**: Safe evaluation, no eval(), input validation
- ✅ **Testability**: Utility functions independently testable
- ✅ **Production Ready**: Enterprise-grade code quality

---

**This is a production-grade architecture suitable for commercial app deployment! 🎉**
