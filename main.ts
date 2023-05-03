function power (base: number, exponent: number) {
    return Math.exp(exponent * Math.log(base))
}
input.onButtonPressed(Button.AB, function () {
    input.calibrateCompass()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ping") {
        basic.showIcon(IconNames.Confused)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    } else if (receivedString == "fwd") {
        images.arrowImage(ArrowNames.North).showImage(0)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.UntilDone)
    }
})
radio.onReceivedValue(function (name, value) {
    hdg_delta = value - input.compassHeading()
    if (hdg_delta > 180) {
        hdg_delta += -360
    } else if (hdg_delta < -180) {
        hdg_delta += 360
    }
    if (Math.abs(hdg_delta) > 15) {
        music.playTone(523 * power(2, hdg_delta / 180), music.beat(BeatFraction.Eighth))
    }
})
let hdg_delta = 0
radio.setGroup(1)
music.setVolume(200)
hdg_delta = 0
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    basic.showIcon(IconNames.Happy)
})
