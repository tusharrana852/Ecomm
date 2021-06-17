{
let createPost = function(){
    let newFo = $("#new-post-form");
    
    // newFo.submit(function(e){
    //     e.preventDefault();
    // });
    
    $.ajax({
        type: "POST",
        url:"/posts/create",
        data: newFo.serialize(),
        dataType: 'json',
        success: function(data){
            // let newPost = newPostDom(data.post);
            // $('#post-list-container>ul').prepend(newPost);
            console.log(data);
        },
        error: function(error){
            console.log("error"+error.responseText);
        }
    });

}

// create dom element
// let newPostDom = function(post){
//     return $(`<li id="post-${post._id}">
//     <p>
//     <small>
//     <a class ="delete-post-buttons" href="/posts/destroy/${post._id}">X</a>
//     </small>
//     ${post.content}
//     <br>
//     <small>
//     ${post.user.name}
//     </small>
//     </p>
//     <div class="post-comment">
    
//     <form action="/comment/create" method="POST">
//     <input type="text" required placeholder="Add comment" name="content">
//     <input type="hidden" name="post" value="${post._id}" >
//     <input type="submit" value="Add comment">
//     </form>
    
//     <div class="post-comment-list">
//     <ul id="post-comment-${post._id}" >
//     </ul>
//     </div>
//     </div>
//     </li>`)
//    }

createPost();
}
