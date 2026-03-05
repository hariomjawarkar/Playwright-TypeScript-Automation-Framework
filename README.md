# Playwright TypeScript Automation Framework 🚀

A professional, industrial-grade test automation framework built with **Playwright** and **TypeScript**. This framework is designed for scalability, reliability, and high-performance testing of modern web applications.

---

## 🏗️ Architecture & Features

This framework implements several best practices in test automation:

*   **Page Object Model (POM):** Ensures reusable and maintainable codebase.
*   **Fixtures & Hooks:** Custom Playwright fixtures for clean test setup and teardown.
*   **Dual-Layer Testing:** Comprehensive coverage for both **UI** and **API** end-to-end scenarios.
*   **Data-Driven Testing:** Seamless integration with **Excel (.xlsx)** and **JSON** for test data management.
*   **Logging & Utilities:** Custom logger and utility functions for file handling and data parsing.
*   **Advanced Reporting:** 
    *   📊 **Allure Reports** for rich, interactive execution history.
    *   📑 **Playwright HTML Reports** for localized debugging.
*   **CI/CD Ready:** Pre-configured GitHub Actions workflow for automated regression on push/pull requests.
*   **Cross-Browser Testing:** Configured to run on Chromium, Firefox, and WebKit (Safari).

---

## 📂 Project Structure

```text
├── .github/workflows/      # CI/CD pipelines (GitHub Actions)
├── api/                    # API-specific test suites
├── config/                 # Environment and global configurations
├── fixtures/               # Playwright custom fixtures
├── pages/                  # Page Object Model classes
├── test-data/              # Test data files (JSON, XLSX)
├── tests/                  # UI and End-to-End test suites
├── utils/                  # Common utilities (Logger, ExcelReader)
├── playwright.config.ts    # Main Playwright configuration
└── package.json            # Project dependencies and scripts
```

---

## 🛠️ Prerequisites

*   **Node.js:** v18.0.0 or higher
*   **npm:** v9.0.0 or higher

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/hariomjawarkar/Playwright-TypeScript-Automation-Framework.git
cd Playwright-TypeScript-Automation-Framework
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

---

## 🧪 Running Tests

### Execute all tests
```bash
npm test
```

### Run specific test suites (Smoke)
```bash
npm run smoke
```

### Run tests in Headed mode
```bash
npx playwright test --headed
```

### Debugging tests
```bash
npx playwright test --debug
```

---

## 📊 Reports

### Playwright Default Report
```bash
npm run report
```

### Allure Report Generation
To generate and view the interactive Allure report:
```bash
# Generate report
npx allure generate allure-results --clean -o allure-report

# Open report
npx allure open allure-report
```

---

## 🤖 CI/CD Integration

The project includes a `.github/workflows/playwright.yml` file which automatically:
1. Installs dependencies.
2. Installs browsers.
3. Executes the full test suite.
4. Uploads reports as artifacts on every push to the `main` branch.

---

## 👨‍💻 Author
**Hariom Jawarkar**
- GitHub: [@hariomjawarkar](https://github.com/hariomjawarkar)
