import { hex2rgb, hsl2rgb } from './mccode';

const whiteHEX = '#ffffff'
const whiteRGB = { red: 1, green: 1, blue: 1, alpha: 1 }
const whiteHSL = { hue: 0, saturation: 0, lightness: 100, alpha: 1}

describe('Color', () => {

  describe('hex2rgb', () => {
    it('should return valid RGB color', () => {
      expect(hex2rgb(whiteHEX)).toEqual(whiteRGB)
      expect(hex2rgb('fff')).toEqual(whiteRGB)
    })

    it('should throw error when there is an error', () => {
      expect(() => hex2rgb('wrong')).toThrowError()
    })
  })

  describe('hsl2rgb', () => {
    it('should return RGB from HSL', () => {
      expect(hsl2rgb(whiteHSL)).toEqual(whiteRGB)
    })

  })

  describe('hsb2rgb', () => {

  })
})