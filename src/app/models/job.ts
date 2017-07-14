export class Job {
  public jobId: string;
  public status: string;
  public context: string;
  public createTime: number;
  public endTime: number;
  public startTime: number;
  public endpoint: string;
  public jobResult: string;
  public params: string;
  public source: string;

  constructor(jobInfo: any) {
    this.jobId = jobInfo['jobId'];
    this.status = jobInfo['status'];
    this.context = jobInfo['context'];
    this.endpoint = jobInfo['endpoint'];
    this.createTime = jobInfo['createTime'];
    this.endTime = jobInfo['endTime'];
    this.startTime = jobInfo['startTime'];
    this.jobResult = jobInfo['jobResult'];
    this.params = jobInfo['params'];
    this.source = jobInfo['source'];
  }

  isFinished() {
    return ['finished'].includes(this.status)
  }

  isFailed() {
    return ['failed','canceled'].includes(this.status)
  }

  isRunning() {
    return ['initialized', 'started', 'queued'].includes(this.status)
  }

  runningTime() {
    return this.startTime || this.createTime
  }
}
