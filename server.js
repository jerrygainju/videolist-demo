const express = require('express');
const app = new express();
const sequelize = require('./connector');
const { getVideos, getVideo, createVideo, updateVideo, deleteVideo } = require('./controller/videoController');
const { getVideoLists, createVideoList, updateVideoList, deleteVideoList, addVideoListItem, removeVideoListItem } = require('./controller/videolistController');
const Video = require('./models/video');
const VideoList = require('./models/videolist');
const VideoListItem = require('./models/videolistItem');


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// VideoListItem.belongsTo(Video,{as: 'video'})
// VideoListItem.belongsTo(VideoList,{as: 'videolist'});
Video.belongsToMany(VideoList, {through:"VideoListItem"});
VideoList.belongsToMany(Video,{through: "VideoListItem"});

app.get('/', getVideos);
app.get('/video/:id', getVideo);
app.post('/video/create', createVideo);
app.post('/video/update', updateVideo);
app.delete('/video/delete/:id', deleteVideo);

app.get('/list', getVideoLists);
app.get('/videolist/:id', getVideoLists);
app.post('/videolist/create', createVideoList);
app.post('/videolist/update', updateVideoList);
app.delete('/videolist/delete/:id', deleteVideoList);

app.post('/videolist/:id/addvideo', addVideoListItem); 
app.post("/videolist/:id/removevideo", removeVideoListItem); 

sequelize.sync()
.then(result => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT,() => { console.log(`listening on port ${PORT}`)})
}).catch(error => {
    console.log(error);
})
