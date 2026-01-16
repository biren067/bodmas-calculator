<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## BODMAS Calculator App - Setup & Development

### Project Overview

- **Type**: React Native Expo Calculator App
- **Platform**: Android (Play Store ready)
- **Architecture**: Clean architecture with React Context for state management
- **Status**: Production-ready

### Project Structure

```
bodmas_calcultor/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CalculatorButton.js
│   │   ├── CalculatorScreen.js
│   │   ├── ButtonsGrid.js
│   │   ├── Display.js
│   │   ├── HistorySection.js
│   │   └── AdSpace.js
│   ├── context/             # State management
│   │   └── CalculatorContext.js
│   ├── utils/               # Business logic
│   │   ├── calculationEngine.js (safe expression evaluation)
│   │   └── historyManager.js
│   └── constants/
│       └── theme.js         # Colors, spacing, typography
├── App.js                   # Entry point
├── app.json                 # Expo configuration
└── package.json
```

### Key Features Implemented

✅ Real-time expression evaluation  
✅ Bracket support with validation  
✅ Stack-based calculation history  
✅ Safe expression evaluation (no eval)  
✅ Clean, modern UI with theme system  
✅ Fixed advertisement placeholder  
✅ Production-ready architecture

### Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   # or for Android specifically:
   npm run android
   ```

3. **Build for Android (APK)**

   ```bash
   npm run build:android
   ```

4. **Submit to Play Store**
   ```bash
   npm run submit:android
   ```

### Architecture Decisions

#### State Management

- **React Context API** for simplicity and no extra dependencies
- Reducer pattern for predictable state updates
- Custom `useCalculator` hook for easy access

#### Calculation Engine

- **expr-eval library** for safe expression evaluation
- No `eval()` function - production safe
- Validates expressions before evaluation
- Handles floating-point precision

#### Component Structure

- **Stateless functional components** with hooks
- **Single responsibility principle** for each component
- **Reusable CalculatorButton** for all button types
- **Centralized styling** with theme constants

### Customization Guide

#### To Integrate AdMob:

Update `src/components/AdSpace.js`:

```javascript
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

// Replace placeholder with:
<BannerAd
  unitId="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
  size={BannerAdSize.ADAPTIVE_BANNER}
/>;
```

#### To Customize Colors:

Edit `src/constants/theme.js` - COLORS object

#### To Add More Operations:

1. Update calculation engine in `src/utils/calculationEngine.js`
2. Add button in `src/components/ButtonsGrid.js`
3. Theme automatically inherits styling

### Play Store Deployment Checklist

- [ ] Update app name and description in `app.json`
- [ ] Add app icon (1024x1024) to `assets/icon.png`
- [ ] Add splash screen (1080x1920) to `assets/splash.png`
- [ ] Update `package.json` version for release
- [ ] Update privacy policy URL if required
- [ ] Generate signing key for Android release
- [ ] Test on multiple Android versions
- [ ] Set up EAS account: `eas login`
- [ ] Configure `eas.json` with production settings
- [ ] Build: `eas build --platform android --auto-submit`

### Testing

The app includes `testID` attributes on all buttons for UI testing:

- `btn-0` through `btn-9` - Number buttons
- `btn-add`, `btn-subtract`, `btn-multiply`, `btn-divide` - Operations
- `btn-open-bracket`, `btn-close-bracket` - Brackets
- `btn-decimal` - Decimal point
- `btn-equals` - Equals button
- `btn-clear` - Clear button
- `btn-delete` - Delete button

### Performance Optimizations

✅ Memoization on display calculations  
✅ FlatList optimization for history  
✅ Efficient re-renders with Context  
✅ Minimal component re-renders

### Known Limitations & Future Enhancements

- Currently Android-first (iOS support ready via Expo)
- History stored in memory (consider localStorage for persistence)
- Could add advanced functions (sin, cos, square root, etc.)
- Could add themes (dark/light mode toggle)
- Could add keyboard support for web

### Troubleshooting

**Issue**: App won't start

- Solution: Run `npm install && expo prebuild`

**Issue**: Expression not evaluating

- Check `src/utils/calculationEngine.js` for validation logic

**Issue**: Brackets not working

- Ensure balanced brackets in expression validation

### Dependencies

- `react-native` - Core framework
- `expo` - Development platform
- `expr-eval` - Safe math expression evaluation

### License

Ready for commercial use on Play Store.
