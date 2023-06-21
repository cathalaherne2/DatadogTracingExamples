import { Sampler, SamplingResult } from '@opentelemetry/api';
/** Sampler that samples a given fraction of traces based of trace id deterministically. */
export declare class TraceIdRatioBasedSampler implements Sampler {
    private readonly _ratio;
    constructor(_ratio?: number);
    shouldSample(context: unknown, traceId: string): SamplingResult;
    toString(): string;
    private _normalize;
}
//# sourceMappingURL=TraceIdRatioBasedSampler.d.ts.map