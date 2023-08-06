
import axios from 'axios';
import moment from 'moment-timezone';
import express from 'express';

class BookFieldRequest{
  id:number;
  jam_booking:number;
  lapangan:number;
  membership_id:string;
  tanggal_booking:string;
  tanggal_lahir:string;
}
const app = express()
app.all('/', async (req:any, res:any) => {
    var responses = [];
    var today = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
    //today
    try{
      var response = await bookField({
        "id": 8,
        "jam_booking": 17,
        "lapangan": 8,
        "membership_id": "TM52050",
        "tanggal_booking": today,
        "tanggal_lahir": "20/03/1982"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 18,
        "lapangan": 8,
        "membership_id": "TM51912",
        "tanggal_booking": today,
        "tanggal_lahir": "26/07/1984"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 19,
        "lapangan": 8,
        "membership_id": "TM52199",
        "tanggal_booking": today,
        "tanggal_lahir": "03/04/1996"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 20,
        "lapangan": 8,
        "membership_id": "TM51780",
        "tanggal_booking": today,
        "tanggal_lahir": "16/03/1971"
      });
    responses.push(response);
    }catch(e){
      responses.push(e);
    }




    var nextDay = moment().tz('Asia/Jakarta').add(1, 'days').format('YYYY-MM-DD');
 
    //nextday

    try{
      var response = await bookField({
        "id": 8,
        "jam_booking": 17,
        "lapangan": 8,
        "membership_id": "TM52050",
        "tanggal_booking": nextDay,
        "tanggal_lahir": "20/03/1982"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 18,
        "lapangan": 8,
        "membership_id": "TM51912",
        "tanggal_booking": nextDay,
        "tanggal_lahir": "26/07/1984"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 19,
        "lapangan": 8,
        "membership_id": "TM52199",
        "tanggal_booking": nextDay,
        "tanggal_lahir": "03/04/1996"
      });
      responses.push(response);
    }catch(e){
      responses.push(e);
    }
    try{
      response = await bookField({
        "id": 8,
        "jam_booking": 20,
        "lapangan": 8,
        "membership_id": "TM51780",
        "tanggal_booking": nextDay,
        "tanggal_lahir": "16/03/1971"
      });
    responses.push(response);
    }catch(e){
      responses.push(e);
    }



    res.send(responses);
})
const port = process.env.PORT || 3000; 
app.listen(port,() => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// class BookFieldResponse{
//   status:string;
//   uuid:string;
//   error:string;
// }
// cron.schedule(
//   '1 0 6 * * SUN-THU',
//   function() {
   
//   }
//   ,
//   {
//     scheduled: true,
//     timezone: 'Asia/Jakarta',
//     name: 'mondayToFriday-booking',
//     recoverMissedExecutions: true
// });

function bookField(jsonData:BookFieldRequest){
  var serverTimeZone = moment.tz.guess();
  return new Promise((resolve,reject)=>{
    var config = {
      method: 'post',
      url: 'https://www.thespringsclubserpong.com/booking/submit-booking',
      headers: { 
        'Content-Type': 'application/json',
        'Origin':'https://www.thespringsclubserpong.com'
      },
      data : JSON.stringify(jsonData)
    };
    var theHour =jsonData.jam_booking-1;
    var tanggal =jsonData.tanggal_booking;
    axios(config)
    .then(function (response:any) {
      var data = response.data;
  
      if(data.status=="0"){
        reject({tanggal:tanggal,jam:theHour,lapangan:jsonData.lapangan,status:0,message:"gagal booking, error: "+data.error});

      }else if(data.status=="1"){
        resolve({tanggal:tanggal,jam:theHour,lapangan:jsonData.lapangan,status:1,message:"sukses"});
      }
    })
    .catch(function (error:any) {
      console.log(error);
      reject({tanggal:tanggal,jam:theHour,lapangan:jsonData.lapangan,status:0,message:"error : "+error.message,serverTimeZone:serverTimeZone});
     
    });
  });
}
// }
// function generateRandom(min = 2, max = 8) {

//   // find diff
//   let difference = max - min;

//   // generate random number 
//   let rand = Math.random();

//   // multiply with difference 
//   rand = Math.floor( rand * difference);

//   // add with min value 
//   rand = rand + min;

//   return rand;
// }

// function getNextLapangan(currentLapangan:number){
//   var excludeArr=[1,5,6];
//   excludeArr.push(currentLapangan);
//   var randomNumber = generateRandom();
//   while(excludeArr.includes(randomNumber)){
//     randomNumber = generateRandom();
//   }
//   return randomNumber;
// }
