import type { CSSProperties } from 'react';

/** Sets the `--delay` custom property consumed by the `.enter` animation. */
export function enterDelay(ms: number): CSSProperties {
  return { '--delay': `${ms}ms` } as CSSProperties;
}
