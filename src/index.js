
const button = document.getElementById('start')

function whoWOn(size, player) {
    document.querySelector('[table-body-output]').textContent = ''
    const players = {}
    const len = Math.pow(size, 2);

    for(let i = 0; i < player; i++) {
        players[i+1] = {
            history: [],
            position: [],
            roll:{},
            winner: false
        }
    }
    
    let i = 2 //min 2 players assumed
    while(i++) {
        let nextRoll = parseInt((Math.random()*100)%6, 10) + 1;

        let activePlayer = (i%player)+1;
        players[activePlayer].roll = nextRoll;
        players[activePlayer].history.push(nextRoll);
        let posNum;
        if(players[activePlayer].position.length) {
            const lenArr = players[activePlayer].position.length
            const arr = players[activePlayer].position[lenArr-1]
            posNum = arr + nextRoll;
        } else {
            posNum = nextRoll;
        }
        if(posNum > len) continue;
        players[activePlayer].position.push(posNum);

        if(posNum === len) {
            players[activePlayer]['winner'] = true;
            render(players)
            break;
        }

    }
}

function render(players) {
    const outputTable = document.querySelector('[table-body-output]')
    let tr;
    for(let key in players) {
        tr = document.createElement('tr')
        const td1 = document.createElement('td')
        td1.textContent = key
        tr.appendChild(td1) 
        const td2 = document.createElement('td')
        td2.textContent = players[key].roll
        tr.appendChild(td2)
        const td3 = document.createElement('td')
        td3.textContent = players[key].history.toString()
        tr.appendChild(td3)
        const td4 = document.createElement('td')
        td4.textContent = players[key].position.toString()
        tr.appendChild(td4)
        const td5 = document.createElement('td')
        if(players[key].winner) {
            td5.textContent = 'WINNER!'
            tr.appendChild(td5)
        }
        if(tr) outputTable.appendChild(tr)
    }
}

function init() {
    button.addEventListener('click', function(e) {
        const size = document.getElementById('size').value
        const player = document.getElementById('players').value

        whoWOn(size, player)
    })
}


init()