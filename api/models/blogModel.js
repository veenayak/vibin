const mongoose=require('mongoose');
const db = require('../database');
var model = require('../models/loginModel');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        index: {unique: true, dropDups: true},
        required: "Oops..title is required what are you doing?"
    },
    mainImage: {
        type: String,
        image: Buffer,
        required: "Oops..image is required what are you doing?"
    },
    content: {
        type: Array,
        required: "Oops..content is required what are you doing?",
        
    },
    createdOn: {
        type : Date,
        default: Date.now()
    },
    updatedOn: {
        type : Date,
        default: Date.now()
    },
    views: {
        type : Number,
        default: 0
    },
    category: {
        type: String,
        required: "Oops..content is required what are you doing?",

    },
    description: {
        type: String,
        required: "Oops..description is required what are you doing?",        
    },
    category: {
        type: String,
        required: "Oops..category is required what are you doing?",
    },
    likes: {
        type : Number,
        default: 0
    }

});

blogTable = mongoose.model('blogs',blogSchema);     

module.exports={
     
    fetchData:function(callback,req){
        const category = req.body.category;
        const title = req.body.title;
        const views = req.body.views;

        console.log(req);
        if( category != null )
            blogTable.find({category : category},function(err, data){
                if(err) callback({message:err.message,status:500});
                return callback({data:data,status:200});
            })
        else if(title != null)
            blogTable.findOne({title : title},function(err, data){
                if(err) return callback({message:err.message,status:500});
                data.views = data.views + 1;
                data.save();
                return callback({data:data,status:200});
  
            });
        else if(views != null){
            const blogData = blogTable.find({}).sort("-views").limit(8);
            blogData.exec(function(err, data){
                if(err) return callback({message:err.message,status:500});
                return callback({data:data,status:200});
  
            });
        }
        else 
            blogTable.find({},function(err, data){
                if(err) callback({message:err.message,status:500});
                return callback({data:data,status:200});
            });
    },
    insertData:function(callback,req){
        model.validateToken(function(data){
            if(data.status==200){                
                blogTable.findOne({title:req.body.title},function (err,data) {
                    if(err) return callback({message:err.message,status:500})
                    if(data === null){  
                        const sa = {title: req.body.title, mainImage: req.body.mainImage, content: req.body.content , description: req.body.description, category: req.body.category};

                        const blogData = new blogTable(sa);

                        blogData.save(function (err) {
                            if(err) return callback({message:err.message,status:400})
                            return callback({message:"Blog has been created.",status:200});
                        });
                    }
                    else{
                        return callback({message:"Title already exists!",status:409});
                    }
                });

            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        },req.body.token);
    },
    updateData:function(callback,req){
        const sa = {title: req.body.title, mainImage: req.body.mainImage, content: req.body.content , description: req.body.description, category: req.body.category, updatedOn:Date.now()};
        model.validateToken(function(data){
            if(data.status==200){                
                blogTable.findOneAndUpdate({_id:req.body.id},sa,function (err,data) {
                    if(err) return callback({message:err.message,status:400})
                    if(data === null){
                        return callback({message:"Blog does not exist" ,status: 401});

                    }
                    else{
                        return callback({message:"Blog has been updated",status:200});
                    }
                });

            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        },req.body.token);
    },
    updateLikes:function(callback,req){
        blogTable.findOne({title:req.body.title},function (err,data) {
            if(err) return callback({message:err.message,status:400})
            if(data === null){
                return callback({message:"Blog does not exist" ,status: 401});
            }
            else{
                data.likes = data.likes+1;
                data.save();
                return callback({message:"Blog has been updated",status:200});
            }
        });
    },
}
