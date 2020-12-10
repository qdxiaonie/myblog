$(function(){

    var len =$("#imgList img").length;
    var idx =0;
    var timer=setInterval(slide,3000);
    function slide(){
        idx++;

        $("#imgList").animate({
            left:-idx*420
        },function(){
            if(idx===len-1){
                idx=0;
                $("#imgList").css({left:0})
            }
            $("#navDiv a").eq(idx).addClass("on").siblings().removeClass("on");
        })
    }
    //鼠标移入停止轮播，移出后继续轮播
    $("#outer").mouseenter(function(){
        clearInterval(timer);
    })
    
    $("#outer").mouseleave(function(){
        timer=setInterval(slide,3000);
    })
    //设置左右导航
    $(".left").click(function(){
        // if($("#imgList").is(":animated")){
        //     return;
        // }
        idx--;
        if(idx<0){
            idx=len-2;
            $("#imgList").css({left:-(idx+1)*420});
        }
        $("#imgList").animate({left:-idx*420});
        $("#navDiv a").eq(idx).addClass("on").siblings().removeClass("on");
    })
    
    $(".right").click(function(){
        // if($("#imgList").is(":animated")){
        //     return;
        // }
        slide();
    })
    //底部导航点击
    $("#navDiv a").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        if($("#imgList").is(":animated")){
            return;
        }
        idx=$(this).index();
        $("#imgList").animate({left:-idx*420});
    })




    $('#dowebok').fullpage({
        navigation:true
    })

    $(".btn").on("click",function(){
        var li =$("<li></li>");
        li.html($("#txt").val()+"<a href='javascript:;'>删除</a>");
        $("#msg").prepend(li);
        li.slideDown();
        $("#txt").val("");

    });

    $("#msg").on("click","a",function(){
        $(this).parent().slideUp(function(){
            $(this).remove();
        })
    });

    $("#title").on("keydown",function(event){
        if(event.keyCode==13){
           if($(this).val()===""){
               alert("请输入内容！")
           }else{
            var local =getDate();
            local.push({title:$(this).val(),done:false});
            saveDate(local);
            load();
            $(this).val("");
            }
        }
    })
    //todolist删除数据
    $("#todolist,#donelist").on("click","a",function () {
        var data =getDate();
        var index =$(this).attr("id");
        // console.log(index)
        data.splice(index,1);
        saveDate(data);
        load();

    })
    //正在进行和已完成选项操作
    $("#todolist,#donelist").on("click","input",function () {
        var data=getDate();
        var index =$(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done=$(this).prop("checked");
        saveDate(data);
        load();

        
    })

    //读取本地存储的数据
    function getDate( ){
        var data =localStorage.getItem("todolist")
        if(data!=null){
            return JSON.parse(data);
        }else{
            return[];
        }
    }
    //保存本地存储数据
    function saveDate(data){
        localStorage.setItem("todolist",JSON.stringify(data))
    }
    //渲染加载数据
    function load(){
        var todoCount=0;
        var doneCount =0;
        var data =getDate();
        $("#todolist,#donelist").empty();

        $.each(data,function(i,n){
            if(n.done){
                $("#donelist").prepend("<li><input type='checkbox' checked='checked'><p>"+n.title+"</p><a href='javascript:;' id ="+i+">删除</a></li>");
                doneCount++;
            }else{
                $("#todolist").prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id ="+i+">删除</a></li>");
                todoCount++;
            }
           
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }
    load();
  
});