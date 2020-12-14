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
    // Si on a appuyé sur OK
    if (message == 64) {
        EnMarche = 1
    } else if (message == 66) {
        EnMarche = 0
    } else {
    	
    }
})
let PR = 0
let PL = 0
let EnMarche = 0
serial.redirectToUSB()
PCA9685.reset(67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
EnMarche = 0
let strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.Red))
basic.forever(function () {
    if (EnMarche == 1) {
        let distance = 0
        PL = pins.digitalReadPin(DigitalPin.P2)
        PR = pins.digitalReadPin(DigitalPin.P11)
        serial.writeValue("x", PL)
        serial.writeValue("x", PR)
        if (distance > 8) {
            Avance(50)
        } else {
            Arrete()
        }
    } else {
        Arrete()
    }
})
