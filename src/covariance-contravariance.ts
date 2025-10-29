type JobName1 = string;
type JobName2 = `${string}-email`;
type JobName3 = "send-email" | "fulfil-order" | "publish-report";
type JobName4 = "send-email";

declare const job1: JobName1;
declare const job2: JobName2;
declare const job3: JobName3;
declare const job4: JobName4;

// covariance
const covariant1: JobName1 = job2;
const covariant2: JobName1 = job3;
const covariant3: JobName1 = job4;

const covariant4: JobName3 = job4;
// cannot assign a broader type to a narrower type
const covariantFail1: JobName3 = job2; // Error


type Job = {
  queueName: string;
  enqueuedAt: Date;
  transactionId: string;
  name: string;
};

type PriorityJob = Job & {
  priority: true,
  level: 1 | 2 | 3
};

function executeJob(job: Job) {
  // ...
};

// Executor type is contravariant on J
type Executor<J> = (j: J) => 'success' | 'failure';

declare function registerExecutor(e: Executor<Job>): void;
declare const e1: Executor<Job>;
declare const e2: Executor<PriorityJob>;

registerExecutor(e1);
// contravarinat - cannot pass input type that is more specific. Function expects Executor<Job> but got Executor<PriorityJob>
// - Type 'Job' is not assignable to type 'PriorityJob'
// - Executor<PrimaryJob> doesn't meet the requirements of Executor<Job>
registerExecutor(e2); // error!


declare function registerPriorityExecutor(e: Executor<PriorityJob>): void;
declare const e3: Executor<Job>;
declare const e4: Executor<PriorityJob>;

registerPriorityExecutor(e3); // works because Job is more general than PriorityJob
registerPriorityExecutor(e4);