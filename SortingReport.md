- Код
    - Код примеров данных которые периодически меняли свой порядок и кол-во
        
        ```jsx
        const array01 = [1, 2, 3, 4, 5];
        const array02 = [2, 27, 14, 52, 31, 96, 73, 47, 22, 6];
        const array03 = [...Array(1000)];
        for (let i = 0; i < array03.length; i++) {
          array03[i] = Math.random(1, 1000);
        }
        
        const array04 = [
          {
            name: "Bob",
            age: 50,
          },
          {
            name: "Frz",
            age: 10,
          },
          {
            name: "ula",
            age: 25,
          },
          {
            name: "diluc",
            age: 21,
          },
          {
            name: "AlHaitham",
            age: 20,
          },
          {
            name: "Kaveh",
            age: 22,
          },
          {
            name: "Venti",
            age: 3000,
          },
          {
            name: "Kuki",
            age: 27,
          },
          {
            name: "Sara",
            age: 30,
          },
        ];
        
        const array05 = ["Bob", "Frz", "ula", "diluc", "AlHaitham", "Kaveh", "Venti", "Kuki", "Sara", "RaidenEi", "Nahida", "Linney", "Arlechino", "Scaramuche", "Barbara", "Jean", "Albedo", "Arataki Itto", "Beidou", "Candace", "Dehya", "Cyno", "Dori", "Ganyu", "Gorou", "Hu Tao", "Kaedehara Kazuha", "Kaeya", "Kamisato Ayato", "Keqing", "Layla", "Lynette", "Ningguang"]
        ```
        
    - Функция измерения времени работы кода
        
        ```jsx
        function measureArrayPerformance(func, array) {
          const start = performance.now();
          func(array);
          const endTime = performance.now();
          const result = (endTime - start).toFixed(4);
          return `${result} ms`;
        }
        ```
        
    - Массив для записи данных всех сортировок над каждым массивом и вывод таблицы
        
        ```jsx
        const results = [
          {
            length: array01.length,
            arrayType: "Number",
            QuickSort: measureArrayPerformance(() => QuickSort(array01), array01),
            BubbleSort: measureArrayPerformance(() => BubbleSort(array01), array01),
            MergeSort: measureArrayPerformance(() => MergeSort(array01), array01),
          },
          {
            length: array02.length,
            arrayType: "Number",
            QuickSort: measureArrayPerformance(() => QuickSort(array02), array02),
            BubbleSort: measureArrayPerformance(() => BubbleSort(array02), array02),
            MergeSort: measureArrayPerformance(() => MergeSort(array02), array02),
          },
          {
            length: array03.length,
            arrayType: "Number",
            QuickSort: measureArrayPerformance(() => QuickSort(array03), array03),
            BubbleSort: measureArrayPerformance(() => BubbleSort(array03), array03),
            MergeSort: measureArrayPerformance(() => MergeSort(array03), array03),
          },
          {
            length: array04.length,
            arrayType: "Object",
            QuickSort: measureArrayPerformance(() => QuickSort(array04), array04),
            BubbleSort: measureArrayPerformance(() => BubbleSort(array04), array04),
            MergeSort: measureArrayPerformance(() => MergeSort(array04), array04),
          },
          {
            length: array05.length,
            arrayType: "String",
            QuickSort: measureArrayPerformance(() => QuickSort(array05), array05),
            BubbleSort: measureArrayPerformance(() => BubbleSort(array05), array05),
            MergeSort: measureArrayPerformance(() => MergeSort(array05), array05),
          },
        ];
        
        console.table(results);
        ```
        
    - Функции сортировки
        
        ```jsx
        **function QuickSort(arr) {
          if (arr.length < 2) return arr;
        
          const pivot = arr[arr.length - 1];
          const left = [];
          const right = [];
        
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
              left.push(arr[i]);
            } else {
              right.push(arr[i]);
            }
          }
        
          return [...QuickSort(left), pivot, ...QuickSort(right)];
        }
        
        function BubbleSort(arr) {
          if (arr.length < 2) return arr;
        
          for (let d = arr.length - 1; d > 0; d--) {
            for (let i = 0; i < d; i++) {
              if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
              }
            }
          }
          return arr;
        }
        
        function MergeSort(arr) {
          if (!arr || !arr.length) return null;
          if (arr.length < 2) return arr;
        
          const middle = Math.floor(arr.length / 2);
          const left = arr.slice(0, middle);
          const right = arr.slice(middle);
        
          return merge(MergeSort(left), MergeSort(right));
        }
        
        function merge(left, right) {
          const arrSort = [];
          let y = (x = 0);
        
          while (y < left.length && x < right.length) {
            arrSort.push(left[y] < right[x] ? left[y++] : right[x++]);
          }
        
          return [...arrSort, ...left.slice(y), ...right.slice(x)];
        }**
        ```
        

