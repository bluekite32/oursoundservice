fetch('ascii.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('ascii-art').innerHTML = data;

    // Wrap each character in a span for animation
    const pre = document.querySelector('#ascii-art pre');
    if (pre) {
      const lines = pre.innerText.split('\n');
      pre.innerHTML = lines.map((line, rowIdx) =>
        [...line].map((char, colIdx) =>
          `<span class="ascii-char" data-row="${rowIdx}" data-col="${colIdx}">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')
      ).join('<br>');

      const chars = pre.querySelectorAll('.ascii-char');
      let i = 0;

      function revealNext() {
        const charsPerFrame = 111;
        let count = 0;
        while (i < chars.length && count < charsPerFrame) {
          const span = chars[i];
          span.classList.add('visible');
          span.style.setProperty('--col', span.dataset.col);
          span.style.setProperty('--row', span.dataset.row);

          // Start twinkle effect for this character after it becomes visible
          setTimeout(() => {
            function twinkleChar() {
              // Twinkle between 0 (fully transparent) and 1 (fully visible)
              if (Math.random() < 0.4) {
                span.style.opacity = (Math.random()).toFixed(2);
              } else {
                span.style.opacity = '';
              }
              span._twinkleTimeout = setTimeout(twinkleChar, 40);
            }
            twinkleChar();
          }, 150); // Wait for fade-in transition if you have one

          i++;
          count++;
        }
        if (i < chars.length) {
          setTimeout(revealNext, 0);
        }
      }
      revealNext();
    }
  });