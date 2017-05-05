  $(function(){
          var progress=0;
          var audio=document.getElementById('audio');
          var mp3Adress=['mp3/Always Getting Over You.mp3','mp3/Boogie Back.mp3','mp3/不得了.mp3','mp3/陈翔 - 烟火.mp3','mp3/好想大声说爱你.mp3','mp3/群星 - 这样吧.mp3','mp3/死一样痛过.mp3','mp3/童话镇.mp3','mp3/星星.mp3','mp3/一百万个可能慢摇版.mp3']
          var songtime=0;
          var index;
          var omusicpic=document.getElementById("musicpic")
          //单击歌曲名字播放
          $('#music-list li').click(function(){
            $('#music-list li').removeClass();
            $(this).addClass('playing');
            index= $('#music-list li').index($(this));
            console.log(index);
            audio.src=mp3Adress[index];
            audio.play();
            $('#play-btn .iconfont').html('&#xe640;')
            $('.music-detail p').html($(this).children('#music-name').html());
            $('.songname').html($(this).children('#music-name').html())

          })

          //快进快退
          $(".detail-container").click(function(e) {
              var left=$('.progress-inner').offset().left;
              var top=$('.progress-inner').offset().top;
              var x=e.pageX-left;
              if ((e.pageX>=left && e.pageX<=(left+272)) && (e.pageY>=top-4 && e.pageY<=(top+3+4))) {
                $(".progress-inner").css("width",x);
                var songtime=Math.floor(((e.pageX-left)/272)*(audio.duration));
                audio.currentTime=songtime;
              }
          })


          // $(".progress").click(function(e){
          //
          //
          //     var left=$('.progress-inner').offset().left;
          //     var top=$('.progress-inner').offset().top;
          //     var x=e.pageX-left;
          //     $(".progress-inner").css("width",x);
          //     var songtime=Math.floor(((e.pageX-left)/272)*(audio.duration));
          //     audio.currentTime=songtime;
          //
          // })

          //进度条 歌曲总时间及当前时间的显示
          audio.ontimeupdate=function(){
              songtime=Math.floor(audio.duration);
              minu=Math.floor(songtime/60);
              seco=Math.floor(songtime%60);
              var songtimeStr=minu+":"+seco;
              $('.alltime').html(songtimeStr);
              currenttime=Math.floor(audio.currentTime);
              Lseco=currenttime%60;
              Lminu=Math.floor(currenttime/60);
              if (Lseco<10) {Lseco="0"+Lseco};
              if (Lminu<10) {Lminu="0"+Lminu};
              $('.second').html(Lseco);
              $('.minu').html(Lminu);
              var step=(audio.currentTime/audio.duration*400)
              var step2=(audio.currentTime/audio.duration*272)
              console.log('当前时间为'+currenttime)
              console.log('总时间为'+songtime)
             $('.progressbar').css("width",step.toString());
             $('.progress-inner').css("width",step2.toString());
             if (currenttime==songtime) {

               index++;

               audio.src=mp3Adress[index];  //顺序播放
               audio.play();

              $('#music-list li').removeClass();
              $('#music-list li').eq(index).addClass('playing');
              $('.music-detail p').html($('#music-list li').eq(index).children('#music-name').html());
              $('.songname').html($('#music-list li').eq(index).children('#music-name').html())
              console.log(index);
             }

          }


          //首页的播放暂停
          $('#play-btn').click(function(){
            if (audio.paused) {
              audio.play();
              $('#play-btn .iconfont').html('&#xe640;')
            }else{
              audio.pause();
              $('#play-btn .iconfont').html('&#xe778;')
            }
          })

          //专辑封面里的播放暂停
           $('.play-btn').click(function(){
            if (audio.paused) {
              audio.play();
              $('#play-btn .iconfont').html('&#xe640;')
            }else{
              audio.pause();
              $('#play-btn .iconfont').html('&#xe778;')
            }
          })


           //下载音乐
          $('#download-btn').click(function() {
           alert('此功能未实现')
          })
          //点击弹出专辑封面
          $('.music-pic').click(function(){
            $('.shadow,.detail-container').css("display","block")

          })

          //点击返回音乐播放器列表
          $('.goback').click(function(){
             $('.shadow,.detail-container').css("display","none")

          })



    $("#btn").click(function(){
      $("#seach-list li").remove();
  		$.ajax({
     async:false,
     url: "http://searchtip.kugou.com/getSearchTip",
     type: "GET",
     dataType: 'jsonp',
     jsonp: 'callback',
     data:"keyword="+$("#input").val(),
     timeout: 5000,

     success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
       $.ajax({
            async:false,
            url: "http://songsearch.kugou.com/song_search_v2?&platform=WebFilter",
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            data:"keyword="+$("#input").val(),
            timeout: 5000,
            success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数

               console.log(json)

               for (var i = 0; i < json.data.lists.length; i++) {
                 $("#seach-list").append("<li>"+json.data.lists[i].FileName+"</li>");
               }

               $("#seach-list li").click(function(){
                   var index=$('#seach-list li').index($(this));
                   console.log(json.data.lists[index].FileName);
                   console.log(index);
                   var hash=(json.data.lists[index].FileHash);

                          $.getJSON("http://query.yahooapis.com/v1/public/yql", {
                          q: "select * from json where url=\"http://www.kugou.com/yy/index.php?r=play/getdata&hash="+hash+"\"",
                          format: "json"
                        }, function(data) {

                          console.log(json.data)

                          var $content = $("#content")
                          if (data.query.results) {
                              $content.text(JSON.stringify(data.query.results.json.data.play_url));
                              console.log(data.query.results);
                              audio.src=data.query.results.json.data.play_url
                              audio.play();
                              omusicpic.src=data.query.results.json.data.img
                              $('.songname').html(data.query.results.json.data.song_name)
                              $('.music-detail p').text(data.query.results.json.data.song_name);
                              $('.music-detail span').text(data.query.results.json.data.author_name);
                              $('.songsinger').text(data.query.results.json.data.author_name);
                              $('.fengmian img').attr("src",data.query.results.json.data.img);
                              $('.shade').css("background","url("+data.query.results.json.data.img+")");
                              $('.shade').css("background-size","cover");
                              $('.shade').css("background-position","center");
                              $('.fengmian img').attr("src",data.query.results.json.data.img);
                              $('.shadow').css("background","url("+data.query.results.json.data.img+") 50% 50%");
                              $('.shadow').css("background-size","cover");
                              if (!audio.paused) {
                                  $('#play-btn .iconfont').html('&#xe640;')
                              }
                          } else {
                              $content.text('no such code: ' + code);
                          }
                        })




               })






             /* if(json.actionErrors.length!=0){
                    alert(json.actionErrors);
              }
                genDynamicContent(qsData,type,json);*/
            },


           });



     	/* if(json.actionErrors.length!=0){
             alert(json.actionErrors);
       }
         genDynamicContent(qsData,type,json);*/
     },

  });
  	})
        })
