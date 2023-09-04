//@author Angel Diaz-Soriano

	function setfocus() {
    document.getElementById("input").focus();
        }

        function clearFields() {
          document.getElementById("input").value = "";
          document.getElementById("output").value = "";

          setfocus();
        }

        function mc2c() {
            var ans = "";
            var mc2c = {'.-': 'A', '-...': 'B', '-.-.': 'C',
            '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I',  
            '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', 
            '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', 
            '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z', '-----': '0', 
            '.----': '1', '..---': '2', '...--': '3',
            '....-': '4', '.....': '5', '-....': '6', 
            '--...': '7', '---..': '8', '----.': '9',
            '--..--':',', '.-.-.-':'.', '..--..':'?',
            '-..-.':'/', '-....-':'-', '-.--.':'(',
            '-.--.-':')', '|':' ', ' ':''};

            var userInput = document.getElementById("input").value.toString().trim();
            var processInput = userInput.split(' ');

            for(var i = 0; i < processInput.length; i++) {
              if(mc2c[processInput[i]] != undefined){
                ans+=mc2c[processInput[i].toString()];
              }
            }

            document.getElementById("output").value = ans;
        }

        function c2mc() {
            var ans = "";
            var c2mc = { 'A':'.-', 'B':'-...', 
              'C':'-.-.' , 'D':'-..', 'E':'.', 
              'F':'..-.', 'G':'--.', 'H':'....', 
              'I':'..', 'J':'.---', 'K':'-.-', 
              'L':'.-..', 'M':'--', 'N':'-.', 
              'O':'---', 'P':'.--.', 'Q':'--.-', 
              'R':'.-.', 'S':'...', 'T':'-', 
              'U':'..-', 'V':'...-', 'W':'.--', 
              'X':'-..-', 'Y':'-.--', 'Z':'--..', 
              '1':'.----', '2':'..---', '3':'...--', 
              '4':'....-', '5':'.....', '6':'-....', 
              '7':'--...', '8':'---..', '9':'----.', 
              '0':'-----', ',':'--..--', '.':'.-.-.-', 
              '?':'..--..', '/':'-..-.', '-':'-....-', 
              '(':'-.--.', ')':'-.--.-', ' ':'|'};

              var userInput = document.getElementById("input").value.toString().trim().toUpperCase();

              for(var i = 0; i < userInput.length; i++) {
                if(c2mc[userInput[i].toString()] != undefined){
                  ans+=c2mc[userInput[i].toString()] + " ";
                }
              }

              document.getElementById("output").value = ans.trim();

        }
