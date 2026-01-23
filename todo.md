# Bug Fixes & Optimization

- [x] Fix countdown timer freeze in `ImageViewer` component
- [x] Optimize `useWebGazer` hook to prevent unnecessary re-renders
- [x] Remove the eye tracking icon image from the Home page as requested by the user.
- [x] Improve eye tracking accuracy and reduce "mouse following" bias
- [x] Fix text overlap/occlusion in the Calibration interface
- [x] Fix Calibration instruction box blocking calibration points
  - Implement a "Start Calibration" step where instructions are shown first.
  - Hide instructions once calibration begins to clear the view.
