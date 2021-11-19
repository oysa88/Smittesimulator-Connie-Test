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
    game.splash("Friske: " + (Friskmeldte.length + Frisk_Vaksinerte.length) + "   Syke: " + (Sykemeldte.length + Syk_Vaksinerte.length))
    game.splash("Vaksinerte: " + Vaksinerte.length + "   Døde: " + Dødsmeldte.length)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (LegerAntall < 10) {
        Doctor = sprites.create(img`
            1 1 1 1 
            1 1 1 1 
            1 1 1 1 
            1 1 1 1 
            `, SpriteKind.Lege)
        Doctor.setPosition(randint(0, 160), randint(0, 120))
        Helsepersonell.push(Doctor)
        LegerAntall += 1
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
            f f 2 f f 
            f f 2 f f 
            2 2 2 2 2 
            f f 2 f f 
            f f 2 f f 
            `, SpriteKind.Død)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Sykemeldte.removeAt(Sykemeldte.indexOf(sprite))
        Dødsmeldte.push(Innbygger)
    }
})
sprites.onOverlap(SpriteKind.Syk, SpriteKind.Vaksinert, function (sprite, otherSprite) {
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
            f f 2 f f 
            f f 2 f f 
            2 2 2 2 2 
            f f 2 f f 
            f f 2 f f 
            `, SpriteKind.Død)
        Innbygger.setPosition(otherSprite.x, otherSprite.y)
        Syk_Vaksinerte.removeAt(Syk_Vaksinerte.indexOf(sprite))
        Dødsmeldte.push(Innbygger)
    }
})
let Dag = 0
let TilfeldigTallFrisk = 0
let VaksineAktiv = false
let Doctor: Sprite = null
let LegerAntall = 0
let Innbygger: Sprite = null
let Dødsmeldte: Sprite[] = []
let Syk_Vaksinerte: Sprite[] = []
let Vaksinerte: Sprite[] = []
let Helsepersonell: Sprite[] = []
let Sykemeldte: Sprite[] = []
let Friskmeldte: Sprite[] = []
let SannsynlighetFriskVaksinert = 0
let SannsynlighetFrisk = 0
let Dager = 1
let DagLengde = 3000
let Vaksineutviklingstid = 10
SannsynlighetFrisk = 93
SannsynlighetFriskVaksinert = 99
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
    if (game.runtime() > DagLengde * Vaksineutviklingstid) {
        VaksineAktiv = true
    }
    if (game.runtime() > Dag + DagLengde) {
        Dag = game.runtime()
        Dager += 1
        info.setScore(Dager)
    }
    if (Dødsmeldte.length > 15 || Sykemeldte.length > 100) {
        game.over(false)
    } else if (Vaksinerte.length > 90) {
        game.over(true)
    }
})
game.onUpdateInterval(100, function () {
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
