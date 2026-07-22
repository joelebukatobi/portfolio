import { activeNavClass } from '../utils/helpers.js';
import { icon } from '../../../lib/icons.js';

const sunIcon = icon('sun');
const moonIcon = icon('moon', { className: 'navbar__theme-icon--moon' });
const menuIcon = icon('navbar-menu');
const closeIcon = icon('navbar-close');

function themeToggleButton() {
  return `
<li class="navbar__item navbar__theme">
  <button
    type="button"
    class="navbar__theme-btn"
    @click="toggleTheme()"
    :aria-label="light ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <span x-show="!light">${sunIcon}</span>
    <span x-show="light" x-cloak>${moonIcon}</span>
  </button>
</li>`;
}

export function navbar({ activePage = null } = {}) {
  const nav = (page) => activeNavClass(activePage, page);

  return `
<div
  x-data="{
    open: false,
    light: localStorage.getItem('theme') === 'light',
    init() {
      document.documentElement.classList.toggle('theme-light', this.light);
      const closeMenu = () => { this.open = false; };
      window.addEventListener('pageshow', closeMenu);
      window.addEventListener('popstate', closeMenu);
    },
    toggleTheme() {
      this.light = !this.light;
      document.documentElement.classList.toggle('theme-light', this.light);
      localStorage.setItem('theme', this.light ? 'light' : 'dark');
    }
  }"
  class="navbar__fixed"
>
  <div class="navbar container">
    <div class="navbar__mobile">
      <div class="navbar__logo">
        <a href="/" @click="open = false"><span>&lt;</span>joelebukatobi <span>&#47;&gt;</span></a>
      </div>
      <div class="navbar__mobile-actions">
        ${themeToggleButton()}
        <button type="button" class="navbar__menu" @click="open = !open" :aria-expanded="open" aria-label="Toggle navigation menu">
          <span x-show="!open">${menuIcon}</span>
          <span x-show="open" x-cloak>${closeIcon}</span>
        </button>
      </div>
    </div>

    <nav x-show="open" x-cloak class="navbar__active">
      <div class="navbar__active__nav">
        <ul class="navbar__active__list">
          <li class="navbar__active__item ${nav('about')}">
            <span>01</span><a href="/about" @click="open = false">about</a>
          </li>
          <li class="navbar__active__item ${nav('resume')}">
            <span>02</span><a href="/resume" @click="open = false">resume</a>
          </li>
          <li class="navbar__active__item ${nav('portfolio')}">
            <span>03</span><a href="/projects" @click="open = false">portfolio</a>
          </li>
        </ul>
      </div>
    </nav>

    <nav x-show="!open" class="navbar__nav">
      <ul class="navbar__list">
        <li class="navbar__item ${nav('about')}">
          <a href="/about">about</a>
        </li>
        <li class="navbar__item ${nav('resume')}">
          <a href="/resume">resume</a>
        </li>
        <li class="navbar__item ${nav('portfolio')}">
          <a href="/projects">portfolio</a>
        </li>
        ${themeToggleButton()}
      </ul>
    </nav>
  </div>
</div>`;
}
