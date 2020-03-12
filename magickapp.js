import util from 'util'
import child_process from 'child_process'
const execSync = child_process.execSync
import fs from 'fs'
import getConvertOptions from './convert-options.js' // returns an array of functions that return {input: string, output: string, nickname: string}

const magickapp = async (args) => {
  let srcImage, destDirName 

  // presumed "convert" is the imagemagick command being run
  const runCommand = async (convertCommand) => {
    try {
      console.info(`${convertCommand}`)
      let commandResult = execSync(convertCommand, { encoding: 'utf8' });
      return commandResult
    } catch(err) {
      throw err
    }
  }

  const convert = async (options, ...args) => {
    try {
      let commandsRun = []
      let i = 0
      let commandsToRun = options
      .map(thisOption => getConvertOptions(thisOption))
      .flat()
      .reduce((acc, thisCommand, currIdx, origArr) => {
        let theseCommands = srcImage.map(thisImage => {
          return `convert ${thisCommand().input} ${process.cwd()}/src-image/${thisImage} ${thisCommand().output} ${process.cwd()}/${destDirName}/${thisImage.replace('.','-')}-${thisCommand().nickname}${thisImage.substring(thisImage.lastIndexOf('.'), thisImage.length)}`
        })
        return [ ...acc, ...theseCommands ]
      }, [])

      console.info(`About to create ${commandsToRun.length} images...`)
      while(commandsToRun.length > i) {
        try {
          if(!args.includes('dryrun')) {
            let commandResult = await runCommand(commandsToRun[i])
            commandsRun.push({ commandResult, commandRun: commandsToRun[i] })
          } else {
            let commandResult = 'Command not run as Magickapp was run with --dryrun argument'
            commandsRun.push({ commandResult, commandRun: commandsToRun[i] })
          }
        } catch(err) {
          throw err
        }
        i++
      }
      return commandsRun

    } catch(err) {
      throw err
    }
  }

  if(args.length <= 2) {
    const defaultResponse = `You found the Magickapp help! Pass an option, such as "grayscale", to generate images with all possible option configurations (within reason) applied to the source image. "node index.js grayscale", for example. Review the README for additional details and open an issue if you have...issues.`
    console.info(defaultResponse) // Purposeful initial line break 
    return defaultResponse
  } else {
    
    srcImage = fs.readdirSync('./src-image')
    if(srcImage.length === 0) {
      throw new Error('No source image found. Please put an image to use in the src-image directory and rerun MagickApp.')
    }

    let options = args.length === 2 ? ['help'] : args.slice(2) // trims off the first two default node args
    let magickappArgs = options.filter(thisOption => thisOption.includes('--')).map(thisArg => thisArg.slice(2).toLowerCase())
    options = options.filter(thisOption => !thisOption.includes('--'))
    destDirName = `dest-${options.join('-')}`
    if(!fs.existsSync(destDirName)) fs.mkdirSync(destDirName) // If exists, convert will overwrite whatever is in there 
    try {
      let results = await convert(options, ...magickappArgs);
      return results.map(thisResult => thisResult.commandRun)
    } catch(err) {
      throw err
    }
  }

}

export default magickapp