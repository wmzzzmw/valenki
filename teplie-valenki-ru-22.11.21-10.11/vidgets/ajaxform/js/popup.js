$(function(){
    // === Прячем попап
    ajf.hide_popup = function (formId) {
        $('body').find(formId + ', #overlay').stop().fadeOut(400);
        ajf.enableScroll();
        setTimeout(function () {
            ajf.clearform();
        }, 200);
    };
    
    // === Цепляем функцию "Скрыть попап" на нажатие ESC
    $(window).keydown(function(eventObject){ 
        if (eventObject.which == 27){
            if($('.popup').is(':visible')){
                $('.btnclose').click(); 
            }  
        }
    });
    
    // === Показываем попап
    ajf.show_popup = function (pp, prod_name, prod_url) {
        var formId = '#'+pp;
        if(window.screen.width > 767 ){
            ajf.disableScroll();
        }        
        $('body').find(formId + ', #overlay').fadeIn(400);
        $('body').on('click', '.btnclose, #overlay', function () {
            ajf.hide_popup(formId);
        });
        if(formId === '#pp-04'){
            $('#product_name').text(prod_name);
            $('#pp-04').find('input[name="form-name"]').val(prod_name);
            $('#pp-04').find('input[name="form-url"]').val(prod_url);
        }
/*         $.getScript(ajf.maskPath, function(){
            if(!!$('.phonefield').length){
                $('.phonefield').maska(ajf.phonemask);
            }
            }); */
    };
    
 
    // Цепляем слушатель события клик на кнопки вызова попапов:
    $('body').on('click', ajf.Call_buttons, function (e) {        
        e.preventDefault();
        setTimeout(function(){
            var check_class = $(e.target).attr('class');
            if(ajf.Call_popups[check_class] === "pp-04"){
                //alert('b1c');
                var prod_name = $(".b1c-name").text(), prod_url = window.location.href;                
                ajf.show_popup(ajf.Call_popups[check_class], prod_name, prod_url);
            } else ajf.show_popup(ajf.Call_popups[check_class]);        
        },200);
        
    });
   
});