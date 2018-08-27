export interface IFilter {
    success: boolean,
    running: boolean,
    failed: boolean,
}

export class Filter implements IFilter {
    public success: boolean;
    public running: boolean;
    public failed: boolean;

    constructor(parameters) {
        this.success = parameters['success'];
        this.running = parameters['running'];
        this.failed = parameters['failed'];
    }
}