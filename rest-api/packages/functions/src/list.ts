import notes from '@rest-api/core/notes';
import { datadog } from 'datadog-lambda-js';

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
}

export const instrumentedHandler = datadog(handler);

