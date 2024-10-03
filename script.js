// Data voor symptomen
const symptomsData = [
    {
        name: 'Hoofdpijn (haarwortel/druk/divers)',
        id: 'hoofdpijn'
    },
    {
        name: 'Rugpijn / Nekpijn',
        id: 'rugpijn'
    },
    {
        name: 'Pijn op de borst',
        id: 'borstpijn'
    },
    {
        name: 'Brainfog / Duizeligheid',
        id: 'brainfog'
    },
    {
        name: 'Concentratie / Geheugenproblemen',
        id: 'concentratie'
    },
    {
        name: 'Intolerantie (licht / geluid / huid)',
        id: 'intolerantie'
    },
    {
        name: 'Oorsuizen',
        id: 'oorsuizen'
    },
    {
        name: 'Wazig Zien',
        id: 'wazigzien'
    },
    {
        name: 'Droge Ogen / Mond',
        id: 'drogeogen'
    },
    {
        name: 'Algehele Spierpijn / Gewrichtspijn',
        id: 'spierpijn'
    },
    {
        name: 'Slaapkwaliteit',
        id: 'slaapkwaliteit'
    }
];

const vagusSymptomsData = [
    {
        name: 'Slikproblemen',
        id: 'slikproblemen'
    },
    {
        name: 'Heesheid of Verlies van Stem',
        id: 'heesheid'
    },
    {
        name: 'Onregelmatige Hartslag of Hartkloppingen',
        id: 'hartkloppingen'
    },
    {
        name: 'Spijsverteringsproblemen (zoals misselijkheid, opgeblazen gevoel, constipatie)',
        id: 'spijsvertering'
    },
    {
        name: 'Ademhalingsproblemen',
        id: 'ademhaling'
    },
    {
        name: 'Verhoogde Hartslag (tachycardie)',
        id: 'tachycardie'
    },
    {
        name: 'Symmetrie van de Gag Reflex',
        id: 'gagreflex'
    },
    {
        name: 'Symmetrie van de Uvula (bij zeggen "ah")',
        id: 'uvula'
    }
];

// Functie om rating buttons te genereren
function generateRatingButtons(containerId, name) {
    const container = document.getElementById(containerId);
    for (let i = 0; i <= 10; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `${name}${i}`;
        input.name = name;
        input.value = i;

        const label = document.createElement('label');
        label.htmlFor = `${name}${i}`;
        label.textContent = i;

        container.appendChild(input);
        container.appendChild(label);
    }
}

// Functie om symptomen tabel te genereren
function generateSymptomsTable(tbodyId, symptomsArray) {
    const tbody = document.getElementById(tbodyId);

    symptomsArray.forEach(symptom => {
        const tr = document.createElement('tr');

        const tdSymptom = document.createElement('td');
        tdSymptom.textContent = symptom.name;
        tr.appendChild(tdSymptom);

        for (let i = 0; i <= 10; i++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = symptom.id;
            input.value = i;
            input.id = `${symptom.id}${i}`;

            td.appendChild(input);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    });
}

// Genereer rating buttons voor triage
generateRatingButtons('energy-level', 'energy');
generateRatingButtons('relaxation-level', 'relaxation');
generateRatingButtons('wellbeing-level', 'wellbeing');

// Genereer symptomen tabellen
generateSymptomsTable('symptoms-body', symptomsData);
generateSymptomsTable('vagus-body', vagusSymptomsData);

// Bereken resultaten en toon adviezen
document.getElementById('calculate-button').addEventListener('click', function() {
    const totalSymptoms = symptomsData.length + vagusSymptomsData.length;
    let symptomScore = 0;

    // Bereken score voor algemene symptomen
    symptomsData.forEach(symptom => {
        const radios = document.getElementsByName(symptom.id);
        symptomScore += getCheckedValue(radios);
    });

    // Bereken score voor vagus-gerelateerde symptomen
    vagusSymptomsData.forEach(symptom => {
        const radios = document.getElementsByName(symptom.id);
        symptomScore += getCheckedValue(radios) * 1.5; // Geef extra gewicht aan vagus-symptomen
    });

    // Bereken gemiddelde score
    const averageScore = symptomScore / (totalSymptoms + vagusSymptomsData.length * 0.5);

    // Toon advies op basis van score
    const adviceDiv = document.getElementById('advice');
    adviceDiv.innerHTML = ''; // Maak leeg

    const adviceHeader = document.createElement('h3');
    adviceHeader.textContent = 'Uw Advies';
    adviceDiv.appendChild(adviceHeader);

    const adviceList = document.createElement('ol');

    if (averageScore >= 0 && averageScore <= 3) {
        // Lage score advies
        const adviceItem = document.createElement('li');
        adviceItem.textContent = 'U heeft een lage symptomenlast. Blijf uw gezonde levensstijl behouden.';
        adviceList.appendChild(adviceItem);
    } else if (averageScore > 3 && averageScore <= 7) {
        // Gemiddelde score advies
        const adviceItem1 = document.createElement('li');
        adviceItem1.textContent = 'Overweeg om ademhalingsoefeningen te doen om de Nervus Vagus te activeren.';
        adviceList.appendChild(adviceItem1);

        const adviceItem2 = document.createElement('li');
        adviceItem2.textContent = 'Verbeter uw slaapgewoonten en pas ontspanningstechnieken toe.';
        adviceList.appendChild(adviceItem2);

        const adviceItem3 = document.createElement('li');
        adviceItem3.textContent = 'Regelmatige lichaamsbeweging kan helpen uw symptomen te verminderen.';
        adviceList.appendChild(adviceItem3);
    } else {
        // Hoge score advies
        const adviceItem1 = document.createElement('li');
        adviceItem1.textContent = 'Het is aan te raden om een professional te raadplegen voor uw symptomen.';
        adviceList.appendChild(adviceItem1);

        const adviceItem2 = document.createElement('li');
        adviceItem2.textContent = 'Intensieve ademhalingsoefeningen en meditatie kunnen nuttig zijn.';
        adviceList.appendChild(adviceItem2);

        const adviceItem3 = document.createElement('li');
        adviceItem3.textContent = 'Overweeg om uw dieet en levensstijl aan te passen voor betere gezondheid.';
        adviceList.appendChild(adviceItem3);
    }

    adviceDiv.appendChild(adviceList);
});

// Hulpfunctie om geselecteerde waarde te krijgen
function getCheckedValue(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            return parseInt(radio.value);
        }
    }
    return 0; // Geen selectie gemaakt
}
