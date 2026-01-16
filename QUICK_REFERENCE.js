/**
 * Quick Reference Guide - BODMAS Calculator
 *
 * Copy this file and use as a quick lookup during development
 */

// =============================================================================
// QUICK COMMAND REFERENCE
// =============================================================================

/*
START DEVELOPMENT:
  npm start              → Show interactive menu
  npm run android        → Start Android emulator
  npm run ios           → Start iOS simulator

BUILD FOR PRODUCTION:
  npm run build:android  → Build APK for Play Store
  npm run submit:android → Submit to Play Store

USEFUL COMMANDS:
  npm install           → Install dependencies
  expo prebuild --clean → Clean rebuild
  eas login            → Login to Expo
*/

// =============================================================================
// FILE STRUCTURE - WHERE TO MAKE CHANGES
// =============================================================================

/*
CHANGE APP COLORS:
  src/constants/theme.js
  
CHANGE BUTTONS LAYOUT:
  src/components/ButtonsGrid.js
  
ADD NEW OPERATION:
  src/utils/calculationEngine.js (if needed)
  src/components/ButtonsGrid.js
  
CHANGE APP NAME:
  app.json → "name" field
  
MANAGE STATE/LOGIC:
  src/context/CalculatorContext.js
  
ADD AD INTEGRATION:
  src/components/AdSpace.js
  
CUSTOMIZE DISPLAY:
  src/components/Display.js
*/

// =============================================================================
// KEY FUNCTIONS - HOW TO USE
// =============================================================================

/*
STATE MANAGEMENT - useCalculator Hook:

  import { useCalculator } from './src/context/CalculatorContext';
  
  const MyComponent = () => {
    const {
      expression,           // Current expression string
      result,              // Current calculated result
      history,             // Array of previous calculations
      addInput,            // Add digit/operator to expression
      deleteLast,          // Remove last character
      evaluate,            // Calculate result and add to history
      clear,               // Reset everything
    } = useCalculator();
    
    // Use these in your components
    addInput('5');         // Add digit 5
    addInput('+');         // Add operator +
    evaluate();            // Calculate: press = button
    clear();               // Clear all: press C button
  };

CALCULATION ENGINE:

  import {
    evaluateExpression,   // Safely evaluate math expression
    isValidExpression,    // Check if expression is valid
    isValidInput,         // Check if input can be added
    formatNumber,         // Format number for display
  } from './src/utils/calculationEngine';
  
  const { result, error } = evaluateExpression('2+2');
  // result = 4, error = null
  
  const valid = isValidExpression('5 + 3');
  // Returns: true
  
  const canAdd = isValidInput('5+', '3');
  // Returns: true
  
  const formatted = formatNumber(3.14159, 5);
  // Returns: "3.14159"
*/

// =============================================================================
// COMPONENT STRUCTURE
// =============================================================================

/*
APP HIERARCHY:

App.js
  └── CalculatorProvider (Context)
      └── CalculatorScreen
          ├── Display (shows expression & result)
          ├── ButtonsGrid
          │   └── CalculatorButton (reused for each button)
          ├── HistorySection (shows calculation history)
          └── AdSpace (advertisement placeholder)

REUSABLE COMPONENTS:

  <CalculatorButton
    label="5"
    onPress={handlePress}
    type="digit"              // digit, operator, equals, clear, delete
    testID="btn-5"
  />
  
  <Display />                 // Automatically uses useCalculator
  <ButtonsGrid />             // Automatically uses useCalculator
  <HistorySection />          // Automatically uses useCalculator
  <AdSpace />                 // Static ad placeholder
*/

// =============================================================================
// STYLING - THEME CONSTANTS
// =============================================================================

/*
All styling uses centralized theme from src/constants/theme.js

COLORS:
  COLORS.primary = '#FF9500'           (Orange - accents)
  COLORS.backgroundColor = '#1C1C1E'   (Dark background)
  COLORS.digitColor = '#505052'        (Digit buttons)
  COLORS.operatorColor = '#FF9500'     (Operator buttons)
  COLORS.equalsColor = '#FF9500'       (Equals button)

SPACING:
  SPACING.xs = 4
  SPACING.sm = 8
  SPACING.md = 12
  SPACING.lg = 16
  SPACING.xl = 20
  SPACING.xxl = 24

FONT SIZES:
  FONT_SIZES.xs = 12
  FONT_SIZES.sm = 14
  FONT_SIZES.md = 16
  FONT_SIZES.lg = 18
  FONT_SIZES.xl = 20
  FONT_SIZES.xxl = 24
  FONT_SIZES.xxxl = 32
  FONT_SIZES.display = 48

EXAMPLE USAGE IN STYLES:
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.backgroundColor,
      padding: SPACING.lg,
      fontSize: FONT_SIZES.md,
    },
  });
*/

