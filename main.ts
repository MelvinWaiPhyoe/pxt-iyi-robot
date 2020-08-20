
/**
 * iYi Robot အတွက် Makecode extensionဖြစ်ပါသည်။
 */
//% weight=10 color="#FF6600" icon="\u2606" block="iyi robot" advanced=false
//% groups="['Motors', 'Acturators', 'Sensors', 'Displays', 'Sound']"
namespace iYi {
    export enum iYiDC{
        //% block="မော်တာ၁"
        M1,
        //% block="မော်တာ၂"
        M2
    }

    export enum iYiDCDir{
        //% block="ရှေ့သို့"
        Forward,
        //% block="နောက်သို့"
        Backward
    }

    export enum iYiTurn{
	    //% block="ဘယ်သို့"
	    TurnLeft,
	    //% block="ညာသို့"
	    TurnRight
    }

    export enum iYiSpin{
	    //% block="ဘယ်သို့"
	    SpinLeft,
	    //% block="ညာသို့"
	    SpinRight
    }

    export enum iYiStop{
        //% block="ဘယ်ဘက်"
        Left,
        //% block="ညာဘက်"
        Right
    }

    export enum iYiServo{
        //% block="၁"
        servo1,
        //% block="၂"
        servo2
    }

    export enum DHTtype{
        //% block="DHT11"
        DHT11,
        //% block="DHT22"
        DHT22
    }

    export enum dataType {
        //% block="စိုထိုင်းဆ"
        humidity,
        //% block="အပူချိန််"
        temperature,
    }

    export enum iYiLineFollower{
        //% block="1"
        line1 = 0,
        //% block="2"
        line2 = 0,
        //% block="3"
        line3 = 0
    }

