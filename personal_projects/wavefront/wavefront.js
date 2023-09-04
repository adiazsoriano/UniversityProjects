
//important for buttons on html form
var isAdvWBWF;
var isAdvPFWF;
var isAdvAllWF;
var isEAPF;
var isAWEAPF;

class Direction {
    pair;

    constructor(x,y) { //x is col, y is row
        this.pair = new Array();
        this.pair.push(x,y);
    }

    getPair() {
        return this.pair;
    }
    setPair(pair) {
        this.pair = pair;
    }

    getXValue() {
       return this.pair[0];
    }
    getYValue() {
        return this.pair[1];
    }
}

class StandardDirection {
    directionCount;
    
    mapStandardDir;
    arrStandardDir;

    //directions for regular / adv
    north;
    south;
    east;
    west;
    nw;
    ne;
    sw;
    se;

    constructor(isAdv) {
        this.directionCount = 4;
        this.mapStandardDir = new Map();
        this.arrStandardDir = new Array();

        this.north = new Direction(-1,0);
        this.south = new Direction(1,0);
        this.east = new Direction(0,1);
        this.west = new Direction(0,-1);

        this.mapStandardDir.set(1, this.north);
        this.mapStandardDir.set(3, this.south);
        this.mapStandardDir.set(5, this.east);
        this.mapStandardDir.set(7, this.west);

        this.arrStandardDir.push(this.north,this.east,this.south,this.west);

        switch(isAdv) {
            case true:
                this.nw = new Direction(-1,-1);
                this.ne = new Direction(-1, 1);
                this.sw = new Direction(1,-1);
                this.se = new Direction(1,1);

                this.directionCount += 4;
                break;
            case false:
                this.nw = null;
                this.ne = null;
                this.sw = null;
                this.se = null;
                break;
        }

        this.mapStandardDir.set(8, this.nw);
        this.mapStandardDir.set(2, this.ne);
        this.mapStandardDir.set(6, this.sw);
        this.mapStandardDir.set(4, this.se);

        this.arrStandardDir.push(this.ne,this.se,this.sw,this.nw);

    }

    getMapStandardDir() {
        return this.mapStandardDir;
    }
    getArrStandardDir() {
        return this.arrStandardDir;
    }
    getDirectionCount() {
        return this.directionCount;
    }
}

class EnhancedDirection {
    arrEnhancedDir;

    northplus;
    nneast;
    northeastplus;
    northee;
    eastplus;
    southee;
    southeastplus;
    sseast;
    southplus;
    sswest;
    southwestplus;
    southww;
    westplus;
    northww;
    northwestplus;
    nnwest;

    constructor() {
        this.arrEnhancedDir = new Array();

        this.northplus = new Direction(-2,0);
        this.nneast = new Direction(-2, 1);
        this.northeastplus = new Direction(-2,2);
        this.northee = new Direction(-1,2);
        this.eastplus = new Direction(0, 2);
        this.southee = new Direction(1,2);
        this.southeastplus = new Direction(2,2);
        this.sseast = new Direction(2,1);
        this.southplus = new Direction(2, 0);
        this.sswest = new Direction(2,-1);
        this.southwestplus = new Direction(2,-2);
        this.southww = new Direction(1,-2);
        this.westplus = new Direction(0,-2);
        this.northww = new Direction(-1,-2);
        this.northwestplus = new Direction(-2,-2);
        this.nnwest = new Direction(-2,-1);


        this.arrEnhancedDir.push(this.northplus,
                                 this.nneast,
                                 this.northeastplus,
                                 this.northee,
                                 this.eastplus,
                                 this.southee,
                                 this.southeastplus,
                                 this.sseast,
                                 this.southplus,
                                 this.sswest,
                                 this.southwestplus,
                                 this.southww,
                                 this.westplus,
                                 this.northww,
                                 this.northwestplus,
                                 this.nnwest);
    }

    getArrEnhancedDir() {
        return this.arrEnhancedDir;
    }
}

function create2dArray(size) {

    let twoDArray = new Array(size);

    for(let i = 0; i < size; i++) {
        twoDArray[i] = new Array(size);
    }
    return twoDArray;
}

function initGrid(size) {
    var grid = create2dArray(size);

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            grid[i][j] = 0;
        }
    }

    return grid;
}

