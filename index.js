import util from 'util'
import child_process from 'child_process'
import fs from 'fs'
import getConvertOptions from './convert-options.js' // returns an array of functions that return {input: string, output: string, nickname: string}

(async (args) => {
  const exec = util.promisify(child_process.exec);
  const srcImage = `${fs.readdirSync('./src-image')}`
  const destDirName = `${srcImage.replace('.','-')}-${new Date().toISOString().replace(/ /g,'-')}`

  // presumed "convert" is the imagemagick command being run
  const runCommand = async (convertCommand) => {
    try {
      console.info(`
Executing >>> ${convertCommand}`) // Purposeful line breaks
      await exec(convertCommand);
    } catch(err) {
      throw err
    }
  }

  const convert = async (options) => {
    try {
      options.forEach( async (thisOption) => {
        let convertCommands = await getConvertOptions(thisOption)
        if(convertCommands.length === 0) {
          console.error(`
No imagemagick commands associated with the "${thisOption}" option were found. It will be ignored.`) // Purposeful line break
        } else {
          console.info(`
Applying ${thisOption} to ${srcImage}...`)
          convertCommands.forEach((thisCommand) => {
            runCommand(`convert ${thisCommand().input} ${process.cwd()}/src-image/${srcImage} ${thisCommand().output} ${process.cwd()}/${destDirName}/${srcImage.replace('.','-')}-${thisCommand().nickname}${srcImage.substring(srcImage.lastIndexOf('.'), srcImage.length)}`)
          }) 
        }
      })
    } catch(err) {
      throw err
    }
  }

  if(args.length <= 2) {
    console.info(`
You found the Magickapp help! Pass an option, such as "grayscale", to generate images with all possible option configurations (within reason) applied to the source image. "node index.js grayscale", for example. Review the README for additional details and open an issue if you have...issues.
    `) // Purposeful initial line break 
    process.exit()
  } else {
    fs.mkdirSync(destDirName)
    let options = args.length === 2 ? ['help'] : args.slice(2) // trims off the first two default node args
    try {
      await convert(options);
    } catch(err) {
      console.error(err)
    }
  }

}

)(process.argv)