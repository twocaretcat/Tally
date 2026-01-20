import * as stores from '@stores/index.ts';
import { logger } from '@nanostores/logger';

const originalDebugFn = console.debug;

let destroyLogger: () => void;

/**
 * Enables or disables debug logging for store state changes.
 *
 * When enabled, logs changes to input text, preferences, theme, and output counts.
 * When disabled, silences all console.debug output.
 *
 * @param enable - Whether to enable or disable debug logging
 */
export function toggleDebugLogging(enable: boolean) {
	if (enable) {
		destroyLogger = logger(stores);

		console.debug = originalDebugFn;
	} else {
		destroyLogger?.();

		console.debug = () => {};
	}
}
