import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";
import { Stack } from "sst/constructs";
import { Datadog } from "datadog-cdk-constructs-v2";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export default {
  config(_input) {
    return {
      name: "rest-api",
      region: "eu-west-1",
    };
  },
  async stacks(app) {
    const datadogApiKeySecretArn =
      "<ARN for secret key>";

    // Don't enable locally
    const enableDatadog = !app.local;

    if (enableDatadog) {
      // Allow functions to access secret
      app.addDefaultFunctionPermissions([
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [datadogApiKeySecretArn],
          actions: ["secretsmanager:GetSecretValue"],
        }),
      ]);
      // Exclude from the function bundle
      // since they'll be loaded from the Layer
      app.setDefaultFunctionProps({
        nodejs: {
          install: ["dd-trace", "datadog-lambda-js"],
        },
      });
    }
    app.stack(ExampleStack);

    if (enableDatadog) {
      await app.finish();

      // Attach the Datadog contruct to each stack
      app.node.children.forEach((stack) => {
        if (stack instanceof Stack) {
          const datadog = new Datadog(stack, "datadog", {
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-js/releases
            nodeLayerVersion: 87,
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-extension/releases
            extensionLayerVersion: 40,
            site: "datadoghq.com",
            apiKeySecretArn: datadogApiKeySecretArn,
            env: app.stage,
            service: app.name,
            // Just a recommendation, feel free to change the version per your CI/CD
            version:
              process.env.SEED_BUILD_SERVICE_SHA ||
              process.env.GITHUB_SHA ||
              undefined,
          });

          datadog.addLambdaFunctions(stack.getAllFunctions());
        }
      });
    }
  },
} satisfies SSTConfig;
