# Playwright Project

This project uses Playwright for automated testing of the Plieger website.

## Table of Contents

- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Logging](#logging)


## Setup

1. Clone the repository:

   ```sh
   git clone git@github.com:BigAFJohn/Playwright-TAF.git
   cd playwright-project

2. Install dependencies
    npm install

3. Test Structure
    tests/: Contains the test specifications.
    pageObjects/: Contains the Page Object Model (POM) classes.
    Data/: Contains the test data files.
    logger.js: Logger configuration using Winston.
    playwright.config.js: Playwright configuration file.

4. Logging 
Logging is implemented using Winston. Logs provide detailed information about test execution, including steps performed and errors encountered.