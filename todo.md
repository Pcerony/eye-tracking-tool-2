# Bug Fixes & Optimization

- [x] Fix countdown timer freeze in `ImageViewer` component
  - The countdown resets repeatedly due to parent re-renders caused by high-frequency gaze data updates.
- [x] Optimize `useWebGazer` hook to prevent unnecessary re-renders
  - Use `useCallback` for exposed functions.
  - Throttle state updates if necessary (though current implementation separates tracking data from state).
- [ ] Verify tracking start/stop logic ensures data integrity.
- [x] Remove the eye tracking icon image from the Home page as requested by the user.
