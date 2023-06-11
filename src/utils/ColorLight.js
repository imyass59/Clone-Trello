export function lightenHexColor(hexColor, percent) {
    // Convert hex color to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate new RGB values
    const percentDecimal = percent / 100;
    const newR = Math.min(Math.round(r + (255 - r) * percentDecimal), 255);
    const newG = Math.min(Math.round(g + (255 - g) * percentDecimal), 255);
    const newB = Math.min(Math.round(b + (255 - b) * percentDecimal), 255);
    // Convert new RGB values to hex
    const newHex = ((newR << 16) | (newG << 8) | newB).toString(16);
    return '#' + newHex.padStart(6, '0');
}