window.onload = function(){
    var buttons = {"slash":"/", "sqrt":"sqrt(", "log":"log(", "exp":"exp(", "mult":"*", "e":"E", "pow":"pow(", "sin":"sin(",
                  "minus":"-", "openBracket": "(", "closeBracket":")", "cos": "cos(", "dot":".", "plus":"+", "mod":"%",
                  "pi":"PI", "tan":"tan(", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "0":"0"},
        inputField = document.getElementById("inputField"),
        memory = 0;
    document.body.addEventListener("keydown", function(event){// Focus on input field whenever key is pressed
       inputField.focus(); 
    });
    inputField.addEventListener("keyup", function(event){// Evaluate expression if enter pressed
        if (event.keyCode === 13) {
            inputField.value = mathEval(inputField.value);
        }
    });
    
    for (key in buttons){// Assign simple keys        
            document.getElementById(key).addEventListener("click", function(){
                inputField.value += buttons[this.id];
            });
    }
    document.getElementById("equal").addEventListener("click", function(){// Evaluate expression on "=" pressed
        inputField.value = mathEval(inputField.value);
    });
    document.getElementById("del").addEventListener("click", function(){// Clear input field on "C" pressed
        inputField.value = "";
    });
    document.getElementById("memPlus").addEventListener("click", function(){// Add to memory on "M+" pressed
        memory += mathEval(inputField.value);
    });
    document.getElementById("memMinus").addEventListener("click", function(){// Substract from memory on "M-" pressed
        memory -= mathEval(inputField.value);
    });
    document.getElementById("mem").addEventListener("click", function(){// Show memory on "MRC" pressed
        inputField.value = memory;
    });
    document.getElementById("mem").addEventListener("dblclick", function(){// Erase memory on "MRC" double click
        memory = 0;
    });
}

function enterPressed(event) {
    if (event.keyCode === 13) {//Enter pressed
        inputField.value = mathEval(inputField.value);
    }
}

function mathEval (exp) {
    var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
        valid = true;

    // Detect valid JS identifier names and replace them
    exp = exp.replace(reg, function ($0) {
        // If the name is a direct member of Math, allow
        if (Math.hasOwnProperty($0))
            return "Math."+$0;
        // Otherwise the expression is invalid
        else
            valid = false;
    });

    // Don't eval if our replace function flagged as invalid
    if (!valid)
        alert("Invalid arithmetic expression");
    else
        try { return eval(exp); } catch (e) { alert("Invalid arithmetic expression"); };
}