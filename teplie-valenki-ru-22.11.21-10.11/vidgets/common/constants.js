// Создаем пространство имен для виджета ajaxform
 if (typeof(ajf) === "undefined"){ 
    window.ajf = {}; 
    // Урл сайта для абсолютных путей к файлам виджета
    //ajf.sitePath = 'http://teplie-valenki.ru' 
    ajf.sitePath = 'https://'+ window.location.hostname; // Без слэша в конце
    //alert(ajf.sitePath);
 } else {
    alert('Переменная ajf уже имеется');
 }

// Атрибуты подключения файла стилей виджета
ajf.stylelink = {
    type: 'text/css',
    rel: 'stylesheet',
    href: ajf.sitePath + '/vidgets/ajaxform/tpl/style.css'
};

// Определяемся с количеством обрабатываемых форм (одна форма = false, две и более = true) 
ajf.several_forms = true;

// Пути к шаблонам
// если форма одна раскомментировать следующую строку: 
//ajf.temlPath = ajf.sitePath + '/vidgets/ajaxform/tpl/form.html';
// если форм или попапов - несколько - следующую
ajf.temlPath = [ajf.sitePath + '/vidgets/ajaxform/tpl/pp-01.html', ajf.sitePath + '/vidgets/ajaxform/tpl/pp-04.html'];


// ==== МАСКА ВВОДА =======

// Путь к файлу плагина маски ввода телефона
ajf.maskPath = ajf.sitePath + '/vidgets/ajaxform/js/jquery.maskedinput.min.js';

// Маска ввода телефона
ajf.phonemask = "+7 (###) ###-####";


// === СПИННЕР (даунлоадер) =====

// Путь к файлу плагина яваскрипт-спинера (даунлодера)
ajf.spinPath = ajf.sitePath + '/vidgets/ajaxform/js/spin.min.js';

// Опции спинера
ajf.spinOptions = {
    lines: 13, // Количество линий
    length: 20, // Длина каждой линии
    width: 6, // Ширина каждой линии
    radius: 13, // Радиус окружности спиннера
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#fff', // #rgb or #rrggbb or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1.3, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%' ,// Left position relative to parent
    shadow: false,// Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    position: 'absolute' // Element positioning
};


// === ВАЛИДАЦИЯ ФОРМ ======

// Проверка полей формы перед отправкой:
// Опции валидации
ajf.validateOptions = {
    rules:{
        name:{
            required: true,
            minlength: 3
        },
        email:{
            required: true
        },
        phone:{
            required: true
        },
        message:{
            required: true,
            minlength: 10
        }
    },
    messages:{
        name:{
            required: "Это поле обязательно для заполнения",
            minlength: "Должно быть минимум 3 символа"
        },
        email:{
            required: "Это поле обязательно для заполнения",
            email: "Не корректный E-mail адрес"
        },
        phone:{
            required: "Это поле обязательно для заполнения"
        },
        message:{
            required: "Это поле обязательно для заполнения",
            minlength: "Должно быть минимум 10 символов"
        }
    }
};

// Путь к php-файлу-обработчику формы
ajf.handlerPath = ajf.sitePath + "/vidgets/ajaxform/lib/handlers/sendform.php";


// === ВСПЛЫВАЮЩИЕ ОКНА: ==== 

// Классы кнопок вызова попап-окон 
ajf.Call_buttons =  '.callme_viewform, .b1c';
ajf.Call_popups = {"callme_viewform": "pp-01", "b1c _page": "pp-04"};
// Блокировка скролла при открытии попапа:
ajf.disableScroll = function () {
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
};

ajf.enableScroll = function () {
    window.onscroll=function(){}; 
};

// === Путь к файлу стилей product.css
ajf.product_styles_Path = ajf.sitePath + "/catalog/view/theme/default/stylesheet/product.css.min.htm";