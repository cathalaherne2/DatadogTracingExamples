const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider } = require('@opentelemetry/tracing');
const { DatadogSpanProcessor, DatadogExporter, DatadogProbabilitySampler, DatadogPropagator } = require('opentelemetry-exporter-datadog');

const provider = new BasicTracerProvider();

const exporterOptions = {
  serviceName: 'my-service', // optional
  agentUrl: 'http://localhost:55681/v1/traces', // optional
  tags: 'example_key:example_value,example_key_two:value_two', // optional
  env: 'production', // optional
  version: '1.0' // optional
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);

provider.addSpanProcessor(processor);

// Next, add the Datadog Propagator for distributed tracing
provider.register({
  propagator: new DatadogPropagator()
});

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// Create a span. A span must be closed.
const parentSpan = tracer.startSpan('main');

doWork(parentSpan);
console.log("hello");
setTimeout(() => {
  parentSpan.end();

  setTimeout(() => {
    processor.shutdown()
  },4000);
}, 5000);

function doWork(parent) {
  const span = tracer.startSpan('doWork', {
    parent,
  });

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }
  // Set attributes to the span.
  span.setAttribute('key', 'value');
  setTimeout( () => {
    span.end();
  }, 1000)
}

