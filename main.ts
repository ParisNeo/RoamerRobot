function Left (vitesse: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, vitesse, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, vitesse, 67)
}
function Recule (vitesse: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, vitesse, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, vitesse, 67)
}
function ping () {
	
}
function Avance (vitesse: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, vitesse, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, vitesse, 67)
}
function Arrete () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
maqueen.IR_callbackUser(function ({ myparam: message }) {
    modif_time = control.millis()
    if (message == 64) {
        EnMarche = 1
        strip.showRainbow(1, 360)
    } else if (message == 66) {
        EnMarche = 0
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (message == 70) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        motion = 1
    } else if (message == 68) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        motion = 2
    } else if (message == 67) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        motion = 3
    } else if (message == 21) {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
        motion = 4
    } else if (message == 22) {
        vitesse = 20
    } else if (message == 25) {
        vitesse = 50
    } else if (message == 13) {
        vitesse = 75
    } else if (message == 12) {
        vitesse = 100
    } else {
    	
    }
    message = 0
})
function Right (vitesse: number) {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, vitesse, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, vitesse, 67)
}
let DR = 0
let DL = 0
let PR = 0
let PL = 0
let motion = 0
let EnMarche = 0
let modif_time = 0
let vitesse = 0
let strip: neopixel.Strip = null
serial.redirectToUSB()
PCA9685.reset(67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.Red))
vitesse = 20
basic.forever(function () {
    if (EnMarche == 1) {
        let distance = 0
        PL = pins.digitalReadPin(DigitalPin.P2)
        PR = pins.digitalReadPin(DigitalPin.P11)
        DL = pins.digitalReadPin(DigitalPin.P13)
        DR = pins.digitalReadPin(DigitalPin.P12)
        serial.writeValue("PL", PL)
        serial.writeValue("PR", PR)
        serial.writeValue("DL", DL)
        serial.writeValue("DR", DR)
        if (distance > 8) {
            Avance(50)
        } else {
            Arrete()
        }
    } else {
        if (motion == 1) {
            Avance(vitesse)
        } else if (motion == 2) {
            Left(vitesse)
        } else if (motion == 3) {
            Right(vitesse)
        } else if (motion == 4) {
            Recule(vitesse)
        } else {
            Arrete()
        }
        if (control.millis() - modif_time > 500) {
            motion = 0
        }
    }
})
