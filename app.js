import "./css/tailwind.css";

//The first argument is the character you want to test, and the second argument is the font you want to test it in.
//If the second argument is left out, it defaults to the font of the <body> element.
//The third argument isn't used under normal circumstances, it's just used internally to avoid infinite recursion.
function characterIsSupported(character, font = getComputedStyle(document.body).fontFamily, recursion = false){
    //Create the canvases
    let testCanvas = document.createElement("canvas");
    let referenceCanvas = document.createElement("canvas");
    testCanvas.width = referenceCanvas.width = testCanvas.height = referenceCanvas.height = 150;

    //Render the characters
    let testContext = testCanvas.getContext("2d");
    let referenceContext = referenceCanvas.getContext("2d");
    testContext.font = referenceContext.font = "100px " + font;
    testContext.fillStyle = referenceContext.fillStyle = "black";
    testContext.fillText(character, 0, 100);
    referenceContext.fillText('\uffff', 0, 100);

    //Firefox renders unsupported characters by placing their character code inside the rectangle making each unsupported character look different.
    //As a workaround, in Firefox, we hide the inside of the character by placing a black rectangle on top of it.
    //The rectangle we use to hide the inside has an offset of 10px so it can still see part of the character, reducing the risk of false positives.
    //We check for Firefox and browers that behave similarly by checking if U+FFFE is supported, since U+FFFE is, just like U+FFFF, guaranteed not to be supported.
    if(!recursion && characterIsSupported('\ufffe', font, true)){
        testContext.fillStyle = referenceContext.fillStyle = "black";
        testContext.fillRect(10, 10, 80, 80);
        referenceContext.fillRect(10, 10, 80, 80);
    }

    //Check if the canvases are identical
    return testCanvas.toDataURL() != referenceCanvas.toDataURL();
}

window.getUnicodeVersion = getUnicodeVersion => {
    let res = ""
    const supportsUnicode15 = characterIsSupported('🩷'); // Pink Heart Emoji
    const supportsUnicode14 = characterIsSupported('🫠') // Melting face Emoji
    const supportsUnicode13 = characterIsSupported('🧋') // Bubble tea Emoji
    const supportsUnicode12 = characterIsSupported('🤏') // Pinching hand Emoji
    const supportsUnicode11 = characterIsSupported('🦘') // Kangaroo Emoji
    const supportsUnicode10 = characterIsSupported('🤪') // Zany face Emoji
    const supportsUnicode9 = characterIsSupported('𐒸') // Character from Osage script
    const supportsUnicode8 = characterIsSupported('🤗') // Hugging face Emoji
    const supportsUnicode7 = characterIsSupported('🌶️') // Hot pepper emoji

    const versionsToCheck = [{
        version: '7',
        value: supportsUnicode7
    },{
        version: '8',
        value: supportsUnicode8
    },{
        version: '9',
        value: supportsUnicode9
    },{
        version: '10',
        value: supportsUnicode10
    },{
        version: '11',
        value: supportsUnicode11
    },{
        version: '12',
        value: supportsUnicode12
    },{
        version: '13',
        value: supportsUnicode13
    },{
        version: '14',
        value: supportsUnicode14
    },{
        version: '15',
        value: supportsUnicode15
    },]
    versionsToCheck.forEach((version,i) => {
        if (version.value === true) {
            res = version.version
        }
    })
    if (res === "") {
        res = "Ancient"
    }
    return res
}

