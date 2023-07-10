import cron from 'node-cron';
import axios from 'axios';
import moment from 'moment';
import { json } from 'stream/consumers';
class BookFieldRequest{
  id:number;
  jam_booking:number;
  lapangan:number;
  membership_id:string;
  tanggal_booking:string;
  tanggal_lahir:string;
}
// class BookFieldResponse{
//   status:string;
//   uuid:string;
//   error:string;
// }
// cron.schedule(
//   '1 0 6 * * SUN-THU',
//   function() {
    var nextDay = moment().add(2, 'days').format('YYYY-MM-DD');
    console.log('Mencoba Booking di:'+nextDay);
    bookField({
      "id": 8,
      "jam_booking": 17,
      "lapangan": 8,
      "membership_id": "TM52050",
      "tanggal_booking": nextDay,
      "tanggal_lahir": "20/03/1982"
    });
    bookField({
      "id": 8,
      "jam_booking": 18,
      "lapangan": 8,
      "membership_id": "TM51912",
      "tanggal_booking": nextDay,
      "tanggal_lahir": "26/07/1984"
    });
    bookField({
      "id": 8,
      "jam_booking": 19,
      "lapangan": 8,
      "membership_id": "TM52199",
      "tanggal_booking": nextDay,
      "tanggal_lahir": "03/04/1996"
    });
    bookField({
      "id": 8,
      "jam_booking": 20,
      "lapangan": 8,
      "membership_id": "TM51780",
      "tanggal_booking": nextDay,
      "tanggal_lahir": "16/03/1971"
    });
//   }
//   ,
//   {
//     scheduled: true,
//     timezone: 'Asia/Jakarta',
//     name: 'mondayToFriday-booking',
//     recoverMissedExecutions: true
// });

function bookField(jsonData:BookFieldRequest){
  var config = {
    method: 'post',
    url: 'https://www.thespringsclubserpong.com/booking/submit-booking',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(jsonData)
  };
  console.log('request:'+config.data);
  axios(config)
  .then(function (response:any) {
    //console.log(JSON.stringify(response.data));
    var data = response.data;
    if(data.status=="0"){
      console.log("gagal booking "+JSON.stringify(data));
      // console.log("gagal, mencoba lapangan lain");
      // var nextLapangan = getNextLapangan(jsonData.lapangan);
      // jsonData.lapangan=nextLapangan;
      // bookField(jsonData);
    }else if(data.status=="1"){
      console.log("sukses tgl "+ jsonData.tanggal_booking + ", jam : "+ (jsonData.jam_booking-1).toString() +",di lapangan:"+jsonData.lapangan);
    }
  })
  .catch(function (error) {
    console.log(error);
    //increase lap until 8
    // var numberLapangan = jsonData.lapangan;
    // var nextLapangan = ++numberLapangan;
    // if(numberLapangan<8){
    //   bookField({
    //     "id": jsonData.id,
    //     "jam_booking":  jsonData.jam_booking,
    //     "lapangan": nextLapangan,
    //     "membership_id": jsonData.membership_id,
    //     "tanggal_booking": jsonData.tanggal_booking,
    //     "tanggal_lahir": jsonData.tanggal_lahir
    //   });
    // }
  });
}
function generateRandom(min = 2, max = 8) {

  // find diff
  let difference = max - min;

  // generate random number 
  let rand = Math.random();

  // multiply with difference 
  rand = Math.floor( rand * difference);

  // add with min value 
  rand = rand + min;

  return rand;
}

function getNextLapangan(currentLapangan:number){
  var excludeArr=[1,5,6];
  excludeArr.push(currentLapangan);
  var randomNumber = generateRandom();
  while(excludeArr.includes(randomNumber)){
    randomNumber = generateRandom();
  }
  return randomNumber;
}
// var nextDay = moment().add(1, 'days');
// bookField({
//   "id": 8,
//   "jam_booking": 16,
//   "lapangan": 1,
//   "membership_id": "TM52050",
//   "tanggal_booking": nextDay.year().toString()+'-'+nextDay.month().toString()+'-'+nextDay.day().toString(),
//   "tanggal_lahir": "20/03/1982"
// })