const NPromise = require('../new_promise.js');

describe('Promise', () => {
    it('should create a new Promise with pending state', () => {
        const promise = new NPromise(() => { });

        expect(promise.state).toBe('pending');
        expect(promise.value).toBe(undefined);
    });

    describe('When fulfilled', () => {
        it('should then a Promise', (done) => {
            return new NPromise(resolve => resolve({ data: 'fake' }))
                .then(response => {
                    expect(response.data).toBe('fake');
                    done();
                })
        });

        it('should call then just when the async code is resolved', (done) => {
            return new NPromise(resolve => {
                setTimeout(() => resolve({ data: 'fake' }), 3000)
            })
                .then(response => {
                    expect(response.data).toBe('fake');
                    done();
                })
        })
    });
})