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
        $('.vr-settings').each((index, el) => {
            if (!el.contains(e.target)) {
                $(el).removeClass('active')
            }
        })
    });

    const homeSwp = new Swiper('.vr-home__swp .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        breakpoints: {
            1100: {
                spaceBetween: 15,
            },
        },
        navigation: {
            nextEl: '.vr-home .vr-swpBtn__next',
            prevEl: '.vr-home .vr-swpBtn__prev',
        }
    })

    $('.vr-filter__modal-bg').on('click', () => {
        $('.vr-filter__modal').removeClass('active');
    })

    $('.vr-filter__modal-close').on('click', () => {
        $('.vr-filter__modal').removeClass('active');
    })

    $('.vr-filter__btn').on('click', () => {
        $('.vr-filter__modal').addClass('active');
    })

    $('.vr-map__card-favorite').on('click', function () {
        $(this).toggleClass('active');
    })

    $('.product-page__head-right .main-img').each((index, el) => {
        $(el).on('click', () => {
            $($('.product-page__head-right .main-img')[index]).addClass('active').siblings('.main-img').removeClass('active')
            $($('.product-page__head-left img')[index]).addClass('active').siblings('img').removeClass('active');
        })
    })

    $('.product-page__content-left').each((index, el) => {
        const productSwp = new Swiper($(el).find('.swiper')[0], {
            slidesPerView: "auto",
            spaceBetween: 1,
            navigation: {
                nextEl: $(el).find('.vr-swpBtn')[0]
            }
        });
    })

    const accountSwp = new Swiper('.vr-account__tab', {
        slidesPerView: "auto",
        spaceBetween: 1,
        navigation: {
            nextEl: '.vr-account__tab .vr-next',
            prevEl: '.vr-account__tab .vr-prev',
        }
    })

    // $('.vr-chat__friend').on('click', function () {
    //     $('.vr-chat__content').addClass('active')
    // })

    $('.vr-chat__content-head .vr-btn__back').on('click', function () {
        $('.vr-chat__content').removeClass('active')
    })

    $('.vr-accordion').each(function () {
        const $item = $(this);
        const $header = $item.find('.vr-accordion__btn');
        const $content = $item.find('.vr-accordion__body-wrap');

        $header.on('click', function () {
            $header.toggleClass('active')
            if ($content.css('max-height') !== '0px' && $content.css('max-height') !== 'none') {
                $content.css('max-height', '0');
            } else {
                $content.css('max-height', $content.prop('scrollHeight') + 'px');
            }
        });
    });

    $('.vr-auth__form').each(function () {
        const $form = $(this);
        const $inputs = $form.find('.msg-inp');

        $inputs.on('input', function () {
            const $this = $(this);
            const val = $this.val();

            if (!/^[0-9]$/.test(val)) {
                $this.val('');
                return;
            }

            if (val !== '') {
                $this.next('.msg-inp').focus();
            }
        });

        $inputs.on('keydown', function (e) {
            const $this = $(this);
            if (e.key === 'Backspace' && !$this.val()) {
                $this.prev('.msg-inp').focus();
            }
        });
    });

    $('.vr-settings').each((index, el) => {
        $(el).find('.vr-settings__btn').on('click', function () {
            $(el).toggleClass('active')
        })
    })

    const cls = ['.delete-modal', '.order-modal', '.article-modal', '.review-modal'];

    cls.forEach(mCls => {
        $(mCls + '__open').on('click', function (e) {
            e.preventDefault();
            $(mCls).addClass('active')
            bodyHidden();
        })
        
        $(mCls + ' .vr-modal__bg').on('click', function () {
            $(mCls).removeClass('active')
            bodyVisible();
        })
        
        $(mCls + ' .vr-modal__close').on('click', function () {
            $(mCls).removeClass('active')
            bodyVisible();
        })
    })

    $('.review-modal__rating button').each((index, btn) => {
        $(btn).on('click', function () {
            $(btn).addClass('active').prevAll().addClass('active')
            $(btn).nextAll().removeClass('active')
            $('.review-modal__rating input').val(index+1)
        })
    })

    $('.product-page__content-left').each((index, el) => {
        $(el).find('.swiper a').each((idx, btn) => {
            $(btn).on('click', function (e) {
                e.preventDefault();
                $($(el).find('.product-page__content-left__tab')[idx]).addClass('active').siblings('.product-page__content-left__tab').removeClass('active')
                $(el).find('.swiper a').removeClass('active');
                $(btn).addClass('active');
            })
        })
    })

    $('.courierCheckboxes input').each((index, inp) => {
        $(inp).on('change', function () {
            if ($(this).val() == 'courier') {
                $('.product-page__content-right__map').addClass('active');
            } else {
                $('.product-page__content-right__map').removeClass('active');
            }
        })
    })
});