function changeButtonColorOnClick() { //potentially refactor
    var reg = !isAdvWBWF && !isAdvPFWF && !isAdvAllWF && !isEAPF && !isAWEAPF;
    var wb = isAdvWBWF;
    var pf = isAdvPFWF;
    var aa = isAdvAllWF;
    var eapf = isEAPF;
    var aweapf = isAWEAPF;

    var r = document.getElementById("regWF");
    var w = document.getElementById("advWBWF");
    var p = document.getElementById("advPFWF");
    var a = document.getElementById("advAllWF");
    var ep = document.getElementById("EAPF");
    var awep = document.getElementById("AWEAPF");

    new Map([[r,reg],
             [w,wb],
             [p,pf],
             [a,aa],
             [ep,eapf],
             [awep,aweapf]]).forEach((val,key) => {
                 if(val) {
                    key.style.backgroundColor = '#8FFF8F';
                 } else {
                     key.style.backgroundColor = '#F1F1F1';
                 }
             });
}

function changeInputColorOnInput(i, j) {
    var inputField = document.getElementById(i + "," + j);

    switch(inputField.value.toUpperCase()) {
        case "B":
            inputField.style.color = '#FFFFFF';
            inputField.style.backgroundColor = '#000000';
            break;
        case "G":
            inputField.style.color = '#000000';
            inputField.style.backgroundColor = '#FFB08A';
            break;
        case "S":
            inputField.style.color = '#000000';
            inputField.style.backgroundColor = '#90EE90';
            break;
        case "0":
            inputField.style.color = '#000000';
            inputField.style.backgroundColor = '#FFFFFF';
            break;
        default:
            inputField.style.color = '#000000';
            inputField.style.backgroundColor = '#FFFF64';
            break;
    }

}
function inputInteractiveGrid(i,j) {
    var box = document.getElementById(i + "," + j);

    var empty = document.getElementById("empty");
    var barrier = document.getElementById("barrier");
    var start = document.getElementById("start");
    var goal = document.getElementById("goal");

    if(empty.checked) {
        box.style.backgroundColor = "#FFFFFF";
        box.style.color = "#000000";
        box.textContent = "0";
    }
    if(barrier.checked) {
        box.style.backgroundColor = "#000000";
        box.style.color = "#FFFFFF";
        box.textContent = "B";
    }
    if(start.checked) {
        box.style.backgroundColor = "#90EE90";
        box.style.color = "#000000";
        box.textContent = "S";
    }
    if(goal.checked) {
        box.style.backgroundColor = "#FFB08A";
        box.style.color = "#000000";
        box.textContent = "G";
    }
}

function createLegendInDiv() {
    var div = document.getElementById("legend");
    div.innerHTML = "";

    div.innerHTML += "<hr>";
    div.innerHTML += "<br/>";

    div.innerHTML += "<form id='dform'></form>";
    var divForm = document.getElementById("dform");
    divForm.innerHTML += "<fieldset id='dfieldset'></fieldset>";
    var divFieldset = document.getElementById("dfieldset"); 

    divFieldset.innerHTML += "<legend>Grid Legend</legend>";
    divFieldset.innerHTML += "<p>Enter the following values below into the grid to use the wavefront algorithm (not case sensitive if using input grid).</p>";
    divFieldset.innerHTML += "<p><b>NOTE:</b> There must be at least 1 start and 1 goal placed in the grid below. </p>";
    divFieldset.innerHTML += "<hr>";

    divFieldset.innerHTML += "<p><b>0</b> - is an empty space.</p>";
    divFieldset.innerHTML += "<p><b>B</b> - is a barrier.</p>";
    divFieldset.innerHTML += "<p><b>S</b> - is starting position.</p>";
    divFieldset.innerHTML += "<p><b>G</b> - is the goal position.</p>";
    
    div.innerHTML += "<br/>";
}

function createHTMLTable(input) {
    var grid = initGrid(input);
    var inputSize = 5;
    if(input > 20) {
        inputSize -= 4;
    }

    var div = document.getElementById("table");
    div.innerHTML = "";

    createLegendInDiv();
    
    div.innerHTML += "<br/>";

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
            div.innerHTML += "<input type='text' id='" + i + "," + j +"' size='" + inputSize +"' style='text-align: center' value='0' oninput='changeInputColorOnInput("+ i + "," + j + ")'>";
        }
        div.innerHTML += "<br/>";
    }

    div.innerHTML += "<button type='button' id='gridSize' onclick='beginWavefront(0);' value='" + grid.length + "'>Begin Process</button>";
    grid = null;
}

