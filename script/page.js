var pageObj={
    showCount:0,//记录显示列表的数量
    showNum:0,//记录点击按钮显示
    NUM:0,//测试分页总的显示数量
    clickNum:0,//记录点击的次数
    clickPage:1,//页面的点击默认为第一页
    DATA:null,//保存传过来的数据
    ID:null,//包存分页层的id
init:function(options){
    this.ID=options.id;
    this.showCount=options.showcount;
    this.showNum=options.shownum;
    this.DATA=options.data;
    this.NUM=this.DATA.length%this.showCount==0?this.DATA.length/this.showCount:parseInt(this.DATA.length/this.showCount)+1;
    this.viewPage();
    this.addPageNum();
    this.clickLeft();
    this.clickRight();
    this.shouClick();
    this.endClick();
    this.clickSpan();
},
//设置分页按钮及显示按钮的个数
addPageNum:function(){
    var html='<div class="lf"><button id="shou" type="button" class="btn">首页</button><span id="left"><<</span></div><div class="lf" id="mid">';
    for(var i=0;i<this.NUM;i++){
        if(i==0){
            html+="<span i='"+(i+1)+"' class='hover'>"+(i+1)+"</span>";
        }else{
            html+="<span i='"+(i+1)+"'>"+(i+1)+"</span>";
        }
    }
    html+='</div> <div class="lf"><span id="right">>></span><button id="wei" type="button" class="btn">尾页</button></div>';
    $("#"+this.ID).html(html);
    var width=parseInt(this.showNum+1)*(parseInt($("#mid>span").css("width"))+10);//10位span的margin值
    $("#mid").css("width",width);
},
//点击右侧按钮
clickRight:function(){
    var me=this;
    $("#right").click(function(){
        me.clickNum<me.NUM- me.showNum&&me.clickNum++;
        if(me.clickNum>0){
            $("#mid>span:eq("+ (me.clickNum-1)+")").hide();
            $("#mid>span:eq("+ (me.clickNum)+")").show().attr("class","hover").siblings().removeClass();
        }
        me.clickPage=me.clickNum+1;
        me.viewPage();
    });
},
//点击左侧按钮
clickLeft:function(){
    var me=this;
    $("#left").click(function(){
        me.clickNum>0?me.clickNum--:me.clickNum=0;
        $("#mid>span:eq("+me.clickNum+")").show().attr("class","hover").siblings().removeClass();
        me.clickPage=me.clickNum+1;
        me.viewPage();
    });
},
//点击分页数字
clickSpan:function(){
    var me=this;
    $("#mid>span").click(function(){
        $(this).attr("class","hover").siblings().removeClass();
        me.clickPage=$(this).attr("i");
        me. viewPage();
    })
},
//点击首页
shouClick:function(){
    var me=this;
    $("#shou").click(function(){
        me.clickNum=0;
        $("#mid>span").show();
        $("#mid>span:eq("+0+")").attr("class","hover").siblings().removeClass();
        me.clickPage= 1;
        me.viewPage();
    })
},
//点击尾页
endClick:function(){
    var me=this;
    $("#wei").click(function(){
        me.clickNum= me.NUM- me.showNum;
        for(var k=0;k<me.clickNum;k++){
            $("#mid>span:eq("+k+")").hide();
        }
        $("#mid>span:eq("+(me.NUM-1)+")").show().attr("class","hover").siblings().removeClass();
        me.clickPage= me.NUM;
        me.viewPage();
    })
},
//页面显示功能
viewPage:function(){
        var cHtml="";
        if(this.clickPage==this.NUM){
            var result=this.DATA.slice((this.clickPage-1)* this.showCount,this.DATA.length);
            options.callback(result);
        }
        else{
            var result=this.DATA.slice((this.clickPage-1)*this.showCount,(this.clickPage-1)*this.showCount+this.showCount);
            options.callback(result);
        }
}
};