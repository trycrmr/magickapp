import util from 'util'
import child_process from 'child_process'
import fs from 'fs'
import getConvertOptions from './convert-options.js' // returns an array of functions that return {input: string, output: string, nickname: string}

const magickapp = async (args) => {
  let srcImage, destDirName

  // presumed "convert" is the imagemagick command being run
  const runCommand = async (convertCommand) => {
    const exec = util.promisify(child_process.exec);
    try {
//       console.info(`
// Executing >>> ${convertCommand}`) // Purposeful line breaks
      await exec(convertCommand);
    } catch(err) {
      throw err
    }
  }

  const convert = async (options, ...args) => {
    try {
      let commandsRun = []
      options.forEach( async (thisOption) => {
        let convertCommands = await getConvertOptions(thisOption)
        if(convertCommands.length === 0) {
          console.error(`
No imagemagick commands associated with the "${thisOption}" option were found. It will be ignored.`) // Purposeful line break
        } else {
          convertCommands.forEach((thisCommand) => {
            if(srcImage.length === 0) {
              console.error(`
              No images in the src-image directory. Please add an image and rerun Magickapp.`) // Purposeful line break
            } else {
              srcImage.forEach(thisImage => {
                let commandToRun = `convert ${thisCommand().input} ${process.cwd()}/src-image/${thisImage} ${thisCommand().output} ${process.cwd()}/${destDirName}/${thisImage.replace('.','-')}-${thisCommand().nickname}${thisImage.substring(thisImage.lastIndexOf('.'), thisImage.length)}`
                commandsRun.push(commandToRun)
                // console.info(`
                // Applying ${thisOption} to ${thisImage}...`)
                if(!args.includes('dryrun')) {
                  runCommand(commandToRun)
                }
              })
            }
          }) 
        }
      })
      return commandsRun
    } catch(err) {
      throw err
    }
  }

  if(args.length <= 2) {
    console.info(`
You found the Magickapp help! Pass an option, such as "grayscale", to generate images with all possible option configurations (within reason) applied to the source image. "node index.js grayscale", for example. Review the README for additional details and open an issue if you have...issues.
    `) // Purposeful initial line break 
  } else {
    srcImage = fs.readdirSync('./src-image')
    let options = args.length === 2 ? ['help'] : args.slice(2) // trims off the first two default node args
    let magickappArgs = options.filter(thisOption => thisOption.includes('--')).map(thisArg => thisArg.slice(2).toLowerCase())
    options = options.filter(thisOption => !thisOption.includes('--'))
    destDirName = `dest-${options.join('-')}`
    if(!fs.existsSync(destDirName)) fs.mkdirSync(destDirName) // If exists, convert will overwrite whatever is in there 
    try {
      return await convert(options, ...magickappArgs);
    } catch(err) {
      console.error(err)
    }
  }

}

export default magickapp