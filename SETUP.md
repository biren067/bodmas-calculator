# BODMAS Calculator - Development Setup Guide

## 🚀 First Time Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:

- `react-native` - React Native framework
- `expo` - Development platform
- `expr-eval` - Safe math expression evaluation
- `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-screens` - Navigation dependencies

### Step 2: Start Development Server

```bash
npm start
```

Options:

```bash
npm start          # Interactive menu to choose platform
npm run android    # Start Android emulator
npm run ios        # Start iOS simulator
npm run web        # Start web version
```

### Step 3: Test the App

Open your Android emulator/iOS simulator and see the calculator:

- Test basic operations: `5 + 3 = 8`
- Test brackets: `(2 + 3) * 4 = 20`
- Test history: Calculations should appear in history
- Test clear: Press C to reset everything

---

## 📦 Building for Production

### Build APK (Android)

```bash
# Prerequisites:
# 1. Have Node.js 16+ installed
# 2. Have expo-cli installed: npm install -g expo-cli
# 3. Have eas-cli installed: npm install -g eas-cli

# Step 1: Create EAS account (one-time)
eas login

# Step 2: Configure project
eas init

# Step 3: Build APK
npm run build:android

# Step 4: Download APK from Expo dashboard
```

### Install APK on Device (Testing)

```bash
# If you have local APK:
adb install bodmas-calculator.apk

# Or test the AAB through Play Store internal testing track
```

---

## 🎨 Customizing the App

### Change App Name

Edit `app.json`:

```json
{
  "expo": {
    "name": "My Custom Calculator",
    "slug": "my-custom-calculator"
  }
}
```

### Change Colors

Edit `src/constants/theme.js`:

```javascript
export const COLORS = {
  primary: "#FF9500", // Change Orange
  backgroundColor: "#1C1C1E", // Change Dark background
  operatorColor: "#FF9500", // Change Operator buttons
  // ... more colors
};
```

### Add New Operation

1. Update `src/utils/calculationEngine.js` if needed
2. Add button to `src/components/ButtonsGrid.js`:

```javascript
<CalculatorButton
  label="x²"
  onPress={() => addInput("**")} // For power operation
  type="operator"
  testID="btn-power"
/>
```

### Change Button Layout

Edit `src/components/ButtonsGrid.js` - restructure the Row components

---

## 📱 Play Store Submission

### Pre-Submission Checklist

- [ ] App Icon (1024x1024px) → `assets/icon.png`
- [ ] Splash Screen (1080x1920px) → `assets/splash.png`
- [ ] Update version in `package.json`: `"version": "1.0.0"`
- [ ] Update `app.json` with correct bundle ID and package name
- [ ] Write compelling app description
- [ ] Create privacy policy (if collecting data)
- [ ] Test on real Android devices

### Submission Steps

```bash
# 1. Update version
# Edit package.json and app.json

# 2. Prepare build
eas build --platform android --auto-submit

# 3. Monitor progress on Expo Dashboard
# Visit: https://expo.dev/dashboard

# 4. Submit to Play Store
eas submit --platform android --latest
```

---

## 🧪 Testing Locally

### Run on Android Emulator

```bash
# Ensure emulator is running
emulator -avd YourEmulatorName

# Then
npm run android
```

### Run on Physical Android Device

```bash
# Enable USB debugging on device
# Connect device via USB
adb devices  # Should show your device

npm start
# Scan QR code with Expo Go app or press 'a' for Android
```

### Test Specific Features

```
✓ Basic operations: 2 + 2, 3 - 1, 4 * 5, 20 / 4
✓ Brackets: (1 + 2) * 3
✓ Decimals: 3.5 + 2.1
✓ History: Check multiple calculations are saved
✓ Clear: Press C, all should reset
✓ Delete: Type number, press DEL, last digit removed
```

---

## 🔍 Debugging

### Enable Debug Mode

```bash
# Get QR code for debugging
npm start

# Select 'd' for development mode
# Open Expo Go on phone and scan QR code
```

### Console Logs

```javascript
// Add in any component:
import { Alert } from "react-native";

Alert.alert("Debug", "Your message here");
```

### Check for Errors

```bash
# Watch for build errors in terminal
# Common issues:
# 1. Module not found → npm install
# 2. Syntax error → Check file for typos
# 3. Android build failed → eas build --platform android --auto-submit
```

---

## 📂 Project Structure Reference

```
bodmas_calcultor/
│
├── src/
│   ├── components/          # UI Components
│   │   ├── CalculatorButton.js      # Single button component
│   │   ├── CalculatorScreen.js      # Main layout
│   │   ├── ButtonsGrid.js           # 5 rows of buttons
│   │   ├── Display.js               # Expression & result
│   │   ├── HistorySection.js        # Calculation history
│   │   └── AdSpace.js               # Ad placeholder
│   │
│   ├── context/
│   │   └── CalculatorContext.js     # State management
│   │
│   ├── utils/
│   │   ├── calculationEngine.js     # Math logic
│   │   └── historyManager.js        # History management
│   │
│   └── constants/
│       └── theme.js                 # Design tokens
│
├── App.js                   # Entry point
├── app.json                 # Expo config
├── package.json             # Dependencies
├── eas.json                 # EAS build config
├── .eslintrc.json          # Linting rules
├── .gitignore              # Git ignore file
└── README.md               # Main documentation
```

---

## 💡 Key Files & What They Do

| File                               | Purpose                                       |
| ---------------------------------- | --------------------------------------------- |
| `App.js`                           | Sets up context provider, renders main screen |
| `src/context/CalculatorContext.js` | Manages all calculator state & logic          |
| `src/utils/calculationEngine.js`   | Safe math expression evaluation               |
| `src/constants/theme.js`           | Colors, fonts, spacing values                 |
| `src/components/ButtonsGrid.js`    | All button definitions                        |
| `app.json`                         | Expo app metadata & configuration             |
| `package.json`                     | Dependencies & npm scripts                    |

---

## 🚨 Troubleshooting

### "Module not found" Error

```bash
# Solution:
npm install
expo prebuild --clean
npm start
```

### Android Build Fails

```bash
# Solution:
eas build --platform android --auto-submit
# Check logs in Expo Dashboard
```

### Brackets Not Working

- Check `src/utils/calculationEngine.js` for validation logic
- Ensure balanced brackets: `(` and `)`

### Performance Slow

```bash
# Clear cache:
expo prebuild --clean
rm -rf node_modules
npm install
npm start
```

### Expression Not Evaluating

- Check expression for syntax errors
- Ensure no consecutive operators like `++` or `--`
- Check for unclosed brackets

---

## 📚 Useful Commands

```bash
# Development
npm start              # Start dev server
npm run android        # Start on Android
npm run ios           # Start on iOS
npm run web           # Start on web

# Production
npm run build:android  # Build APK for Play Store
npm run submit:android # Submit to Play Store

# Utility
npm install           # Install dependencies
npm update            # Update packages
npm audit             # Check for vulnerabilities
expo prebuild --clean # Clean rebuild
expo logout           # Logout from Expo account
```

---

## 🎯 Next Steps After Setup

1. **Test locally** on Android/iOS
2. **Customize colors** if desired
3. **Add app icon & splash screen**
4. **Create privacy policy**
5. **Test on real devices**
6. **Build for Play Store**
7. **Submit to Google Play**

---

## 📞 Support

For issues:

1. Check this guide
2. Review [React Native Docs](https://reactnative.dev/)
3. Check [Expo Docs](https://docs.expo.dev/)
4. Review project error logs

---

**Ready to deploy! 🚀**
