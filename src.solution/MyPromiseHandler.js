/* Implement the class: MyPromiseHandler
 *
 *
 *
 *
 */

class MyPromiseHandler {

  getResolved(val) {
    return Promise.resolve(val);
  }

  getRejected(val) {
    return Promise.reject(val);
  }

  getAllFulfilled(...promises) {
    return Promise.all(promises);
  }

  getFastestFulfilled(...promises) {
    return Promise.race(promises);
  }

}
