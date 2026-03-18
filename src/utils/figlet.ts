import figlet from "figlet";
import defaultFontData from "../fonts/delta-corps-priest-1";

const fontCache = new Map<string, string>();

export function textToAscii(
  text: string,
  fontData?: string
): Promise<string> {
  const font = fontData || defaultFontData;

  const fontKey = font.substring(0, 50);
  let fontName: string;

  if (!fontCache.has(fontKey)) {
    fontName = `custom-font-${fontCache.size}`;
    fontCache.set(fontKey, fontName);
    figlet.parseFont(fontName as figlet.Fonts, font);
  } else {
    fontName = fontCache.get(fontKey)!;
  }

  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      { font: fontName as figlet.Fonts },
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
