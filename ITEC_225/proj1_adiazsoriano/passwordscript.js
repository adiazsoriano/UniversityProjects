//@author Angel Diaz-Soriano

function generatePassword() {

    var password = "";

    const charactersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLower = "abcdefghijklmnpqrstuvwxyz";
    const charactersNumber = "0123456789";

    var combo = new Array();

    var upperCase = document.getElementById("uppercase").checked;
    var lowerCase = document.getElementById("lowercase").checked;
    var numbers = document.getElementById("number").checked;

    if(upperCase) {
        combo.push(charactersUpper);
    }
    if(lowerCase) {
        combo.push(charactersLower);
    }
    if(numbers) {
        combo.push(charactersNumber);
    }

    var characterLim = document.getElementById("length").value;

    if(characterLim > 30) {
        characterLim = 30;
        document.getElementById("length").value = 30;
    }
    if(characterLim < 10) {
        characterLim = 10;
        document.getElementById("length").value = 10;
    }

    for(var i = 0; i < characterLim; i++) {
        if(upperCase || lowerCase || numbers) {
            let comboIndex = Math.floor(Math.random() * combo.length);

            password += combo[comboIndex].charAt(Math.floor(Math.random() * combo[comboIndex].length));
        }
    }

    document.getElementById("output").innerHTML = password;
}