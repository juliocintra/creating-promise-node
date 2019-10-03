const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

class NPRomise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new Error('Execute must be a function');
        }

        this.state = STATE.PENDING;
        this.value = undefined;
        this.onFulFillChain = [];
        this.onRejectCallChain = [];

        executor(this.resolve.bind(this));
    }

    then(onFulFill) {
        return new NPRomise(resolve => {
            resolve(onFulFill(this.value));
        })
    }

    resolve(res) {
        if (this.state !== STATE.PENDING) {
            return;
        }

        this.state = STATE.FULFILLED;
        this.value = res;
    }
}

module.exports = NPRomise;