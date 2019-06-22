
$("#input-file").keypress(function (e) {
    if (e.which == 13) {
        $(".btn-upload").click();
    }
});
$(".btn-upload").click(function () {
    var $s = $(this);

    file = $('.input-file').val();
    if (file == "") {
        alert('请上传图片!');
        //CA(1);
        return false;
    }
    console.log("has file!")
    $s.text('提交中……')

    var formData = new FormData();
    formData.append('upload', $('#input-file')[0].files[0]);
    formData.append('select',$("#input-select").val())

    $.ajax({
        type: "POST",
        url: "http://183.174.228.100:1241/imguploadBeta",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $("#result").html("")
            // console.log(data)
            var res = JSON.parse(data)
            for (var i = 0; i < res.length; i++) {
                imgurl = res[i]["url"]
                if (res[i]["nickName"].length > 6) {
                    res[i]["nickName"] = res[i]["nickName"].substring(0, 6) + ".."
                }
                rowHeader = "<div style='margin:10px 10px;width:210px;float:left;'>"
                img = "<img src='" + imgurl + "'/ style='width:100%;height:300px;'>" + "<p style='width: 100%; height: 30px; overflow: hidden;white-space: nowrap;text-overflow: ellipsis'>"
                    + res[i]["Text"]
                    + "</p>"
                userInfo = '<div class="userInfo_sm">\
                <div class="userImg fl" title="Sakura">\
                    <a href="#"><img src="'+ res[i]["avatarUrl"] + '" alt=""  height="50" width="50"/></a>\
                </div>\
                <div class="Info fl" title="Sakura">\
                    <h3 class="userTit"><a href="'+ res[i]["nickNameUrl"] + '">' + res[i]["nickName"] + ' </a> </h3>\
                </div>\
            </div>'
                rowFooter = "</div>"

                $("#result").append(rowHeader + img + userInfo + rowFooter)
                // $("#result").append(rowHeader+img+userInfo+rowFooter)
                // $("#result").append(rowHeader+img+userInfo+rowFooter)
                // $("#result").append(rowHeader+img+userInfo+rowFooter)
                // $("#result").append(rowHeader+img+userInfo+rowFooter)

            }
            $s.text('提交')
        }
    })
    // $(".form-upload").ajaxSubmit({
    //     url : "http://183.174.228.100:1242/imgupload",
    //     type : 'POST',
    //     datatype : "script",
    //     success : function(data) {
    //         $s.text('提交');
    //         if (data.status == 1) {
    //             alert("提交成功");
    //             var dm=document.domain;
    //             var $curPanel = $s.closest('.panel');

    //             CA(1);
    //             setTimeout(function () {
    //                 var s = location.href.split('html')[0] + 'html';
    //                 var newhref = s + '#' + $curPanel.attr('id');
    //                 location.href = newhref;
    //                 location.reload();
    //             }, 1000);
    //         } else {
    //             if (data.info) {
    //                 alert(data.info);
    //             } else {
    //                 alert('提交文件失败，请检查文件名、文件大小等');
    //             }
    //         }
    //     }
    // });

})

