$(".review .lecture").click(function(){
    course_id = $(".lecture input[name='"+$(this).attr('id')+"']").attr("value");
    window.location="/review/result/course/"+course_id;
});

$(".review .comment").click(function(){
    comment_id = $(".comment input[name='"+$(this).attr('id')+"']").attr("value");
    window.location="/review/result/comment/"+comment_id;
});
$(".review .like-button").click(function(){
    $.ajax({
        type: "POST",
        url: "/review/like/",
        data: {'commentid': $(this).attr('id'), 'csrfmiddlewaretoken': $("#csrf_token").val()},
        dataType:'json',
        success: function(response) {
            data = JSON.parse(response);
            if(!data.is_login)
                alert("로그인이 필요합니다");
            else{
                if(data.already_up){
                }
                else{
                    target = "."+JSON.stringify(data.id).replace(/\"/g,"")+".like_num";
                    $(target).text(data.likes_count);
                    target = "a."+JSON.stringify(data.id).replace(/\"/g,"");
                    $(target).addClass("not-active declaration-button");
                    $(target).removeClass("like-button");
                }
            }
        },
        error: function(rs, e) {
            alert("error");
               alert(rs.responseText);
        }
    });
});
