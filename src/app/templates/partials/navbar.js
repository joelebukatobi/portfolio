import { activeNavClass } from '../utils/helpers.js';

const sunIcon = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>`;

const moonIcon = `
<svg class="navbar__theme-icon--moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const menuIcon = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M6 6H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M6 18H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M10 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const closeIcon = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

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

    <nav x-show="open" class="navbar__active">
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
