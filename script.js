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

  // Populate new options based on playType
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

  let resultText = '--- Analysis Results ---\n\n';

  // Average yardage grouped by Exact_Play_Type
  resultText += calculateAverage('Exact Play Type', ['Exact_Play_Type']);
  resultText += calculateAverage('Play Type & Offensive Formation', ['Play_Type', 'Offensive_Formation']);
  resultText += calculateAverage('Exact Play, Play Type & Offensive Formation', ['Exact_Play_Type', 'Play_Type', 'Offensive_Formation']);
  resultText += calculateAverage('Play Type, Offensive & Defensive Formation', ['Play_Type', 'Offensive_Formation', 'Defensive_Formation']);
  resultText += calculateAverage('Exact Play, Offensive & Defensive Formation', ['Exact_Play_Type', 'Play_Type', 'Offensive_Formation', 'Defensive_Formation']);
  resultText += calculateAverage('Play Type & Defensive Formation', ['Play_Type', 'Defensive_Formation']);
  resultText += calculateAverage('Exact Play & Defensive Formation', ['Exact_Play_Type', 'Play_Type', 'Defensive_Formation']);

  resultDiv.innerText = resultText;
}

// Function to calculate averages for a given grouping
function calculateAverage(title, groupByKeys) {
  const groupedData = groupBy(footballData, groupByKeys);
  let result = `${title}:\n`;

  for (const [key, plays] of Object.entries(groupedData)) {
    const averageYardage = plays.reduce((sum, play) => sum + play.Yardage_Gained, 0) / plays.length;
    result += `  ${key}: ${averageYardage.toFixed(2)} yards\n`;
  }

  result += '\n';
  return result;
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
