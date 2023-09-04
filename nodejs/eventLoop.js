class AsyncOperationManager {
  constructor() {
    this.bonus = [];
  }
  
  bonusSimulateAsyncOperation(callback, delay) {
    this.bonus.push({ callback, delay });
  }

  start() {
    this.bonus.forEach((operation) => {
      setTimeout(() => {
        operation.callback();
      }, operation.delay);
    });
  }

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

  scheduleImmediate(message) {
    setImmediate(() => {
      console.log(message);
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
manager.scheduleImmediate("scheduleImmediate");

// таким образом вывод выглядит(где первые 2 строки
// выполнились сразу же, позже уже все 3 подряд в своём
// порядке объяснённом ранее внутри AsyncOperationManager):
// Microtask executed immediately
// scheduleImmediate
// simulateAsyncOperation's delay: 5000ms
// simulateAsyncOperation's microtaskSchedule: 5000 ms
// scheduleImmediate


manager.bonusSimulateAsyncOperation(() => {
  console.log("First time bonus 3000ms");
  manager.microtaskSchedule("First time bonus 'microtaskSchedule'");
  manager.scheduleImmediate("First time bonus 'scheduleImmediate'");
}, 3000);

manager.bonusSimulateAsyncOperation(() => {
  console.log("Second time bonus 6000ms");
  manager.microtaskSchedule("Second time bonus 'microtaskSchedule'");
  manager.scheduleImmediate("Second time bonus 'scheduleImmediate'");
}, 6000);

manager.bonusSimulateAsyncOperation(() => {
  console.log("Third time bonus 0ms");
  manager.microtaskSchedule("Third time bonus 'microtaskSchedule'");
  manager.scheduleImmediate("Third time bonus 'scheduleImmediate'");
}, 0);

manager.start();

manager.microtaskSchedule("microtaskSchedule 1");
manager.scheduleImmediate("scheduleImmediate 1");
manager.microtaskSchedule("microtaskSchedule 2");
manager.scheduleImmediate("scheduleImmediate 2");