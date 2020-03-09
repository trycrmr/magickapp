import magickapp from './magickapp.js'

(async (args) => {
  try {
    let arrOfCommandsRun = await magickapp(args)
    console.info(JSON.stringify(arrOfCommandsRun, null, 2))
  } catch(err) {
    console.error(err)
    process.exit()
  }

})(process.argv)