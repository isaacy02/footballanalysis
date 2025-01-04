// Define exact play types
const exactPlayTypes = {
  Run: ["HB Dive", "HB Stretch", "HB Toss", "Zone Read", "Power-O", "QB Draw"],
  Pass: ["Slant", "Post", "Fade", "Quick Out", "Comeback", "Crossing Route"],
  Screen: ["Screen Left", "Screen Right", "Bubble Screen"]
};

// Load footballData from localStorage
let footballData = JSON.parse(localStorage.getItem('footballData')) || [];

// Save data to localStorage
function saveData() {
  localStorage.setItem('footballData', JSON.stringify(footballData));
}

// Populate Exact_Play_Type options dynamically
document.getElementById('play-type')?.addEventListener('change', function () {
  const playType = this.value;
  const exactPlayTypeSelect = document.getElementById('exact-play-type');

  // Clear existing options
  exactPlayTypeSelect.innerHTML = '<option value="N/A">N/A</option>';

  if (playType !== 'N/A') {
    exactPlayTypes[playType].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      exactPlayTypeSelect.appendChild(option);
    });
  }
});

// Handle form submission
document.getElementById('play-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const playType = document.getElementById('play-type').value;
  const exactPlayType = document.getElementById('exact-play-type').value;
  const offensiveFormation = document.getElementById('offensive-formation').value;
  const defensiveFormation = document.getElementById('defensive-formation').value;
  const yardage = document.getElementById('yardage').value || 'N/A';

  footballData.push({
    Play_Type: playType,
    Exact_Play_Type: exactPlayType,
    Offensive_Formation: offensiveFormation,
    Defensive_Formation: defensiveFormation,
    Yardage_Gained: yardage
  });

  saveData();
  alert('Play added successfully!');
  document.getElementById('play-form').reset();
});

// Display grouped data
function displayGroupedData() {
  const groupedOutput = document.getElementById('grouped-data-output');
  groupedOutput.textContent = JSON.stringify(footballData, null, 2);
}

