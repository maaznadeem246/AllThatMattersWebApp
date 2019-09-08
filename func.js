
var ip = require('ip')
const chalk = require('chalk');
var internetAvailable = require("internet-available");
const request = require('request')

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocodingClient = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoibWFhenVkZGluIiwiYSI6ImNqdW8xdTBiazE5bDgzeXB3M3IxbzA3NTIifQ.bVvx_uKuNVBfEf680xtVAA' });
const geocodingClient = mbxGeocodingClient(baseClient);

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5687f28192564a3aa23b060a11cf8f9b');

const searchIt =  (res,v) => {
     if(!v){

        getIpDetails(res)
     }else{
        getLonglat(res,v)
     }
}



// this is the starter function 


// This function will bring the default location details throuhg which we will get the Country name
const getIpDetails =  (res) => {
    const url = 'https://api.ipgeolocation.io/ipgeo?apiKey=ad7705d5417146f9adc16b2f5a1a3696';
   
    const callback =  (error, response) => {
   
        if(error != null){
            return res.send({error})
        }
        if (response != undefined) {
            if (response.statusCode == 200) {
                const jdata =  JSON.parse(response.body)
           // console.log(jdata.country_name)
            getLonglat(res,jdata.country_name);
            } else {
               return error
            }
        } else {
            console.log(chalk.bgRedBright.white.bold(' Internet Problem ! '))
        }
    }
    request(url, callback)
   
}

// This Function will bring the Longitude and Latitude from the mapbox Geocoding API 
const getLonglat = (res,sear) => {
    geocodingClient.forwardGeocode({
        query: sear,
        limit: 1
    })
        .send()
        .then(response => {
        getlonlatDetails(res,response.body.features[0].center[1], response.body.features[0].center[0])
     
        }).catch(er=>{
           return res.send({error:er})
        });

}


// This function will bring the Details of Weather from Accuweather API using Longitute and Latitude.
const getlonlatDetails = (res ,lat, lon) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=LGNfqXMoIDKfeRZAbC0B3uPpJA2rHhhY&q=' + `${lat}` + '%2C' + `${lon}`;
    const callback = (e, response) => {
    const jdata = JSON.parse(response.body)
        //console.log(jdata)
        if (jdata.Code == undefined) {
            getForcastDetails(res, jdata.Key, jdata.Country.ID, jdata.Country.LocalizedName,jdata.Region.LocalizedName)
            
            
            //return res.send({tem, news})
        } else {
            //              console.log(jdata)


            console.log(chalk.bgRedBright.white.bold(' Internet Problem !  kkk'))
           return res.send({error:{jdata}})
        }
    }
    request(url, callback)
}

// In getLongLatDetails function we will get a key  
// that key we will use in this functions to get the forcast Details from Accuweather API
const getForcastDetails = (res,key,c,count,reg) => {
    const url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/' + `${key}` + '?apikey=LGNfqXMoIDKfeRZAbC0B3uPpJA2rHhhY';

    const callback = (e, response) => {
    const jdata = JSON.parse(response.body)
       
        if(jdata.Code != undefined) {
            getNewsDetails(res, c, 'NO Temperature', count, reg)   
        }

        if (jdata.Code == undefined && jdata.fault == undefined) {
            let celcius = ((jdata[0].Temperature.Value - 32) * 5 / 9).toPrecision(5)
            getNewsDetails(res,c,celcius,count,reg)
        } 
    }
    request(url, callback)
}



const getNewsDetails = (res,country,celc,count,reg) => {
    let countryl = country.toLowerCase()
    // console.log(countryl)
  newsapi.v2.topHeadlines({

        country: countryl
    }).then(response => {
        // console.log(response)

        if (response.status == 'ok') {
            if (response.articles.length != 0) {
                 return res.send({country:count, region:reg, temperature:celc , news: response.articles })
            } else {
                return res.send({ country: count, region: reg, temperature: celc , news: [] })
            }
       }
    });

}





module.exports = {  searchIt}