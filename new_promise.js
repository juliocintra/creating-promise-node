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
            const onFulfilled = (res) => {
                resolve(onFulFill(res));
                // res = this.value - pois será passado como parâmetro
            }

            if (this.state === STATE.FULFILLED) {
                onFulfilled(this.value);
            } else {
                this.onFulFillChain.push(onFulfilled);
            }
        });
    }

    resolve(res) {
        if (this.state !== STATE.PENDING) {
            return;
        }

        this.state = STATE.FULFILLED;
        this.value = res;

        for(const onFulfilled of this.onFulFillChain) {
            onFulfilled(res);
        }
    }
}

module.exports = NPRomise;