class RenovableTimeout {
    private callback: (() => void) | null;
    private intervalId: NodeJS.Timeout | null;
    public timeout: number;

    constructor() {
        this.callback = null;
        this.timeout = 0;
        this.intervalId = null;
    }

    setCallback(callback: () => void) {
        this.callback = callback;
    }

    setTime(timeout: number) {
        this.timeout = timeout;
    }

    run(timeout: number = 5): void {
        this.timeout = timeout;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
            if (
                this.timeout <= 0 &&
                this.intervalId &&
                this.callback !== null
            ) {
                this.callback();
                clearInterval(this.intervalId);
                return;
            } else {
                this.timeout = this.timeout - 1;
            }
        }, 1000);

        if (this.timeout <= 0) {
            clearInterval(this.intervalId);
        }
    }

    addTime(seconds: number) {
        this.timeout = this.timeout + seconds;
    }
}

export default RenovableTimeout;
