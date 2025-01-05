// Top 100 Offensive Plays
const topOffensivePlays = [
    "HB Dive", "HB Stretch", "HB Toss", "Zone Read", "Power-O", "QB Draw", 
    "Slant", "Post", "Fade", "Quick Out", "Comeback", "Crossing Route",
    "Bubble Screen", "Screen Left", "Screen Right", "Counter", "Sweep",
    "Iso", "Trap", "Lead", "Wham", "Split Zone", "Shovel Pass", 
    "Jet Sweep", "Bootleg", "Play Action Pass", "Double Slant",
    "Mesh", "Four Verticals", "Flood", "Stick", "Wheel Route",
    "Double Post", "Zig Route", "Out-and-Up", "Corner Route", "Dagger",
    "Texas", "Levels", "Drive", "Smash", "Spider 2 Y Banana",
    "Sprint Out", "QB Sneak", "Read Option", "HB Counter", "FB Dive",
    "Reverse", "HB Draw", "Quick Hitch", "Seam Route", "Fade Stop",
    "Middle Screen", "WR End Around", "Triple Option", "Speed Option",
    "Zone Split", "QB Power", "HB Wham", "Sprint Draw", "Scissors",
    "Cross Screen", "HB Trap", "Deep Curl", "Curl Flats", "Tare",
    "Flood Right", "Flood Left", "Option Route", "HB Power Toss",
    "Shallow Cross", "Bench", "HB Slam", "Stick Nod", "Sluggo",
    "Drive Pivot", "QB Iso", "HB Blast", "Smash Divide", "Shark",
    "Quick Slant", "QB Counter", "Post Corner", "Inside Zone", "Outside Zone"
  ];
  
  // Popular Offensive Formations
  const popularOffensiveFormations = [
    "I-Formation", "Shotgun", "Single Back", "Pistol", "Wing-T",
    "Flexbone", "Wishbone", "Spread", "Pro Set", "Trips",
    "Empty Backfield", "Wildcat", "Ace", "Jumbo", "Offset I",
    "Split Back", "Stack", "T-Formation", "Diamond", "5-Wide",
    "Double Wing", "Full House", "Maryland I"
  ];
  
  // Elements for Exact Play Type
  const searchInput = document.getElementById('exact-play-type-search');
  const playList = document.getElementById('exact-play-type-list');
  
  // Elements for Offensive Formation
  const offensiveFormationSearch = document.getElementById('offensive-formation-search');
  const offensiveFormationList = document.getElementById('offensive-formation-list');
  
  // Populate dropdown list for Exact Play Type
  function populatePlayList(filter = '') {
    playList.innerHTML = ''; // Clear previous items
    const filteredPlays = topOffensivePlays.filter(play =>
      play.toLowerCase().includes(filter.toLowerCase())
    );
  
    filteredPlays.forEach(play => {
      const listItem = document.createElement('li');
      listItem.textContent = play;
      listItem.style.cursor = 'pointer';
      listItem.addEventListener('click', () => {
        searchInput.value = play; // Set selected play
        playList.style.display = 'none'; // Hide list
      });
      playList.appendChild(listItem);
    });
  
    playList.style.display = filteredPlays.length > 0 ? 'block' : 'none'; // Show or hide list
  }
  
  // Populate dropdown list for Offensive Formation
  function populateFormationList(filter = '') {
    offensiveFormationList.innerHTML = ''; // Clear previous items
    const filteredFormations = popularOffensiveFormations.filter(formation =>
      formation.toLowerCase().includes(filter.toLowerCase())
    );
  
    filteredFormations.forEach(formation => {
      const listItem = document.createElement('li');
      listItem.textContent = formation;
      listItem.style.cursor = 'pointer';
      listItem.addEventListener('click', () => {
        offensiveFormationSearch.value = formation; // Set selected formation
        offensiveFormationList.style.display = 'none'; // Hide list
      });
      offensiveFormationList.appendChild(listItem);
    });
  
    offensiveFormationList.style.display = filteredFormations.length > 0 ? 'block' : 'none'; // Show or hide list
  }
  
  // Handle input event for Exact Play Type search
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value;
    populatePlayList(filter);
  });
  
  // Handle input event for Offensive Formation search
  offensiveFormationSearch.addEventListener('input', () => {
    const filter = offensiveFormationSearch.value;
    populateFormationList(filter);
  });
  
  // Hide lists when clicking outside
  document.addEventListener('click', (e) => {
    if (!playList.contains(e.target) && e.target !== searchInput) {
      playList.style.display = 'none';
    }
    if (!offensiveFormationList.contains(e.target) && e.target !== offensiveFormationSearch) {
      offensiveFormationList.style.display = 'none';
    }
  });
  
  // Handle form submission for entering play data
  document.getElementById('play-form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload
  
    const playType = document.getElementById('play-type').value;
    const exactPlayType = searchInput.value;
    const offensiveFormation = offensiveFormationSearch.value;
    const defensiveFormation = document.getElementById('defensive-formation').value;
    const yardage = document.getElementById('yardage').value;
  
    // Load or initialize footballData
    let footballData = JSON.parse(localStorage.getItem('footballData')) || [];
  
    // Add new play
    footballData.push({
      Play_Type: playType,
      Exact_Play_Type: exactPlayType,
      Offensive_Formation: offensiveFormation,
      Defensive_Formation: defensiveFormation,
      Yardage_Gained: yardage
    });
  
    // Save to localStorage
    localStorage.setItem('footballData', JSON.stringify(footballData));
  
    // Reset form
    document.getElementById('play-form').reset();
    alert('Play added successfully!');
  });
  
  // Display grouped data on the Grouped Data page
  function displayGroupedData() {
    const groupedOutput = document.getElementById('grouped-data-output');
    const footballData = JSON.parse(localStorage.getItem('footballData')) || [];
  
    if (groupedOutput) {
      let table = `<table border="1" style="width:100%; border-collapse: collapse;">
        <tr>
          <th>Play Type</th>
          <th>Exact Play Type</th>
          <th>Offensive Formation</th>
          <th>Defensive Formation</th>
          <th>Yardage Gained</th>
        </tr>`;
      
      footballData.forEach(play => {
        table += `<tr>
          <td>${play.Play_Type}</td>
          <td>${play.Exact_Play_Type}</td>
          <td>${play.Offensive_Formation}</td>
          <td>${play.Defensive_Formation}</td>
          <td>${play.Yardage_Gained}</td>
        </tr>`;
      });
  
      table += `</table>`;
      groupedOutput.innerHTML = table;
    }
  }
  
  // Run displayGroupedData on page load for the Grouped Data page
  displayGroupedData();
  