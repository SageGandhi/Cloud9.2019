let iterateOverArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let iterateOverArrayItr = iterateOverArray[Symbol.iterator](); //EcmaScript7
for (let index = 0; index < 10; index++) { iterateOverArrayItr.next().value; }
let iterateOverArrayCopy = Array.from(iterateOverArray);
let iterateOverArrayCopyEven = Array.from(iterateOverArray, num => num % 2 === 0);
console.log('Will Fill All Elements -1:', Array.of(...iterateOverArrayCopy).fill(-1));
console.log('Will Fill All Elements From Start Index 3 To End Index[Exclusive] 5,Fill With 2:', Array.of(1, 2, 3, 4, 5, 6, 7).fill(2, 3, 5));
console.log('Copy Within From Start Index 3 To End Index[Exclusive] 5,Put @Index 1:', Array.of(1, 2, 3, 4, 5, 6, 7).copyWithin(1, 3, 5));
console.log('Sort:', [1, 2, 3, 4, 5, 6, 7].sort(), ',ReverseSort:', [1, 2, 3, 4, 5, 6, 7].reverse(), 'With Function:', [1, 2, 3, 4, 5, 6, 7].sort((a, b) => b - a));
console.log([{ name: 'Prajit', age: 30 }, { name: 'Gandhi', age: 31 }, { name: 'Prakash', age: 32 }, { name: 'Chandra', age: 33 }, { name: 'Mahato', age: 34 }]
    .sort((a, b) => b.age - a.age));
console.log('Found Even No:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].find((element, index, array) => element % 2 == 0),
    '@ Index:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].findIndex((element, index, array) => element % 2 == 0));
console.log('Includes[13,0] After Index 0:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(13, 0),
    'Includes[13,11] After Index 13:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(13, 12));
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].join('@'));
console.log([Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]);
