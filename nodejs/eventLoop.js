class AsyncOperationManager {

  simulateAsyncOperation(delay) {
    setTimeout(() => {
      console.log(`simulateAsyncOperation's delay: ${delay}ms`);
      //  тут же быстрее отработает вызов строки выше,
      //  а дальше из-за высокой приоритетности process.nextTick над setImmediate,
      //  microtaskSchedule отработает быстрее чем scheduleImmediate
      this.scheduleImmediate();
      this.microtaskSchedule(
        `simulateAsyncOperation's microtaskSchedule: ${delay} ms`
      );
    }, delay);
  }


  microtaskSchedule(message) {
    process.nextTick(() => {
      console.log(message);
    });
  }

  scheduleImmediate() {
    setImmediate(() => {
      console.log("scheduleImmediate");
    });
  }
}

const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(5000);
// тк тут микрозадача объявляется через process.nextTick(),
// её выполнение идёт раньше чем отработает simulateAsyncOperation
process.nextTick(() => {
  console.log("Microtask executed immediately");
});
// scheduleImmediate() тоже отработает раньше simulateAsyncOperation()
manager.scheduleImmediate();

// таким образом вывод выглядит(где первые 2 строки
// выполнились сразу же, позже уже все 3 подряд в своём
// порядке объяснённом ранее внутри AsyncOperationManager):
// Microtask executed immediately
// scheduleImmediate
// simulateAsyncOperation's delay: 5000ms
// simulateAsyncOperation's microtaskSchedule: 5000 ms
// scheduleImmediate
