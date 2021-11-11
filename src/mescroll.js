(() => {
  let elements = [];
  
  
  const defineProperties = () => {
    const defineBaseProperties = (el) => {
      el.style.setProperty('--mescroll-value', 0);
      el.style.setProperty('--mescroll-percent', '0%');
    }
    
    const defineOptions = (el) => {
      el.meScroll = el.meScroll || {};

      const styles = el.meScroll.styles || window.getComputedStyle(el);
      const offset = parseFloat(styles.getPropertyValue('--mescroll-offset') || '0') / 100;
      const endPoint = parseInt(styles.getPropertyValue('--mescroll-end-point') || '0') / 100;
      const allowOverscroll = !!styles.getPropertyValue('--mescroll-allow-overscroll');
      const reverse = !!styles.getPropertyValue('--mescroll-reverse');
      
      el.meScroll = {
        allowOverscroll,
        offset,
        reverse,
        styles,
        endPoint,

        updateState() {
          defineOptions(el);
        }
      }
    }
    
    elements.forEach(defineBaseProperties);
    elements.forEach(defineOptions);
  }
  
  const isElementInViewport = (bbox) => {
    const { top, height } = bbox;
    
    return top + height >= 0 && top <= window.innerHeight;
  }

  const updateScrollState = () => {
    const { innerHeight: windowHeight } = window;
    elements.forEach((el) => {
      const bbox = el.getBoundingClientRect();
      
      if (!isElementInViewport(bbox)) return;
      
      const { top: elTop, height } = bbox;
      const { offset } = el.meScroll;
      const fullHeight = Math.max(windowHeight, height);
      const elBottom = -(elTop - windowHeight * (1 - offset));
      
      let percent = elBottom / (fullHeight * (1 - el.meScroll.endPoint));
      
      if (!el.meScroll.allowOverscroll) {
        percent = Math.max(0, Math.min(1, percent));
      }
      
      if (el.meScroll.reverse) {
        percent = 1 - percent;
      }

      el.style.setProperty('--mescroll-value', percent);
      el.style.setProperty('--mescroll-percent', percent * 100 + '%');
    });
  }
  
  const initListeners = () => {
    window.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
  }

  const init = () => {
    elements = Array.from(
      document.querySelectorAll('[data-mescroll]'),
    );
    defineProperties();
    initListeners();
    updateScrollState();
  }
  
  window.addEventListener('DOMContentLoaded', init);
})();
