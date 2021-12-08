namespace SpriteKind {
    export const Frisk = SpriteKind.create()
    export const Syk = SpriteKind.create()
    export const Lege = SpriteKind.create()
    export const Doktor = SpriteKind.create()
    export const Vaksinert = SpriteKind.create()
    export const Syk_Vaksinert = SpriteKind.create()
    export const Frisk_Vaksinert = SpriteKind.create()
    export const Død = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    let Frisk_Vaksinerte: number[] = []
    game.splash("Friske: " + (Friskmeldte.length + Frisk_Vaksinerte.length) + "   Syke: " + (Sykemeldte.length + Syk_Vaksinerte.length), "Vaksinerte: " + Vaksinerte.length + "   Døde: " + Dødsmeldte.length)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Helsepersonell.length < 10) {
        Doctor = sprites.create(img`
            1 1 1 1 
            1 1 1 1 
            1 1 1 1 
            1 1 1 1 
            `, SpriteKind.Lege)
        Doctor.setPosition(randint(0, 160), randint(0, 120))
        Helsepersonell.push(Doctor)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Innbygger = sprites.create(img`
        2 2 2 2 
        2 2 2 2 
        2 2 2 2 
        2 2 2 2 
        `, SpriteKind.Syk)
    Innbygger.setPosition(randint(0, 160), randint(0, 120))
    Sykemeldte.push(Innbygger)
})
sprites.onOverlap(SpriteKind.Frisk, SpriteKind.Syk, function (sprite, otherSprite) {
    sprite.destroy()
    Innbygger = sprites.create(img`
        2 2 2 2 
        2 2 2 2 
        2 2 2 2 
        2 2 2 2 
        `, SpriteKind.Syk)
    Innbygger.setPosition(otherSprite.x, otherSprite.y)
    Friskmeldte.removeAt(Friskmeldte.indexOf(sprite))
    Sykemeldte.push(Innbygger)
})
sprites.onOverlap(SpriteKind.Frisk, SpriteKind.Lege, function (sprite, otherSprite) {
    if (VaksineAktiv) {
        sprite.destroy()
        Innbygger = sprites.create(img`
            9 9 9 9 
            9 9 9 9 
            9 9 9 9 
            9 9 9 9 
            `, SpriteKind.Vaksinert)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Friskmeldte.removeAt(Friskmeldte.indexOf(sprite))
        Vaksinerte.push(Innbygger)
    }
    pause(Oppdatering)
})
sprites.onOverlap(SpriteKind.Vaksinert, SpriteKind.Syk_Vaksinert, function (sprite, otherSprite) {
    TilfeldigTallSyk = randint(0, 100)
    Inkubasjonstid = randint(1000, 5000)
    if (SannsynlighetSykFraVaksinert > TilfeldigTallSyk) {
        pause(Inkubasjonstid)
        sprite.destroy()
        Innbygger = sprites.create(img`
            9 9 9 9 
            9 2 2 9 
            9 2 2 9 
            9 9 9 9 
            `, SpriteKind.Syk_Vaksinert)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Vaksinerte.removeAt(Vaksinerte.indexOf(sprite))
        Syk_Vaksinerte.push(Innbygger)
    }
    pause(Oppdatering)
})
sprites.onOverlap(SpriteKind.Vaksinert, SpriteKind.Syk, function (sprite, otherSprite) {
    TilfeldigTallSyk = randint(0, 100)
    if (SannsynlighetSykVaksinert > TilfeldigTallSyk) {
        pause(Inkubasjonstid)
        sprite.destroy()
        Innbygger = sprites.create(img`
            9 9 9 9 
            9 2 2 9 
            9 2 2 9 
            9 9 9 9 
            `, SpriteKind.Syk_Vaksinert)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Vaksinerte.removeAt(Vaksinerte.indexOf(sprite))
        Syk_Vaksinerte.push(Innbygger)
    }
    pause(Oppdatering)
})
sprites.onOverlap(SpriteKind.Syk, SpriteKind.Lege, function (sprite, otherSprite) {
    TilfeldigTallFrisk = randint(0, 100)
    if (SannsynlighetFrisk > TilfeldigTallFrisk) {
        sprite.destroy()
        Innbygger = sprites.create(img`
            7 7 7 7 
            7 7 7 7 
            7 7 7 7 
            7 7 7 7 
            `, SpriteKind.Frisk)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Sykemeldte.removeAt(Sykemeldte.indexOf(sprite))
        Friskmeldte.push(Innbygger)
    } else {
        sprite.destroy()
        Innbygger = sprites.create(img`
            1 2 2 1 
            2 2 2 2 
            2 2 2 2 
            1 2 2 1 
            `, SpriteKind.Død)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Sykemeldte.removeAt(Sykemeldte.indexOf(sprite))
        Dødsmeldte.push(Innbygger)
    }
    pause(Oppdatering)
})
sprites.onOverlap(SpriteKind.Frisk, SpriteKind.Syk_Vaksinert, function (sprite, otherSprite) {
    TilfeldigTallSyk = randint(0, 100)
    Inkubasjonstid = randint(1000, 5000)
    if (SannsynlighetSykFraVaksinertHvisFrisk > TilfeldigTallSyk) {
        pause(Inkubasjonstid)
        sprite.destroy()
        Innbygger = sprites.create(img`
            2 2 2 2 
            2 2 2 2 
            2 2 2 2 
            2 2 2 2 
            `, SpriteKind.Syk)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Friskmeldte.removeAt(Friskmeldte.indexOf(sprite))
        Sykemeldte.push(Innbygger)
    }
    pause(Oppdatering)
})
sprites.onOverlap(SpriteKind.Syk_Vaksinert, SpriteKind.Lege, function (sprite, otherSprite) {
    TilfeldigTallFrisk = randint(0, 100)
    if (SannsynlighetFriskVaksinert > TilfeldigTallFrisk) {
        sprite.destroy()
        Innbygger = sprites.create(img`
            9 9 9 9 
            9 9 9 9 
            9 9 9 9 
            9 9 9 9 
            `, SpriteKind.Vaksinert)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Syk_Vaksinerte.removeAt(Syk_Vaksinerte.indexOf(sprite))
        Vaksinerte.push(Innbygger)
    } else {
        sprite.destroy()
        Innbygger = sprites.create(img`
            1 2 2 1 
            2 2 2 2 
            2 2 2 2 
            1 2 2 1 
            `, SpriteKind.Død)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Syk_Vaksinerte.removeAt(Syk_Vaksinerte.indexOf(sprite))
        Dødsmeldte.push(Innbygger)
    }
    pause(Oppdatering)
})
let LegeTid = 0
let TidSidenUtbrudd = 0
let TilfeldigTallFrisk = 0
let Inkubasjonstid = 0
let TilfeldigTallSyk = 0
let VaksineAktiv = false
let Doctor: Sprite = null
let Innbygger: Sprite = null
let Dødsmeldte: Sprite[] = []
let Syk_Vaksinerte: Sprite[] = []
let Vaksinerte: Sprite[] = []
let Helsepersonell: Sprite[] = []
let Sykemeldte: Sprite[] = []
let Friskmeldte: Sprite[] = []
let SannsynlighetSykFraVaksinertHvisFrisk = 0
let SannsynlighetSykFraVaksinert = 0
let SannsynlighetSykVaksinert = 0
let SannsynlighetFriskVaksinert = 0
let SannsynlighetFrisk = 0
let Oppdatering = 0
let DagLengde = 3000
let AntallDager = 0
Oppdatering = 100
let Vaksineutviklingstid = 10
SannsynlighetFrisk = 93
SannsynlighetFriskVaksinert = 99
let SannsynlighetSyk = 75
SannsynlighetSykVaksinert = 20
SannsynlighetSykFraVaksinert = 10
SannsynlighetSykFraVaksinertHvisFrisk = 35
let LegeInterval = 3
Friskmeldte = sprites.allOfKind(SpriteKind.Frisk)
Sykemeldte = sprites.allOfKind(SpriteKind.Syk)
Helsepersonell = sprites.allOfKind(SpriteKind.Lege)
Vaksinerte = sprites.allOfKind(SpriteKind.Vaksinert)
Syk_Vaksinerte = sprites.allOfKind(SpriteKind.Syk_Vaksinert)
Dødsmeldte = sprites.allOfKind(SpriteKind.Død)
for (let index = 0; index < 100; index++) {
    Innbygger = sprites.create(img`
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        `, SpriteKind.Frisk)
    Innbygger.setPosition(randint(0, 160), randint(0, 120))
    Friskmeldte.push(Innbygger)
}
Innbygger = sprites.create(img`
    2 2 2 2 
    2 2 2 2 
    2 2 2 2 
    2 2 2 2 
    `, SpriteKind.Syk)
