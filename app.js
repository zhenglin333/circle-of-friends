// TODO: 用户名称需修改为自己的名称
var userName = 'Z~Lin';
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和',
    avatar: './img/avatar2.png'
  },
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '3分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    },{
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['阳和'],
    comments: []
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
    share: {},
    timeString: '2个小时前'
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');

/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  // 点赞人的html列表
  var likesHtmlArr = [];
  // 遍历生成
  for(var i = 0, len = likes.length; i < len; i++) {
    likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  // 每个点赞人以逗号加一个空格来相隔
  var likesHtmlText = likesHtmlArr.join(', ');
  htmlText.push(likesHtmlText);
  htmlText.push('</div>');
  return htmlText.join('');

}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}

function sharePicTpl(share) {
  var htmlText = [];
  htmlText.push('<span class="item-share">');
  htmlText.push('<img class="share-img" src="' + share.pic + '">')
  htmlText.push('<p class="share-tt">' + share.text + '</p>')
  htmlText.push('</span>');
  return htmlText.join('');
}

function imgPicTpl(pics) {
  var htmlText = [];
  htmlText.push('<span class="item-pic">');
  htmlText.push('<img class="item-only-img" src="' + pics + '">')
  htmlText.push('</span>');
  return htmlText.join('');
}
/**
 * 循环：消息体
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index="0">');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表
  var contentHtml = '';
  // 目前只支持多图片消息，需要补充完成其余三种消息展示
  switch(content.type) {
      // 多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
    case 1:
      // TODO: 实现分享消息
      contentHtml = sharePicTpl(content.share);
      break;
    case 2:
      // TODO: 实现单张图片消息
      contentHtml = imgPicTpl(content.pics);
      break;
    case 3:
      // TODO: 实现无图片消息
      break;
  }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div></div>');
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}


/**
 * 页面渲染函数：render
 */
function render() {
  // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。

     var messageHtml = messageTpl(data[0]) + messageTpl(data[1]) + messageTpl(data[2]) + messageTpl(data[3]);
      $momentsList.html(messageHtml);
      $('.share-img').css("width","40px");

  }





/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
  // TODO: 完成页面交互功能事件绑定
    $('.item-reply').parent().prepend('<div class="icon"><span class="icon-like"></span><i class="dz">点赞</i><span class="icon-comment"></span><i class="pl">评论</i></div>');
    $('.item-reply').parent().css('width','150px');
    $('.icon').addClass("reply");
    $('.icon-like, .icon-comment').addClass("like-comment");
    $('.dz , .pl').addClass("dzpl");


  /*点击出现点赞和评论*/
  var $reply = $('.item-reply');
  $reply.on('click',function(){
    //$(this).prev().fadeToggle('slow');
    if( $(this).prev().css("left") == "150px"){
      $(this).prev().animate({left:"8%"});
      return false;
    }else{
      $(this).prev().animate({left:"150px"});
    }
  });


  /*点击其他地方隐藏*/
  $(document).on('click',function(){
     $('.reply').animate({left:"150px"});
  });



/*点赞事件*/
  var $like = $('.dz');
  //var count = 1;
  $like.click(function(){
    //  count = count + 1;
    var $this = $(this);
    var replyData = data[$this.parents('.moments-item').index()].reply;
    //console.log(replyData);
     var $replyLike = $this.parents('.moments-item').find('.reply-zone');
    if($this.text() == '点赞'){
     $this.text('取消');
      replyData.hasLiked = true;
      replyData.likes.push(userName);
      $replyLike.html(replyTpl(replyData));
    }else{
      $this.text('点赞');
      replyData.likes.pop(userName);
      $replyLike.html(replyTpl(replyData));
    }

  });




/*评论事件*/
    $('.moments-item').append('<div class = "discuss"><input type = "text" class="text" placeholder="评论" ><input type = "button" class = "send" value = "发送"></div>');

//点击评论按钮出现文本输入框和发送按钮

  var $comments = $('.pl');
  $comments.on('click',function(){
    $(this).parents('.item-right').siblings('.discuss').show();
    $('.reply').animate({left:"150px"});
    return false;
  });

//点击输入框输入文字
  $('.text').click(function(){
    return false;
  })
//判断输入框是否有内容,为空时按钮为灰色,输入内容时按钮变绿色
$('.text').keydown(function(){
    var text = $(this).val();
  if(text == null || text ==""){
    return false;
  }else{
    $('.send').css({"background-color":"green"});
    return false;
  }
})

//点击发送按钮在评论区出现评论
  var $send = $('.send');
  $send.click(function(){
  var text = $(this).prev('.text').val();
  var commentData =data[$(this).parents('.moments-item').index()].reply;
  //console.log(commentData);
  var $replyComment = $(this).parents('.moments-item').find('.reply-zone');
    //console.log($replyComment);
  commentData.comments.push({"author":userName,
                              "text":text
                                });
  $replyComment.html(replyTpl(commentData));
  $('.discuss').hide();
});

//点击非输入框时输入框隐藏
    $(document).on('click',function(){
     $('.discuss').hide();
    });

  //点击图片放大功能
  $('.item-pic').append('<div class = "overlay"></div>');

  var pics = $('.pic-item,.item-only-img');
  pics.click(function(){
    //console.log($(this).css("width")=="80px");
  if($(this).css("width") == "80px" ||$(this).css("width") == "180px"){
    $('.overlay').addClass("addOverlay");
    $(this).addClass("pic-itemAdd");
    $(this).css({"max-width":"320px","max-height":"320px","width":"320px","height":"320px"});
    document.body.parentNode.style.overflow = "hidden";
      }else{
        $('.overlay').removeClass('addOverlay');
        $(this).removeAttr('style');
        $(this).removeClass('pic-itemAdd');
        document.body.parentNode.style.overflow = "auto";
      }
    var overlay = $('.overlay');
    overlay.click(function(){
      $('.overlay').removeClass('addOverlay');
      $('.pic-item,.item-only-img').removeAttr('style');
      $('.pic-item,.item-only-img').removeClass('pic-itemAdd');
      document.body.parentNode.style.overflow = "auto";
    })
  })
}
/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 渲染页面
  render();
  bindEvent();
}

init();