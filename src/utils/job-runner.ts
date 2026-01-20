/**
 * Generic async function type with typed arguments and return value.
 */
type AsyncFn<TArgs extends any[], TReturn> = (
	...args: TArgs
) => Promise<TReturn>;

/**
 * Creates a serialized job runner for an async function.
 *
 * Ensures only one job runs at a time, supports job deduplication by ID,
 * and prioritizes high-priority jobs over low-priority ones.
 *
 * Subsequent jobs with the same ID replace arguments and share the result.
 *
 * @remark Jobs with the same ID are expected to never change their priority.
 *
 * @param asyncFn - The async function to run as jobs
 * @returns An object with an `addJob` method to queue jobs
 */
export function createJobRunner<TArgs extends any[], TReturn>(
	asyncFn: AsyncFn<TArgs, TReturn>,
) {
	type Resolver = {
		resolve: (v: TReturn) => void;
		reject: (e: any) => void;
	};
	type Job = {
		args: TArgs;
		isHighPriority: boolean;
		resolvers: Resolver[];
	};

	const highQueue: string[] = [];
	const lowQueue: string[] = [];
	const jobMap = new Map<string, Job>();

	let running = false;

	/**
	 * Selects the next queued job ID to run.
	 *
	 * High-priority jobs are dequeued before low-priority jobs.
	 *
	 * @returns The next job ID, or `undefined` if no jobs are queued.
	 */
	function pickNextId(): string | undefined {
		if (highQueue.length) return highQueue.shift();

		return lowQueue.shift();
	}

	/**
	 * Processes the next queued job if no job is currently running.
	 *
	 * Executes jobs sequentially, resolves or rejects all attached promises,
	 * and automatically continues with the next pending job.
	 */
	async function processNext(): Promise<void> {
		if (running) return;

		const nextId = pickNextId();

		if (!nextId) return;

		const job = jobMap.get(nextId);

		// This shouldn't be possible, but we have to make TS happy
		if (!job) return processNext();

		jobMap.delete(nextId);

		running = true;

		try {
			const result = await asyncFn(...job.args);

			for (const r of job.resolvers) r.resolve(result);
		} catch (err) {
			for (const r of job.resolvers) r.reject(err);
		} finally {
			running = false;

			// Continue with remaining jobs
			if (highQueue.length || lowQueue.length) void processNext();
		}
	}

	/**
	 * Enqueue a job according to the following rules:
	 * - If an entry with the same id is already queued, its args are replaced and callers attach to the same eventual run
	 * - If id is currently running, a new queued job for that id is created (or replaces an existing queued one)
	 * - Priority is recorded when the job is first queued for that id and never changed thereafter
	 */
	function addJob(
		id: string,
		args: TArgs,
		highPriority = false,
	): Promise<TReturn> {
		// If a job is already queued for this id, update args and attach resolver
		const existing = jobMap.get(id);

		if (existing) {
			// Ignore the provided priority if it differs
			existing.args = args;

			return new Promise<TReturn>((resolve, reject) => {
				existing.resolvers.push({ resolve, reject });
			});
		}

		// Create a new queued job.
		const resolvers: Resolver[] = [];
		const job: Job = { args, isHighPriority: highPriority, resolvers };

		jobMap.set(id, job);

		(highPriority ? highQueue : lowQueue).push(id);

		// Start processing if idle
		if (!running) void processNext();

		return new Promise<TReturn>((resolve, reject) => {
			resolvers.push({ resolve, reject });
		});
	}

	return { addJob };
}