Innbygger.setPosition(randint(0, 160), randint(0, 120))
Sykemeldte.push(Innbygger)
forever(function () {
    if (game.runtime() > TidSidenUtbrudd + DagLengde) {
        TidSidenUtbrudd = game.runtime()
        AntallDager += 1
        info.setScore(AntallDager)
    }
    if (AntallDager > Vaksineutviklingstid) {
        VaksineAktiv = true
    }
    if (game.runtime() > LegeTid + LegeInterval * DagLengde) {
        if (Helsepersonell.length < 10) {
            LegeTid = game.runtime()
            Doctor = sprites.create(img`
                1 1 1 1 
                1 1 1 1 
                1 1 1 1 
                1 1 1 1 
                `, SpriteKind.Lege)
            Doctor.setPosition(randint(0, 160), randint(0, 120))
            Helsepersonell.push(Doctor)
        }
    }
    if (Dødsmeldte.length > 15 || Sykemeldte.length > 100) {
        game.over(false)
    } else if (Vaksinerte.length > 90) {
        game.over(true)
    }
})
game.onUpdateInterval(Oppdatering, function () {
    for (let Innbygger of Friskmeldte) {
        Innbygger.setPosition(Innbygger.x + randint(-2, 2), Innbygger.y + randint(-2, 2))
        Innbygger.setStayInScreen(true)
    }
    for (let Innbygger of Sykemeldte) {
        Innbygger.setPosition(Innbygger.x + randint(-2, 2), Innbygger.y + randint(-2, 2))
        Innbygger.setStayInScreen(true)
    }
    for (let Doctor of Helsepersonell) {
        Doctor.setPosition(Doctor.x + randint(-4, 4), Doctor.y + randint(-4, 4))
        Doctor.setStayInScreen(true)
    }
    for (let Innbygger of Vaksinerte) {
        Innbygger.setPosition(Innbygger.x + randint(-2, 2), Innbygger.y + randint(-2, 2))
        Innbygger.setStayInScreen(true)
    }
    for (let Innbygger of Syk_Vaksinerte) {
        Innbygger.setPosition(Innbygger.x + randint(-2, 2), Innbygger.y + randint(-2, 2))
        Innbygger.setStayInScreen(true)
    }
})
