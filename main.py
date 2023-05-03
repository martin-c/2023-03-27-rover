def on_button_pressed_ab():
    input.calibrate_compass()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    if receivedString == "ping":
        basic.show_icon(IconNames.CONFUSED)
        music.play_sound_effect(music.builtin_sound_effect(soundExpression.sad),
            SoundExpressionPlayMode.UNTIL_DONE)
    elif receivedString == "fwd":
        images.arrow_image(ArrowNames.NORTH).show_image(0)
        music.play_sound_effect(music.builtin_sound_effect(soundExpression.giggle),
            SoundExpressionPlayMode.UNTIL_DONE)
radio.on_received_string(on_received_string)

def on_received_value(name, value):
    global hdg_delta
    hdg_delta = value - input.compass_heading()
    if hdg_delta > 180:
        hdg_delta += -360
    elif hdg_delta < -180:
        hdg_delta += 360
    serial.write_value("hdg_delta", hdg_delta)
    serial.write_value("pow", 2 ** (hdg_delta / 180))
    if abs(hdg_delta) > 15:
        music.play_tone(523 * 2 ** (hdg_delta / 180),
            music.beat(BeatFraction.EIGHTH))
radio.on_received_value(on_received_value)

hdg_delta = 0
radio.set_group(1)
music.set_volume(200)
hdg_delta = 0
basic.show_icon(IconNames.YES)

def on_forever():
    basic.show_icon(IconNames.HAPPY)
basic.forever(on_forever)
