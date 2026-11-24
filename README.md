# Playwright QA Framework

A compact, production-style test automation framework built with **Playwright + TypeScript**, maintained by [AssureAI Labs](https://assureailabs.in).

It demonstrates how I structure automation for real projects: maintainable page objects, reusable fixtures, UI and API layers, and CI with published reports.

## What's inside

| Area | Details |
|---|---|
| UI tests | Login, sorting, cart and end-to-end checkout against [saucedemo.com](https://www.saucedemo.com) (a public practice site) |
| API tests | Schema, filtering, create and negative checks against [JSONPlaceholder](https://jsonplaceholder.typicode.com) |
| Design | Page Object Model, custom fixtures (including a logged-in fixture), `data-test` selectors |
| Reporting | Allure report (published to GitHub Pages) and Playwright HTML report, plus traces, screenshots and videos on failure |
| CI | GitHub Actions: type-check, run tests, publish the latest Allure report |

**Live test report:** https://suryam2498.github.io/playwright-qa-framework/

## Project structure

```
pages/        Page objects (one class per page)
fixtures/     Custom Playwright fixtures and test data
tests/ui/     Browser tests
tests/api/    API tests
playwright.config.ts   Projects: chromium (UI) and api
```

## Run it

```bash
npm install
npx playwright install chromium
npm test              # everything
npm run test:ui       # UI only
npm run test:api      # API only
npm run report        # open the Playwright HTML report
npm run allure:generate && npm run allure:open   # Allure report (needs Java)
```

## Design choices

- **Locators:** `data-test` attributes first, which are stable across UI redesigns.
- **Fixtures over setup code:** `loggedInInventory` gives a test an authenticated page without repeating login steps.
- **Separate projects:** UI and API suites run independently and in parallel.
- **Retries and traces only in CI**, so local runs stay fast and failures in CI are debuggable.

## Services

AssureAI Labs offers test automation, LLM/RAG evaluation, performance and security testing. Contact: hello@assureailabs.in
