export class Worker {
  public name: string;
  public address: string;
  public sparkUi: string;

  constructor(workersInfo: any) {
    this.name = workersInfo['name'];
    this.address = workersInfo['address'];
    this.sparkUi = workersInfo['sparkUi'];
  }

}
