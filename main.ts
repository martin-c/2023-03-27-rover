input.onButtonPressed(Button.AB, function () {
    input.calibrateCompass()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ping") {
        basic.showIcon(IconNames.Confused)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    } else if (receivedString == "fwd") {
        images.arrowImage(ArrowNames.North).showImage(0)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
    }
})
radio.onReceivedValue(function (name, value) {
    hdg_delta = value - input.compassHeading()
    if (hdg_delta > 180) {
        hdg_delta += -360
    } else if (hdg_delta < -180) {
        hdg_delta += 360
    }
    if (hdg_delta > 10) {
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Sine,
        4000,
        0,
        255,
        0,
        150,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.UntilDone)
    } else if (hdg_delta < -10) {
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Sine,
        0,
        4000,
        255,
        0,
        150,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.UntilDone)
    }
})
let hdg_delta = 0
radio.setGroup(1)
music.setVolume(100)
hdg_delta = 0
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    basic.showIcon(IconNames.Happy)
})