function createInteractiveTable(input) {
    var grid = initGrid(input);
    var widthSize = 50;
    if(input > 20) {
        widthSize += 10;
    }

    var div = document.getElementById("table");
    div.innerHTML = "";

    createLegendInDiv();
    
    div.innerHTML += "<input type='radio' id='empty' name='inp' checked>";
    div.innerHTML += "<label for='empty'><b> 0 </b></label>";
    div.innerHTML += "<input type='radio' id='barrier' name='inp'>";
    div.innerHTML += "<label for='barrier'><b> B </b></label>";
    div.innerHTML += "<input type='radio' id='start' name='inp'>";
    div.innerHTML += "<label for='start'><b> S </b></label>";
    div.innerHTML += "<input type='radio' id='goal' name='inp'>";
    div.innerHTML += "<label for='goal'><b> G </b></label>";
    div.innerHTML += "<br/><br/>";

    div.innerHTML += "<table id='divTable' style='width: " + widthSize + "%'></table>";
    var divTable = document.getElementById("divTable");

    for(let i = 0; i < grid.length; i++) {

        divTable.innerHTML += "<tr id='r" + i + "'></tr>";
        let divRow = document.getElementById("r" + i);

        for(let j = 0; j < grid.length; j++) {
            divRow.innerHTML += "<td class='interactiveBox' id='" + i + "," + j +"' style='text-align: center' onclick='inputInteractiveGrid(" + i + "," + j + ")'>0</td>";
        }
    }

    div.innerHTML += "<button type='button' id='gridSize' onclick='beginWavefront(1);' value='" + grid.length + "'>Begin Process</button>";
    grid = null;
}

function isValidInput(inp) {
    return inp.match("[0-9]+");
}

function optionForInput(input) {
    var tableDiv = document.getElementById("table");
    var legendDiv = document.getElementById("legend");
    tableDiv.innerHTML = "";
    legendDiv.innerHTML = "";
    tableDiv.innerHTML += "<p>Choose either of these options for input of the grid.</p>";
    tableDiv.innerHTML += "<button style='background-color: #F1F1F1; border-color: #F1F1F1;' type='button' id='inputGridButton' onclick='createHTMLTable(" + input + ");'>Input Grid</button>";
    tableDiv.innerHTML += "<button style='background-color: #F1F1F1; border-color: #F1F1F1;' type='button' id='InteractGridButton' onclick='createInteractiveTable(" + input + ");'>Interactive Grid</button>";
}

function wavefrontInput(wavefrontType) {
    var input = parseInt(document.getElementById("input").value).toString().trim();

     isAdvWBWF = wavefrontType == "advWBWF";
     isAdvPFWF = wavefrontType == "advPFWF";
     isAdvAllWF = wavefrontType == "advAllWF";
     isEAPF = wavefrontType == "EAPF";
     isAWEAPF = wavefrontType == "AWEAPF";

    if(isValidInput(input) && input < 31 && input > 2) {
        console.log(input);

        optionForInput(input);

    } else {
        document.getElementById("input").value = "";
        document.getElementById("input").focus();
        alert("Enter a valid input.");
    }
}

function retrieveHTMLGrid(size) { 

    var grid = create2dArray(size);

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
            grid[i][j] = document.getElementById(i + "," + j).value;
        }
    } 

    return grid;
}
function retrieveInteractiveGrid(size) {
    
    var grid = create2dArray(size);

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
            grid[i][j] = document.getElementById(i + "," + j).textContent;
        }
    }

    return grid;
}

function isValidGrid(grid) {

    let startCount = 0;
    let goalCount = 0;

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {

            grid[i][j] = grid[i][j].toString().toUpperCase();

            if(grid[i][j] == "S") {
                startCount++;
            }
            if(grid[i][j] == "G") {
                goalCount++;
            }

            if(!(grid[i][j] == 0 || grid[i][j] == "B" || grid[i][j] == "S" || grid[i][j] == "G")) {
                return false;
            }
        }
    }
    
    if(!(startCount == 1 && goalCount == 1)) {
        return false;
    }
    return true;
}

