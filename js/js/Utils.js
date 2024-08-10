var invadersApp = invadersApp || {};

invadersApp.utils = {};

invadersApp.utils.TEXT_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!:.©_-/()";

invadersApp.utils.addText = function (game, x, y, text, size) {
    var scale = size || 1;
    var font = game.add.retroFont('retroFont', 8, 8, invadersApp.utils.TEXT_SET, 0);
    font.text = text;
    var img = game.add.image(x, y, font);
    img.scale.setTo(scale, scale);
    img.anchor.setTo(0.5, 0.5);
    return { 'font': font, 'img': img };
};

invadersApp.utils.makeTextBlink = function (game, img, blinkInterval) {
    if (blinkInterval) {
        img.blinkTimer = game.time.events.loop(blinkInterval, function () {
            img.visible = !img.visible;
        });
    }
};

invadersApp.utils.stopTextBlink = function (game, img) {
    if (img.blinkTimer) {
        game.time.events.remove(img.blinkTimer);
        img.blinkTimer = null;
        img.visible = true; // Ensure the text is visible when blinking stops
    }
};

invadersApp.utils.pad = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

// Function to show alert using Minecraft font
invadersApp.utils.showMinecraftAlert = function (game, message) {
    var style = { font: "32px Minecraft", fill: "#ff0044", align: "center" };
    var alertText = game.add.text(game.world.centerX, game.world.centerY, message, style);
    alertText.anchor.set(0.5);

    // Optional: Add a background for the alert
    var alertBackground = game.add.graphics();
    alertBackground.beginFill(0x000000, 0.8);
    alertBackground.drawRect(alertText.x - alertText.width / 2 - 10, alertText.y - alertText.height / 2 - 10, alertText.width + 20, alertText.height + 20);
    alertBackground.endFill();
    alertBackground.anchor.set(0.5);

    // Bring text to the front
    game.world.bringToTop(alertText);

    // Hide alert after a few seconds
    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        alertText.destroy();
        alertBackground.destroy();
    }, this);
}

// Function to create email text using Minecraft font
invadersApp.utils.createInputText = function (game, x, y, message) {
    var style = { font: "32px Minecraft", fill: "#ffffff", align: "center" };
    var inputText = game.add.text(x, y, message, style);
    inputText.anchor.set(0.5);
    return inputText;
}
