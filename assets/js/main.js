const bodyHidden = () => {
    document.querySelector('body').style.overflow = 'hidden';
}

const bodyVisible = () => {
    document.querySelector('body').style.overflow = 'visible';
}

const phoneInp = document.querySelectorAll('input[type="tel"]');

if (phoneInp.length) {
    phoneInp.forEach(el => {
        IMask(el, {
            mask: '+{7}(000) 000-00-00',
        })
    });
}

$(document).ready(function () {
    $('.category-btn').on('click', e => {
        e.preventDefault();
        $('.category-modal').toggleClass('active');
        $('.category-btn').toggleClass('active');
    })

    $('.category-modal__left button').each((index, el) => {
        $(el).on('click', function () {
            $(this).addClass('active').siblings('button').removeClass('active');
            $($('.category-modal__right-item')[index]).addClass('active').siblings('.category-modal__right-item').removeClass('active');
            $('.category-modal__right').addClass('active')
            $('.category-modal__left').addClass('hidden');
        })
    })

    $('.category-modal__right .vr-btn__back').on('click', () => {
        $('.category-modal__left').removeClass('hidden');
        $('.category-modal__right').removeClass('active');
    })

    $('.category-modal__bg').on('click', () => {
        $('.category-modal').removeClass('active');
        $('.category-modal__left').removeClass('hidden');
        $('.category-modal__right').removeClass('active');
        $('.category-btn').removeClass('active');
    })

    $('.search-modal__bg').on('click', () => {
        $('.search-modal').removeClass('active');
    })

    $('.vr-header .search-form__inp input').on('input', e => {
        if (e.target.value.length > 0) {
            $('.search-modal').addClass('active');
        } else {
            $('.search-modal').removeClass('active');
        }
    })

    $('.vr-sort').each((index, el) => {
        $(el).find('.vr-sort__btn').on('click', () => {
            $(el).toggleClass('active')
        })
        $(el).find('.vr-select__list li').each((listIndex, list) => {
            $(list).on('click', () => {
                $(el).find('.vr-sort__btn input').val($(list).text());
                $(el).find('.vr-sort__btn span b').text($(list).text());
                $(el).removeClass('active')
            })
        })
    })

    const categorySwp = new Swiper('.vr-category__swp .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 5,
        breakpoints: {
            470: {
                spaceBetween: 10
            }
        },
        navigation: {
            nextEl: '.vr-category__swp .swp-btn__next',
            prevEl: '.vr-category__swp .swp-btn__prev',
        }
    })

    $('.vr-select').each((index, el) => {
        $(el).find('.vr-select__btn').on('click', () => {
            $(el).toggleClass('active');
        })
        $(el).find('.vr-select__list li').each((listIndex, list) => {
            $(list).on('click', () => {
                $(list).parents('.vr-filter__modal-form__control').find('label span').addClass('active').text($(list).text());
                $(el).find('.vr-select__inp').val($(list).text());
                $(el).removeClass('active')
                $(list).addClass('selected').siblings('li').removeClass('selected')
            })
        })
    })

    $('.vr-date').each(function () {
        const $range = $(this),
            $rangeS = $range.find('.form_range input[type=range]'),
            $numberS = $range.find('.form_range input.val'),
            $line = $range.find('.form_range .line'),
            min = parseFloat($rangeS.eq(0).attr('min')),
            max = parseFloat($rangeS.eq(0).attr('max'));

        $range.find('.vr-date__btn').on('click', () => {
            $range.toggleClass('active')
        })
        
        const handleRange = () => {
            let slide1 = parseFloat($rangeS.eq(0).val()),
                slide2 = parseFloat($rangeS.eq(1).val());

            if (slide1 > slide2) [slide1, slide2] = [slide2, slide1];

            $numberS.eq(0).val(slide1);
            $numberS.eq(1).val(slide2);

            $range.find('.vr-date__inp').val(`от ${slide1} ₽ до ${slide2} ₽`)

            $line.css({
                left: (100 * slide1 / max) + '%',
                width: (100 * (slide2 - slide1) / max) + '%'
            });
        };

        const handleNumber = () => {
            let num1 = parseFloat($numberS.eq(0).val()),
                num2 = parseFloat($numberS.eq(1).val());

            if (num1 > num2) [num1, num2] = [num2, num1];

            $rangeS.eq(0).val(num1);
            $rangeS.eq(1).val(num2);

            handleRange();
        };

        handleRange();

        $rangeS.on('input', handleRange);
        $numberS.each((idx, inp) => {
                inp.addEventListener("blur", handleNumber)
                inp.addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNumber();
                    };
                });
            
        })
    });


    $(document).on('click', function (e) {
        $('.vr-sort').each((index, el) => {
            if (!el.contains(e.target)) {
                $(el).removeClass('active')
            }
        })
        $('.vr-select').each((index, el) => {
            if (!el.contains(e.target)) {
                $(el).removeClass('active')
            }
        })
        $('.vr-date').each((index, el) => {
            if (!el.contains(e.target)) {
                $(el).removeClass('active')
            }
        })
    });

    $('.vr-filter__modal-bg').on('click', () => {
        $('.vr-filter__modal').removeClass('active');
    })

    $('.vr-filter__modal-close').on('click', () => {
        $('.vr-filter__modal').removeClass('active');
    })
    
    $('.vr-filter__btn').on('click', () => {
        $('.vr-filter__modal').addClass('active');
    })
});