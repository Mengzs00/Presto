1. Introduction
This document outlines our approach to component and UI testing to meet the task requirements.

2. Component Testing 
Unit Tests: Tested individual functions in each component to ensure they work as expected.
Edge Cases: Included boundary tests to check minimum, maximum, and unexpected values.
Mocking: Used mocks to isolate component logic from dependencies.
Tools
Framework: Jest
Coverage: High coverage focused on key component functionality.
3. UI Testing 
End-to-End (E2E): Simulated full user flows to confirm functionality across components.
Accessibility: Verified basic accessibility (alt text, focus order).
Responsiveness: Ensured the UI adjusts well on desktop, tablet, and mobile.
Tools
Framework: Cypress
Simulated Actions: Automated clicks, form fills, and navigation for realistic testing.