### Отчёт

- Таблицы результатов разных типов:
    
    **1й запуск**
    
    ```
    ┌─────────┬────────┬───────────┬─────────────┬─────────────┬─────────────┐
    │ (index) │ length │ arrayType │  QuickSort  │ BubbleSort  │  MergeSort  │
    ├─────────┼────────┼───────────┼─────────────┼─────────────┼─────────────┤
    │    0    │   5    │ 'Number'  │ '0.0459 ms' │ '0.0279 ms' │ '0.0707 ms' │
    │    1    │   10   │ 'Number'  │ '0.0860 ms' │ '0.0173 ms' │ '0.0317 ms' │
    │    2    │  1000  │ 'Number'  │ '1.8066 ms' │ '3.0515 ms' │ '0.8592 ms' │
    │    3    │   9    │ 'Object'  │ '0.0854 ms' │ '1.0037 ms' │ '0.0350 ms' │
    │    4    │   33   │ 'String'  │ '0.0280 ms' │ '0.0383 ms' │ '0.0244 ms' │
    └─────────┴────────┴───────────┴─────────────┴─────────────┴─────────────┘
    ```
    
    **2й запуск:**
    
    ```
    ┌─────────┬────────┬───────────┬─────────────┬─────────────┬─────────────┐
    │ (index) │ length │ arrayType │  QuickSort  │ BubbleSort  │  MergeSort  │
    ├─────────┼────────┼───────────┼─────────────┼─────────────┼─────────────┤
    │    0    │   5    │ 'Number'  │ '0.0454 ms' │ '0.0266 ms' │ '0.0691 ms' │
    │    1    │   10   │ 'Number'  │ '0.0837 ms' │ '0.0175 ms' │ '0.0320 ms' │
    │    2    │  1000  │ 'Number'  │ '1.8558 ms' │ '3.5120 ms' │ '1.1195 ms' │
    │    3    │   9    │ 'Object'  │ '0.1442 ms' │ '1.1024 ms' │ '0.0363 ms' │
    │    4    │   33   │ 'String'  │ '0.0260 ms' │ '0.0400 ms' │ '0.0243 ms' │
    └─────────┴────────┴───────────┴─────────────┴─────────────┴─────────────┘
    ```
    
    **3й запуск:**
    
    ```
    ┌─────────┬────────┬───────────┬─────────────┬─────────────┬─────────────┐
    │ (index) │ length │ arrayType │  QuickSort  │ BubbleSort  │  MergeSort  │
    ├─────────┼────────┼───────────┼─────────────┼─────────────┼─────────────┤
    │    0    │   5    │ 'Number'  │ '0.0476 ms' │ '0.0273 ms' │ '0.0713 ms' │
    │    1    │   10   │ 'Number'  │ '0.0845 ms' │ '0.0180 ms' │ '0.0329 ms' │
    │    2    │  1000  │ 'Number'  │ '1.8154 ms' │ '3.0436 ms' │ '0.8472 ms' │
    │    3    │   9    │ 'Object'  │ '0.0881 ms' │ '0.9972 ms' │ '0.0353 ms' │
    │    4    │   33   │ 'String'  │ '0.0277 ms' │ '0.0382 ms' │ '0.0258 ms' │
    └─────────┴────────┴───────────┴─────────────┴─────────────┴─────────────┘
    ```
    

Принцип по которому происходила каждая сортировка был один и тот же: **arr[i] > (pivot || arr[i + 1] || arr[i])** , другие условия сортировки не добавлялись

Во всех 3х последних запусках видно что BubbleSort при слишком большой длине массива с числами и сортировках иных типов данных, кроме объектов, уже начинает вести себя слишком медленно.

**Число:**

В моём случае при работе с числами кол-вом в массиве от 70, BubbleSort  уже начинал работать дольше остальных на примерно 0.200 мс, пример одного их таких запусков:

```
┌─────────┬────────┬───────────┬─────────────┬─────────────┬─────────────┐
│ (index) │ length │ arrayType │  QuickSort  │ BubbleSort  │  MergeSort  │
├─────────┼────────┼───────────┼─────────────┼─────────────┼─────────────┤
│    2    │   70   │ 'Number'  │ '0.0603 ms' │ '0.1194 ms' │ '0.0965 ms' │
└─────────┴────────┴───────────┴─────────────┴─────────────┴─────────────┘
```

**Строка:**

