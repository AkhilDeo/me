// Graph constants - animation timings, zoom limits, layout values

export const CAMERA = {
  // Zoom constraints
  MIN_SCALE: 0.3,
  MAX_SCALE: 2.5,
  DEFAULT_SCALE: 0.85,

  // Animation
  SPRING_STIFFNESS: 200,
  SPRING_DAMPING: 30,
  SNAP_DURATION: 0.6, // seconds for snap-to-node

  // Interaction
  WHEEL_ZOOM_SPEED: 0.001,
  PINCH_ZOOM_SPEED: 0.01,
  PAN_FRICTION: 0.95,

  // Viewport padding when snapping to node
  SNAP_PADDING: 100,
}

export const GRID = {
  SIZE: 40,
  MAJOR_EVERY: 5, // Major line every N grid lines
}

export const NODE = {
  // Base sizes by type
  PERSON_SIZE: { width: 200, height: 80 },
  CATEGORY_SIZE: { width: 140, height: 56 },
  ITEM_SIZE: { width: 180, height: 64 },

  // Interaction
  HOVER_SCALE: 1.02,
  SELECTED_SCALE: 1.0,
}

export const PANEL = {
  WIDTH: 440,
  WIDTH_MOBILE: '100%',
  ANIMATION_DURATION: 0.3,
}

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
}

// Motion preferences
export const MOTION = {
  // Reduced motion alternative durations
  REDUCED_DURATION: 0.01,
  REDUCED_SPRING: { stiffness: 500, damping: 50 },
}

// Z-index layers
export const Z_INDEX = {
  GRID: 0,
  EDGES: 1,
  NODES: 2,
  SELECTED_NODE: 3,
  PANEL: 10,
  COMMAND_PALETTE: 20,
  THEME_TOGGLE: 15,
}
