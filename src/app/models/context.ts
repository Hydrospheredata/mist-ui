export class Context {
  public name: string;
  public sparkConf: object;
  public downtime: string;
  public maxJobs: number;
  public precreated: boolean;
  public runOptions: string;
  public workerMode: string;
  public streamingDuration: string;

  constructor(context: object) {
    this.name = context['name'];
    this.sparkConf = context['sparkConf'];
    this.downtime = context['downtime'];
    this.maxJobs = context['maxJobs'];
    this.precreated = context['precreated'];
    this.runOptions = context['runOptions'];
    this.workerMode = context['workerMode'];
    this.streamingDuration = context['streamingDuration'];
  }
}
