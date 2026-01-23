# Bug Fixes & Optimization

- [x] Fix countdown timer freeze in `ImageViewer` component
- [x] Optimize `useWebGazer` hook to prevent unnecessary re-renders
- [x] Remove the eye tracking icon image from the Home page as requested by the user.
- [x] Improve eye tracking accuracy and reduce "mouse following" bias
  - Disable continuous mouse click calibration after the initial calibration phase.
  - Ensure regression model is properly trained only during explicit calibration.
- [x] Fix text overlap/occlusion in the Calibration interface
  - Adjust z-index and layout spacing to ensure instructions are readable.
