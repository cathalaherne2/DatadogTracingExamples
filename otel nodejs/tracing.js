// tracing.js

'use strict'

const process = require('process');
const { NodeTracerProvider} = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { OTLPMetricExporter } require "@opentelemetry/exporter-metrics-otlp-proto";


// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package

const collectorOptions = {
    url: 'http://localhost:4318/v1/traces', // url is optional and can be omitted - default is http://localhost:55681/v1/traces
    headers: {}, // an optional object containing custom headers to be sent with each request
    concurrencyLimit: 10, // an optional limit on pending requests
};
  
const collectorOptions2 = {
  url: `http://localhost:4318/v1/metrics`,
  headers: {}
};

const exporter = new OTLPMetricExporter(collectorOptions);

const meterProvider = new MeterProvider({
  exporter,
  interval: 2000
});

const exporter = new OTLPTraceExporter(collectorOptions);
const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'basic-service',
        [SemanticResourceAttributes.HOST_NAME]: 'COMP-C02FR0L4ML87',
      }),
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations({}),
  ],
});

/*
const traceExporter = new ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Test',
  }),
  httptraceExporter,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
*/
