// Colors from tailwind.config.ts - single source of truth
export const colors = {
  'bg-1': '#020b0d',
  'bg-2': '#242424', 
  'bg-3': '#404040',
  'fg-1': '#ffffff',
  'fg-2': '#bdbdbd',
  'fg-3': '#707070',
  'brand': '#fff84c'
} as const

// Helper function to get color value
export function getColor(colorName: keyof typeof colors): string {
  return colors[colorName]
}

// Export individual colors for convenience
export const { 'bg-1': bg1, 'bg-2': bg2, 'bg-3': bg3, 'fg-1': fg1, 'fg-2': fg2, 'fg-3': fg3, brand } = colors 