В опыте с строкой, результат схож с опытом с числами:

```
┌─────────┬────────┬───────────┬─────────────┬─────────────┬─────────────┐
│ (index) │ length │ arrayType │  QuickSort  │ BubbleSort  │  MergeSort  │
├─────────┼────────┼───────────┼─────────────┼─────────────┼─────────────┤
│    0    │   33   │ 'String'  │ '0.0907 ms' │ '0.0617 ms' │ '0.1932 ms' │
│    1    │   5    │ 'String'  │ '0.0138 ms' │ '0.0146 ms' │ '0.0103 ms' │
│    2    │   82   │ 'String'  │ '0.0911 ms' │ '0.1412 ms' │ '0.0756 ms' │
│    3    │  328   │ 'String'  │ '0.9279 ms' │ '2.6772 ms' │ '0.3873 ms' │
└─────────┴────────┴───────────┴─────────────┴─────────────┴─────────────┘
```

**Объект**:

В опыте с объектом, уже медленнее всех был QuickSort особенно с массивами от 60 кол-вом, хуже было уже с массивом в 348 объектов, в  почти половину лучше был уже BubbleSort, но меньше всего вышло по времени с работой MergeSort:

```
┌─────────┬────────┬───────────┬──────────────┬─────────────┬─────────────┐
│ (index) │ length │ arrayType │  QuickSort   │ BubbleSort  │  MergeSort  │
├─────────┼────────┼───────────┼──────────────┼─────────────┼─────────────┤
│    0    │   4    │ 'Object'  │ '0.0545 ms'  │ '0.0298 ms' │ '0.0770 ms' │
│    1    │   9    │ 'Object'  │ '0.0470 ms'  │ '0.0158 ms' │ '0.1243 ms' │
│    2    │   85   │ 'Object'  │ '0.6582 ms'  │ '0.3761 ms' │ '0.1109 ms' │
│    3    │  348   │ 'Object'  │ '10.1570 ms' │ '6.4730 ms' │ '0.5637 ms' │
└─────────┴────────┴───────────┴──────────────┴─────────────┴─────────────┘
```

## Абсолютные данные:

тут приведён пример работы каждого из сортировщиков с длинными массивами и разными их состояниями(Sorted, Backward, Random)

**Числа**: с Sorted и Backward хуже показал себя QuickSort, в случае с  Random был BubbleSort, лучшим был MergeSort в 2х случаях кроме Random

**Строки**: с Backward и Random хуже сработал BubbleSort, лучше был MergeSort во всех 3х случаях

**Объекты**: во всех 3х случаях хуже отработал QuickSort и с небольшим отрывом на ~5мс быстрее был BubbleSort

**Итого**: случаев быстрой работы было больше у MergeSort 8/9, превосходящего даже на 40+ мс другие способы сортировки

```
┌─────────┬────────┬─────────────┬───────────┬──────────────┬──────────────┬─────────────┐
│ (index) │ length │  constType  │ arrayType │  QuickSort   │  BubbleSort  │  MergeSort  │
├─────────┼────────┼─────────────┼───────────┼──────────────┼──────────────┼─────────────┤
│    0    │  1000  │  'Sorted'   │ 'Number'  │ '31.5486 ms' │ '2.2072 ms'  │ '1.0372 ms' │
│    1    │  1000  │  'Sorted'   │ 'String'  │ '12.5846 ms' │ '4.4223 ms'  │ '1.0926 ms' │
│    2    │  1000  │  'Sorted'   │ 'Object'  │ '56.2488 ms' │ '44.7246 ms' │ '0.9228 ms' │
│    3    │  1000  │ 'Backward ' │ 'Number'  │ '7.8275 ms'  │ '1.3922 ms'  │ '0.3085 ms' │
│    4    │  1000  │ 'Backward ' │ 'String'  │ '1.6370 ms'  │ '2.4613 ms'  │ '0.3858 ms' │
│    5    │  1000  │ 'Backward ' │ 'Object'  │ '50.1685 ms' │ '43.9267 ms' │ '0.6722 ms' │
│    6    │  1000  │ 'Random  '  │ 'Number'  │ '0.1586 ms'  │ '2.3384 ms'  │ '0.1879 ms' │
│    7    │  1000  │ 'Random  '  │ 'String'  │ '1.2811 ms'  │ '3.2779 ms'  │ '0.2191 ms' │
│    8    │  1000  │ 'Random  '  │ 'Object'  │ '50.7781 ms' │ '45.1038 ms' │ '0.6925 ms' │
└─────────┴────────┴─────────────┴───────────┴──────────────┴──────────────┴─────────────┘
```