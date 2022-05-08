const BASE_URL = 'https://study.duyiedu.com/api';

const fethcFn = async ({ url, method = 'GET', params = {} }) => {
    // get请求参数拼接
    let result = null;
    const extendsObj = {};
    sessionStorage.token && (extendsObj.Authorization = 'Bearer ' + sessionStorage.token);//如果有标志符，则获取
    
    if (method === 'GET' && Object.keys(params).length) {
        url += '?' + Object.keys(params).map(key => ''.concat(key, '=', params[key])).join('&')//concat 拼接字符串或者数组；
        
    };
    try {
        const response =await fetch(BASE_URL + url, {
            method,
            headers: {
                'Content-Type': 'application/json', 
                ...extendsObj
            },
            body: method === 'GET' ? null : JSON.stringify(params)
        })
        // 获取后端的token值，
        const token = response.headers.get('Authorization');
        token && sessionStorage.setItem('token', token);
        // token && (sessionStorage.token = token);
        // console.log(token);
        result = await response.json();
        if (result.code === 0) {
            // 如果后端返回值有chatTotal，这个值也返回给前端；
            if (result.hasOwnProperty('chatTotal')) {
                result.data = { chatTotal: result.chatTotal, data: result.data }
            }
            return result.data;
        } else {
            // 权限错误处理(错误或者无效标识符)；
            if (result.status === 401) {
                window.alert('权限token不正确');
                sessionStorage.removeItem('token');
                window.location.replace('/聊天机器人练习/login.html')
                return;
            }
            window.alert(result.msg);
        }
    } catch (error) {
        console.log(error)
    }
}