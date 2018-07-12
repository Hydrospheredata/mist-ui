export interface IInitInfo {
    downtime: string,
    logService: string,
    masterAddress: string,
    masterHttpConf: string,
    maxArtifactSize: number,
    maxJobs: number,
    runOptions: string,
    sparkConf: {
        'spark.master': string
    },
    streamingDuration: string
}
export interface IWorker {
    name: string,
    address: string,
    sparkUi: string,
    initInfo: IInitInfo
}

export class Worker implements IWorker {
    public name: string;
    public address: string;
    public sparkUi: string;
    public initInfo: IInitInfo;

    constructor(workersInfo: any) {
        this.name = workersInfo['name'];
        this.address = workersInfo['address'];
        this.sparkUi = workersInfo['sparkUi'];
        this.initInfo = workersInfo['initInfo'];
    }

}
