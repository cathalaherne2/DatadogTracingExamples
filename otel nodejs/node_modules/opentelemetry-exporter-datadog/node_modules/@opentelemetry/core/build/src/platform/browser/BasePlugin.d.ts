import { Logger, TracerProvider } from '@opentelemetry/api';
import { Plugin, PluginConfig } from '../../trace/Plugin';
import { BaseAbstractPlugin } from '../BaseAbstractPlugin';
/** This class represent the base to patch plugin. */
export declare abstract class BasePlugin<T> extends BaseAbstractPlugin<T> implements Plugin<T> {
    enable(moduleExports: T, tracerProvider: TracerProvider, logger: Logger, config?: PluginConfig): T;
}
//# sourceMappingURL=BasePlugin.d.ts.map