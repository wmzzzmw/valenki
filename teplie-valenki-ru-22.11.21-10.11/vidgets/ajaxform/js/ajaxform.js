$(function() {
    // Чистим форму
    ajf.clearform = function () {
        this.handler = setTimeout(function () {
            $('#thisform input[type="text"], #thisform textarea').val('').removeClass('error');
            if(('#thisform label').length){
                $("#thisform").find('label.error').remove();
            }
            $('#thisform > div.loadBar').empty();
            $("#thisform").removeAttr('id');
        }, 100);
    };

    // Прячем показываем спинер
    ajf.toggleSpin = function() {
        if(!$('.spinner').length){
            var target = document.getElementById('spinnercontainer');
            ajf.spinner = new Spinner(ajf.spinOptions).spin(target);
            $('#spinnercontainer').addClass('display');
        } else {
            ajf.spinner.stop();
            $('#spinnercontainer').removeClass('display').find('.spinner').remove();
        }
    };
    
    // Ajax-обработчик отправки форм
    ajf.send = function() {
        ajf.toggleSpin();
        $.post(ajf.handlerPath, $("#thisform").serialize(),  function(response) {
            var success_mess = '<div class="mess_content">'+ response + '</div>';
            ajf.toggleSpin();
            $('#thisform > div.loadBar').html(success_mess);
            if($('#thisform').hasClass('no_modal')){
                var $el = $('.modal#thx');
                $('.modal').modal('hide');
                $el.modal('show');
            }
            this.handler = setTimeout(function () {
                $('.close').trigger('click');
                $('body').find('#overlay').animate({opacity: 0},400, function(){
                    $(this).css('display','none').removeAttr('style');
                    });
                ajf.clearform();
            }, 1800);
        });
        return false;
    };
    
    // Подключаем файл стилей :
    if(!$("link[href*='ajaxform']").length){ 
        $('<link>').attr(ajf.stylelink).appendTo('head');
    };
    // 
    if(!ajf.several_forms){ // если форма только одна
        $.get(ajf.temlPath , function(d) { // получаем html-код формы
            $('body').append(d); // аппендим к body
        });
    } else {
        $.each(ajf.temlPath, function(i, val){
            $.get(val , function(d) { // получаем html-код каждой формы
                $('body').append(d); // аппендим каждую форму к body
            }); 
        });
    }
    
    // Указываем, какая именно форма в данный момент обрабатывается, добавлением идентификатора #thisform, проверяем поля
    $('body').on('change', '.popup input[type="text"], .popup input[type="number"], .popup select, .popup textarea', function(){
        if($(this).closest('form').attr('id') !== 'thisform'){
            $('form').removeAttr('id');
            $(this).closest('form').attr({
                id : 'thisform'
            });
        }
        var $form =  $('#thisform');
        $form.validate(ajf.validateOptions);
        if(typeof($form.validate) === 'function') ajf.isValid = $form.valid();
    });
    
    // Инициируем отправку данных формы по клику на кнопку "Отправить"
    $("body").on('click', '#thisform .send', function() {
        if(ajf.isValid){
            ajf.send();
            return true;
        } else {
            alert('Что-то пошло не так!');
            return false;
        } 
    });
});