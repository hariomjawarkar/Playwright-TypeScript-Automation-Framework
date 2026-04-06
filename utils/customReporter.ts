import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {

  onTestEnd(test: TestCase, result: TestResult) {
    console.log("------TEST RESULT------");
    console.log(`Test Name: ${test.title}`);
    console.log(`Status: ${result.status}`);
    
    if (result.status !== 'passed' && result.error) {
      console.error(`Error: ${result.error.message}`);
      if (result.error.stack) {
        console.error(`Stack: ${result.error.stack}`);
      }
    }
  }

}

export default CustomReporter;