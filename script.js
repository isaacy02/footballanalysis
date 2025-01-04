// Define exact play types for each play type
const exactPlayTypes = {
  Run: ["HB Dive", "HB Stretch", "HB Toss", "Zone Read", "Power-O", "QB Draw"],
  Pass: ["Slant", "Post", "Fade", "Quick Out", "Comeback", "Crossing Route"],
  Screen: ["Screen Left", "Screen Right", "Bubble Screen"]
};

// Load footballData from localStorage or initialize as an empty array
let footballData = JSON.parse(localStorage.getItem('footballData')) || [];

// Save data to localStorage
function saveData() {
  localStorage.setItem('footballData', JSON.stringify(footballData));
}

// Populate Exact_Play_Type options dynamically based on Play_Type selection
document.getElementById('play-type')?.addEventListener('change', function () {
  const playType = this.value;
  const exactPlayTypeSelect = document.getElementById('exact-play-type');

  // Clear existing options
  exactPlayTypeSelect.innerHTML = '<option value="N/A">N/A</option>';

  // Add relevant options for the selected Play_Type
  if (playType !== 'N/A') {
    exactPlayTypes[playType].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      exactPlayTypeSelect.appendChild(option);
    });
  }
});

// Handle form submission for adding a new play
document.getElementById('play-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect data from form
  const playType = document.getElementById('play-type').value;
  const exactPlayType = document.getElementById('exact-play-type').value;
  const offensiveFormation = document.getElementById('offensive-formation').value;
  const defensiveFormation = document.getElementById('defensive-formation').value;
  const yardage = document.getElementById('yardage').value || 'N/A';

  // Add new play data to footballData array
  footballData.push({
    Play_Type: playType,
    Exact_Play_Type: exactPlayType,
    Offensive_Formation: offensiveFormation,
    Defensive_Formation: defensiveFormation,
    Yardage_Gained: yardage
  });

  // Save updated data to localStorage and reset the form
  saveData();
  alert('Play added successfully!');
  document.getElementById('play-form').reset();
});

// Display grouped data in the "data-section"
function displayGroupedData() {
  const groupedOutput = document.getElementById('grouped-data-output');
  if (groupedOutput) {
    // Create a grouped view of the data
    const groupedText = generateGroupedData();
    groupedOutput.textContent = groupedText;
  }
}

// Generate grouped data as a string for display
function generateGroupedData() {
  let result = '';

  // Group by Exact_Play_Type
  result += calculateAverage('Grouped by Exact Play Type', ['Exact_Play_Type']);

  // Group by Play_Type and Offensive_Formation
  result += calculateAverage('Grouped by Play Type and Offensive Formation', ['Play_Type', 'Offensive_Formation']);

  // Group by Play_Type, Offensive_Formation, and Defensive_Formation
  result += calculateAverage('Grouped by Play Type, Offensive, and Defensive Formation', ['Play_Type', 'Offensive_Formation', 'Defensive_Formation']);

  return result;
}

// Function to calculate averages for a given grouping
function calculateAverage(title, groupByKeys) {
  const groupedData = groupBy(footballData, groupByKeys);
  let result = `${title}:\n`;

  for (const [key, plays] of Object.entries(groupedData)) {
    const averageYardage = plays.reduce((sum, play) => sum + (isNaN(play.Yardage_Gained) ? 0 : parseInt(play.Yardage_Gained)), 0) / plays.length;
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

// Display grouped data when the page loads
displayGroupedData();
