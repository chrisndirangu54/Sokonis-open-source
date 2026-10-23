# Sokonis Open Source — Alexa + AWS Grocery Integration

MIT-licensed reference implementation connecting the Sokonis grocery marketplace with Alexa custom skills, AWS Lambda, optional Amazon Bedrock, and Firebase Firestore.

**Status:** Open-source example, not yet deployed to the production Sokonis app. The traditional Alexa custom skill is not an Alexa+ Agent Skill and does not itself establish Alexa+ track compliance.

## Features
- Grocery product search with an Alexa custom intent
- Meal suggestions using optional Amazon Bedrock
- Reusable grocery service with in-memory demo store
- Firebase Firestore adapter (schema must be aligned with the real Sokonis backend)
- AWS SAM Lambda deployment template

## Local setup
Requires Node.js >=22, npm, AWS SAM CLI, configured AWS credentials for deployment and an Alexa developer account.

```bash
npm install
npm test
npm run check
sam build
sam deploy --guided
```

Use DemoMode=true for example groceries. To use real Firestore, configure valid Firebase Admin credentials securely through AWS Secrets Manager or IAM-supported mechanisms, adapt collections to the real production schema, and use DemoMode=false. Do not commit secrets.

Set AlexaSkillId to your actual Alexa skill ID, then configure the deployed Lambda ARN as your Alexa custom-skill endpoint. Use the sample interaction model in the companion ZIP or add FindProductIntent (product slot) and MealSuggestionIntent (ingredients slot) in the Alexa developer console.

For Bedrock, provide the model ID, enable model access, and grant **only that model's required actions/resources** to the Lambda execution role. Never enable public, unauthenticated mutation endpoints.

## Integration with the private Sokonis app
The existing production repo and this public repo should remain separate. Integrate via a reviewed backend interface, with read-only product lookup first and account-linked shopping list access only after authenticated user identity is verified. The included Firestore collection paths are examples, not verified against production. No live AWS or Firebase connection is claimed.

## Open-source contribution
This repository is intended as a reusable starter for grocery voice commerce. Maintainers welcome safe contributions and tests. License: MIT.
