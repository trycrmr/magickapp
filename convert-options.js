// Returns an array of functions to run with convert that each produce an image

const getConvertOptions = (option, optionArgs) => {
  let allOptions = []
  switch(option) {
    case 'adaptive‑blur': {}
    case 'adaptive‑resize': {}
    case 'adaptive‑sharpen': {}
    case 'adjoin': {}
    case 'affine': {}
    case 'alpha': {}
    case 'annotate': {}
    case 'antialias': {}
    case 'append': {}
    case 'attenuate': {}
    case 'authenticate': {}
    case 'auto‑gamma': {}
    case 'auto‑level': {}
    case 'auto‑orient': {}
    // case 'auto‑threshold': {} // Does not exist in ImageMagick 6.9.7-4 Q16 x86_64 20170114 (Terry's local copy)
    case 'backdrop': {}
    case 'background': {}
    case 'bench': {}
    case 'bias': {}
    case 'black‑point‑compensation': {}
    case 'black‑threshold': {}
    case 'blend': {}
    case 'blue‑primary': {}
    case 'blue-shift': {
      let increment = 0.4
      allOptions = [ ...allOptions,
        ...new Array(10)
          .fill(0)
          .map((imgFunc, idx) => {
            let value = (Math.round(increment * idx / 0.1) * 0.1).toFixed(1) // Rounding to the tenths place, Math.round(num / granularity) * granularity
            imgFunc = () => { return {input: '', output: `-blue-shift ${value}` , nickname: `blue-shift-${value}`} }
            return imgFunc
          })
      ]
      break
    }
    case 'blur': {} // works like this convert toby-ziegler.jpg -blur 46x48 ./blur/toby.jpg . Not sure it's so practical, but may implement later. 
    case 'border': {} // works like this convert toby-ziegler.jpg -border 10x10 ./border/toby.jpg
    case 'bordercolor': {}
    case 'borderwidth': {}
    case 'brightness-contrast': {
      let brightnessPercentages = [-80,-60,-40,-20,0,20,40,60,80]
      let contrastPercentages = [-80,-60,-40,-20,0,20,40,60,80]
      let brightnessContrastFunctions = contrastPercentages.reduce((prev, curr, currIdx, arr) => {
        let theseBrightnessContrastFunctions = []
        for(let i = 0; i < brightnessPercentages.length; i++ ) {
          let brightnessContrastObj = {input: '', output: `-brightness-contrast ${brightnessPercentages[i]}x${curr}` , nickname: `brightness-contrast-${brightnessPercentages[i]}x${curr}`}
          theseBrightnessContrastFunctions.push(() => { return brightnessContrastObj } )
        }
        return [...prev, ...theseBrightnessContrastFunctions]
      }, [])
      allOptions = [ ...allOptions, ...brightnessContrastFunctions ]
      break
    } // works like this convert toby-ziegler.jpg -brightness-contrast -40x-80 ./brightness-contrast/toby.jpg
    case 'cache': {}
    case 'canny': {}
    case 'caption': {}
    case 'cdl': {}
    case 'channel': {}
    case 'charcoal': {}
    case 'channel‑fx': {}
    case 'chop': {}
    case 'clahe': {}
    case 'clamp': {}
    case 'clip': {}
    case 'clip‑mask': {}
    case 'clip‑path': {}
    case 'clone': {}
    case 'clut': {}
    case 'coalesce': {}
    case 'colorize': {}
    case 'colormap': {}
    case 'color‑matrix': {}
    case 'colors': {}
    case 'colorspace': {}
    case 'color‑threshold': {}
    case 'combine': {}
    case 'comment': {}
    case 'compare': {}
    case 'complex': {}
    case 'compose': {}
    case 'composite': {}
    case 'compress': {}
    case 'connected‑components': {}
    case 'contrast': {}
    case 'contrast‑stretch': {}
    case 'convolve': {}
    case 'copy': {}
    case 'crop': {}
    case 'cycle': {}
    case 'debug': {}
    case 'decipher': {}
    case 'deconstruct': {}
    case 'define': {}
    case 'delay': {}
    case 'delete': {}
    case 'density': {}
    case 'depth': {}
    case 'descend': {}
    case 'deskew': {}
    case 'despeckle': {}
    case 'direction': {}
    case 'displace': {}
    case 'display': {}
    case 'dispose': {}
    case 'dissimilarity‑threshold': {}
    case 'dissolve': {}
    case 'distort': {}
    case 'distribute‑cache': {}
    case 'dither': {}
    case 'draw': {}
    case 'duplicate': {}
    case 'edge': {}
    case 'emboss': {}
    case 'encipher': {}
    case 'encoding': {}
    case 'endian': {}
    case 'enhance': {}
    case 'equalize': {}
    case 'evaluate': {}
    case 'evaluate‑sequence': {}
    case 'extent': {}
    case 'extract': {}
    case 'family': {}
    case 'features': {}
    case 'fft': {}
    case 'fill': {}
    case 'filter': {}
    case 'flatten': {}
    case 'flip': {}
    case 'floodfill': {}
    case 'flop': {}
    case 'font': {}
    case 'foreground': {}
    case 'format': {}
    case 'format[identify]': {}
    case 'frame': {}
    case 'frame[import]': {}
    case 'function': {}
    case 'fuzz': {}
    case 'fx': {}
    case 'gamma': {
      let increment = 0.3
      allOptions = [ ...allOptions,
        ...new Array(50)
          .fill(0)
          .map((imgFunc, idx) => {
            let value = (Math.round(increment * (idx + 1) / 0.1) * 0.1).toFixed(1) // Rounding to the tenths place, Math.round(num / granularity) * granularity
            imgFunc = () => { return {input: '', output: `-gamma ${value}` , nickname: `gamma-${value}`} }
            return imgFunc
          })
      ]
      break
    }
    case 'gaussian‑blur': {}
    case 'geometry': {}
    case 'gravity': {}
    case 'grayscale': {
      allOptions = [ ...allOptions, ...[
        () => { return {input: '', output: '-grayscale Rec601Luma', nickname: 'Rec601Luma'} },
        () => { return {input: '', output: '-grayscale Rec601Luminance', nickname: 'Rec601Luminance'} },
        () => { return {input: '', output: '-grayscale Rec709Luma', nickname: 'Rec709Luma'} },
        () => { return {input: '', output: '-grayscale Rec709Luminance', nickname: 'Rec709Luminance'} },
      ]]
      break
    }
    case 'green‑primary': {}
    case 'hald‑clut': {}
    case 'help': {}
    case 'highlight‑color': {}
    case 'hough‑lines': {}
    case 'iconGeometry': {}
    case 'iconic': {}
    case 'identify': {}
    case 'ift': {}
    case 'immutable': {}
    case 'implode': {}
    case 'insert': {}
    case 'intensity': {}
    case 'intent': {}
    case 'interlace': {}
    case 'interpolate': {}
    case 'interline‑spacing': {}
    case 'interword‑spacing': {}
    case 'kerning': {}
    case 'kmeans': {}
    case 'kuwahara': {}
    case 'label': {}
    case 'lat': {}
    case 'layers': {}
    case 'level': {}
    case 'level‑colors': {}
    case 'limit': {}
    case 'linear‑stretch': {}
    case 'linewidth': {}
    case 'liquid‑rescale': {}
    case 'list': {}
    case 'log': {}
    case 'loop': {}
    case 'lowlight‑color': {}
    case 'magnify': {}
    case 'map': {}
    case 'map[stream]': {}
    case 'mattecolor': {}
    case 'median': {}
    case 'mean‑shift': {}
    case 'metric': {}
    case 'mode': {}
    case 'modulate': {}
    case 'moments': {}
    case 'monitor': {}
    case 'monochrome': {}
    case 'morph': {}
    case 'morphology': {}
    case 'mosaic': {}
    case 'motion‑blur': {}
    case 'name': {}
    case 'negate': {}
    case 'noise': {}
    case 'normalize': {}
    case 'opaque': {}
    case 'ordered‑dither': {}
    case 'orient': {}
    case 'page': {}
    case 'paint': {
      let increment = 1
      allOptions = [ ...allOptions,
        () => { return {input: '', output: `-paint -1` , nickname: `print--1`} },
        ...new Array(18)
          .fill(0)
          .map((imgFunc, idx) => {
            let value = (Math.round(increment * (idx) / 1) * 1).toFixed(0) // Rounding to the tenths place, Math.round(num / granularity) * granularity
            imgFunc = () => { return {input: '', output: `-paint ${value}` , nickname: `print-${value}`} }
            return imgFunc
          })
      ]
      break
    }
    case 'path': {}
    case 'pause[animate]': {}
    case 'pause[import]': {}
    case 'perceptible': {}
    case 'ping': {}
    case 'pointsize': {}
    case 'polaroid': {}
    case 'poly': {}
    case 'posterize': {}
    case 'precision': {}
    case 'preview': {}
    case 'print': {}
    case 'process': {}
    case 'profile': {}
    case 'quality': {}
    case 'quantize': {}
    case 'quiet': {}
    case 'radial‑blur': {}
    case 'raise': {}
    case 'random‑threshold': {}
    case 'range‑threshold': {}
    case 'read‑mask': {}
    case 'red‑primary': {}
    case 'regard‑warnings': {}
    case 'region': {}
    case 'remap': {}
    case 'remote': {}
    case 'render': {}
    case 'repage': {}
    case 'resample': {}
    case 'resize': {}
    case 'respect‑parentheses': {}
    case 'reverse': {}
    case 'roll': {}
    case 'rotate': {}
    case 'sample': {}
    case 'sampling‑factor': {}
    case 'scale': {}
    case 'scene': {}
    case 'screen': {}
    case 'seed': {}
    case 'segment': {}
    case 'selective‑blur': {}
    case 'separate': {}
    case 'sepia‑tone': {}
    case 'set': {}
    case 'shade': {}
    case 'shadow': {}
    case 'shared‑memory': {}
    case 'sharpen': {}
    case 'shave': {}
    case 'shear': {}
    case 'sigmoidal‑contrast': {}
    case 'silent': {}
    case 'similarity‑threshold': {}
    case 'size': {}
    case 'sketch': {}
    case 'smush': {}
    case 'snaps': {}
    case 'solarize': {}
    case 'sparse‑color': {}
    case 'splice': {}
    case 'spread': {}
    case 'statistic': {}
    case 'stegano': {}
    case 'stereo': {}
    case 'storage‑type': {}
    case 'stretch': {}
    case 'strip': {}
    case 'stroke': {}
    case 'strokewidth': {}
    case 'style': {}
    case 'subimage‑search': {}
    case 'swap': {}
    case 'swirl': {}
    case 'synchronize': {}
    case 'taint': {}
    case 'text‑font': {}
    case 'texture': {}
    case 'threshold': {
      let thresholdPercentages = [20,40,60,80]
      let channelTypes = [0,1,2,3]
      let thresholdFunctions = channelTypes.reduce((prev, curr, currIdx, arr) => {
        let theseThresholdArrayFunctions = []
        for(let i = 0; i < thresholdPercentages.length; i++ ) {
          let thresholdObj = {input: '', output: `-channel ${curr} -threshold ${thresholdPercentages[i]}%` , nickname: `threshold-channel${curr}-threshold${thresholdPercentages[i]}`}
          theseThresholdArrayFunctions.push(() => { return thresholdObj } )
        }
        return [...prev, ...theseThresholdArrayFunctions]
      }, [])
      allOptions = [ ...allOptions, ...thresholdFunctions ]
      break
    }
    case 'thumbnail': {}
    case 'tile': {}
    case 'tile‑offset': {}
    case 'tint': {}
    case 'title': {}
    case 'transform': {}
    case 'transparent': {}
    case 'transparent‑color': {}
    case 'transpose': {}
    case 'transverse': {}
    case 'treedepth': {}
    case 'trim': {}
    case 'type': {}
    case 'undercolor': {}
    case 'unique‑colors': {}
    case 'units': {}
    case 'unsharp': {}
    case 'update': {}
    case 'verbose': {}
    case 'version': {}
    case 'view': {}
    case 'vignette': {}
    case 'virtual‑pixel': {}
    case 'visual': {}
    case 'watermark': {}
    case 'wave': {}
    case 'wavelet‑denoise': {}
    case 'weight': {}
    case 'white‑point': {}
    case 'white‑threshold': {}
    case 'window': {}
    case 'window‑group': {}
    case 'write': {}
    case 'write‑mask': {}
    default: {}
  }
  return allOptions
}

export default getConvertOptions 