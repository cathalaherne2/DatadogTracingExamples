import notes from "@rest-api/core/notes";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { datadog } from "datadog-lambda-js";


export const handler: APIGatewayProxyHandlerV2 = datadog(async (event) => {
  const note = notes[event.pathParameters.id];
  return note
    ? {
        statusCode: 200,
        body: JSON.stringify(note),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
});
