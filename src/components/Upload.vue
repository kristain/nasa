<template>

  <div class="camera-area">

    <form enctype="multipart/form-data" method="post" class="a-upload">
      <input type="file" @click="submit" name="fileToUpload" class="fileToUpload" accept="image/*" capture="camera"/>
      <div class="thumb" id="thumb">
        <img :src="file" alt="" v-if="file != ''">
        <span v-else>+</span>
      </div>
    </form>
    <div @click="showImages(file)" class="upload-files"><i>查看大图</i></div>
  </div>
</template>

<script>

  export default {
    replace: true,
    props: ['file', 'type'],
    data (){
      return {
        imageShowStatus: false,
        imageShowfilename: '',
      }
    },
    route:{
      data (){
        //
      }
    },
    ready () {
      console.log(this.type);
      //
    },
    methods:{
      tips (){
        $.alert('请与搜索截图的上传时间保持1分钟以上的有效时间间隔，但不能超过1小时');
      },
      showImages (file){
        if (file == '') {
          $.toast('请先上传图片');
          return false;
        }
        var myPhotoBrowserStandalone = $.photoBrowser({
          photos : file.split(','),
          type: 'popup'
        });
        myPhotoBrowserStandalone.open();
      },
      submit (){
        var _self = this;

        (function($) {
          $.extend($.fn, {
            fileUpload: function(opts) {
              this.each(function() {
                var $self = $(this);
                var doms = {
                  "fileToUpload": $self.find(".fileToUpload"),
                  "thumb": $self.find(".thumb"),
                  "progress": $self.find(".upload-progress")
                };
                var funs = {
                  //选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件
                  fileSelected: function() {
                    var files = (doms.fileToUpload)[0].files;
                    var count = files.length;
                    for (var index = 0; index < count; index++) {
                      var file = files[index];
                      var fileSize = 0;
                      if (file.size > 1024 * 1024){
                        $.toast("文件超过1M啦");
                        return false;
                        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                      }
                      else
                        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                    }
                    funs.uploadFile();
                  },
                  //异步上传文件
                  uploadFile: function() {
                    $.showIndicator();
                    var fd = new FormData();//创建表单数据对象
                    var files = (doms.fileToUpload)[0].files;
                    var count = files.length;
                    for (var index = 0; index < count; index++) {
                      var file = files[index];
                      fd.append(opts.file, file);//将文件添加到表单数据中
                      // funs.previewImage(file);//上传前预览图片，也可以通过其他方法预览txt
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", funs.uploadProgress, false);//监听上传进度
                    xhr.addEventListener("load", funs.uploadComplete, false);
                    xhr.addEventListener("error", opts.uploadFailed, false);
                    xhr.open("POST", opts.url);
                    xhr.send(fd);
                  },
                  //文件预览
                  previewImage: function(file) {
                    var gallery = doms.thumb;
                    var img = document.createElement("img");
                    img.file = file;
                    doms.thumb.html(img);
                    // 使用FileReader方法显示图片内容
                    var reader = new FileReader();
                    reader.onload = (function(aImg) {
                      return function(e) {
                        aImg.src = e.target.result;
                      };
                    })(img);
                    reader.readAsDataURL(file);
                  },
                  uploadProgress: function(evt) {
                    if (evt.lengthComputable) {
                      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                      doms.progress.html(percentComplete.toString() + '%');
                    }
                  },
                  uploadComplete: function(evt) {
                    $.hideIndicator();
                    var filename = JSON.parse(evt.target.responseText).message;
                    console.log("images", filename);
                    _self.file = filename;
                    let taskImg = store.get('taskImg') || {};
                    taskImg[_self.type] = filename;
                    if (_self.type == '搜索') {
                      store.set("searchimageurlDate", new Date().getTime() / 1000);
                    }
                    store.set('taskImg', taskImg);
                  }
                };
                doms.fileToUpload.off().on("change", function() {
                  doms.progress.find("span").width("0");
                  funs.fileSelected();
                });
              });
            }
          });
        })(Zepto);

        $(".camera-area").fileUpload({
          "url": "/nasa/common/uploadimg",
          "file": "image"
        });
      }
    },
    components: {
    },
    events: {
      //
    }
  }
</script>

<style>
  .thumb {
    width: 52px;
    height: 87px;
    border: 1px solid #eee;
    background-color: #eee;
    margin-bottom: 4px;
    border-radius: 3px;
    line-height: 74px;
    text-align: center;
    color: #999;
    font-size: 30px;
  }
  .thumb img {
    width: 50px;
    height: 85px;
    border-radius: 3px;
    vertical-align: middle;
  }

  .a-upload {
    line-height: 20px;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }
  .a-upload  input {
    position: absolute;
    font-size: 74px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .upload-files {
    text-align: center;
    height: 30px;
  }
  .upload-files i {
    background-color: #4cd964;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
  }
</style>
