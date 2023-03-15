const app = {
    init: function(){
        document
            .getElementById('generateBtn')
            .addEventListener('click', app.handleGenerate);
        document
            .getElementById('clipBtn')
            .addEventListener('click', app.handleClipboardBtn);
        app.handleRangeInput();
        app.titleAnimation();
    },

    /**
     * method to handle options choose by user 
     * @returns array [$passwordLengt, $passwordChars]
     */
    getParams: function(){
        //get pass length element
        const passLengthEl = document.getElementById('passLength');
        //get lower case checkbox element
        const lowerCaseEl = document.getElementById('lowerCase');
        //get upper case checkbox element
        const upperCaseEl = document.getElementById('upperCase');
        //get number checkbox element
        const numberEl = document.getElementById('number');
        //get special chars checkbox element
        const specialCharsEl = document.getElementById('specialChars');

        //define lower, upper, number and special char to prepare there adding to pass options
        const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
        const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberChars = "1234567890";
        const specialChars = "~@#_^*%/.+:;=";
        let passChars = "";
        
        //check the checked checkbox and and correspanding value to pass options
        if(lowerCaseEl.checked) {
            passChars += lowerCaseChars;
        };
        if(upperCaseEl.checked) {
            passChars += upperCaseChars;
        };
        if(numberEl.checked) {
            passChars += numberChars;
        };
        if(specialCharsEl.checked) {
            passChars += specialChars;
        };
        const passwordOptions = [
            passLengthEl.value,
            passChars
        ];
        return passwordOptions;

    },

    /**
     * method to handle generate button and display created password on screen
     */
    handleGenerate: function(event){
        event.preventDefault();
        //get password options were selectd by users
        const passwordOptions = app.getParams();
        //get error el and init it
        const alertDisplay = document.querySelector('.alertDisplay');
        alertDisplay.textContent = "";
        let password = "";
        if(passwordOptions[1]){
            //split chars list to use it as array
            const chars = passwordOptions[1].split('');
            //loop to add a random chars 
            for (let length = 0; length < passwordOptions[0]; length++) {
                password += chars[Math.floor(Math.random() * chars.length)];
            };
            app.displayPass(password);
        } else {
            alertDisplay.classList.add("error", "show");
            alertDisplay.textContent = 'Please select at least one option';
            setTimeout(function(){
                    alertDisplay.textContent = "";
                    alertDisplay.classList.remove("error", "show");

                }, 3000);
            };
    },

    /**
     * method to display password on screen
     * @param {string} password 
     * @return {void}
     */
    displayPass: function(password) {
        document.getElementById('displayScreen').value = password;
    },

    /**
     * method to handle range input and display length on screen and refresh password if it's already generated
     */
    handleRangeInput: function(){
        const lengthInput = document.getElementById('passLength')
        const lengthDisplay = document.getElementById('displayLength')
        const screen = document.getElementById('displayScreen');
        //display length value
        lengthDisplay.value = lengthInput.value;
        //listening range input to change displayed value and regenerate password with new legth if it's already generated
        lengthInput.addEventListener('change', function(){
                lengthDisplay.value = lengthInput.value;
                if (screen.value) {
                    app.handleGenerate();
                };
        });
    },

    handleClipboardBtn: function() {
        // Get the text field
        const copyText = document.getElementById("displayScreen");
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        // Alert the copied text
        errorDisplay = document.querySelector('.alertDisplay')
        errorDisplay.classList.add("success", "show")
        errorDisplay.textContent = 'Password copied to clip board';
        setTimeout(function(){
            errorDisplay.textContent = ""
            errorDisplay.classList.remove("success", "show");
        }, 2000);
    },

    titleAnimation: function() {
        document.querySelectorAll(".word").forEach((word) => {
            const letters = word.innerText.split("");
            word.innerHTML = null;
            letters.forEach((letter) => {
              word.innerHTML += `<span class="letter">${letter}</span>`;
            });
          });
    }

}

document.addEventListener('DOMContentLoaded', app.init);