    export enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
    }
    
    /**
     * DC Motor အတွက် Control Function ဖြစ်ပါသည်။
     */
    //% group="Motors"
    //% blockId=iYi_DC
    //% block="%iYiDC အား|%iYiDCDir|အမြန်နှုန်း %speed ဖြင့်သွားရန်"
    //% speed.min=0 speed.max=100
    //% weight=50
    export function MotorRun(Motor: iYiDC,Direction: iYiDCDir,speed: number): void{
        let motorspeed = pins.map(speed,0,100,0,1023)
        if (Motor == iYiDC.M1 && Direction == iYiDCDir.Forward){
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.analogWritePin(AnalogPin.P7, motorspeed)
        }
        if (Motor == iYiDC.M1 && Direction == iYiDCDir.Backward){
            pins.digitalWritePin(DigitalPin.P7, 0)
            pins.analogWritePin(AnalogPin.P8, motorspeed)
        }
        if (Motor == iYiDC.M2 && Direction == iYiDCDir.Forward){
            pins.digitalWritePin(DigitalPin.P3, 0)
            pins.analogWritePin(AnalogPin.P11, motorspeed)
        }
        if (Motor == iYiDC.M2 && Direction == iYiDCDir.Backward){
            pins.digitalWritePin(DigitalPin.P11, 0)
            pins.analogWritePin(AnalogPin.P3, motorspeed)
        }
    }

    /**
     * စက်ရုပ်အားဘယ်ညာကွေ့ရန်အတွက်ဖြစ်ပါသည်။
     */
    //% group="Motors"
    //% blockId=iYi_Turn
    //% block="%iYiTurn|အမြန်နှုန်း %speed ဖြင့်ကွေ့ရန်"
    //% speed.min=0 speed.max=100
    //% weight=40
    export function robotTurn(Turn: iYiTurn,speed: number): void{
        let motorspeed = pins.map(speed,0,100,0,1023)
        if (Turn == iYiTurn.TurnLeft){
            pins.digitalWritePin(DigitalPin.P7, 0)
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P3, 0)
            pins.analogWritePin(AnalogPin.P11, motorspeed)
        }
        if (Turn == iYiTurn.TurnRight){
            pins.digitalWritePin(DigitalPin.P11, 0)
            pins.digitalWritePin(DigitalPin.P3, 0)
            pins.digitalWritePin(DigitalPin.P8, 0)     
            pins.analogWritePin(AnalogPin.P7, motorspeed)
        }
    }

    /**
     * စက်ရုပ်အားဘယ်ညာလှည့်ရန်အတွက်ဖြစ်ပါသည်။
     */
    //% group="Motors"
    //% blockId=iYi_Spin
    //% block="%iYiSpin|အမြန်နှုန်း %speed ဖြင့်လှည့်ရန်"
    //% speed.min=0 speed.max=100
    //% weight=30
    export function robotSpin(Spin: iYiSpin, speed: number): void{
        let motorspeed = pins.map(speed,0,100,0,1023)
        if (Spin == iYiSpin.SpinLeft){
            pins.digitalWritePin(DigitalPin.P7, 0)
            pins.analogWritePin(AnalogPin.P8, motorspeed)
            pins.digitalWritePin(DigitalPin.P3, 0)
            pins.analogWritePin(AnalogPin.P11, motorspeed)
        }
        if (Spin == iYiSpin.SpinRight){
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.analogWritePin(AnalogPin.P7, motorspeed)
            pins.digitalWritePin(DigitalPin.P11, 0)
            pins.analogWritePin(AnalogPin.P3, motorspeed)
        }
    }

    /**
     * ရပ်လိုသည့်မော်တာအားရပ်ရန်အတွက်ဖြစ်ပါသည်။
     */
    //% group="Motors"
    //% blockId=iYi_Stop
    //% block="%iYiStop မော်တာအားရပ်ရန်"
    //% weight=20
    export function motorStop(Stop: iYiStop): void{
        if (Stop == iYiStop.Left){
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P7, 0)
        }
        if (Stop == iYiStop.Right){
            pins.digitalWritePin(DigitalPin.P11, 0)
            pins.digitalWritePin(DigitalPin.P3, 0)
        }
    }

    /**
     * စက်ရုပ်အားရပ်ရန်အတွက်ဖြစ်ပါသည်။
     */
    //% group="Motors"
    //% blockId=Robot_Stop
    //% block="စက်ရုပ်အားရပ်ရန်"
    //% weight=10
    export function robotStop(): void{
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P7, 0)
        pins.digitalWritePin(DigitalPin.P11, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
    }

    /**
     * Servoမော်တာအားနှစ်သက်ရာဒီဂရီသို့လှည့်ရန်အတွက်ဖြစ်ပါသည်။
     */
    //% group="Acturators"
    //% blockId=iYi_Servo
    //% block="Servoမော်တာ %iYiServo အား| %Degree ဒီဂရီလှည့်ရန်"
    //% Degree.min=0 Degree.max=180
    //% weight=20
    export function ServoRun(Servo:iYiServo, Degree:number): void{
        if(Servo == iYiServo.servo1){
            pins.servoWritePin(AnalogPin.P8, Degree)
        }
        if(Servo == iYiServo.servo2){
            pins.servoWritePin(AnalogPin.P12, Degree)
        }
    }

    /** 
     * Servoမော်တာအားရပ်ရန်
    */
    //% group="Acturators"
    //% blockId=iYi_Servo_Stop
    //% block="Servoမော်တာ %iYiServo အားရပ်ရန်"
    //% weight=10
    export function ServoStop(Servo: iYiServo): void{
        if(Servo == iYiServo.servo1){
            pins.servoSetPulse(AnalogPin.P8, 0)
        } 
        if(Servo == iYiServo.servo2){
            pins.servoSetPulse(AnalogPin.P12, 0)
        }  
    }

    let _temperature: number = -999.0
    let _humidity: number = -999.0
    let _readSuccessful: boolean = false

    /**
     * DHT11/DHT22 sensorအားစတင်အသုံးပြုနိုင်ရန်ဖြစ်ပါသည်။
     */
    //% blockId=DHTSensorStart
    //% block="DHTအမျိုးအစားရွေးချယ်ရန် %DHTtype"
    //% group="Sensors"
    //% weight=10
    export function queryData(DHT: DHTtype){
        //initialize
        let startTime: number = 0
        let endTime: number = 0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)
        let _humidity = -999.0
        let _temperature = -999.0
        let _readSuccessful = false

        startTime = input.runningTimeMicros()

        //request data
        pins.digitalWritePin(DigitalPin.P0, 0) //begin protocol
        basic.pause(18)
        if (true) pins.setPull(DigitalPin.P0, PinPullMode.PullUp) //pull up data pin if needed
        pins.digitalReadPin(DigitalPin.P0)
        control.waitMicros(20)
        while (pins.digitalReadPin(DigitalPin.P0) == 1);
        while (pins.digitalReadPin(DigitalPin.P0) == 0); //sensor response
        while (pins.digitalReadPin(DigitalPin.P0) == 1); //sensor response

        //read data (5 bytes)
        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(DigitalPin.P0) == 1);
            while (pins.digitalReadPin(DigitalPin.P0) == 0);
            control.waitMicros(28)
            //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(DigitalPin.P0) == 1) dataArray[index] = true
        }

        endTime = input.runningTimeMicros()

        //convert byte number array to integer
        for (let index = 0; index < 5; index++){
            for (let index2 = 0; index2 < 8; index2++){
                if (dataArray[8 * index + index2]){
                    resultArray[index] += 2 ** (7 - index2)
                } 
            }
        }  

        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        if (checksum == checksumTmp) _readSuccessful = true
        
        //read data if checksum ok
        if (_readSuccessful) {
            if (DHT == DHTtype.DHT11) {
                //DHT11
                _humidity = resultArray[0] + resultArray[1] / 100
                _temperature = resultArray[2] + resultArray[3] / 100
            } else {
                //DHT22
                let temp_sign: number = 1
                if (resultArray[2] >= 128) {
                    resultArray[2] -= 128
                    temp_sign = -1
                }
                _humidity = (resultArray[0] * 256 + resultArray[1]) / 10
                _temperature = (resultArray[2] * 256 + resultArray[3]) / 10 * temp_sign
            }
        }

        //serial output
        if (true) {
            let DHTstr: string = ""
            if (DHT == DHTtype.DHT11) DHTstr = "DHT11"
            else DHTstr = "DHT22"
            serial.writeLine(DHTstr + " query completed in " + (endTime - startTime) + " microseconds")
            if (_readSuccessful) {
                serial.writeLine("Checksum ok")
                serial.writeLine("Humidity: " + _humidity + " %")
                serial.writeLine("Temperature: " + _temperature + " *C")
            } else {
                serial.writeLine("Checksum error")
            }
            serial.writeLine("----------------------------------------")
        }

        //wait 2 sec after query if needed
        if (true) basic.pause(2000)
    }  

    /**
     * DHT11/22 sensorမှ data ရယူရန်အတွက်ဖြစ်ပါသည်။
     */
    //% blockId=DHTSensorRead
    //% block="DHTမှ %dataType ဖတ်ရန်"
    //% group="Sensors"
    //% weight=20
    export function readData(data: dataType): number{
            return data == dataType.humidity ? _humidity : _temperature

    }  

    /**
     * Tracker Sensor 1 မှ data ရယူရန်အတွက်ဖြစ်ပါသည်။
     */
    //% blockId=TrackerSensorRead1
    //% block="tracker sensor 1 "
    //% group="Sensors"
    //% weight=50
    export function trackline1(): number {
        return pins.digitalReadPin(DigitalPin.P3);
    }

    /**
     * Tracker Sensor 2 မှ data ရယူရန်အတွက်ဖြစ်ပါသည်။
     */
    //% blockId=TrackerSensorRead2
    //% block="tracker sensor 2 "
    //% group="Sensors"
    //% weight=40
    export function trackline2(): number {
        return pins.digitalReadPin(DigitalPin.P4);
    }

    /**
     * Tracker Sensor 3 မှ data ရယူရန်အတွက်ဖြစ်ပါသည်။
     */
    //% blockId=TrackerSensorRead3
    //% block="tracker sensor 3 "
    //% group="Sensors"
    //% weight=30
    export function trackline3(): number {
        return pins.digitalReadPin(DigitalPin.P5);
    }

    /**
     * Ultrasonic Sensor 1အသုံးပြုရန်အတွက်ဖြစ်ပါသည်။
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% group="Sensors"
    //% blockId=sonar_ping1 
    //% block="Sonar1| unit %PingUnit"
    //% weight=80
    export function ping1(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P6, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P6, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P6, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P6, 0);

        // read pulse
        const d = pins.pulseIn(DigitalPin.P7, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }

    /**
     * Ultrasonic Sensor 2အသုံးပြုရန်အတွက်ဖြစ်ပါသည်။
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% group="Sensors"
    //% blockId=sonar_ping2
    //% block="Sonar2| unit %PingUnit"
    //% weight=70
    export function ping2(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P8, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P8, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P8, 0);

        // read pulse
        const d = pins.pulseIn(DigitalPin.P9, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }

    /**
     * Ultrasonic Sensor 3အသုံးပြုရန်အတွက်ဖြစ်ပါသည်။
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% group="Sensors"
    //% blockId=sonar_ping3 
    //% block="Sonar3| unit %PingUnit"
    //% weight=60
    export function ping3(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P10, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P10, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P10, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P10, 0);

        // read pulse
        const d = pins.pulseIn(DigitalPin.P11, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }
}
