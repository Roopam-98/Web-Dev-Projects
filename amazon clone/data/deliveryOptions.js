import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let date,month,year;
date = dayjs().get('date');
month = dayjs().get('month');
year = dayjs().get('year');
let currentDate = dayjs(`${year}-${month}-${date}`);
let freeDeliveryDate = currentDate.add(6,'day').format('dddd, DD MMMM');
let primeDeliveryDate = currentDate.add(1,'day').format('dddd, DD MMMM');
let fastDeliveryDate = currentDate.add(3,'day').format('dddd, DD MMMM');

export const deliveryOptions = [{
    id:0,
    deliveryDate: freeDeliveryDate ,
    price: 0,
},{
    id:1,
    deliveryDate: fastDeliveryDate,
    price: 40,
},{
    id:2,
    deliveryDate: primeDeliveryDate,
    price: 70,
}];


