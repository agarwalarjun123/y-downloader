
const cheerio=require('cheerio');
const rp = require('request-promise');
const puppeteer =require('puppeteer');
const key=require('./key');

function fetchvideo(song){
return new Promise((resolve, reject)=>{
rp('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+song+'&key='+key.API_KEY).then((data)=>{
  var data=JSON.parse(data);
  //fetching video id
  var vid=data["items"][0]["id"]["videoId"];
  resolve(vid);
})
.catch((err)=>{
  reject(err);
});
});
}
//puppeteer script
async function downloadvideo(id){
const browser=await puppeteer.launch();
const page=await browser.newPage();
await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/home/arjun1234/Music'});
await page.goto("http://ssyoutube.com/watch?v="+id);
await page.click(".download-icon");
}
fetchvideo("Be intehaan")
.then((watchid)=>{
console.log(watchid);
return downloadvideo(watchid);
})
.then(()=>{
  console.log("video Download Started");

})
.catch((err)=>{
console.log(err);
});



// function youpost(){
//   return new Promise(function(resolve, reject) {
//     rp("http://youtube.com/results?search_query=ae+Watan")
//     .then((data)=>{
//       var $=cheerio.load(data);
//       var url= $("div.ytd-app:nth-child(13)").attr("id");
//       console.log(url);
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
//   });
// }
// youpost()
// .then((url)=>{
// console.log(url);
//
//
//   });
