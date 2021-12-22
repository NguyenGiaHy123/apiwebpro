const Posts=require('../../app/Models/Posts');
const validtatorPost=require('../../validator/posts')
const Profile=require("../Models/Profile")
class PostControllers{
    //@ POST api.posts
    ///  api/posts
    postControllers(rq,rs){
        const {errors,isValid}=validtatorPost(rq.body);
        if(!isValid){ 
          return  rs.status(400).json(errors)
        }
        const newPost=new Posts({
            text:rq.body.text,
            name:rq.body.name,
            avatar:rq.body.avatar,
            user:rq.user.id
        });
        newPost.save().then(post=>rs.json(post))
    }
    //@Get POSTs
    // api/posts
   //lay ra toan bo bai ddang va duoc sap xep giam dan theo thoi gian
    GETPosts(rq,rs){
        Posts.find()
        .sort({date:-1})
        .then(posts=>rs.json(posts))
        .catch(err=>rs.status(404).json(err))
    }

    //@Get POSTs theo id
    // api/posts/:id
   
   GETPostsId(rq,rs){
    Posts.findById(rq.params.id)
    .then(posts=>rs.json(posts))
    .catch(err=>rs.status(404).json({nopostfound:"No post found with that Id"}))
}

     //@Delete POSTs theo id
     // api/posts/:id
     
     DeletePostsId(rq,rs){
        
         
            Posts.findById(rq.params.id).then(post=>{
            //   rs.json(post)
            //khi delete khong tim thay id sẽ hiển thị là user nothorizes
                if(post.user.toString()!=rq.user.id){
                    return rq.status(401).json({
                        noauthorized:'khong tim thay user can xoa'
                    })
                }
                //delete theo id khuc trn van vhua hieu cho profile
               
                post.remove().then((data)=>rs.json(data))
            })
        
        .catch(err=>rs.json({noIdPost:"No post found id delete"}))
     }

    //@   like bai post  POSTs theo id
     // api/posts/like/:id(id cua bai dang)
     //khi ngupoi dung like no chi cho phep like 1 lan thoi
     //khi nguoi thu 2 like thi no se cho phep like them lan nua vao bai dang do
     likePost(rq,rs){
        
       
         
            Posts.findById(rq.params.id).then(post=>{
                if(post.likes.filter(like=>like.user.toString()===rq.user.id).length>0){
                   // id trong db like.user.toString() "61ab3816ba567f552ad25366"
                   //rq.user.id nay cung tra ve id 61ab3816ba567f552ad25366
                    return rs.status(400).json({already:"user already liked this post"});
                }
                post.likes.unshift({user:rq.user.id})
                post.save().then(post=>rs.json(post))
               
            })
        
        .catch(err=>rs.json({noIdPost:"No post found id delete"}))
     }


      //@   unlike bai post  POSTs theo id
      // nhap vao thi like do mat khong like
     // api/posts/unlike/:id(id cua bai dang)
     //khi ngupoi unlike loi bo cai like cua user
    
     unlikePost(rq,rs){
        
        Profile.findOne({user:rq.user.id}).then(profile=>{
         
            Posts.findById(rq.params.id).then(post=>{
                if(post.likes.filter(like=>like.user.toString()===rq.user.id).length===0){
                   // id trong db like.user.toString() "61ab3816ba567f552ad25366"
                   //rq.user.id nay cung tra ve id 61ab3816ba567f552ad25366
                    
                    return rs.status(400).json({notLinked:"you have not linke this post"});
                }
                //remove index
               
              post.likes.splice(post.likes.findIndex(iduser=>iduser.user.toString()===rq.user.id),1);
              post.save().then(post=>rs.json(post))
               
            })
        }) 
        .catch(err=>rs.json({noIdPost:"No post found id delete"}))
     }


     //--------------------------------phan comment --------------------
        
      // commnet
     //Post api/posts/comment/:id(id cua bai dang)
     // la coment trong bai dang nen id cua bai dang
     //them mot commnent
    
     commentId(rq,rs){
 
        Posts.findById(rq.params.id).then(post=>{
         
            const newcommnent={
                text:rq.body.text,
                name:rq.body.name,
                avatar:rq.body.avatar,
                user:rq.user.id
            }
           
            post.comments.unshift(newcommnent);
           
            post.save().then(post=>rs.json(post));
        })
        .catch(err=>rs.status(404).json({postnotfound:'not post found'}))
     }
     

    // deletecoment commnet
     //Post api/posts/comment/:id/:comment_id->cai id minh muon xoa
     deletecommentId(rq,rs){
 //id la no lay theo cai dinh tuyen id la thang /:id con thang kia/:commnentid
        Posts.findById(rq.params.id).then(post=>{
       //"61ae507a805081ddb75a7b83"
  
            //check to see if comment exists
            // if(post.comments.filter(comments=>comments._id.toString()===rq.params.comment_id).length===0){
                
                 
            //      return rs.status(400).json({notLinked:"you have not linke this post"});
            //  }
          
                post.comments.splice(post.comments.findIndex(comenid=>comenid._id.toString()===rq.params.comment_id),1);
                post.save().then(post=>rs.json(post)).catch(err=>rs.json(err))
           
        })
        .catch(err=>rs.json(err))
     }
    
}
module.exports=new PostControllers