
const rp = require('request-promise');
const puppeteer =require('puppeteer');
const fs=require('fs');

function fetchvideo(song,GOOGLE_API_key){
return new Promise((resolve, reject)=>{
rp('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+song+'&key='+GOOGLE_API_key).then((data)=>{
  var data=JSON.parse(data);
  var title=data["items"][0]["snippet"]["title"];
  //fetching video id
  var vid=data["items"][0]["id"]["videoId"];
  resolve({title,vid});
})
.catch((err)=>{
  reject(err);
});
});
}
//puppeteer script
async function downloadvideo(title,id,path){
const browser=await puppeteer.launch();
const page=await browser.newPage();
await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath:path});
await page.goto("http://ssyoutube.com/watch?v="+id);
var url=await page.evaluate(()=>{
return document.querySelector("#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.def-btn-box > a").href;
});
await page.click('.download-icon');
title=title.split("|").join('-').split(":").join("-");
console.log(title+" downloading from youtube");
while(!fs.existsSync(path+"/"+title+".mp4"))
  continue;
await browser.close();
}
module.exports={
  fetch:fetchvideo,
  download:downloadvideo
}
