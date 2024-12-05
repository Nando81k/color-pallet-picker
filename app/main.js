const createPalette = () => {
  const title = document.getElementById('paletteTitle').value;
  const color1 = document.getElementById('color1').value;
  const color2 = document.getElementById('color2').value;
  const color3 = document.getElementById('color3').value;
  const temperature = document.querySelector('input[name="temperature"]:checked').value;

  if (!title) {
    alert("Please enter a title for the palette.");
    return;
  }

  const paletteContainer = document.getElementById('palettes');

  // Create palette card
  const paletteCard = document.createElement("div");
  paletteCard.classList.add("palette-card");

  paletteCard.innerHTML = `
    <h3>${title}</h3>
    <div class="color-box" style="background-color: ${color1};">${color1}</div>
    <div class="color-box" style="background-color: ${color2};">${color2}</div>
    <div class="color-box" style="background-color: ${color3};">${color3}</div>
    <button class="copy-btn" onclick="copyToClipboard('${color1}', '${color2}', '${color3}')">Copy Colors</button>
    <button class="delete-btn" onclick="deletePalette(this)">Delete Palette</button>
    <div class="temperature-label">${temperature}</div>
  `;

  paletteContainer.appendChild(paletteCard);

  resetForm();
}

const copyToClipboard = (...colors) => {
  const text = colors.join(", ");
  navigator.clipboard.writeText(text);
  alert(`Copied: ${text}`);
}

const deletePalette = (button) => {
  button.closest(".palette-card").remove();
}

const resetForm = () => {
  document.getElementById("paletteTitle").value = "";
  document.getElementById("color1").value = "#808080";
  document.getElementById("color2").value = "#0000ff";
  document.getElementById("color3").value = "#008000";
  document.querySelector('input[name="temperature"][value="Neutral"]').checked = true;
}
