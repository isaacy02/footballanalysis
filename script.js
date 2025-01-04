// Initialize footballData from localStorage or as an empty array
let footballData = JSON.parse(localStorage.getItem('footballData')) || [];

// Function to save data to localStorage
function saveData() {
  localStorage.setItem('footballData', JSON.stringify(footballData));
}

// Handle form submission
document.getElementById('play-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Capture form data
  const playType = document.getElementById('play-type').value;
  const offensiveFormation = document.getElementById('offensive-formation').value;
  const defensiveFormation = document.getElementById('defensive-formation').value;
  const yardage = parseInt(document.getElementById('yardage').value);

  // Simulate assigning an exact play type based on play type
  const exactPlayTypes = {
    Run: ["HB Dive", "HB Stretch", "HB Toss"],
    Pass: ["Slant", "Post", "Fade"],
    Screen: ["Screen Left", "Screen Right", "Bubble Screen"]
  };

  const exactPlayType = exactPlayTypes[playType][Math.floor(Math.random() * exactPlayTypes[playType].length)];

  // Add the play to the dataset
  footballData.push({
    Play_Type: playType,
    Exact_Play_Type: exactPlayType,
    Offensive_Formation: offensiveFormation,
    Defensive_Formation: defensiveFormation,
    Yardage_Gained: yardage
  });

  // Save the updated data to localStorage
  saveData();

  // Perform analysis and update display
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
