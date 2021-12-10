import chroma from 'chroma-js'
import * as P from 'polished'

import { generateAccentPalette, generateLightPalette, generateDarkPalette, hsb2rgb, rgb2hsb, hex2rgb } from './mccode';

// Read and implement this https://vis4.net/chromajs/#chroma-contrast
export type HEXColor = string;
export enum PaletteAlgorithm {
  'SIMPLE' = 'SIMPLE',
  'BASIC' = 'BASIC',
  'BUCKNER' = 'BUCKNER',
  'MATIRIAL_ACCENT' = 'MATIRIAL_ACCENT',
  'MATIRIAL_DARK' = 'MATIRIAL_DARK',
  'MATIRIAL_LIGHT' = 'MATIRIAL_LIGHT',
}

function runNtimes(method: (step: number) => any, step: number = 1, results: number = 5): HEXColor[]  {
  const list = [];
  for (let i = step; i <= results; i = i + step) {
    list.push(method(i));
  }
  return list;
}

export function invertedColor(color: string): string {
  try {
    return P.invert(color);
  } catch(e) {
    return color;
  }
}

export function randomColor(): string {
  return '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
}

export function complimentTextForColor(color: string): string {
  const [red, green, blue] = chroma(color).rgb();
  return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff';
}

export function darkenScale(color: string, step: number = 1, results: number = 5): HEXColor[] {
  const c = chroma(color);
  return runNtimes((n: number) => c.darken(n).hex('rgb'), step, results);
}

export function brightenScale(color: string, step: number = 1, results: number = 5): HEXColor[] {
  const c = chroma(color);
  return runNtimes((n: number) => c.brighten(n).hex('rgb'), step, results).reverse();

}

export function saturateScale(color: string, step: number = 1, results: number = 5): HEXColor[] {
  const c = chroma(color);
  return runNtimes((n: number) => c.saturate(n).hex('rgb'), step, results).reverse();
}

export function desaturateScale(color: string, step: number = 1, results: number = 5): HEXColor[] {
  const c = chroma(color);
  return runNtimes((n: number) => c.desaturate(n).hex('rgb'), step, results);
}

export function colorPalette(color: string, algorithm: PaletteAlgorithm = PaletteAlgorithm.SIMPLE): any[] {


  if (algorithm === PaletteAlgorithm.SIMPLE) {
    const baselight = '#FFFFFF';
    const basedark = '#000000';
    const p = chroma.scale([baselight, color, basedark]).colors(13);

    return [
      { id: 50, color: p[1] },
      { id: 100, color: p[2] },
      { id: 200, color: p[3] },
      { id: 300, color: p[4] },
      { id: 400, color: p[5] },
      { id: 500, color: color },
      { id: 600, color: p[7] },
      { id: 700, color: p[8] },
      { id: 800, color: p[9] },
      { id: 900, color: p[10] },
    ];
  }

  if (algorithm ===  PaletteAlgorithm.BASIC) {
    const p = chroma(color);
    const factor = 10;
    return [
      { id: 50, color: p.brighten(7.2).hex('rgb') },
      { id: 100, color: p.brighten(37/factor).hex('rgb') },
      { id: 200, color: p.brighten(26/factor).hex('rgb') },
      { id: 300, color: p.brighten(12/factor).hex('rgb') },
      { id: 400, color: p.brighten(6/factor).hex('rgb') },
      { id: 500, color: p.hex('rgb') },
      { id: 600, color: p.darken(6/factor).hex('rgb') },
      { id: 700, color: p.darken(12/factor).hex('rgb') },
      { id: 800, color: p.darken(18/factor).hex('rgb') },
      { id: 900, color: p.darken(24/factor).hex('rgb') },
      { id: 'A100', color: p.brighten(5).saturate(3).hex('rgb') },
      { id: 'A200', color: p.brighten(3).saturate(3).hex('rgb') },
      { id: 'A400', color: p.brighten(1.5).saturate(1.5).hex('rgb') },
      { id: 'A700', color: p.brighten(0.5).saturate(5).hex('rgb') },
    ]
  }

  if (algorithm === PaletteAlgorithm.BUCKNER) {
    const p = chroma;
    const baseLight = '#FFFFFF';
    const baseDark = chroma.blend(color, '#000000', 'multiply').hex('rgb');
    const factor = 100;

    return [
      { id: 50, color: p.mix(baseLight, color, 0.12, 'rgb').hex('rgb') },
      { id: 100, color: p.mix(baseLight, color, 0.30, 'rgb').hex('rgb') },
      { id: 200, color: p.mix(baseLight, color, 0.50, 'rgb').hex('rgb') },
      { id: 300, color: p.mix(baseLight, color, 0.70, 'rgb').hex('rgb') },
      { id: 400, color: p.mix(baseLight, color, 0.85, 'rgb').hex('rgb') },
      { id: 500, color: color },
      { id: 600, color: p.mix(baseDark, color, 0.87, 'rgb').hex('rgb') },
      { id: 700, color: p.mix(baseDark, color, 0.70, 'rgb').hex('rgb') },
      { id: 800, color: p.mix(baseDark, color, 0.54, 'rgb').hex('rgb') },
      { id: 900, color: p.mix(baseDark, color, 0.25, 'rgb').hex('rgb') },
    ]
  }

  if (algorithm === PaletteAlgorithm.MATIRIAL_ACCENT) {
    const COLOR = hsb2rgb(rgb2hsb(hex2rgb(color.replace('#', ''))))
    return generateAccentPalette(COLOR).map((c: any, index: number) => {
      return {id: index * 100 || 50, color: chroma.rgb(c.red, c.green, c.blue).hex('rgb') }
    })
  }
  if (algorithm === PaletteAlgorithm.MATIRIAL_LIGHT) {
    const COLOR = hsb2rgb(rgb2hsb(hex2rgb(color.replace('#', ''))))

    return generateLightPalette(COLOR).map((c: any, index: number) => {
      return { id: index * 100 || 50, color: chroma.rgb(c.red, c.green, c.blue).hex('rgb') };
    });
  }
  if (algorithm === PaletteAlgorithm.MATIRIAL_DARK) {
    const COLOR = hsb2rgb(rgb2hsb(hex2rgb(color.replace('#', ''))))

    return generateDarkPalette(COLOR).map((c: any, index: number) => {
      return { id: index * 100 || 50, color: chroma.rgb(c.red, c.green, c.blue).hex('rgb') };
    });
  }

  return []
}