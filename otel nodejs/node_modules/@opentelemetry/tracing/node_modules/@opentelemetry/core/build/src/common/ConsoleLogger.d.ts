import { Logger } from '@opentelemetry/api';
import { LogLevel } from './types';
export declare class ConsoleLogger implements Logger {
    constructor(level?: LogLevel);
    debug(_message: string, ..._args: unknown[]): void;
    error(_message: string, ..._args: unknown[]): void;
    warn(_message: string, ..._args: unknown[]): void;
    info(_message: string, ..._args: unknown[]): void;
}
//# sourceMappingURL=ConsoleLogger.d.ts.map