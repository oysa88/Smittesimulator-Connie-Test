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
    game.splash("Friske: " + Friskmeldte.length + "   Syke: " + AntallSmittede, "Vaksinerte: " + Vaksinerte.length + "   Døde: " + Dødsmeldte.length)
    game.splash("R-tallet(enkel): " + Beregne_Rtallet_Enkel, "R-tallet(vanskelig): " + Beregne_Rtallet_Vanskelig)
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
    TilfeldigTallSyk = randint(0, 100)
    Inkubasjonstid = randint(2000, 6000)
    if (SannsynlighetSyk > TilfeldigTallSyk) {
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
function Mutasjoner () {
    if (Mutasjon == 1) {
        SannsynlighetFrisk = 93
        SannsynlighetFriskVaksinert = 99
        SannsynlighetSyk = 75
        SannsynlighetSykVaksinert = 20
        SannsynlighetSykFraVaksinert = 10
        SannsynlighetSykFraVaksinertHvisFrisk = 35
    } else if (Mutasjon == 2) {
        SannsynlighetFrisk = 82
        SannsynlighetFriskVaksinert = 95
        SannsynlighetSyk = 75
        SannsynlighetSykVaksinert = 20
        SannsynlighetSykFraVaksinert = 10
        SannsynlighetSykFraVaksinertHvisFrisk = 35
    } else if (Mutasjon == 3) {
        SannsynlighetFrisk = 87
        SannsynlighetFriskVaksinert = 99
        SannsynlighetSyk = 75
        SannsynlighetSykVaksinert = 20
        SannsynlighetSykFraVaksinert = 10
        SannsynlighetSykFraVaksinertHvisFrisk = 35
    } else if (Mutasjon == 4) {
        SannsynlighetFrisk = 93
        SannsynlighetFriskVaksinert = 98
        SannsynlighetSyk = 75
        SannsynlighetSykVaksinert = 20
        SannsynlighetSykFraVaksinert = 10
        SannsynlighetSykFraVaksinertHvisFrisk = 35
    } else if (Mutasjon == 5) {
        SannsynlighetFrisk = 93
        SannsynlighetFriskVaksinert = 100
        SannsynlighetSyk = 75
        SannsynlighetSykVaksinert = 20
        SannsynlighetSykFraVaksinert = 10
        SannsynlighetSykFraVaksinertHvisFrisk = 35
    }
}
sprites.onOverlap(SpriteKind.Vaksinert, SpriteKind.Syk_Vaksinert, function (sprite, otherSprite) {
    TilfeldigTallSyk = randint(0, 100)
    Inkubasjonstid = randint(2000, 6000)
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
    Inkubasjonstid = randint(2000, 6000)
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
    Inkubasjonstid = randint(2000, 6000)
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
let AntallDager = 0
let AntallSmittedeSisteUke = 0
let AntallSmittedeForrigeUke = 0
let AntallSmittedeSiste2Uker = 0
let AntallSmittedeIGår = 0
let AntallSmittedeSisteDøgn = 0
let AntallSmittedeForrige3Dager = 0
let AntallSmittede3DagerSiden = 0
let AntallSmittedeSiste3Dager = 0
let TilfeldigTallFrisk = 0
let SannsynlighetSykFraVaksinertHvisFrisk = 0
let SannsynlighetSykFraVaksinert = 0
let SannsynlighetSykVaksinert = 0
let SannsynlighetFriskVaksinert = 0
let SannsynlighetFrisk = 0
let VaksineAktiv = false
let SannsynlighetSyk = 0
let Inkubasjonstid = 0
let TilfeldigTallSyk = 0
let Doctor: Sprite = null
let Beregne_Rtallet_Vanskelig = 0
let Beregne_Rtallet_Enkel = 0
let AntallSmittede = 0
let Mutasjon = 0
let Innbygger: Sprite = null
let Dødsmeldte: Sprite[] = []
let Syk_Vaksinerte: Sprite[] = []
let Vaksinerte: Sprite[] = []
let Helsepersonell: Sprite[] = []
let Sykemeldte: Sprite[] = []
let Friskmeldte: Sprite[] = []
let Oppdatering = 0
let DagLengde = 3000
Oppdatering = 100
let Vaksineutviklingstid = 10
let LegeInterval = 3
Friskmeldte = sprites.allOfKind(SpriteKind.Frisk)
Sykemeldte = sprites.allOfKind(SpriteKind.Syk)
Helsepersonell = sprites.allOfKind(SpriteKind.Lege)
Vaksinerte = sprites.allOfKind(SpriteKind.Vaksinert)
Syk_Vaksinerte = sprites.allOfKind(SpriteKind.Syk_Vaksinert)
Dødsmeldte = sprites.allOfKind(SpriteKind.Død)
let SmittePerDøgnLISTE = [0]
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
Mutasjon = 5
info.setLife(Mutasjon)
Mutasjoner()
game.onUpdateInterval(DagLengde * 3, function () {
    AntallSmittede = Sykemeldte.length + Syk_Vaksinerte.length
    AntallSmittedeSiste3Dager = AntallSmittede - AntallSmittede3DagerSiden
    Beregne_Rtallet_Enkel = Math.abs(Math.round(AntallSmittedeSiste3Dager / AntallSmittedeForrige3Dager * 100) / 100)
    AntallSmittedeForrige3Dager = AntallSmittedeSiste3Dager
    AntallSmittede3DagerSiden = AntallSmittede
})
game.onUpdateInterval(DagLengde, function () {
    AntallSmittede = Sykemeldte.length + Syk_Vaksinerte.length
    AntallSmittedeSisteDøgn = AntallSmittede - AntallSmittedeIGår
    SmittePerDøgnLISTE.push(AntallSmittedeSisteDøgn)
    if (SmittePerDøgnLISTE.length > 14) {
        SmittePerDøgnLISTE.shift()
    }
    for (let index = 0; index <= SmittePerDøgnLISTE.length - 1; index++) {
        AntallSmittedeSiste2Uker += SmittePerDøgnLISTE[index]
    }
    for (let index = 0; index <= (SmittePerDøgnLISTE.length - 1) / 2; index++) {
        AntallSmittedeForrigeUke += SmittePerDøgnLISTE[index]
    }
    AntallSmittedeSisteUke = AntallSmittedeSiste2Uker - AntallSmittedeForrigeUke
    AntallSmittedeIGår = AntallSmittede
    Beregne_Rtallet_Vanskelig = Math.abs(Math.round(AntallSmittedeSisteUke / AntallSmittedeForrigeUke * 100) / 100)
})
forever(function () {
    AntallDager = game.runtime() / DagLengde
    info.setScore(AntallDager)
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
    for (let Innbygger2 of Friskmeldte) {
        Innbygger2.setPosition(Innbygger2.x + randint(-2, 2), Innbygger2.y + randint(-2, 2))
        Innbygger2.setStayInScreen(true)
    }
    for (let Innbygger3 of Sykemeldte) {
        Innbygger3.setPosition(Innbygger3.x + randint(-2, 2), Innbygger3.y + randint(-2, 2))
        Innbygger3.setStayInScreen(true)
    }
    for (let Doctor2 of Helsepersonell) {
        Doctor2.setPosition(Doctor2.x + randint(-4, 4), Doctor2.y + randint(-4, 4))
        Doctor2.setStayInScreen(true)
    }
    for (let Innbygger4 of Vaksinerte) {
        Innbygger4.setPosition(Innbygger4.x + randint(-2, 2), Innbygger4.y + randint(-2, 2))
        Innbygger4.setStayInScreen(true)
    }
    for (let Innbygger5 of Syk_Vaksinerte) {
        Innbygger5.setPosition(Innbygger5.x + randint(-2, 2), Innbygger5.y + randint(-2, 2))
        Innbygger5.setStayInScreen(true)
    }
})
game.onUpdateInterval(DagLengde * 15, function () {
    Mutasjon += -1
    info.setLife(Mutasjon)
    Mutasjoner()
})
