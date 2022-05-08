(() => {
    // 通过id方式获取dom，可直接调用
    // const userName = document.getElementById('userName');
    // const userPassword=document.getElementById('userPassword');

//    定义一个入口函数
    const init = () => {
        initEvent();
    }
    // 初始化事件函数
    const initEvent = () => {
        formContainer.addEventListener('submit', onFormSubmitClick);
    }
    /*创建form表单相关事件函数 */ 
    const onFormSubmitClick = (e) => {
        e.preventDefault();//阻止表单默认刷新事件；
        // 表单数据的获取
        const loginId = userName.value.trim();
        const loginPwd = userPassword.value.trim();
        // 表单数据的发送--验证通过后进行
        if (!loginId || !loginPwd) {
            window.alert("用户名或密码不能为空")
        }
        sendData(loginId, loginPwd);
    } 
    //  创建数据发送函数
    const sendData = async(loginId, loginPwd) => {
        const res = await fethcFn({
            url: '/user/login',//数据发送地址
            method: 'POST',
            params:{ loginId, loginPwd}
        })
        res && window.location.replace(baseURL);//res有数据后前往下一个地址；

        // const res = await fetch('https://study.duyiedu.com/api/user/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({ loginId, loginPwd })
            
        // })
        // const result = await res.json();
        // if (result.code !== 0) {
        //     window.alert(result.msg);
        //     return;
        // }
        

    }










    
    init();
})();