var isCheckedId = false;
$('#login_id').change(function(){
    if(isCheckedId){
        isCheckedId=false;
    }
});
$('#confirm_pwd').keyup(function(){
    if($('#login_pwd').val()!=$('#confirm_pwd').val()){
        $('#message').text('비밀번호 다름');
    }else{
        $('#message').text('비밀번호 동일');
    }
});
$('#email').keyup(function(){
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val()))){
        $('#message').text('이메일 주소 아님');
    }else{
        $('#message').text('이메일 주소 맞음');
    }
});
$('#btn_check_id').on('click', function() {
    if($('#login_id').val().length<5){
        alert('5자 이상');
    }else{
        $.ajax({
            url:'/login/checkid?login_id='+$('#login_id').val(),
            method:'GET',
            success:function(data){
                if(data=='OK'){
                    isCheckedId = true;
                    $('#message').text('id 사용 가능');
                }else if(data = 'DUPLICATED'){
                    isCheckedId = false;
                    $('#message').text('id 사용 불가');
                }else{
                    isCheckedId = false;
                    $('#message').text('error 발생, 재시도');
                }
            },
            error:function(err){
                isCheckedId = false;
                $('#message').text('error 발생, 재시도');
            }
        });
    }
});

$('#btn_signup').on('click', function() {
    if(!isCheckedId){
        alert('ID체크 에러');
        return;
    }
    if($('#user_name').val().length<5){
        alert('이름 5자 이상');
        return;
    }
    if($('#login_pwd').val()!=$('#confirm_pwd').val()){
        alert('비밀번호 다름');
        return;
    }
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val()))){
        alert('이메일 에러');
        return;
    }
    $.ajax({
        url:'/login/create',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({
            'user_name' : $('#user_name').val(),
            'login_id' : $('#login_id').val(),
            'login_pwd' : $('#login_pwd').val(),
            'email' : $('#email').val()
        }),
        success:function(data){
            window.location.replace('/board/list');
        },
        error:function(err){
            $('#message').text('error 발생, 재시도');
        }
    });
});