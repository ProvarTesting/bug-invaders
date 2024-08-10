

invadersApp.Instructions = function (game) {
    this.game = game;
};

invadersApp.Instructions.prototype = {
    create: function () {
        var howToPlay = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 8, 'How to play', 3);
        howToPlay.img.visible = true;

        var instruction1 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 30, 'Just use left/right arrow to move the player', 2);
        instruction1.img.visible = true;

        var instruction2 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 60, 'Use space to shoot', 2);
        instruction2.img.visible = true;

        var instruction3 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 90, 'Keep the number of invaders below 50', 2);
        instruction3.img.visible = true;

        var instruction4 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 120, 'There are always at least 4 invaders', 2);
        instruction4.img.visible = true;

        var instruction5 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 150, 'The player earns 1 point for each evolution time', 2);
        instruction5.img.visible = true;

        var playerNamePrompt = invadersApp.utils.addText(this, (this.game.width / 2) - 150, this.game.height / 6 + 250, 'Name:', 3);
        playerNamePrompt.img.visible = true;

        var playerNameText = invadersApp.utils.createInputText(this, (this.game.width / 2) + 150, this.game.height / 6 + 250, '- - - -', 2);
        playerNameText.visible = true;

        var emailPrompt = invadersApp.utils.addText(this, (this.game.width / 2) - 165, this.game.height / 6 + 300, 'Email:', 3);
        emailPrompt.img.visible = true;

        var emailText = invadersApp.utils.createInputText(this.game, (this.game.width / 2) + 150, this.game.height / 6 + 300, '- - - -');
        emailText.visible = true;

        var companyNamePrompt = invadersApp.utils.addText(this, (this.game.width / 2) - 250, this.game.height / 6 + 350, 'Company name:', 3);
        companyNamePrompt.img.visible = true;

        var companyNameText = invadersApp.utils.createInputText(this, (this.game.width / 2) + 150, this.game.height / 6 + 350, '- - - -', 2);
        companyNameText.visible = true;

        var playerName = '';
        var email = '';
        var companyName = '';
        var currentField = 'playerName';

        var fields = {
            'playerName': playerNamePrompt.img,
            'email': emailPrompt.img,
            'companyName': companyNamePrompt.img
        };

        // Function to update the current field and manage blinking
        function updateCurrentField(game, newField) {
            invadersApp.utils.stopTextBlink(game, fields[currentField]);
            currentField = newField;
            invadersApp.utils.makeTextBlink(game, fields[currentField], 500);
        }

        // Initial call to make the first field blink
        invadersApp.utils.makeTextBlink(this.game, fields[currentField], 500);


        this.input.keyboard.addCallbacks(this, null, null, function (char) {
            if (/^[a-zA-Z0-9@. ]$/.test(char)) {
                if (currentField === 'playerName') {
                    playerName += char;
                    playerNameText.text = playerName;
                } else if ((/^[a-zA-Z0-9@.]$/.test(char)) && currentField === 'email') {
                    email += char;
                    emailText.text = email;
                } else if (currentField === 'companyName') {
                    companyName += char;
                    companyNameText.text = companyName;
                }
            }
        });

        var backspaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        backspaceKey.onDown.add(function () {
            if (currentField === 'playerName') {
                playerName = playerName.slice(0, -1);
                playerNameText.text = playerName;
            } else if (currentField === 'email') {
                email = email.slice(0, -1);
                emailText.text = email;
            } else if (currentField === 'companyName') {
                companyName = companyName.slice(0, -1);
                companyNameText.text = companyName;
            }
        });

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(function () {
            if (!playerName) {
                invadersApp.utils.showMinecraftAlert(this.game, 'Player Name is required');
            } else if (!email) {
                invadersApp.utils.showMinecraftAlert(this.game, 'Email is required');
            } else if (!isValidEmail(email)) {
                invadersApp.utils.showMinecraftAlert(this.game, 'Please enter a valid email');
            } else if (!companyName) {
                invadersApp.utils.showMinecraftAlert(this.game, 'Company Name is required');
            } else {
                localStorage.setItem('playerName', playerName.toUpperCase());
                this.submitContactDetails(playerName, email, companyName);
                this.startGame();
            }
        }, this);

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        var tabKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabKey.onDown.add(function () {
            if (currentField === 'playerName') {
                updateCurrentField(this.game, 'email');
            } else if (currentField === 'email') {
                updateCurrentField(this.game, 'companyName');
            } else if (currentField === 'companyName') {
                updateCurrentField(this.game, 'playerName');
            }
        }, this);

    },

    startGame: function (pointer) {
        this.state.start('Game');
    },

    submitContactDetails: function (playerName, email, companyName) {
        var contactDetails = {
            "name": playerName,
            "email": email,
            "company": companyName
        }
        sendContactDetailsToGoogleAppsScript(contactDetails);
    }

};