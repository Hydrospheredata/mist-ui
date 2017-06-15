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

  constructor(jobInfo: any) {
    this.jobId = jobInfo['jobId'];
    this.status = jobInfo['status'];
    this.context = jobInfo['context'];
    this.createTime = jobInfo['createTime'];
    this.endTime = jobInfo['endTime'];
    this.startTime = jobInfo['startTime'];
    this.jobResult = jobInfo['jobResult']
    this.params = jobInfo['params']
  }

  public mappedStatus() {
    const mapStatuses = {
      Stopped: 'Successfully Completed',
      Error: 'Failed',
      Aborted: 'Failed',
      Queued: 'In progress',
      Initialized: 'In progress',
      Running: 'In progress'
    }
    return mapStatuses[this.status]
  }

  isFinished() {
    return ['Stopped'].includes(this.status)
  }

  isFailed() {
    return ['Error','Aborted'].includes(this.status)
  }

  isRunning() {
    return ['Queued', 'Initialized','Running'].includes(this.status)
  }

  isFinishedDayAgo() {
    
  }
}
