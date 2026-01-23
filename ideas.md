# Design Brainstorming for Eye Tracking Tool

<response>
<probability>0.05</probability>
<text>
<idea>
  <design_movement>Neo-Laboratory Minimalism</design_movement>
  <core_principles>
    1. **Precision First**: Every element should convey accuracy and scientific rigor.
    2. **Distraction-Free**: The interface must recede to let the user focus on the calibration and tracking tasks.
    3. **Data Transparency**: Visualizations should be immediate, clear, and honest.
    4. **Micro-Feedback**: Subtle indicators for system status (camera active, tracking locked) to build trust.
  </core_principles>
  <color_philosophy>
    A clinical but approachable palette. **White (#FFFFFF)** and **Off-White (#F8F9FA)** as the canvas to ensure maximum contrast for content. **Electric Blue (#2563EB)** for active states and data points, representing technology and focus. **Cool Gray (#64748B)** for secondary text. The goal is to feel like a high-end medical or research instrument.
  </color_philosophy>
  <layout_paradigm>
    **Split-Screen & Sidebar**: A persistent, thin sidebar for controls and status, leaving the majority of the screen for the "Stage" (calibration/viewing area). The layout is rigid and grid-based to reinforce stability.
  </layout_paradigm>
  <signature_elements>
    1. **Thin Hairlines**: 1px borders for all containers, no heavy shadows.
    2. **Monospace Data**: Use monospace fonts for all numbers and coordinates.
    3. **Status Dots**: Pulsing dots to indicate camera activity and tracking quality.
  </signature_elements>
  <interaction_philosophy>
    **Instant & Direct**: Buttons have immediate hover states (color fill). Transitions are fast (150ms) and linear. No bounce or spring physics.
  </interaction_philosophy>
  <animation>
    **Fade & Slide**: Elements enter with a quick slide-up and fade-in. Data charts grow linearly.
  </animation>
  <typography_system>
    **Inter** for UI text (clean, legible). **JetBrains Mono** or **Roboto Mono** for data, timestamps, and coordinates.
  </typography_system>
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
  <design_movement>Ethereal Glass & Light</design_movement>
  <core_principles>
    1. **Airy & Weightless**: The interface should feel like it's floating, reducing the cognitive load of "being tracked."
    2. **Soft Guidance**: Use light and blur to guide attention rather than hard lines.
    3. **Fluidity**: The experience from calibration to result should feel like one continuous flow.
    4. **Human-Centric**: Warmth in the technology, avoiding the "creepy" factor of surveillance.
  </core_principles>
  <color_philosophy>
    **Pale Frosted Glass**: Backgrounds are not solid colors but blurred layers over soft, moving gradients of **Pale Lavender (#E9E5F5)**, **Soft Mint (#E0F2F1)**, and **Cream (#FAFAFA)**. Text is **Deep Charcoal (#333333)** for readability but softer than pure black. Primary action color is a **Gradient of Peach to Pink**.
  </color_philosophy>
  <layout_paradigm>
    **Floating Cards**: Content lives on translucent, rounded cards centered on the screen. No rigid grid; elements breathe and have ample padding.
  </layout_paradigm>
  <signature_elements>
    1. **Glassmorphism**: Backdrop-filter blur on panels and overlays.
    2. **Soft Glows**: Active elements emit a subtle diffuse glow instead of hard outlines.
    3. **Organic Shapes**: Background blobs that slowly morph to indicate system "aliveness."
  </signature_elements>
  <interaction_philosophy>
    **Gentle & Elastic**: Hover states lift elements slightly (transform: translateY). Clicks have a soft ripple effect.
  </interaction_philosophy>
  <animation>
    **Slow Morph**: Background gradients shift slowly. Modals scale in with a spring effect.
  </animation>
  <typography_system>
    **Outfit** or **Plus Jakarta Sans** for a friendly, geometric feel. Rounded terminals welcome users.
  </typography_system>
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
  <design_movement>Swiss International Style (Modernized)</design_movement>
  <core_principles>
    1. **Content is King**: The uploaded image and the resulting heatmap are the absolute heroes.
    2. **Grid Systems**: Strong adherence to a modular grid for typography and controls.
    3. **Objective Clarity**: No decorative elements that don't serve a function.
    4. **Bold Typography**: Large, confident headings to guide the user through the steps.
  </core_principles>
  <color_philosophy>
    **High Contrast Monochrome**: **White (#FFFFFF)** background, **Black (#000000)** text. A single, bold signal color like **International Orange (#FF4500)** or **Swiss Red (#FF0000)** for the "Record" and "Stop" actions, and for the gaze point. This creates a tool-like, professional aesthetic.
  </color_philosophy>
  <layout_paradigm>
    **Asymmetric Balance**: Large headings on the left, functional controls on the right. The viewing area is strictly framed.
  </layout_paradigm>
  <signature_elements>
    1. **Big Type**: Massive font sizes for step indicators (e.g., "01. Calibrate").
    2. **Thick Dividers**: Heavy black lines separating sections.
    3. **Raw Geometry**: Square buttons, sharp corners.
  </signature_elements>
  <interaction_philosophy>
    **Tactile & Mechanical**: Buttons feel like physical switches. Toggle states are binary and clear.
  </interaction_philosophy>
  <animation>
    **Snap & Cut**: No fades. Screens cut to the next. Elements snap into place.
  </animation>
  <typography_system>
    **Helvetica Now** or **Arial** (if system fonts preferred). Tight tracking for headlines.
  </typography_system>
</idea>
</text>
</response>

## Selected Approach: Ethereal Glass & Light

**Reasoning**: Eye tracking can feel invasive or overly technical. The "Ethereal Glass & Light" approach (Modern Light Style) softens the technology, making it more inviting and less clinical. It fits the user's request for a "Modern Light Style" perfectly by utilizing current trends like glassmorphism and soft gradients, which feel premium and up-to-date. It distinguishes the tool from a dry scientific utility, positioning it as a modern design instrument.

**Implementation Plan**:
- **Background**: Subtle, slow-moving pastel gradient mesh.
- **Containers**: White with low opacity (e.g., `bg-white/70`) and `backdrop-blur-md`.
- **Borders**: Thin, semi-transparent white borders to define edges without harshness.
- **Shadows**: Large, diffuse colored shadows (`shadow-lg`, `shadow-indigo-500/20`).
- **Font**: Plus Jakarta Sans for a modern, geometric, yet friendly look.
