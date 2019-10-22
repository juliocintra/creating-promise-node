'use strict';

// O poder das promises é poder encadear requisições assincronas

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

        executor(this.resolve.bind(this), this.reject.bind(this));
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

    catch(onReject) {
        return new NPRomise((resolve, reject) => {
            const onRejected = (res) => {
                try {
                    resolve(onReject(res));
                } catch (error) {
                    reject(error);
                }
            }

            if (this.state === STATE.REJECTED) {
                onRejected(this.value);
            } else {
                this.onRejectCallChain.push(onRejected);
            }
        });
    }

    resolve(res) {
        if (this.state !== STATE.PENDING) {
            return;
        }

        if (res != null && typeof res.then == 'function') {
            return res.then(this.resolve.bind(this));
            // Como o retorno "res" de outra promise está sendo uma promise,
            // o "then" dela precisa ser resolvido
        }

        this.state = STATE.FULFILLED;
        this.value = res;

        for (const onFulfilled of this.onFulFillChain) {
            onFulfilled(res);
        }
    }

    reject(error) {

        if (this.state !== STATE.PENDING) {
            return;
        }

        this.state = STATE.REJECTED;
        this.value = error;

        for (const onRejected of this.onRejectCallChain) {
            onRejected(error);
        }
    }
}

module.exports = NPRomise;