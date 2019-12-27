const router = require('express').Router();
const Wenkai = require('../models/wenkai');

//Read the date from DB
router.get('/wenkai', (req, res, next)=>{
    Wenkai.aggregate([
        {
            $geoNear: {
                near: {type:'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true                
            }
        }
    ]).then(function(wenkais){
        res.send(wenkais);
    });
});

//Add data to the db
router.post('/wenkai', (req, res, next)=>{
    Wenkai.create(req.body).then((wenkai)=>{
        res.send(wenkai);
    }).catch(next);

});

//Updating existing datas in DB
// next means next middleware
router.put('/wenkai/:id', (req, res, next)=>{
    Wenkai.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Wenkai.findOne({_id: req.params.id}).then((wenkai)=>{
            res.send(wenkai);
        });
    });
});

//Deleting data from DB
router.delete('/wenkai/:id', (req, res, next)=>{
    Wenkai.findByIdAndRemove({_id: req.params.id}).then((wenkai)=>{
        res.send(wenkai);
    });
});

module.exports = router;