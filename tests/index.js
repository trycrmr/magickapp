import magickapp from '../magickapp.js'
import tests from './tests.js'

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

const prettyPrintOutput = async (testResults, ignorePasses) => { // [{ args, expectedOutput, actualOutput, isPass, err }]
  let aggregates = testResults.reduce((aggregates, thisResult, currIdx, origArr) => {
    let passed = aggregates.passed
    let failed = aggregates.failed
    let errored = aggregates.errored

    if(thisResult.isPass) ++passed
    if(!thisResult.isPass) { 
      ++failed
      console.info(`
This test with these arguments failed: ${JSON.stringify(thisResult.args, null, 2)}`) // Purposeful line break
    }
    if(thisResult.err !== null) {
      ++errored 
      console.error(thisResult.err)
    }

    // if(currIdx + 1 === origArr.length && failed === 0 && errored === 0) console.info('All tests passed.')

    return { passed, failed, errored }
  }, { passed: 0, failed: 0, errored: 0})

  return aggregates
}

(async (testConfigs) => {
  try {
    let results = await testRunner(magickapp, tests)
    console.info(await prettyPrintOutput(results))
    process.exit()
  } catch(err) {
    console.error(err)
    process.exit()
  }
})()