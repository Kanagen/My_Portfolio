'use strict';
var hnum;

let display = {
    init_num: 0,

    line_num: 6,

    wrippe: document.getElementById('wripper'),

    hexZone: document.getElementById('hexogram_container'),

    control_desc: document.getElementById('control_container'),

    game_way_desk: document.getElementById('wripper_asck-menu'),

    lineContainer: function () {
        const lineCont = document.createElement('div');
        lineCont.setAttribute('class', 'zoneLineCont');
        this.hexZone.appendChild(lineCont);
        return lineCont;
    },

    solidLine: function () {
        const container = this.lineContainer();

        const solidSpan = document.createElement('span');
        solidSpan.setAttribute('class', 'solidSpan');

        container.appendChild(solidSpan);
    },

    dashedLine: function () {
        const container = this.lineContainer();

        const lineInDash = document.createElement('span');
        lineInDash.setAttribute('class', 'lineInDash');

        const spaceInDash = document.createElement('span');
        spaceInDash.setAttribute('class', 'spaceInDash');

        const lineInDash1 = document.createElement('span');
        lineInDash1.setAttribute('class', 'lineInDash');

        container.appendChild(lineInDash);
        container.appendChild(spaceInDash);
        container.appendChild(lineInDash1);
    }
};

let controller = {

    resArr: [],

    btnResult: document.getElementById('result'),
    btnSolidLine: document.getElementById('solidLine'),
    btnDashLine: document.getElementById('dashedLine'),
    btndeletLast: document.getElementById('deleteLast'),
    btnReset: document.getElementById('reset'),

    checkArrayLength: function () {
        if (this.resArr.length === display.line_num) {
            this.btnDashLine.setAttribute('disabled', true);
            this.btnSolidLine.setAttribute('disabled', true);
            this.btnResult.setAttribute('class', 'visible');
            this.btndeletLast.setAttribute('class', 'non_visible');
        }
    }
};

let processor = {

    resStr: '',

    mainLogic: { //Главная матрица
        1: [1, 43, 14, 34, 9, 5, 26, 11],
        2: [10, 58, 38, 54, 61, 60, 41, 19],
        3: [13, 49, 30, 55, 37, 63, 22, 36],
        4: [25, 17, 21, 51, 42, 3, 27, 24],
        5: [44, 28, 50, 32, 57, 48, 18, 46],
        6: [6, 47, 64, 40, 59, 29, 4, 7],
        7: [33, 31, 56, 62, 53, 39, 52, 15],
        8: [12, 45, 35, 16, 20, 8, 23, 2],
    },

    lowHexPart: function () {
        return this.resStr.substring(0, 3);
    },
    upHexPart: function () {
        return this.resStr.substring(3);
    },
    getHexNumber: function () {
        let firstNum = getTrigramNum(this.lowHexPart());
        let secondNum = getTrigramNum(this.upHexPart());

        //console.log(firstNum + '+' + secondNum);

        let hexNum = this.mainLogic[firstNum][secondNum - 1];
        return hexNum;
    }
};

//console.log(controller.resArr);

function getTrigramNum(str) {
    let opr;
    switch (str) {
        case "000":
            opr = 1;
            break;
        case "001":
            opr = 2;
            break;
        case "010":
            opr = 3;
            break;
        case "011":
            opr = 4;
            break;
        case "100":
            opr = 5;
            break;
        case "101":
            opr = 6;
            break;
        case "110":
            opr = 7;
            break;
        case "111":
            opr = 8;
            break;

    }
    return opr;
}

function getString() {
    processor.resStr = controller.resArr.join('');

   /* console.log(processor);
    console.log(processor.lowHexPart());
    console.log(processor.upHexPart());
    console.log(processor.getHexNumber());*/

     let hnum = processor.getHexNumber();
                //console.log('В базе данных: '+ implementation[hnum].hNum);

            localStorage.setItem("key", hnum);

        let controlContainer = document.getElementById('control_container');
        controlContainer.style.display = 'none';

        let txtCase = document.getElementById('interpretCase');
        txtCase.style.display='flex';

        let hNumber = document.getElementById('hexNumber');
        hNumber.innerHTML = implementation[hnum].hNum;

        let hName = document.getElementById('hexName');
        hName.innerHTML = implementation[hnum].hName;

        let hTxt = document.getElementById('hexText');
        hTxt.innerHTML = implementation[hnum].baseTxt;

        controller.btnReset.style.display = 'flex';
        controller.btnReset.addEventListener('click', function(){
        location.reload();
    });
    
}

function init() {           //Выбор монетами

    controller.btnResult.addEventListener('click', getString);
    display.control_desc.classList.add('visible');
    display.wrippe.classList.add('active');
    controller.btnResult.setAttribute('class', 'non_visible');

    controller.btnSolidLine.addEventListener('click', function () {
        display.solidLine();
        controller.resArr.push(0);
        controller.checkArrayLength()
    });

        controller.btnDashLine.addEventListener('click', function () {
        display.dashedLine();
        controller.resArr.push(1);
        controller.checkArrayLength();
    });

    controller.btndeletLast.addEventListener('click', function () {
        display.hexZone.removeChild(display.hexZone.lastChild);
        controller.resArr.pop();
        controller.checkArrayLength();
    });
}

function init2(){           //случайный выбор линий
    display.wrippe.classList.add('active');
    display.control_desc.classList.add('non_visible');
    controller.btnResult.setAttribute('class', 'non_visible');

    controller.btnResult.addEventListener('click', getString);
    setInterval(getChoice, 1000);

    function getChoice(){
        
        ++display.init_num;
        if(display.init_num <= display.line_num){
            let choice = Math.floor((Math.random()*2));
            if(choice){
                display.solidLine();
                controller.resArr.push(0);
            } else {
                display.dashedLine();
                controller.resArr.push(1);
            }
            
        } 
        
    }
    setInterval(function(){
        controller.btnResult.setAttribute('class', 'visible')
    }, 7000);
    
}

//Выбор способа игры
function getGameDirection(){
    controller.btnResult.setAttribute('class', 'non_visible');
    display.control_desc.classList.add('non_visible');
    display.game_way_desk.classList.add('active');
    let btnWin = document.getElementById('asck-win'),
        btnCoin = document.getElementById('asck-coins');

        btnWin.addEventListener('click', function(){
            display.game_way_desk.classList.remove('active');
            init2();
        });
        btnCoin.addEventListener('click', function(){
            display.game_way_desk.classList.remove('active');
            init();
        });

}

window.onload = getGameDirection;