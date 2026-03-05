import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {

 onTestEnd(test: TestCase, result: TestResult){

  console.log("------TEST RESULT------");

  console.log(`Test Name: ${test.title}`);

  console.log(`Status: ${result.status}`);

 }

}

export default CustomReporter;