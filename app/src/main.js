document.getElementById('palette-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('palette-title').value;
  const color1 = document.getElementById('color1').value;
  const color2 = document.getElementById('color2').value;
  const color3 = document.getElementById('color3').value;
  const temperature = document.querySelector('input[name="temperature"]:checked').value;

  const palette = { title, colors: [color1, color2, color3], temperature };

  // Save to localStorage
  const savedPalettes = JSON.parse(localStorage.getItem('palettes')) || [];
  savedPalettes.push(palette);
  localStorage.setItem('palettes', JSON.stringify(savedPalettes));

  // Update the UI
  displayPalettes();
  this.reset();
});

const displayPalettes = () => {
  const paletteList = document.getElementById('palette-list');
  const savedPalettes = JSON.parse(localStorage.getItem('palettes')) || [];
  paletteList.innerHTML = '<h2 class="subtitle">Saved Palettes</h2>';

  savedPalettes.forEach((palette, index) => {
    const paletteCard = document.createElement('div');
    paletteCard.className = 'palette-card';

    let colorBlocks = '';
    palette.colors.forEach(color => {
      colorBlocks += `
        <div class="color-block-container">
          <div class="color-block" style="background-color: ${color}">sample <span>text<span></div>
          <button class="copy-button" onclick="copyColor('${color}')">Copy</button>
        </div>
      `;
    });

    paletteCard.innerHTML = `
      <h3>${palette.title}</h3>
      ${colorBlocks}
      <p>Temperature: ${palette.temperature}</p>
      <button class="delete-button" onclick="deletePalette(${index})">Delete</button>
    `;

    paletteList.appendChild(paletteCard);
  });
}

const copyColor = (color) => {
  navigator.clipboard.writeText(color).then(() => {
    alert(`Copied ${color} to clipboard!`);
  }).catch(err => {
    console.error('Failed to copy color:', err);
  });
}

const deletePalette = (index) => {
  const savedPalettes = JSON.parse(localStorage.getItem('palettes')) || [];
  savedPalettes.splice(index, 1);
  localStorage.setItem('palettes', JSON.stringify(savedPalettes))
  displayPalettes();
}

displayPalettes();
