# Sokonis — Developer Friction Log

**Project:** Sokonis Alexa/AWS Open Source Integration  
**Hackathon:** Amazon Build, Ship, Shape (2026)  
**Repository:** https://github.com/chrisndirangu54/Sokonis-open-source

This log distinguishes observed implementation constraints from unverified deployment issues. It does not assert that AWS or Alexa produced errors that have not been observed.

## 1. Integrating Alexa with an existing Firebase application

- **Task attempted:** Extend Sokonis, a Flutter/Firebase grocery marketplace, with conversational functionality.
- **Steps taken:** Implemented an Alexa custom-skill handler and grocery product-search/meal-suggestion intents; authored AWS SAM configuration and an adapter for Firestore.
- **Expected:** A straightforward voice-to-grocery-service path while retaining Firebase as the application backend.
- **Actual:** A separate service layer was needed to translate voice requests into grocery operations. Source code was published, but live Alexa-to-Firebase operation and AWS deployment remain unverified.
- **Severity:** Important.
- **Workaround:** Isolated Alexa intent handlers, grocery logic, Firebase storage, and deployment definitions into separate modules.
- **Actionable suggestion:** Provide an official example of Alexa + Lambda + Firebase Authentication + Firestore with secure account linking.

## 2. Context-aware grocery requests

- **Task attempted:** Enable product search, meal suggestions, and shopping-list operations.
- **Steps taken:** Added structured service methods, input validation, demo inventory, and optional Bedrock meal recommendations.
- **Expected:** Useful responses to natural-language grocery requests and reusable stateful shopping operations.
- **Actual:** Basic product-search and meal-suggestion handlers were implemented; multi-turn context, Kenyan product terminology, and account-linked shopping-list behavior remain unverified.
- **Severity:** Important.
- **Workaround:** Kept requests granular and used a deterministic demo store for initial testing.
- **Actionable suggestion:** Publish examples covering quantities, substitutions, budgets, local terminology, and multi-turn state.

## 3. AWS–Firebase integration

- **Task attempted:** Access the existing grocery catalog and shopping lists from an AWS-hosted service.
- **Steps taken:** Added a Firebase Admin SDK adapter and a Lambda-compatible authenticated-request example.
- **Expected:** Consistent and secure data operations across the two environments.
- **Actual:** Example integration code exists; the actual Sokonis Firestore schema, credentials, permissions, and live sync have not yet been validated.
- **Severity:** Important.
- **Workaround:** Separate the database adapter and keep demo-mode operations independent of production secrets.
- **Actionable suggestion:** Provide more complete guidance for least-privilege cross-cloud authentication and schema verification.

## 4. Testing before cloud provisioning

- **Task attempted:** Validate grocery-service logic before deploying live Amazon resources.
- **Steps taken:** Added Node.js automated tests, GitHub Actions, and an AWS SAM template.
- **Expected:** Repeatable checks locally and in CI before deployment.
- **Actual:** Three initial local unit tests passed in the implementation workflow; live AWS, Alexa endpoint, and Bedrock tests remain outstanding. CI status should be checked separately.
- **Severity:** Moderate.
- **Workaround:** Used mock data and isolated business logic.
- **Actionable suggestion:** Supply end-to-end local Alexa simulation examples and cloud-configuration validation scripts.

## 5. Creating a public reusable contribution

- **Task attempted:** Publish a reusable integration without publishing the private Sokonis application.
- **Steps taken:** Created a public MIT-licensed repository with application modules, AWS SAM template, documentation, and tests.
- **Expected:** A reproducible public example separate from production data and credentials.
- **Actual:** The public repository was created and populated. A production connection was not completed.
- **Severity:** Minor.
- **Workaround:** Kept production and example repositories distinct and documented the integration boundary.
- **Actionable suggestion:** Include more hackathon examples showing secure open-source extensions to private existing applications.

## Overall learning

The main design challenge was connecting an established mobile-commerce backend to conversational cloud interfaces while preserving security and maintainability. Modular services, small tests, and explicit deployment boundaries improved implementation clarity.

**Verification status:** Source implementation published; end-to-end AWS deployment, production Firebase synchronization, Alexa+ track compliance, and live Bedrock inference have **not** been confirmed. This friction log must be updated with real diagnostic output if future tests reveal concrete failures.
