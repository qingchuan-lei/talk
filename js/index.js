(() => {
    let page = 0;
    let size = 10;
    let chatTotal = null;
    let sendType = 'enter';
//    创建入口函数
    const init = () => {
        getUserInfo();//获取用户信息；
        initChatList('bottom');//获取聊天数据；
        initEvent();
    }
    //创建事件入口函数
    const initEvent = () => {
        sendBtn.addEventListener('click', onSendBtnClick);
        contentBody.addEventListener('scroll', onContentBodyScroll);
        arrowBtn.addEventListener('click', onArrowBtnClick);
        document.querySelectorAll('.select-item').forEach(node => node.addEventListener('click', onSelectItemClick));
        inputContainer.addEventListener('keyup', onInputContainerKeyUp);
        closeBtn.addEventListener('click', onCloseBtnClick);
        clearBtn.addEventListener('click', onClearBtnClick);
    }
    // 清除聊天框内容按钮事件
    const onClearBtnClick = () => {
        inputContainer.value = ' ';
    }
    //关闭退出按钮事件
    const onCloseBtnClick = () => {
         //清空sessionStorage
        sessionStorage.removeItem('token');
        //界面跳转至login.html
        window.location.replace('/聊天机器人练习/login.html');
    }
    // 创建键盘输入事件
    const onInputContainerKeyUp = (e) => {
        // console.log(e.keyCode,sendType,e.ctrlKey)//keyCode键盘输入的ascall码值;
        if (e.keyCode === 13 && sendType === 'enter'&&!e.ctrlKey||e.keyCode === 13 && sendType === 'ctrlEnter'&&e.ctrlKey) {
            sendBtn.click();//触发按钮事件 
        }
    }
    //每一个选项按钮的事件函数
    const onSelectItemClick = function () {
        //选项高亮状态的处理；
        document.querySelectorAll('.select-item').forEach(node => node.classList.remove('on'));
        this.classList.add('on');
        //按钮赋值
        sendType = this.getAttribute('type');//得到按钮的值;
        selectType.style.display = 'none ';
        // console.log(sendType)

    } 
    //聊天记录滚动———鼠标滚动事件函数
    const onContentBodyScroll = function () {
        //滚动到顶部时加载第二页数据
        if (this.scrollTop === 0) {
            if (chatTotal <= (page + 1) * size) return;//判断后端还是否有历史聊天数据，没有则不执行，有就继续加载下一页
            page++;
            initChatList('top');
        }
        // console.log(this.scrollTop)
    }
    // 箭头点击事件
    const onArrowBtnClick = () => {
        selectType.style.display = 'block';
    }

    //发送按钮的事件绑定函数；
  const onSendBtnClick =async () => {
        const content = inputContainer.value.trim();//拿到聊天框里面的内容
        //如果为空，则不发送
        if (!content) {
            window.alert('发送信息不能为空');
            return;
        }
        // 调用渲染函数将聊天框输入的内容渲染到界面中；
      renderChatForm([{ from: 'user', content }],'bottom');
      inputContainer.value = '';//点击发送后聊天框内容清空；
    //发送数据到后端；
      const res = await fethcFn({
          url: '/chat',
          method: 'POST',
          params: {content}
      })
      renderChatForm([{from: 'd', content :res.content}],'bottom')
      
    }
    // 定义获取用户信息的方法
    const getUserInfo = async () => {
        const res = await fethcFn({
        url:'/user/profile'
            
        })
        nickName.innerHTML = res.nickname;
        accountName.innerHTML = res.loginId;
        loginTime.innerHTML = formaDate(res.lastLoginTime);
        
    }
// 定义获取聊天数据的函数
    const initChatList =async (direction) => {
        const res = await fethcFn({
            url: '/chat/history',
            params: {
                page,
                size
            }
        })
        chatTotal = res.chatTotal;
        // console.log(res);
        renderChatForm(res.data,direction);//调用聊天渲染函数；
    }
// 将聊天数据渲染到聊天界面中的函数
    const renderChatForm = (list,direction) => {
        //没有聊天记录；
        list.reverse();
        if (!list.length) {
            contentBody.innerHTML=`<div class="chat-container robot-container">
                                       <img src="./img/robot.jpg" alt="">
                                       <div class="chat-txt">
                                           您好！我是腾讯机器人，非常欢迎您的到来，有什么想和我聊聊的吗？
                                       </div>
                                   </div>`
            return;
        }
        // 有聊天记录；
        const chatData = list.map(item => {
            //分别进行左右界面的渲染
            // 判断记录里面的from是用户还是机器人，从而分别进行渲染
            return item.from === 'user'
                ?`<div class="chat-container avatar-container">
            <img src="./img/avtar.png" alt="">
            <div class="chat-txt">${item.content}</div>
        </div>`
                :`<div class="chat-container robot-container">
                <img src="./img/robot.jpg" alt="">
                <div class="chat-txt">${item.content}</div>
            </div>`
        })  
        if (direction === 'bottom') {
            contentBody.innerHTML += chatData.join(' ');//聊天内容渲染到界面；
        const bottomDistance = document.querySelectorAll('.chat-container')[document.querySelectorAll('.chat-container').length - 1].offsetTop;//找到最后一条聊天记录的高度，让聊天界面加载时自动跳转至最后一条；
        contentBody.scrollTo(0,bottomDistance);
        } else {
            contentBody.innerHTML = chatData.join(' ') + contentBody.innerHTML;
        }
    }
    
        
    
    
    init();
})();