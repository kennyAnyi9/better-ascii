import figlet from "figlet";

const DEFAULT_FONT = "Delta Corps Priest 1" as figlet.Fonts;

// Cache for parsed fonts to avoid re-parsing
const fontCache = new Map<string, string>();

/**
 * Converts text to ASCII art using figlet
 * @param text - The text to convert
 * @param fontData - Optional font data to use (if not provided, uses default Delta Corps Priest 1 font)
 * @returns Promise that resolves to ASCII text as string
 */
export async function textToAscii(
  text: string,
  fontData?: string
): Promise<string> {
  // Load font data
  const font = fontData || (await import("../fonts/delta-corps-priest-1")).default;

  // Generate a unique font name based on font data hash
  const fontKey = font.substring(0, 50); // Use first 50 chars as key
  let fontName: string;

  if (!fontCache.has(fontKey)) {
    // Generate unique font name
    fontName = `custom-font-${fontCache.size}`;
    fontCache.set(fontKey, fontName);

    // Parse and register the font
    figlet.parseFont(fontName as figlet.Fonts, font);
  } else {
    fontName = fontCache.get(fontKey)!;
  }

  // Convert text to ASCII
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: fontName as figlet.Fonts,
      },
      (err: Error | null, data: string | undefined) => {
        if (err) {
          reject(new Error("Failed to generate ASCII text: " + err.message));
        } else if (!data) {
          reject(new Error("No ASCII text generated"));
        } else {
          resolve(data);
        }
      }
    );
  });
}
