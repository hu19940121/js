  $(function(){
          var progress=0;
          var audio=document.getElementById('audio');
          var mp3Adress=['mp3/Always Getting Over You.mp3','mp3/Boogie Back.mp3','mp3/不得了.mp3','mp3/陈翔 - 烟火.mp3','mp3/好想大声说爱你.mp3','mp3/群星 - 这样吧.mp3','mp3/死一样痛过.mp3','mp3/童话镇.mp3','mp3/星星.mp3','mp3/一百万个可能慢摇版.mp3']
          var songtime=0;
          var index;
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

        })
