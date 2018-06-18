//npm function to be exported
const ydownload= require('./youtubedownload');
function ydl(vd){
  return new Promise(function(resolve, reject) {
    ydownload.fetch(vd.name,vd.google_key)
    .then((video)=>{
      return ydownload.download(video.title,video.vid,vd.path);
    })
    .then(()=>{
        resolve("video downloaded");
    })
    .catch((err)=>{
      reject(err);
    });
  });
}
module.exports=ydl;