// =============================================================================
// COMMON TASKS - HOW TO DO THEM
// =============================================================================

/*
TASK: Change button color from orange to blue
  File: src/constants/theme.js
  Change: COLORS.primary = '#0066FF' (new blue)

TASK: Add a new operation like "power" (x²)
  File 1: src/components/ButtonsGrid.js
  Add: <CalculatorButton label="x²" onPress={() => addInput('^')} ... />
  File 2: src/utils/calculationEngine.js (if not already supported)
  Update: parser configuration for new operator

TASK: Change history max items from 50 to 100
  File: src/constants/theme.js
  Change: MAX_HISTORY_ITEMS = 100

TASK: Add sound when button is pressed
  File: src/components/CalculatorButton.js
  Add: import { Audio } from 'expo-av';
  Add: In onPress handler, play sound

TASK: Add keyboard support (web version)
  File: src/components/CalculatorScreen.js
  Add: useEffect hook with keyboard listeners
  Map: 1-9 to digits, +/-/* for operations, Enter for =

TASK: Integrate AdMob ads
  File: src/components/AdSpace.js
  Replace: Placeholder with BannerAd component
  Setup: AdMob unit ID in environment variable

TASK: Add dark/light theme toggle
  File: src/context/CalculatorContext.js
  Add: theme state (light/dark)
  File: src/constants/theme.js
  Update: COLORS to support both themes
  File: App.js
  Update: Conditionally apply theme colors
*/

// =============================================================================
// TEST IDS - FOR AUTOMATED TESTING
// =============================================================================

/*
All buttons have testID attributes for testing:

DIGITS:          btn-0 through btn-9
OPERATORS:       btn-add, btn-subtract, btn-multiply, btn-divide
BRACKETS:        btn-open-bracket, btn-close-bracket
DECIMAL:         btn-decimal
EQUALS:          btn-equals
CLEAR:           btn-clear
DELETE:          btn-delete

EXAMPLE TEST:
  const { getByTestId, fireEvent } = render(<App />);
  fireEvent.press(getByTestId('btn-5'));
  fireEvent.press(getByTestId('btn-add'));
  fireEvent.press(getByTestId('btn-3'));
  fireEvent.press(getByTestId('btn-equals'));
  // Result should be 8
*/

// =============================================================================
// DEBUGGING TIPS
// =============================================================================

/*
1. CHECK CONSOLE LOGS:
   Add console.log() to any function
   View in Metro Terminal or Expo debugger
   
2. USE REACT DEVTOOLS:
   npm install -g react-devtools
   react-devtools (in separate terminal)
   
3. INSPECT COMPONENT STATE:
   Add <Text>{JSON.stringify(state, null, 2)}</Text>
   to temporarily display state on screen
   
4. CHECK CALCULATION ENGINE:
   import { evaluateExpression } from './src/utils/calculationEngine';
   const result = evaluateExpression('your-expression');
   console.log(result);
   
5. VALIDATE EXPRESSIONS:
   import { isValidExpression } from './src/utils/calculationEngine';
   console.log(isValidExpression('5 + 3')); // Should be true
*/

// =============================================================================
// PERFORMANCE TIPS
// =============================================================================

/*
✓ Use memoization for expensive calculations
✓ Use useMemo for derived state in components
✓ Avoid rendering history list unnecessarily
✓ Use FlatList for large lists (already done)
✓ Optimize re-renders with React.memo
✓ Use Context wisely to avoid unnecessary re-renders

Current optimizations:
✓ Display uses useMemo for formatting
✓ History uses FlatList with proper keys
✓ Context reducer prevents excessive updates
*/

// =============================================================================
// SECURITY CHECKLIST
// =============================================================================

/*
✓ No eval() function - using expr-eval for safe evaluation
✓ Input validation - all expressions checked before evaluation
✓ Error handling - graceful error messages
✓ No API calls - fully offline operation
✓ No sensitive data - calculator is stateless except local history
✓ Memory safe - history limited to 50 items max
✓ Production ready - no debug code in release build
*/

// =============================================================================
// PLAY STORE SUBMISSION CHECKLIST
// =============================================================================

/*
BEFORE SUBMISSION:
  ☐ Update version number in package.json
  ☐ Create app icon (1024x1024px) → assets/icon.png
  ☐ Create splash screen (1080x1920px) → assets/splash.png
  ☐ Test on multiple Android versions (8.0, 10, 12, 14)
  ☐ Write compelling app description
  ☐ Create privacy policy (if collecting data)
  ☐ Create app screenshots for store listing

SUBMISSION COMMANDS:
  eas login
  eas build --platform android --auto-submit
  eas submit --platform android --latest
*/

export default "BODMAS Calculator - Quick Reference Guide";
