def power(base: number, exponent: number):
    return Math.exp(exponent * Math.log(base))

def on_button_pressed_ab():
    input.calibrate_compass()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    if receivedString == "ping" and radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH) > -40:
        radio.send_string("png")
        basic.show_icon(IconNames.CONFUSED)
        music.play_sound_effect(music.builtin_sound_effect(soundExpression.sad),
            SoundExpressionPlayMode.UNTIL_DONE)
    elif receivedString == "fwd":
        music.play_sound_effect(music.create_sound_effect(WaveShape.SINE,
                776,
                3261,
                255,
                255,
                400,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.CURVE),
            SoundExpressionPlayMode.UNTIL_DONE)
        images.arrow_image(ArrowNames.NORTH).show_image(0)
radio.on_received_string(on_received_string)

def on_received_value(name, value):
    global hdg_delta
    hdg_delta = value - input.compass_heading() - 15
    if hdg_delta > 180:
        hdg_delta += -360
    elif hdg_delta < -180:
        hdg_delta += 360
    if abs(hdg_delta) > 15:
        music.play_tone(523 * power(3, hdg_delta / 180),
            music.beat(BeatFraction.EIGHTH))
radio.on_received_value(on_received_value)

hdg_delta = 0
radio.set_group(1)
music.set_volume(250)
hdg_delta = 0
basic.show_icon(IconNames.YES)

def on_forever():
    if abs(hdg_delta) > 15:
        if hdg_delta > 0:
            basic.show_leds("""
                    . . # . .
                                                    . . . # .
                                                    . # # # #
                                                    # . . # .
                                                    # . # . .
                """)
        else:
            basic.show_leds("""
                    . . # . .
                                                    . # . . .
                                                    # # # # .
                                                    . # . . #
                                                    . . # . #
                """)
    else:
        basic.show_icon(IconNames.HAPPY)
basic.forever(on_forever)
