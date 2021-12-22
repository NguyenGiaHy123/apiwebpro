const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Postschema=new Schema({
    user:{
       type:Schema.Types.ObjectId,
       ref:'Users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'Users'
            }
         
        }
    ],
    
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'Users'
            },

            text:{
                type:String,
             
            },
            name:{
                type:String
            }
            ,
            avatar:{
                type:String
            },
           
        }
       
    ]
    ,
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Posts',Postschema);