// Define exact play types for each play type
const exactPlayTypes = {
  Run: ["HB Dive", "HB Stretch", "HB Toss", "Zone Read", "Power-O", "QB Draw"],
  Pass: ["Slant", "Post", "Fade", "Quick Out", "Comeback", "Crossing Route"],
  Screen: ["Screen Left", "Screen Right", "Bubble Screen"]
};

// Initialize footballData from localStorage or as an empty array
let footballData = JSON.parse(localStorage.getItem('footballData')) || [];

// Function to save data to localStorage
function saveData() {
  localStorage.setItem('footballData', JSON.stringify(footballData));
}

// Populate Exact_Play_Type options when Play_Type changes
document.getElementById('play-type').addEventListener('change', function () {
  const playType = this.value;
  const exactPlayTypeSelect = document.getElementById('exact-play-type');

  // Clear existing options
  exactPlayTypeSelect.innerHTML = '';

  // Populate new options
  exactPlayTypes[playType].forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    exactPlayTypeSelect.appendChild(option);
  });
});

// Initialize Exact_Play_Type dropdown on page load
document.getElementById('play-type').dispatchEvent(new Event('change'));

// Handle form submission
document.getElementById('play-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Capture form data
  const playType = document.getElementById('play-type').value;
  const exactPlayType = document.getElementById('exact-play-type').value;
  const offensiveFormation = document.getElementById('offensive-formation').value;
  const defensiveFormation = document.getElementById('defensive-formation').value;
  const yardage = parseInt(document.getElementById('yardage').value);

  // Add the play to the dataset
  footballData.push({
    Play_Type: playType,
    Exact_Play_Type: exactPlayType,
    Offensive_Formation: offensiveFormation,
    Defensive_Formation: defensiveFormation,
    Yardage_Gained: yardage
  });

  // Save data and display analysis
  saveData();
  displayAnalysis();
});

// Function to calculate and display the analysis
function displayAnalysis() {
  const resultDiv = document.getElementById('analysis-output');

  // Group by Exact_Play_Type, Play_Type, and Defensive_Formation
  const groupedData = groupBy(footballData, ['Exact_Play_Type', 'Play_Type', 'Defensive_Formation']);
  let resultText = 'Average Yardage by Exact Play Type, Play Type, and Defensive Formation:\n\n';

  // Calculate averages
  for (const [key, plays] of Object.entries(groupedData)) {
    const averageYardage = plays.reduce((sum, play) => sum + play.Yardage_Gained, 0) / plays.length;
    resultText += `${key}: ${averageYardage.toFixed(2)} yards\n`;
  }

  resultDiv.innerText = resultText;
}

// Helper function to group data
function groupBy(data, keys) {
  return data.reduce((result, item) => {
    const groupKey = keys.map(key => item[key]).join(' | ');
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

// Display analysis on page load
displayAnalysis();
