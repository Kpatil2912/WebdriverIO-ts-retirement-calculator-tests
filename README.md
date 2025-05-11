# WebDriverIO-TS-retirement-calculator-tests

Automated UI test suite for Securian's Retirement Savings Calculator using WebdriverIO and Jasmine. Developed as part of the ETQA Engineer Practical Interview Prework to demonstrate test automation best practices, including framework setup, test design, and validation of core calculator functionality.

This repository contains an automated UI test suite for Securian's Retirement Savings Calculator, developed using WebdriverIO and Jasmine. It demonstrates test automation best practices, including framework setup, test design, and validation of core calculator functionality. This project was created as part of the ETQA Engineer Practical Interview Prework.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Test Structure](#test-structure)
- [Reporting](#reporting)
  - [Generating Allure Report](#generating-allure-report)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v23.11.0)
- **npm** (v10.9.2)
- A modern web browser (e.g., Chrome, Firefox)

## Installation

1. Clone the repository:
   `bash
 git clone https://github.com/your-username/securian-retirement-calculator-tests.git
 `
2. Navigate to the project directory:
   `bash
 cd securian-retirement-calculator-tests
 `
3. Install dependencies:
   `bash
 npm install
 `

## Running Tests

To execute the test suite, run:

```bash
npm test
```

## Folder Structure

The project directory is organized as follows:

```
WebDriverIO-TS-RETIREMENT-CALCULATOR-TESTS/
├── allure-results/          # Allure test report files
├── archive/                 # Archived test runs
├── logs/                    # Log files
├── node_modules/            # Node.js dependencies
├── screenshots/             # Test screenshots
│   └── test/                # Test-specific screenshots
├── test/
│   ├── daoLayer/            # Data Access Objects
│   ├── dataLayer/           # Data management layer
│   ├── pageobjects/         # Page Object Model files
│   ├── specs/               # Test specifications
│   ├── testData/            # Test data files
│   └── util/                # Utility functions
├── video/                   # Test videos
├── .gitignore               # Git ignore file
├── package-lock.json        # npm lock file
├── package.json             # Project dependencies
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
└── wdio.conf.ts             # WebdriverIO configuration
```

## Test Structure

- **`specs/`**: Contains test specifications.
- **`util/`**: Utility functions and custom commands.
- **`config/`**: WebdriverIO configuration files.

## Reporting

Test results are generated in the `reports/` directory and can be viewed in a detailed HTML format.

### Generating Allure Report

To generate and view the Allure report:

1. Run the tests with the Allure reporter enabled:
   `bash
 npm run wdio
 `
2. Generate and open the report:
   `bash
 allure serve
 `

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   `bash
 git checkout -b feature/your-feature-name
 `
3. Commit your changes:
   `bash
 git commit -m "Add your message here"
 `
4. Push to your branch:
   `bash
 git push origin feature/your-feature-name
 `
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact:

- **Name**: Kiran Patil
- **Email**: [kiranqapatil@gmail.com](mailto:your.email@example.com)
- **GitHub**: [Kpatil2912](https://github.com/your-username)
