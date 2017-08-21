(function () {
  'use strict';

  const myPromiseHandler = new MyPromiseHandler();

  describe('My Promise Handler', () => {
    it('should get a resolved handler which can do then and get the message', (testDone) => {
      const promise = myPromiseHandler.getResolved('resolved!');

      promise.then((message) => {
        expect(message).to.equal('resolved!');
        testDone();
      });
    });

    it('should get a rejected handler which can do catch and get the message', function (testDone) {
      const promise = myPromiseHandler.getRejected('rejected!');

      promise.catch(function (message) {
        expect(message).to.equal('rejected!');
        testDone();
      });
    });

    it('should get a handler which can wait and complete all promises', function () {
      const messageFragments = ['you', 'can', '!'];
      const promise1 = delayPromise(messageFragments[0], 10);
      const promise2 = delayPromise(messageFragments[1], 20);
      const promise3 = delayPromise(messageFragments[2], 30);

      const promise = myPromiseHandler.getAllFulfilled(promise1, promise2, promise3);

      return expect(promise).to.eventually.deep.equal(messageFragments);
    });

    it('should get a handler which waits and completes the only fastest promise', function () {
      const messageFragments = ['you', 'can', '!'];
      const promise1 = delayPromise(messageFragments[0], 30);
      const promise2 = delayPromise(messageFragments[1], 10);
      const promise3 = delayPromise(messageFragments[2], 30);

      const promise = myPromiseHandler.getFastestFulfilled(promise1, promise2, promise3);

      return expect(promise).to.eventually.equal(messageFragments[1]);
    });
  });

  function delayPromise(value, wait) {
    return new Promise(function (resolve) {
      setTimeout(resolve, wait, value);
    });
  }

}());
