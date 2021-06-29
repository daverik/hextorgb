type RGB = {
  red: number
  green: number
  blue: number
  alpha: number | null
}

/**
*
* MIT License
* Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
export const hexToRgba = (_hex: string): RGB => {

  let hex = _hex.replace("#", "")

  hex = hex.replace(/^#/, '');
  let alpha: null | number = null;

  if (hex.length === 8) {
    alpha = Number.parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  if (alpha !== null) {
    alpha = Math.round(alpha * 100) / 100
  }

  return { red, green, blue, alpha };
}

export const rgbToString = (rgb: RGB): string => {
  return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue}${rgb.alpha !== null ? `, ${rgb.alpha}` : ''})`
}