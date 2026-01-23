# Bug Fixes & Optimization

- [x] Fix countdown timer freeze in `ImageViewer` component
- [x] Optimize `useWebGazer` hook to prevent unnecessary re-renders
- [x] Remove the eye tracking icon image from the Home page as requested by the user.
- [x] Improve eye tracking accuracy and reduce "mouse following" bias
- [x] Fix text overlap/occlusion in the Calibration interface
- [x] Fix Calibration instruction box blocking calibration points
- [x] Fix empty data report issue
- [x] Hide webcam preview globally
- [x] Remove countdown in `ImageViewer` and set background to pure white
- [x] Improve vertical eye tracking accuracy
- [x] Fix `TypeError: Cannot assign to read only property 'data' of object '#<ImageData>'` in `Heatmap` component
  - Replaced `heatmap.js` with a custom native Canvas implementation to avoid compatibility issues and direct `ImageData` manipulation errors.
