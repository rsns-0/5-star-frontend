# 5-Star Frontend

- Tests
  - E2E requires a running server + your own account. Set up a chrome debug profile at port 9222, log in with it, and run yarn e2e for tests. Be aware the tests are currently flaky and the Playwright team is currently working on a fix for routing issues [link](https://github.com/microsoft/playwright/issues/23781)
  - Run yarn test for regular tests which should be stable.