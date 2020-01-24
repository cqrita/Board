
if($('#writer').val()!=$('#user').val()){
    $('#user_name').prop('readonly', true);
    $('#email').prop('readonly', true);
    $('#btn_board_update').hide();
    $('#btn_board_delete').hide();
}





$('#btn_board_Log-out').on('click', function() {
    $.ajax({
        url:'/userList/list/logout',
        method:'GET',
        success:function(data){
            alert('Logout');
            window.location.replace("/");
        },
        error:function(err){
            console.log(err)
            alert('error 발생, 재시도');
        }
    });
});


$('#btn_board_change').on('click',function(){
    window.location.replace("/board/list");
})


$('#btn_user_list').on('click', function() {
    window.location.replace("/userList/list");
});


$('#btn_board_update').on('click', function() {
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val()))){
        alert('이메일 에러');
        return;
    }
    if($('#user_name').val().length<5){
        alert('이름 5자 이상');
        return;
    }
    $.ajax({
        url:'/userList/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'uid':$('#uid').val(),'user_name':$('#user_name').val(), 'email':$('#email').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('수정에 성공!');
                window.location.replace("/userList/list");
            }else{
                console.log('수정1');
                alert('수정에 실패!, 다시 시도!');
            }
        },
        error:function(err){
            console.log(err);
            alert('수정에 실패!, 다시 시도!');
        }
    })
});

$('#btn_board_delete').on('click', function() {
    $.ajax({
        url:'/userList/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'uid':$('#uid').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('삭제에 성공!');
                window.location.replace("/userList/list");
            }else{
                console.log('수정1');
                alert('삭제에 실패!, 다시 시도!');
            }
        },
        error:function(err){
            console.log(err);
            alert('삭제에 실패!, 다시 시도!');
        }
    })
});