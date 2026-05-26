function showCert(src, title) {
    var modal = document.getElementById('certModal');
    var img = document.getElementById('certModalImg');
    var titleEl = document.getElementById('certModalTitle');
    
    if (!modal || !img || !titleEl) {
        console.error('Cert modal elements not found');
        return;
    }
    
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCert(event) {
    if (event && !event.target.closest('.cert-modal-close') && event.target !== event.currentTarget) return;
    
    var modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
// Initialize Lucide icons
        lucide.createIcons();

        // ===== HAMBURGER MENU =====
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburgerBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // ===== HEADER RESPONSIVE =====
        function updateHeaderLayout() {
            const w = window.innerWidth;
            const phoneLink = document.querySelector('.header-phone-mobile');
            const phoneDesktop = document.querySelectorAll('.header-phone')[1];
            const ctaDesktop = document.querySelectorAll('.btn-cta-sm')[0];
            const ctaMobile = document.getElementById('headerCtaBtn');

            if (w >= 768) {
                if (phoneLink) phoneLink.style.display = 'none';
                if (phoneDesktop) phoneDesktop.style.display = '';
                if (ctaDesktop) ctaDesktop.style.display = '';
                if (ctaMobile && w < 1024) {
                    ctaMobile.style.display = 'none';
                } else if (ctaMobile) {
                    ctaMobile.style.display = '';
                }
            } else {
                if (phoneLink) phoneLink.style.display = '';
                if (phoneDesktop) phoneDesktop.style.display = 'none';
                if (ctaDesktop) ctaDesktop.style.display = 'none';
                if (ctaMobile) ctaMobile.style.display = '';
            }
        }
        updateHeaderLayout();
        window.addEventListener('resize', updateHeaderLayout);

        // ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.parentElement;
        var wasOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(function(i) {
            i.classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!wasOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

        // ===== SCROLL TO FORM WITH SEGMENT PRESELECT =====
        function scrollToForm(segment) {
            const form = document.getElementById('cta-form');
            form.scrollIntoView({
                behavior: 'smooth'
            });

            // Preselect segment in form
            setTimeout(function() {
                const typeSelect = document.getElementById('formType');
                if (typeSelect && segment) {
                    for (let i = 0; i < typeSelect.options.length; i++) {
                        if (typeSelect.options[i].value === segment) {
                            typeSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                // Highlight the select briefly
                if (typeSelect) {
                    typeSelect.style.borderColor = '#F97316';
                    typeSelect.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.2)';
                    setTimeout(function() {
                        typeSelect.style.borderColor = '';
                        typeSelect.style.boxShadow = '';
                    }, 2000);
                }
            }, 600);
        }

        
        // ===== CALLBACK MODAL =====
        function openCallbackModal(e) {
            if (e) e.preventDefault();
            document.getElementById('callbackModal').classList.add('open');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }

        function closeCallbackModal(e) {
            if (e && e.target !== e.currentTarget) return;
            document.getElementById('callbackModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        // ===== LEAD MODAL (Certs / Visit) =====
        function openLeadModal(type) {
            const modal = document.getElementById('leadModal');
            const title = document.getElementById('leadModalTitle');
            const desc = document.getElementById('leadModalDesc');
            const btn = document.getElementById('leadSubmitBtn');
            document.getElementById('leadType').value = type;

            if (type === 'prices') {
                title.textContent = 'Скачать каталог с ценами PDF';
                desc.innerHTML = 'Заполните форму для получения оптового прайса. <br><strong style="color:#F97316; display:block; margin-top:8px;">🎁 Бонус: скидка 15% на ваш первый оптовый заказ!</strong>';
                btn.textContent = 'Получить прайс и скидку';
            } else if (type === 'visit') {
                title.textContent = 'Визит на производство';
                desc.textContent = 'Оставьте контакты, и мы свяжемся с вами для согласования удобного времени экскурсии по цеху.';
                btn.textContent = 'Записаться на экскурсию';
            } else if (type === 'certs') {
                title.textContent = 'Скачать ZIP Архив сертификатов';
                desc.textContent = 'Скачайте все наши сертификаты и документы для детальной проверки';
                btn.textContent = 'Скачать документы';
            }

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }

        function closeLeadModal(e) {
            if (e && e.target !== e.currentTarget) return;
            document.getElementById('leadModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        function handleLeadSubmit(e) {
            e.preventDefault();
            var btn = e.target.querySelector('.btn-primary');
            var origText = btn.textContent;
            var type = document.getElementById('leadType').value;

            btn.textContent = 'Отправляем...';
            btn.disabled = true;

            setTimeout(function() {
                btn.textContent = '✓ Успешно!';
                btn.style.background = '#059669';

                if (type === 'certs') {
                    // Simulate file download
                    var a = document.createElement('a');
                    a.href = '#';
                    a.download = 'LAZIO_Certificates.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }

                setTimeout(function() {
                    closeLeadModal();
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                    e.target.reset();
                }, 2000);
            }, 1200);
        }


        // ===== FORM SUBMISSION (PLACEHOLDER) =====
        function handleFormSubmit(e) {
            e.preventDefault();
            var btn = e.target.querySelector('.btn-primary');
            var origText = btn.textContent;
            btn.textContent = 'Отправляем...';
            btn.disabled = true;
            setTimeout(function() {
                btn.textContent = '✓ Заявка отправлена!';
                btn.style.background = '#059669';
                setTimeout(function() {
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                    e.target.reset();
                }, 3000);
            }, 1200);
        }

        function handleCallbackSubmit(e) {
            e.preventDefault();
            var btn = e.target.querySelector('.btn-primary');
            var origText = btn.textContent;
            btn.textContent = 'Отправляем...';
            btn.disabled = true;
            setTimeout(function() {
                btn.textContent = '✓ Перезвоним!';
                btn.style.background = '#059669';
                setTimeout(function() {
                    closeCallbackModal();
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                    e.target.reset();
                }, 2000);
            }, 1000);
        }

        // ===== COUNTER ANIMATION =====
        function animateCounters() {
            var counters = document.querySelectorAll('.geo-counter-num[data-target]');
            counters.forEach(function(el) {
                if (el.dataset.animated) return;
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.dataset.animated = '1';
                    var target = parseInt(el.dataset.target);
                    var duration = 2000;
                    var start = 0;
                    var startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        // Ease out
                        var eased = 1 - Math.pow(1 - progress, 3);
                        var current = Math.floor(eased * target);
                        el.textContent = current.toLocaleString('ru-RU');
                        if (progress < 1) requestAnimationFrame(step);
                        else el.textContent = target.toLocaleString('ru-RU');
                    }
                    requestAnimationFrame(step);
                }
            });
        }
        window.addEventListener('scroll', animateCounters);
        window.addEventListener('load', animateCounters);




        // ===== PHONE MASK (SIMPLE) =====
        document.querySelectorAll('input[type="tel"]').forEach(function(input) {
            input.addEventListener('focus', function() {
                if (!this.value) this.value = '+7 ';
            });
            input.addEventListener('input', function() {
                var val = this.value.replace(/\D/g, '');
                if (val.length > 0 && val[0] !== '7') val = '7' + val;
                if (val.length > 11) val = val.slice(0, 11);
                var formatted = '+7';
                if (val.length > 1) formatted += ' (' + val.slice(1, 4);
                if (val.length > 4) formatted += ') ' + val.slice(4, 7);
                if (val.length > 7) formatted += '-' + val.slice(7, 9);
                if (val.length > 9) formatted += '-' + val.slice(9, 11);
                this.value = formatted;
            });
        });

        // Re-init lucide after dynamic content
        setTimeout(function() {
            lucide.createIcons();
        }, 100);

        // ===== STORES MODAL =====
        function openStoresModal() {
            document.getElementById('storesModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeStoresModal(e) {
            if (e && e.target !== e.currentTarget) return;
            document.getElementById('storesModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        // ===== PRODUCTION GALLERY =====
        var galleryImages = [{
                src: '/a1-opt/content/photo/photo-1.jpg',
                alt: 'Фабрика'
            },
            {
                src: '/a1-opt/content/photo/photo-2.jpg',
                alt: 'Производство'
            },
            {
                src: '/a1-opt/content/photo/photo-3.jpg',
                alt: 'Материал'
            },
            {
                src: '/a1-opt/content/photo/photo-4.jpg',
                alt: 'Производство'
            },
            {
                src: '/a1-opt/content/photo/photo-5.jpg',
                alt: 'Магазин'
            },
            {
                src: '/a1-opt/content/photo/photo-6.jpg',
                alt: 'Производство'
            },
            {
                src: '/a1-opt/content/photo/photo-7.jpg',
                alt: 'Магазин'
            },
            {
                src: '/a1-opt/content/photo/photo-8.jpg',
                alt: 'Производство'
            },
            {
                src: '/a1-opt/content/photo/photo-9.jpg',
                alt: 'Фабрика'
            }
			
        ];
        var galleryIndex = 0;

        function openGalleryModal(idx) {
            galleryIndex = idx || 0;
            var modal = document.getElementById('galleryModal');
            // Build thumbs
            var thumbsEl = document.getElementById('galleryThumbs');
            thumbsEl.innerHTML = '';
            galleryImages.forEach(function(img, i) {
                var th = document.createElement('div');
                th.className = 'gallery-thumb' + (i === galleryIndex ? ' active' : '');
                th.innerHTML = '<img src="' + img.src.replace('1200&h=800', '144&h=108') + '" alt="' + img.alt + '" loading="lazy">';
                th.addEventListener('click', function() {
                    setGallerySlide(i);
                });
                thumbsEl.appendChild(th);
            });
            setGallerySlide(galleryIndex);
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function setGallerySlide(idx) {
            galleryIndex = idx;
            var img = galleryImages[galleryIndex];
            document.getElementById('galleryMainImg').src = img.src;
            document.getElementById('galleryMainImg').alt = img.alt;
            document.getElementById('galleryCounter').textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
            document.querySelectorAll('.gallery-thumb').forEach(function(th, i) {
                th.classList.toggle('active', i === galleryIndex);
            });
        }

        function galleryNav(dir) {
            var next = (galleryIndex + dir + galleryImages.length) % galleryImages.length;
            setGallerySlide(next);
        }

        function closeGalleryModal() {
            document.getElementById('galleryModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        // ===== KEYBOARD: ESC CLOSES ALL MODALS =====
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCertLightbox();
                closeCallbackModal();
                closeStoresModal();
                closeGalleryModal();
                closeLeadModal();
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    hamburgerBtn.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
            if (e.key === 'ArrowLeft' && document.getElementById('galleryModal').classList.contains('open')) galleryNav(-1);
            if (e.key === 'ArrowRight' && document.getElementById('galleryModal').classList.contains('open')) galleryNav(1);
        });

        // ===== YANDEX MAP INIT =====
        (function initYaMap() {
            var typeConfig = {
                own: {
                    color: '#F97316',
                    glyph: '🏪',
                    label: 'Фирменный магазин',
                    size: 'large'
                },
                dealer: {
                    color: '#3B82F6',
                    glyph: '🤝',
                    label: 'Дилер',
                    size: 'large'
                },
                supply: {
                    color: '#34D399',
                    glyph: '📦',
                    label: 'Объект поставки',
                    size: 'large'
                },
                zone: {
                    color: '#64748B',
                    glyph: '',
                    label: 'Зона доставки',
                    size: 'small'
                }
            };

            function buildMap() {
                if (typeof ymaps === 'undefined' || typeof window.LAZIO_LOCATIONS === 'undefined') return;
                var placeholder = document.getElementById('yaMapPlaceholder');
                if (placeholder) placeholder.style.display = 'none';

                ymaps.ready(function() {
                    var map = new ymaps.Map('yaMap', {
                        center: [55.65, 37.35],
                        zoom: 8,
                        controls: ['zoomControl', 'fullscreenControl']
                    }, {
                        suppressMapOpenBlock: true
                    });

                    // Кластер для реальных точек (own/dealer/supply)
                    var clusterer = new ymaps.Clusterer({
                        preset: 'islands#invertedDarkBlueClusterIcons',
                        groupByCoordinates: false
                    });

                    var mainPlacemarks = [];
                    var locations = window.LAZIO_LOCATIONS || [];

                    locations.forEach(function(loc) {
                        var cfg = typeConfig[loc.type] || typeConfig.zone;

                        if (loc.type === 'zone') {
                            // Маленькая декоративная точка — без кластера, без балуна
                            var dot = new ymaps.Placemark(
                                [loc.lat, loc.lon], {
                                    hintContent: loc.name
                                }, {
                                    iconLayout: 'default#image',
                                    iconImageHref: 'data:image/svg+xml,' + encodeURIComponent(
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">' +
                                        '<circle cx="5" cy="5" r="4" fill="rgba(100,116,139,0.55)" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>' +
                                        '</svg>'
                                    ),
                                    iconImageSize: [10, 10],
                                    iconImageOffset: [-5, -5]
                                }
                            );
                            map.geoObjects.add(dot);
                        } else {
                            // Полноценная метка с балуном
                            var pm = new ymaps.Placemark(
                                [loc.lat, loc.lon], {
                                    balloonContentHeader: '<strong style="color:' + cfg.color + ';font-size:14px">' + cfg.glyph + ' ' + loc.name + '</strong>',
                                    balloonContentBody: '<div style="font-size:13px;line-height:1.7;padding:4px 0;max-width:260px">' +
                                        (loc.address ? '<div style="color:#4B5563;margin-bottom:4px">📍 ' + loc.address + '</div>' : '') +
                                        (loc.phone ? '<div style="color:#1E3A8A">📞 ' + loc.phone + '</div>' : '') +
                                        '<div style="margin-top:6px;font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:.5px">' + cfg.label + '</div>' +
                                        '</div>',
                                    hintContent: loc.name
                                }, {
                                    preset: 'islands#circleIcon',
                                    iconColor: cfg.color
                                }
                            );
                            mainPlacemarks.push(pm);
                        }
                    });

                    clusterer.add(mainPlacemarks);
                    map.geoObjects.add(clusterer);

                    // Автооткрытие балуна ближайшего фирменного магазина (Серпухов)
                    var serpukhov = mainPlacemarks.filter(function(pm) {
                        return pm.properties.get('hintContent').indexOf('Серпухов') !== -1;
                    })[0];
                    if (serpukhov) {
                        setTimeout(function() {
                            serpukhov.balloon.open();
                        }, 800);
                    }
                });
            }

            initYaMap._try = function() {
                if (typeof ymaps !== 'undefined') {
                    buildMap();
                } else {
                    setTimeout(initYaMap._try, 500);
                }
            };
			
			// ===== СЕРТИФИКАТЫ — ПРОСМОТР =====
function showCert(src, title) {
    const modal = document.getElementById('certModal');
    const img = document.getElementById('certModalImg');
    const titleEl = document.getElementById('certModalTitle');
    
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCert(event) {
    if (event && !event.target.closest('.cert-modal-close') && event.target !== event.currentTarget) return;
    
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const certModal = document.getElementById('certModal');
        if (certModal && certModal.classList.contains('active')) {
            hideCert();
        }
        // ... остальные закрытия ...
    }
});

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initYaMap._try);
            } else {
                initYaMap._try();
            }
        })();
		


// Открыть Яндекс.Карты во всплывающем окне браузера
function openYandexPopup(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const width = 1000;
  const height = 700;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  
  window.open(
    'https://reviews.yandex.ru/shop/matrasi-lazio.ru',
    'YandexReviews',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=yes`
  );
}

// Открыть изображение письма
function openImagePopup(imageUrl) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  modal.style.display = 'flex';
  modalImg.src = imageUrl;
  document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно с изображением
function closeImagePopup() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Закрытие по Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeImagePopup();
  }
});

// ========== КАРУСЕЛЬ ==========
(function() {
  if (window.innerWidth > 680) return;

  const track = document.getElementById('rvTrack');
  const prevBtn = document.getElementById('rvPrev');
  const nextBtn = document.getElementById('rvNext');
  const dotsContainer = document.getElementById('rvDots');
  
  if (!track) return;
  
  const cards = Array.from(track.children);
  let currentIndex = 0;
  
  // Создание точек
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'rv-dot';
    dot.setAttribute('aria-label', `Слайд ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.rv-dot');
  
  // Переход к слайду
  function goToSlide(index) {
    currentIndex = index;
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Обновление точек
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Обновление кнопок
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;
  }
  
  // Кнопки навигации
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) goToSlide(currentIndex + 1);
  });
  
  // Свайп на touch-устройствах
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < cards.length - 1) {
        // Свайп влево - следующий
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Свайп вправо - предыдущий
        goToSlide(currentIndex - 1);
      }
    }
  }
  
  // Пересчёт при повороте экрана
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
      track.style.transform = '';
    } else {
      goToSlide(currentIndex);
    }
  });
})();
