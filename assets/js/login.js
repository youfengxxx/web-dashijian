$(function () {
    //点击切换效果
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    });


    //获取form
    const form = layui.form;

    form.verify({
        //定义校验密码的规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //定义确认密码规则
        repwd: (val) => {
            const pwd = $('.reg-box [name=password]').val();
            if (val !== pwd) return '两次密码输入不一致';
        },
    });

    // const baseUrl = "http://www.liulongbin.top:3007";

    const layer = layui.layer;

    //监听注册表单的提交，发送注册请求
    $('#form_reg').on('submit', function (e) {
        //阻止form的默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败！');
                layer.msg('注册成功！');
                $('#link_login').click();
            },
        });
    });

    $('#form_login').on('submit', function (e) {
        //阻止form默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('登录失败！');
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            },
        });
    });
















})