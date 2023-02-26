class SlideStories {
    constructor(id) {
        this.slide = document.querySelector(`[data-slide="${id}"]`);
        this.active = 0;
        // Cria a variavel do video de acordo com a classe criada
        this.video1 = document.querySelector('.video1');
        this.video2 = document.querySelector('.video2');
        this.init();
    }
    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => item.classList.remove('active'));
        this.items[index].classList.add('active');
        this.thumbItems.forEach((item) => item.classList.remove('active'));
        this.thumbItems[index].classList.add('active');
        if (this.items[index].classList.contains('active')) {
            if (this.items[index].tagName == this.video1.tagName) {
                // Inicia o video automaticamente ao ver o slide especifico
                // Copia o if abaixo e coloca os dados da variavel criada
                // obs: coloca os videos que não estarao em execução em pause
                if (this.items[index].classList.contains('video1')) {
                    this.video1.currentTime = 0;
                    this.video2.pause();
                    this.video1.play();
                }
                if (this.items[index].classList.contains('video2')) {
                    this.video2.currentTime = 0;
                    this.video1.pause();
                    this.video2.play();
                }
            } else {
                // Se não estiverem assistindo nenhum video, todos são pausados
                this.video2.pause();
                this.video1.pause();
            }
        };
        // modifica o tempo dos slides
        if (this.items[index].tagName == 'VIDEO') {
            // Modifica o tempo dos videos de acordo com o tamanho do mesmo
            if (this.items[index].classList.contains('video1')) {
                this.autoSlide(this.video1.duration * 1050);
            }
            if (this.items[index].classList.contains('video2')) {
                this.autoSlide(this.video2.duration * 1050);
            }
        } else {
            // Tempo padrão para fotos, em milisegundos
            this.autoSlide(5000)
        }
        return index
    }

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length - 1);
        }
    }

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1);

        } else {
            // Reinicia o slide para o primeiro
            this.activeSlide(0)
        }
    }

    addNavigation() {
        const nextBtn = this.slide.querySelector('.slide-next');
        const prevBtn = this.slide.querySelector('.slide-prev');
        nextBtn.addEventListener('click', this.next);
        prevBtn.addEventListener('click', this.prev);
    }

    addThumbItems() {
        for (let index = 0; index < this.items.length; index++) {
            this.span = document.createElement('span');
            this.thumb.appendChild(this.span);
        };
        let spanSelect = document.querySelectorAll('span');
        for (let index = 0; index < this.items.length; index++) {
            let afterSpanSelect = window.getComputedStyle(spanSelect[index], '::after');
            if (this.items[index].tagName == 'VIDEO') {
                // Define o tempo da animation feita com CSS
                // Utilizando a classe criada para diferenciar o tempo
                if (this.items[index].classList.contains('video1')) {
                    spanSelect[index].style.setProperty('--afterSpanAnim', `thumb ${15}s forwards linear`)
                }
                if (this.items[index].classList.contains('video2')) {
                    // o tempo do video é definido manualmente no animation
                    spanSelect[index].style.setProperty('--afterSpanAnim', `thumb ${10}s forwards linear`)
                }
            }
        }
        this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide(tempo) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, tempo)
    }

    init() {
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.items = this.slide.querySelectorAll('.slide-items > *');
        this.thumb = this.slide.querySelector('.slide-thumb');
        this.addThumbItems();
        this.activeSlide(0);
        this.addNavigation();
    }
}

const iniciaClass = new SlideStories('slide');