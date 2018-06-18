# What is y-downloader?
y-downloader is a node module that will help you download a youtube video in a simple way.

 you can install the node module using npm

```
npm install y-downloader
```

The node module works well with Promises

How to use the package?

```
var ydl=require('y-downloader');
var download={
  name:videoName,
  path:PathDirectory,
  google_key:google_api_key
}
ydl(download).then()
```
