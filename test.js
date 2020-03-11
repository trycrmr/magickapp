import magickapp from '.'
import fs from 'fs'

let testConfigObj = {
  pathToLocal: process.cwd(),
  srcImageName: fs.readdirSync('./src-image'),
  defaultTerminalNodeArgs: [ process.argv[0], process.argv[1] ]
}

let tests = [{
  args: [...testConfigObj.defaultTerminalNodeArgs],
  expectedOutput: `You found the Magickapp help! Pass an option, such as "grayscale", to generate images with all possible option configurations (within reason) applied to the source image. "node index.js grayscale", for example. Review the README for additional details and open an issue if you have...issues.`
},
  {
  args: [...testConfigObj.defaultTerminalNodeArgs, 'grayscale', '--dryrun'], // takes imagemagick options and magickapp specific args with -- in front of them (ex. --dryrun)
  expectedOutput: [
    `convert  ${testConfigObj.pathToLocal}/src-image/${testConfigObj.srcImageName} -grayscale Rec601Luma ${testConfigObj.pathToLocal}/dest-grayscale/${testConfigObj.srcImageName.replace('.','-')}-Rec601Luma${testConfigObj.srcImageName.substring(testConfigObj.srcImageName.lastIndexOf('.'), testConfigObj.srcImageName.length)}`,
    `convert  /home/terrycreamer/dev/github-trycrmr/magickapp/src-image/toby-ziegler.jpg -grayscale Rec601Luminance /home/terrycreamer/dev/github-trycrmr/magickapp/dest-grayscale/toby-ziegler-jpg-Rec601Luminance.jpg`,
    `convert  /home/terrycreamer/dev/github-trycrmr/magickapp/src-image/toby-ziegler.jpg -grayscale Rec709Luma /home/terrycreamer/dev/github-trycrmr/magickapp/dest-grayscale/toby-ziegler-jpg-Rec709Luma.jpg`,
    `convert  /home/terrycreamer/dev/github-trycrmr/magickapp/src-image/toby-ziegler.jpg -grayscale Rec709Luminance /home/terrycreamer/dev/github-trycrmr/magickapp/dest-grayscale/toby-ziegler-jpg-Rec709Luminance.jpg`
  ]
}]

const testRunner = async (func, arrOfTests) => {
  let testResults = []
  let i = 0
  while(testResults.length < arrOfTests.length) {
    try {
      let actualOutput = await func(arrOfTests[i].args)
      let isPass = actualOutput instanceof Array ? arrOfTests[i].expectedOutput.join('') === actualOutput.join('') : arrOfTests[i].expectedOutput === actualOutput
      testResults.push({
        args: arrOfTests[i].args,
        expectedOutput: arrOfTests[i].expectedOutput,
        actualOutput,
        isPass,
        err: null
      })
    } catch(err) {
      testResults.push({
        args: arrOfTests[i].args,
        expectedOutput: arrOfTests[i].expectedOutput,
        actualOutput: null,
        isPass: false,
        err: err.stack
      })
    }
    i++
  }
  return testResults
}

(async (testConfigs) => {
  try {
    let results = await testRunner(magickapp, tests)

    console.info(JSON.stringify(results, null, 2))
    process.exit()
  } catch(err) {
    console.error(err)
    process.exit()
  }
})()

// (async (args) => {
//   try {
//     let arrOfCommandsRun = await magickapp(args)
//     console.info(JSON.stringify(arrOfCommandsRun, null, 2))
//   } catch(err) {
//     console.error(err)
//     process.exit()
//   }

// })(process.argv)