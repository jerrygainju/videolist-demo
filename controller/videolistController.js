const Video = require("../models/video");
const VideoList = require("../models/videolist");
const VideoListItem = require("../models/videolistItem");

exports.getVideoLists = (req, res) => {
  VideoList.findAll()
    .then((VideoLists) => {
      console.log(VideoLists);
      return res.json({
        VideoLists,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getVideoList = (req, res) => {
  const id = req.params.id;
  VideoList.findByPk(id)
    .then((VideoList) => {
      console.log(VideoList);
      return res.json({
        VideoList,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createVideoList = (req, res) => {
  try {
    const { name, link } = req.body;
    if (name && link) {
      VideoList.create({ name, link })
        .then((VideoList) => {
          console.log(VideoList);
          return res.status(201).json({
            VideoList,
            success: true,
          });
        })
        .catch((error) => {
          console.log("sql", error);
        });
    } else {
      return res.status(400).json({
        error: "sent value",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "sent value",
    });
  }
};

exports.updateVideoList = async (req, res) => {
  try {
    const id = req.body.id;
    const name = !req.body.name ? null : req.body.name;
    const link = !req.body.link ? null : req.body.link;

    if (id) {
      const videoList = await VideoList.findByPk(id);
      if (videoList) {
        VideoList.update(
          {
            name: name == null ? videoList.name : name,
            link: link == null ? videoList.link : link,
          },
          {
            where: {
              id: id,
            },
          }
        ).then((videoList) => {
          return res.status(201).json({
            message: " success",
          });
        });
      } else {
        return res.status(404).json({
          message: "VideoList not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "send ID",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteVideoList = (req, res) => {
  const id = req.params.id;
  VideoList.destroy({
    where: {
      id: id,
    },
  }).then((result) => {
    console.log(result);
    return res
      .status(200)
      .json({
        message: "success",
      })
      .catch((err) => {
        return res.status(401).json({
          error: err,
        });
      });
  });
};

exports.addVideoListItem = async (req, res) => {
  const id = req.params.id;
  const videoID = req.body.id;

  const videoList = await VideoList.findByPk(id);
  if (videoList) {
    const video = await Video.findByPk(videoID)
    if(video){
       await videoList.addVideo(videoID)
        const result = await VideoList.findOne({
            where:{
                id: id
            },
            include: Video
        })
        return res.status(201).json({
            "message":"success",
            "result": result

        })
    }else{
     return res.status(404).json({
       messege: "video not found",
     });   
    }
  } else {
    return res.status(404).json({
      messege: "video list not found",
    });
  }
};

exports.removeVideoListItem = async (req, res) => {
  const id = req.params.id;
  const videoID = req.body.id;

  const videoList = await VideoList.findByPk(id);
  if (videoList) {
    const video = await Video.findByPk(videoID);
    if (video) {
      await videoList.removeVideo(videoID);
      const result = await VideoList.findOne({
        where: {
          id: id,
        },
        include: Video,
      });
      return res.status(201).json({
        message: "success",
        result: result,
      });
    } else {
      return res.status(404).json({
        messege: "video not found",
      });
    }
  } else {
    return res.status(404).json({
      messege: "video list not found",
    });
  }
};

