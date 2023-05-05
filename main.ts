function power (base: number, exponent: number) {
    return Math.exp(exponent * Math.log(base))
}
input.onButtonPressed(Button.AB, function () {
    input.calibrateCompass()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ping" && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -85) {
        radio.sendString("png")
        basic.showIcon(IconNames.Confused)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    } else if (receivedString == "fwd") {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 776, 3261, 255, 255, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
        images.arrowImage(ArrowNames.North).showImage(0)
    }
})
radio.onReceivedValue(function (name, value) {
    hdg_delta = value - input.compassHeading() - 15
    if (hdg_delta > 180) {
        hdg_delta += -360
    } else if (hdg_delta < -180) {
        hdg_delta += 360
    }
    if (Math.abs(hdg_delta) > 15) {
        music.playTone(523 * power(3, hdg_delta / 180), music.beat(BeatFraction.Eighth))
    }
})
let hdg_delta = 0
radio.setGroup(1)
music.setVolume(250)
hdg_delta = 0
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (Math.abs(hdg_delta) > 15) {
        if (hdg_delta > 0) {
            basic.showLeds(`
                . . # . .
                . . . # .
                . # # # #
                # . . # .
                # . # . .
                `)
        } else {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # .
                . # . . #
                . . # . #
                `)
        }
    } else {
        basic.showIcon(IconNames.Happy)
    }
})
