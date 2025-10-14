export const gradientPalette = [
  "from-rose-600/85 via-amber-400/45 to-transparent",
  "from-violet-600/85 via-indigo-400/45 to-transparent",
  "from-emerald-500/80 via-teal-400/45 to-transparent",
  "from-fuchsia-600/85 via-rose-400/45 to-transparent",
  "from-sky-500/80 via-cyan-400/45 to-transparent",
  "from-amber-500/85 via-orange-400/45 to-transparent",
  "from-purple-600/85 via-pink-500/45 to-transparent",
  "from-blue-600/85 via-indigo-400/45 to-transparent",
  "from-rose-500/80 via-rose-300/45 to-transparent",
  "from-emerald-600/80 via-lime-400/45 to-transparent",
  "from-teal-500/80 via-cyan-400/45 to-transparent",
  "from-amber-500/80 via-pink-400/45 to-transparent",
] as const

export function getGradientFromPalette(index: number) {
  if (gradientPalette.length === 0) return "from-black/70 via-black/30 to-transparent"
  const normalizedIndex = ((index % gradientPalette.length) + gradientPalette.length) % gradientPalette.length
  return gradientPalette[normalizedIndex]
}
