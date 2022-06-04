const Video = require('../models/video')

exports.getVideos = (req, res) => {
    Video.findAll().then(videos => {
        console.log(videos)
        return res.json({
            videos
        })
    }).catch(error => {
        console.log(error)
    })
}

exports.getVideo = (req, res) => {
    const id = req.params.id
    Video.findByPk(id).then(video =>{
        console.log(video)
        return res.json({
            video
        })
    }).catch(error => {
        console.log(error)
    })
}

exports.createVideo = (req, res) =>{
    try{
    const {name, description, active} = req.body;
    if(name && description && active){
        Video.create({name,description,active}).then(video =>{
        console.log(video)
        return res.status(201).json({
            video,
            'success': true
        })
    }).catch(error => {
        console.log('sql',error)
    })
    }
    else{
        return res.status(400).json({
            'error': 'sent value'
        })
    }
        
    }catch(err){
        console.log(err)
         return res.status(400).json({
            'error': 'sent value'
        })
    }
}

exports.updateVideo = async(req, res) => {
    try{
        const id = req.body.id;
        const name = !req.body.name?null:req.body.name;
        const description = !req.body.description? null:req.body.description;
        const active = !req.body.active? null:req.body.active;
        if(id){
            const video = await Video.findByPk(id)
            if(video){
                Video.update({
                    name: name == null? video.name: name, 
                    description: description == null? video.description: description,
                    active: active == null? video.active: active
                },
                {
                    where:{
                        id: id
                    }
                }
                )
                .then(video => {
                    return res.status(201).json({
                        "message":" success"
                    })
                })
            }
            else{
                return res.status(404).json({
                    "message": "video not found"
                })
            }
        }else{
            return res.status(400).json({
                "message":"send ID"
            })
        }
    }catch(err)
    {
        console.log(err)
    }
}

exports.deleteVideo = (req, res) => {
    const id = req.params.id
    Video.destroy({
        where:{
            id: id
        }
    }).then(result =>{
        console.log(result);
        return res.status(200).json({
            "message":"success"
        }).catch(err =>{
            return res.status(401).json({
                "error":err
            })
        })
    })
}