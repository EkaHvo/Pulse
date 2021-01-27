window.onload = function () {

    //Slider

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        responsive: {
            320: {
                nav: true
            },
            1101: {
                nav: false
            }
        }
    });

    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    });

    //Tabs

    const tabs = document.querySelector('.catalog__tabs');
    const tabsContest = document.querySelector('.catalog__contents');

    tabs.addEventListener('click', event => {
        let tabElement = event.target.closest('.catalog__tab');
        let index = tabElement.dataset.value;

        tabs.querySelector('.catalog__tab_active').classList.remove('catalog__tab_active');
        tabElement.classList.add('catalog__tab_active');
        tabsContest.querySelector('.catalog__content_active').classList.remove('catalog__content_active');
        tabsContest.querySelector(`.catalog__content-${index}`).classList.add('catalog__content_active');
    });

    //Catalog

    function toggleSlide(item) {
        const catalogItemContent = document.querySelectorAll('.catalog-item__content');
        const catalogItemList = document.querySelectorAll('.catalog-item__list');

        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click', event => {
                event.preventDefault();
                catalogItemContent[i].classList.toggle('catalog-item__content_active');
                catalogItemList[i].classList.toggle('catalog-item__list_active');
            });
        }
    }
 
    toggleSlide(document.querySelectorAll('.catalog-item__link'));
    toggleSlide(document.querySelectorAll('.catalog-item__back'));

    //Modals

    const modals = document.querySelectorAll('[data-modal="consultation"]');
    const overlay = document.querySelector('.overlay');
    const modalConsultation = document.getElementById('consultation');
    const modalClose = document.querySelectorAll('.modal__close');
    const modalThanks = document.getElementById('thanks');
    const modalOrder = document.getElementById('order');
    const buttonMini = document.querySelectorAll('.button_mini');
    const catalogSubtitle = document.querySelectorAll('.catalog-item__subtitle');

    for (let i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', event => {
            overlay.style.display = "block";
            modalConsultation.style.display = "block";
        });
    }

    for (let i = 0; i < modalClose.length; i++) {
        modalClose[i].addEventListener('click', event => {
            overlay.style.display = "none";
            modalConsultation.style.display = "none";
            modalThanks.style.display = "none";
            modalOrder.style.display = "none";
        });
    }

    for (let i = 0; i < buttonMini.length; i++) {
        buttonMini[i].addEventListener('click', event => {
            overlay.style.display = "block";
            modalOrder.style.display = "block";
            modalOrder.children[2].innerText = catalogSubtitle[i].innerText;
        });
    }

    function validateForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
            }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неверно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation form');
    validateForms('#order form');
    validateForms('#consultation-form');

    $('input[name=phone]').mask("+7(999)999-99-99");

    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger("reset");
        });
        return false;
    });

    //Smooth scroll and pageip

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();
};