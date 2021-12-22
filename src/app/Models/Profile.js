const mongoose=require('mongoose');
const schema=mongoose.Schema;
const profileSchema=new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'Users'
    },

    handle:{
        type:String,
        required:true,
        max:40
    },
    company:{
        type:String,
        
    },
    website:{
        type:String

    },
    location:{
        type:String
    },
    status:{
        type:String,
        // required:true
    },
    skills:{
        type:String,
        required:true
    },

    bio:{
        type:String,
    },
    githubSername:{
        type:String,
    },
 experience:[
    {

    title:{
        type:String,
        required:true
    },
       
    //ten cong ty
    company:{
          type:String,
          required:true
      },
   
   
    location:{
           type:String
       },

    from:{
         type:Date,
         required:true

       },
       to:{
           
               type:Date,
       },
       current:{
           type:Boolean,
           default:false
       },
       description:{
           type:String
       }
    
    }
],

education:[
    {

    school:{
        type:String,
        required:true
    },
    //bang toi nghiep
       
    degree:{
          type:String,
          required:true
      },
   
   
    fielofStudy:{
           type:String,
           required:true
       },

    from:{
        //thoi gian bat dau tham gia den ket thuc la nam
         type:Date,

         required:true

       },

       //thoi gian ket thuc
       to:{
           type:{
               type:Date,
             
           }
       },
       current:{
           type:Boolean,
           default:false
       },
       description:{
           type:String
       }
    }
],
    social:{
        youtube:{
            type:String,
        },
        twittwer:{
            type:String,
        },
        facebook:{
            type:String,
        },
        linkedin:{
            type:String,
        },
        intergram:{
            type:String,
        },
    },
    data:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Profile',profileSchema)