function beginWavefront(inputType) {
    var gridSize = parseInt(document.getElementById("gridSize").value);
    
    var grid;

    switch(inputType) {
        case 0:
            grid = retrieveHTMLGrid(gridSize);
            break;
        case 1:
            grid = retrieveInteractiveGrid(gridSize);
            break;
    }

    const gridArea = grid.length * grid.length;
    const pathNum = gridArea - 1;

    var currentWaveState = 2; //innate is 2, 1 is barrier.
    var successfulWave = false; //for wavebuilding

    var pathHeadRow = -1;
    var pathHeadCol = -1;
    var isAtGoal = false;

    var pathDirs = new StandardDirection(isAdvAllWF || isAdvPFWF || isEAPF || isAWEAPF);
    var waveDirs = new StandardDirection(isAdvAllWF || isAdvWBWF || isAWEAPF);
    var eDirs = new EnhancedDirection();

    var totalPathDirs = new Array();
    pathDirs.getArrStandardDir().forEach(item => {
        totalPathDirs.push(item);
    })
    if(isEAPF || isAWEAPF) {
        eDirs.getArrEnhancedDir().forEach(item => {
            totalPathDirs.push(item);
        })
    }

    if(isValidGrid(grid)) {
        let divTable = document.getElementById("table");
        let divLegend = document.getElementById("legend");

        divTable.innerHTML = "";
        divLegend.innerHTML = "";

        createOutput();
        convertGrid();
        buildWave();

    } else {
        alert("Please enter the proper inputs into the grid according to the legend.");
    }

    function createOutput() {

        var div = document.getElementById("table");
        var widthSize = 50;
        if(grid.length > 20) {
            widthSize += 10;
        }

        div.innerHTML = "";
        div.innerHTML += "<p>To reset, just enter a new number after the completion. If that does not work, refresh the page.</p>";
        div.innerHTML += "<br/>";

        div.innerHTML += "<table id='divTable' style='width: " + widthSize + "%'></table>";
        var divTable = document.getElementById("divTable");
        
        for(let i = 0; i < grid.length; i++) {

            divTable.innerHTML += "<tr id='r" + i + "'></tr>";
            let divRow = document.getElementById("r" + i);

            for(let j = 0; j < grid.length; j++) {

                let isPathHighlighted = false;

                if(!(pathHeadRow == -1 && pathHeadCol == -1)) {
                    for(let dir of totalPathDirs) {
                        if(dir != null) {
                            let deltaPR = pathHeadRow + dir.getYValue();
                            let deltaPC = pathHeadCol + dir.getXValue();

                            let deltaRowMove = dir.getYValue();
                            let deltaColMove = dir.getXValue();

                            switch(deltaRowMove) {
                                case 2:
                                    deltaRowMove--;
                                    break;
                                case -2:
                                    deltaRowMove++;
                                    break;
                            }
                            switch(deltaColMove) {
                                case 2:
                                    deltaColMove--;
                                    break;
                                case -2:
                                    deltaColMove++;
                                    break;
                            }
    
                            if(deltaPR >= 0 && deltaPC >= 0 &&
                               deltaPR <= grid.length - 1 && deltaPC <= grid.length - 1 &&
                               deltaPR == i && deltaPC == j &&
                               grid[deltaPR][deltaPC] < pathNum && grid[deltaPR][deltaPC] > 2 &&
                               !isAtGoal && grid[pathHeadRow + deltaRowMove][pathHeadCol + deltaColMove] != 1) {
                                   
                                   divRow.innerHTML += "<td id='" + deltaPR + "," + deltaPC +"' style='text-align: center; background-color: #dbfffa'>" + grid[deltaPR][deltaPC] + "</td>";
                                   isPathHighlighted = true;
                            }
                        }
                    }
                }

                if(!isPathHighlighted) {
                    if(grid[i][j] == 2 || grid[i][j] == "G") {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #FFB08A'>G</td>";
                    } 
                    if(grid[i][j] == gridArea || grid[i][j] == "S") {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #90EE90'>S</td>";
                    }

                    if(i == pathHeadRow && j == pathHeadCol) { //locates current head of path and path made
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #88FFEE'>O</td>";
                    } else if(grid[i][j] == pathNum) {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #87CEFA'>O</td>";
                    }
                    if(grid[i][j] > 2 && grid[i][j] < pathNum) { //prints numbers in grid
    
                        if(grid[i][j] == currentWaveState + 1) {
                            divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #FFBF00'>" + grid[i][j] + "</td>";
                        } else {
                            divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center'>" + grid[i][j] + "</td>";
                        }
                    }
                    if(grid[i][j] == 1 || grid[i][j] == "B") {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: black; color: white'>B</td>";
                    }
                    if(grid[i][j] == 0) {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center'>0</td>";
                    }
                    if(grid[i][j] > grid.length * grid.length) {
                        divRow.innerHTML += "<td id='" + i + "," + j +"' style='text-align: center; background-color: #CBC3E3'>" + grid[i][j] + "</td>";
                    }
                }
            }
        }
    }

    function convertGrid() {

        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid.length; j++) {

                if(grid[i][j] == "G") {
                    grid[i][j] = 2;
                }
                if(grid[i][j] == "S") {
                    grid[i][j] = grid.length * grid.length;
                }
                if(grid[i][j] == "B") {
                    grid[i][j] = 1; 
                }
            }
        }
    }
    function isNoZeroPresent() {

        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid.length; j++) {
                if(grid[i][j] == 0) {

                    return false;
                }
            }
        }

        return true;
    }

    function isStartGoalReady() {

        var isStartOpen = false;
        var startRowLoc = 0;
        var startColLoc = 0;

        var isGoalOpen = false;
        var goalRowLoc = 0;
        var goalColLoc = 0;

        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid.length; j++) {
                switch(grid[i][j]) {
                    case gridArea: //start
                        startRowLoc = i;
                        startColLoc = j;
                        break;
                    case 2: //goal
                        goalRowLoc = i;
                        goalColLoc = j;
                        break;
                }
            }
        }
        
        for(let pathDir of pathDirs.getArrStandardDir()) {
            if(pathDir != null) {

                let deltaStartRow = startRowLoc + pathDir.getYValue();
                let deltaStartCol = startColLoc + pathDir.getXValue();
                
                let deltaGoalRow = goalRowLoc + pathDir.getYValue();
                let deltaGoalCol = goalColLoc + pathDir.getXValue();

                //start
                if(deltaStartRow >= 0 && deltaStartCol >= 0 &&
                   deltaStartRow <= grid.length - 1 && deltaStartCol <= grid.length - 1 &&
                   grid[deltaStartRow][deltaStartCol] > 1) {
                    isStartOpen = true;
                } 

                //goal
                if(deltaGoalRow >= 0 && deltaGoalCol >= 0 &&
                   deltaGoalRow <= grid.length - 1 && deltaGoalCol <= grid.length - 1 &&
                   grid[deltaGoalRow][deltaGoalCol] > 1) {
                    isGoalOpen = true;
                }
            }
        }

        return isStartOpen && isGoalOpen;
        
    }

    function replaceEveryZero() {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid.length; j++) {
                if(grid[i][j] == 0) {
                    grid[i][j] = grid.length * grid.length + 1;
                }
            }
        }        
    }

    function buildWave() {

        const counterTime = 800; //.8 of a second
 
        var timeOutCount = 0;

        var waveInterval = setInterval(function(){ 
            if(!(timeOutCount >= grid.length * grid.length || isNoZeroPresent())) { 

                updateGridForWave(currentWaveState);

                if(successfulWave) {
                    currentWaveState++;
                } else {
                    if(!isNoZeroPresent() && !isStartGoalReady()) {
                        stopWaveInterval();

                        currentWaveState = -1;
                        createOutput();

                        alert("Program has stopped.\nPath cannot be made.");
                    } else {
                        replaceEveryZero();
                    }
                }

                timeOutCount++;
                successfulWave = false;
            } else {
                stopWaveInterval();
                
                currentWaveState = -1;
                createOutput(); 

                if(isStartGoalReady()) {
                    pathFind();
                } else {
                    alert("Program has stopped.\nPath cannot be made.");
                }
            }
            }, counterTime);

        function stopWaveInterval() {
            clearInterval(waveInterval);
        }
    }

    function updateGridForWave(currentWaveStateParam) {

        for(let currentRowPos = 0; currentRowPos < grid.length; currentRowPos++) {

            for(let currentColPos = 0; currentColPos < grid.length; currentColPos++) {

                if(grid[currentRowPos][currentColPos] == currentWaveStateParam) {
                    
                    for(let waveDir of waveDirs.getArrStandardDir()) {
                            if(waveDir != null) {
                                let deltaCurRowPos = currentRowPos + waveDir.getYValue();
                                let deltaCurColPos = currentColPos + waveDir.getXValue();

                                if(deltaCurRowPos >= 0 && deltaCurColPos >= 0 &&
                                   deltaCurRowPos <= grid.length - 1 && deltaCurColPos <= grid.length - 1 &&
                                   grid[deltaCurRowPos][deltaCurColPos] == 0) {

                                    grid[deltaCurRowPos][deltaCurColPos] = currentWaveStateParam + 1;
                                    successfulWave = true;
                            }
                        }
                    }
                }
            }
        }
        createOutput();
        //console.log(testPrint());
    }

    function isPathOpen(curRow,curCol) {
        
        for(let pathDir of pathDirs.getArrStandardDir()) {
            if(pathDir != null) {

                let deltaCurRow = curRow + pathDir.getYValue();
                let deltaCurCol = curCol + pathDir.getXValue();

                if(deltaCurRow >= 0 && deltaCurCol >= 0 &&
                   deltaCurRow <= grid.length - 1 && deltaCurCol <= grid.length - 1 &&
                   grid[deltaCurRow][deltaCurCol] > 1 && grid[deltaCurRow][deltaCurCol] < pathNum) {
                    return true;
                }
            }
        }

        return false;
    }

    function pathFind() { 

        var savedRow = 0;
        var savedCol = 0;

        //find start position
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid.length; j++) {
                if(grid[i][j] == grid.length * grid.length) {
                    savedRow = i;
                    savedCol = j;
                }
            }
        }

        createPath(savedRow,savedCol);
    }

    function createPath(savedRowPos,savedColPos) {
        var rowPos = savedRowPos;
        var colPos = savedColPos;
        var currentLowest = gridArea;
        var isLowestGoal = false;

        const intervalTime = 800; //.8 of a second

        var pathInterval = setInterval(function() {

            if(currentLowest > 2) {
            currentLowest = gridArea;
            var nextRow = 0;
            var nextCol = 0;

            for(let dir of totalPathDirs) {
                if(dir != null) {
                    let deltaRowPos = rowPos + dir.getYValue();
                    let deltaColPos = colPos + dir.getXValue();

                    let deltaRowDir = dir.getYValue();
                    let deltaColDir = dir.getXValue();

                    switch(deltaRowDir) {
                        case 2:
                            deltaRowDir--;
                            break;
                        case -2:
                            deltaRowDir++;
                            break;
                    }
                    switch(deltaColDir) {
                        case 2:
                            deltaColDir--;
                            break;
                        case -2:
                            deltaColDir++;
                            break;
                    }
                    if(deltaRowPos >= 0 && deltaColPos >= 0 &&
                       deltaRowPos <= grid.length - 1 && deltaColPos <= grid.length - 1 &&
                       grid[deltaRowPos][deltaColPos] < currentLowest &&
                       grid[rowPos + deltaRowDir][colPos + deltaColDir] != 1 &&
                       grid[deltaRowPos][deltaColPos] != 1) {

                        if(grid[deltaRowPos][deltaColPos] == 2 && !isLowestGoal) {
                            currentLowest = grid[rowPos + deltaRowDir][colPos + deltaColDir];
                            isLowestGoal = true;
                        } else {
                            currentLowest = grid[deltaRowPos][deltaColPos];
                        }

                        nextRow = rowPos + deltaRowDir;
                        nextCol = colPos + deltaColDir;
                }
        }
    }

            rowPos = nextRow;
            colPos = nextCol;
            pathHeadRow = rowPos;
            pathHeadCol = colPos;
            grid[rowPos][colPos] = pathNum;
            isAtGoal = currentLowest == 2;

            createOutput();
            //console.log(testPrint());

            if(!isPathOpen(rowPos,colPos) && currentLowest != 2) {
                stopPathInterval();
                alert("Program has stopped.\nPath could not be completed.");
            }

            } else {
                stopPathInterval();
                console.log("Successful Path.");
            }
            
        }, intervalTime);

        function stopPathInterval() {
            clearInterval(pathInterval);
        }
    }
}