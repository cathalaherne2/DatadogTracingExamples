/**
 * Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2.0 License.
 * This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
 **/
type rules = object;

type result = {
  timeout: boolean;
  perfData?: string;
  perfTotalRuntime?: number;
  data?: string;
  action?: 'monitor' | 'block';
};

declare class DDWAFContext {
  readonly disposed: boolean;

  run(inputs: object, timeout: number): result;
  dispose(): void;
}


export class DDWAF {
  static version(): { major: number, minor: number, patch: number };

  readonly disposed: boolean;

  constructor(rules: rules);

  createContext(): DDWAFContext;
  dispose(): void;
}
