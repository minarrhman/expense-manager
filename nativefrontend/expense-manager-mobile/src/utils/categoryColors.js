const COLORS = [
    "#3B82F6", // Blue
    "#22C55E", // Green
    "#F97316", // Orange
    "#A855F7", // Purple
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#EAB308", // Yellow
    "#EF4444", // Red
    "#6366F1", // Indigo
    "#84CC16", // Lime
];

export function getCategoryColor(index) {
    return COLORS[index % COLORS.length];
}