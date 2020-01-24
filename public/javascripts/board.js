if($('#writer').val()!=$('#user').val()){
    $('#board_title').prop('readonly', true);
    $('#board_content').prop('readonly', true);
    $('#btn_board_update').hide();
    $('#btn_board_delete').hide();
}



$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});

$('#btn_board_Log-out').on('click', function() {
    console.log('in logout..');
    $.ajax({
        url:'/board/list/logout',
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
$('#btn_board_register').on('click', function() {
    $.ajax({
        url:'/board/register/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('저장에 성공!');
                window.location.replace("/board/list");
            }else{
                alert('저장에 실패!, 다시 시도!');
            }
        },
        error:function(err){
            alert('저장에 실패!, 다시 시도!');
        }
    })
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_board_update').on('click', function() {
    $.ajax({
        url:'/board/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'bid':$('#bid').val(),'board_title':$('#board_title').val(), 'board_content':$('#board_content').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('수정에 성공!');
                window.location.replace("/board/list");
            }else{
                console.log('수정1');
                alert('수정에 실패!, 다시 시도!');
            }
        },
        error:function(err){
            console.log('수정2');
            alert('수정에 실패!, 다시 시도!');
        }
    })
});

$('#btn_board_delete').on('click', function() {
    $.ajax({
        url:'/board/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'bid':$('#bid').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('삭제에 성공!');
                window.location.replace("/board/list");
            }else{
                console.log('수정1');
                alert('삭제에 실패!, 다시 시도!');
            }
        },
        error:function(err){
            console.log('수정2');
            alert('삭제에 실패!, 다시 시도!');
        }
    })
});

$('#btn_board_change').on('click',function(){
    window.location.replace("/userList/list");
})