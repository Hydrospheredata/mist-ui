export class Job {
  public jobId: string;

  constructor(jobInfo: Object) {
    this.jobId = jobInfo['jobId'];
  }
}
