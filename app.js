// Display output texts
function displayText(tag, text) 
{
    let userOutput = document.querySelector(tag);
    userOutput.innerHTML = text;       
}

// Transition to the second part where the input had already been entered
function secondScreen()
{
    // Take out messages displayed before the output
    displayText("h3", "");
    displayText("h4", "");
    
    // Remove cat img
    document.getElementById("lupe-cat").style.display = "none";
    
    // Make copy button appear and be clickable
    let copyButton = document.getElementById("copyButton");
    copyButton.style.visibility = "visible";
    copyButton.style.pointerEvents = "auto";
    
    // Make outputted text invisible after being copied
    document.getElementById("messageToCopy").style.visibility = "visible";
}

// Encrypt the user input text 
function encryptText() 
{
    let inputText = document.querySelector("textarea").value;

    // Check if the user didn´t input anything yet or had only inputted spaces
    if (inputText.trim() != "")
        {
            // Regex to Encrypt
            let encryptedText = removeDiacritics(inputText.toLowerCase())
                                .replace(/e/g, "enter")
                                .replace(/i/g, "imes")
                                .replace(/a/g, "ai")
                                .replace(/o/g, "ober")
                                .replace(/u/g, "ufat");
            
            displayText("h2", encryptedText);
            secondScreen();
            document.querySelector("textarea").value = ""; 
        }
    
    // Error message
    else
    {
        alert("Error #01:\nPlease, enter a message to be encrypted first.")
        return 1;
    }
}

// Decrypt the encrypted text
function decryptText() 
{
    let textToDecrypt = document.querySelector("textarea").value;
    
    // Check if text area is empty
    if (textToDecrypt.trim() != "")
        {
            let decryptedText = removeDiacritics(textToDecrypt.toLowerCase())
                                .replace(/enter/g, "e")
                                .replace(/imes/g, "i")
                                .replace(/ai/g, "a")
                                .replace(/ober/g, "o")
                                .replace(/ufat/g, "u");
            displayText("h2", decryptedText);
            secondScreen();
            document.querySelector("textarea").value = "";
        }

    // Error message
    else
    {
        alert("Error #02:\nPlease, first you need to enter a message to be encrypted.");
        return 2;
    }
}

// Remove diacritcs
function removeDiacritics(userInput)
{
    return userInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Copy the outputted text to clipboard
function copyText() 
{
    let textToClipboard = document.getElementById("messageToCopy").innerText;
    
    navigator.clipboard.writeText(textToClipboard);
    document.getElementById("messageToCopy").innerText = "";
    document.getElementById("messageToCopy").style.visibility = "hidden";
}