'use strict';
var hnum;

    getFrStore();

function getFrStore(){
    let  
         hexZone = document.getElementById('hexogram_container'),
         
         hexNum = document.getElementById('hexNumber'),
         hexName = document.getElementById('hexName'),
         hexText = document.getElementById('hexText'),
         btnReturn = document.getElementById('btn');

            hnum = localStorage.getItem("key");
            //console.log(implementation[hnum].hHex);
                      
            for(let hEl of implementation[hnum].hHex){
               //console.log(hEl);
               if(hEl === 0){
                  console.log(1);
                  solidLine();
               }
               if(hEl === 1){
                  console.log(2);
                  dashedLine();
               }
            }
            btnReturn.classList.add('active');
            
            hexNum.innerHTML = implementation[hnum].hNum;
            hexName.innerHTML = implementation[hnum].hName;
            hexText.innerHTML = implementation[hnum].baseTxt;

            function lineContainer() {
               const lineCont = document.createElement('div');
               lineCont.setAttribute('class', 'zoneLineCont');
               hexZone.appendChild(lineCont);
               return lineCont;
            }

            function solidLine() {
               const container = lineContainer();
               const solidSpan = document.createElement('span');
               solidSpan.setAttribute('class', 'solidSpan');
               container.appendChild(solidSpan);
            }

            function dashedLine() {
               const container = lineContainer();

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
        
    btnReturn.addEventListener('click', ()=>{
      btnReturn.classList.remove('active');
      location.reload();
      
    })
}