(() => {
    let isRepeat=false;
    // 创建程序的入口函数
    const init = () => {
        initEvent();
    }

    // 创建入口函数
    const initEvent = () => {
        userName.addEventListener('blur', onUserNameBlur)//blur  失去焦点时触发；
        formContainer.addEventListener('submit', onFormSubmit);
        
    }
    // const SW = document.querySelector('.switch-register');
    // console.log(SW)
    // SW.addEventListener('click', function () {
    //     window.location.replace('/聊天机器人练习/login.html')
    // })
    // 创建表单提交事件
    const onFormSubmit = (e) => {
        e.preventDefault();
        // 表单数据获取
        const loginId = userName.value.trim();
        const nickname = userNickname.value.trim();
        const loginPwd = userPassword.value.trim();
        const confirmPwd = userConfirmPassword.value.trim();
        // 表单数据验证
        if (!checkForm(loginId, nickname, loginPwd, confirmPwd)) return;
        // 全部验证成功，则请求数据
        sendData(loginId, nickname, loginPwd);
    }
    // 创建请求数据函数
    const sendData = async (loginId, nickname, loginPwd) => {
        const res = await fethcFn({
            url: '/user/reg',
            method: 'POST',
            params: { loginId, nickname, loginPwd}
        })
        // const res = await fetch('https://study.duyiedu.com/api/user/reg', {
        //      method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ loginId, nickname, loginPwd })
        // })

        // const result = await res.json()
        // if (result.code !== 0) {
        //     window.alert(result.msg);return
        // }
        res && window.location.replace('/聊天机器人练习');
        
    }
    // 创建表单验证函数
    const checkForm = (loginId,nickname,loginPwd,confirmPwd) => {
        switch (true) {
            case !loginId: window.alert('注册用户名不能为空');
                return
            case !nickname: window.alert('注册昵称不能为空');return
            case !loginPwd: window.alert('注册密码不能为空');return
            case !confirmPwd: window.alert('确认密码不能为空');return
            case loginPwd !== confirmPwd: window.alert('两次输入密码不一致');
                return;
            case isRepeat = false: window.alert('用户已存在，请重新注册');
                return;
                default: return true;
        }
    }
    
    // 创建账户名失去焦点时事件函数
    const onUserNameBlur =async () => {
        const loginId = userName.value.trim();//获取用户名；
        if (!loginId) return;//用户名为空则不做任何操作
        const res = await fethcFn({
            url: '/user/exists',
            method: 'GET',
            params: { loginId}
        });
        isRepeat = res;
        // console.log(res);
        // const response = await fetch(`https://study.duyiedu.com/api/user/exists?loginId=${loginId}`);
        // const result =await response.json();
        // isRepeat = result.data;
        // if (result.code !== 0) {
        //     window.alert(result.msg);
        // }

    }



    init();
})()