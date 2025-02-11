let listOfNames = [];

window.onload = function() {
    let savedNames = localStorage.getItem('savedNamesList');
    
    if (savedNames) {
        listOfNames = JSON.parse(savedNames);
        updateNameDisplay();
    }

    let inputBox = document.getElementById('nameInput');
    inputBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewName();
        }
    });
};

function addNewName() {
    let inputBox = document.getElementById('nameInput');
    
    let newName = inputBox.value.trim();
    
    if (newName !== '') {
        listOfNames.push(newName);
        
        inputBox.value = '';
        
        localStorage.setItem('savedNamesList', JSON.stringify(listOfNames));
        
        updateNameDisplay();
    }
}

function updateNameDisplay() {
    let nameList = document.getElementById('nameList');
    
    nameList.innerHTML = '';
    
    for (let i = 0; i < listOfNames.length; i++) {
        let nameElement = document.createElement('div');
        nameElement.className = 'name-item';
        
        nameElement.innerHTML = `
            <span>${listOfNames[i]}</span>
            <button class="delete-btn" onclick="removeName(${i})">Delete</button>
        `;
        
        nameList.appendChild(nameElement);
    }
}

function removeName(position) {
    listOfNames.splice(position, 1);
    
    localStorage.setItem('savedNamesList', JSON.stringify(listOfNames));
    
    updateNameDisplay();
}

function pickRandomName() {
    if (listOfNames.length === 0) {
        alert('Please add some names first!');
        return;
    }

    let randomPosition = Math.floor(Math.random() * listOfNames.length);
    
    let chosenName = listOfNames[randomPosition];
    
    let displayBox = document.getElementById('selectedName');
    
    displayBox.textContent = chosenName;
    displayBox.style.display = 'block';
}

function mixUpNames(nameList) {
    let mixedNames = [...nameList];
    
    for (let i = mixedNames.length - 1; i > 0; i--) {
        let randomPosition = Math.floor(Math.random() * (i + 1));
        let tempName = mixedNames[i];
        mixedNames[i] = mixedNames[randomPosition];
        mixedNames[randomPosition] = tempName;
    }
    
    return mixedNames;
}

function generateGroups() {
    let peoplePerGroup = Number(document.getElementById('peoplePerGroup').value);
    let numberOfGroups = Number(document.getElementById('numberOfGroups').value);

    if (!peoplePerGroup || !numberOfGroups) {
        alert('Please enter valid numbers for the groups');
        return;
    }

    if (listOfNames.length === 0) {
        alert('Please add some names first!');
        return;
    }

    let mixedNames = mixUpNames([...listOfNames]);
    
    let totalPeople = mixedNames.length;
    let basicGroupSize = Math.floor(totalPeople / numberOfGroups);
    let extraPeople = totalPeople % numberOfGroups;

    let resultsBox = document.getElementById('results');
    resultsBox.innerHTML = '';
    
    let currentPosition = 0;
    
    for (let groupNum = 0; groupNum < numberOfGroups; groupNum++) {
        let currentGroupSize = groupNum < extraPeople ? basicGroupSize + 1 : basicGroupSize;
        
        let groupNames = mixedNames.slice(currentPosition, currentPosition + currentGroupSize);
        
        if (groupNames.length > 0) {
            let groupBox = document.createElement('div');
            groupBox.className = 'group';
            
            groupBox.innerHTML = `
                <h3>Group ${groupNum + 1}</h3>
                <p>${groupNames.join(', ')}</p>
            `;
            
            resultsBox.appendChild(groupBox);
        }
        
        currentPosition += currentGroupSize;
    }
}