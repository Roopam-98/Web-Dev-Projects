'use strict';
// console.log(this);
// function value() {
//     console.log(this);
// }
// value();

// let newThis = new value();
// console.log(value);
// ['apple', 'banana', 'orange'].forEach((fruit) => {
//     console.log(this);
//     console.log(fruit);
// })

// function x() {
//     function y() {
//         console.log(this);
//     }
//     y();
// }

// x();

// const studentDetail = {
//     firstName: 'Rohan',
//     lastName: 'Chauhan',
//     fullName: function () {
//         console.log(this.firstName, this.lastName);
//         console.log(this);
//     }
// }

// studentDetail.fullName();


const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 1 is resolved!');
    }, 5000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 2 is resolved!');
    }, 10000);
})

async function handleAsyncCode() {
    console.log('Start of async operation');
    const val1 = await p1;
    console.log('Namaste Javascript 1 ');
    console.log(val1);

    const val2 = await p2;
    console.log('Namaste Javascript 2');
    console.log(val2);
}


handleAsyncCode();

/*here handleAsyncCode will suspended  and no longer will exist in call stack,
when there is await.Once await promise is resolved, function resumes from where it was
suspended */