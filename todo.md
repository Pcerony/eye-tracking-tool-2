# Bug Fixes & Optimization

- [x] Fix countdown timer freeze in `ImageViewer` component
- [x] Optimize `useWebGazer` hook to prevent unnecessary re-renders
- [x] Remove the eye tracking icon image from the Home page as requested by the user.
- [x] Improve eye tracking accuracy and reduce "mouse following" bias
- [x] Fix text overlap/occlusion in the Calibration interface
- [x] Fix Calibration instruction box blocking calibration points
- [x] Fix empty data report issue
  - The gaze listener closure captures stale state. Use `useRef` to track `isTracking` state inside the listener.
- [x] Hide webcam preview globally
  - Set `webgazer.showVideoPreview(false)` and ensure video element is hidden via CSS.
- [x] Remove countdown in `ImageViewer` and set background to pure white
  - Start tracking immediately upon image load.
  - Set background color to `#ffffff`.
- [x] Improve vertical eye tracking accuracy
  - Increase calibration points from 3x3 (9 points) to 3x4 (12 points) to provide more vertical data.
