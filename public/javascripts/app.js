import { bodyTexts } from "./texts.js";
import { io } from "./socket.io.esm.min.js";

document.addEventListener('alpine:init', () => {
  const socket = io();
  Alpine.store('setting', {
    theme: localStorage.getItem('theme') || 'dark',
    lang: localStorage.getItem('lang') || 'en',
    langManager: null,
    translations: bodyTexts,
    init() {
      this.translateElements();
    },
    translate(key) {
      return this.translations[this.lang][key] || key;
    },
    translateElements() {
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = this.translate(key);
      });
    },
    toggleMode() {
      if (this.theme == 'dark'){
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }
      localStorage.setItem('theme', this.theme);
    },

    toggleLang() {
      if (this.lang == 'en'){
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
      localStorage.setItem('lang', this.lang);
      this.translateElements();
    }
  })
  Alpine.data('timer', () => ({
    open: false,
    date: null,
    timer: null,
    counter: 0,
    progress: 0,
    init() {
      socket.on('progress', (progress) => {
        this.progress = progress;
        if (progress == 100) {
          this.wait(5000).then(() => {
            this.progress = 0;
          })
        }
      });

      socket.on('date', (date) => {
        this.date = date;
      });

      socket.on('counter', (counter) => {
        this.counter = counter;
      });
    },
    wait(timeout) {
      return new Promise(resolve => { setTimeout(resolve, timeout); });
    },
    destroy() {
      clearInterval(this.timer);
    },
    tint(counter) {
      if (counter <= 99) {
        return 'primary';
      }
      if (counter == 100) {
        return 'success';
      }
    },
    formateDate(counter) {
      return new Date(counter).toISOString().split('T')[1].split('.')[0]
    },
    renderDate(el) {
      return (el == ':' ? ' : ' : `<i class="bi bi-${el}-square-fill me-1"></i>`)
    },
  }))
})