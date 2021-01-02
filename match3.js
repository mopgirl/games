const block = {
    none: 0, circle: 1, triangle: 2, square: 3, diamond: 4, star: 5, max: 6
}

class BlockAA {
    constructor(release, hold) {
        this.release = release;
        this.hold = hold;
    }
}

const blockAA = [
    new BlockAA(' ', ' '),
    new BlockAA('◯', '●'),
    new BlockAA('△', '▲'),
    new BlockAA('□', '■'),
    new BlockAA('◇', '◆'),
    new BlockAA('☆', '★')
];

class Vac2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Cursor {
    constructor(pos) {
        this.pos = pos;
        this.isHolding = false;
    }
}

let field;
let cursor;
const fieldSize = new Vac2(6, 5);

function init() {
    field = [];
    for (let i = 0; i < fieldSize.y; i++) {
        field[i] = [];
        for (let j = 0; j < fieldSize.x; j++) {
            let newBlock = 1 + parseInt(Math.random() * (block.max - 1));
            field[i].push(newBlock);
        }
    }
    cursor = new Cursor(new Vac2(1, 1));
    window.onkeydown = onKeyDown;
    window.onkeyup = onKeyUp;
    draw();
}

function draw() {
    let html = '';
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            let aa = blockAA[field[i][j]].release;
            if (cursor.isHolding
                && i === cursor.pos.y
                && j === cursor.pos.x) {
                aa = blockAA[field[i][j]].hold;
            }
            html += aa;
        }
        if (i === cursor.pos.y) {
            html += '←';
        }

        html += '<br/>';
    }
    for (let i = 0; i < field[0].length; i++) {
        if (i === cursor.pos.x) {
            html += '↑';
        } else {
            html += '　';
        }
    }
    html += '<br/>';
    if (true) {
        html += `[w,s,a,d]:カーソル移動<br>[その他のキー]:ブロックを`
        html += (cursor.isHolding) ? '掴む' : '放す';
    } else {

    }
    let div = document.querySelector('div');
    div.innerHTML = html;
}

function onKeyDown(e) {
    switch (e.key) {
        case 'w':
            cursor.pos.y--;
            break;
        case 's':
            cursor.pos.y++;
            break;
        case 'a':
            cursor.pos.x--;
            break;
        case 'd':
            cursor.pos.x++;
            break;
        default:
            cursor.isHolding = true;
            break;
    }
    // cursor
    if (cursor.pos.x < 0) cursor.pos.x += fieldSize.x;
    if (cursor.pos.x >= fieldSize.x) cursor.pos.x -= fieldSize.x;
    if (cursor.pos.y < 0) cursor.pos.y += fieldSize.y;
    if (cursor.pos.y >= fieldSize.y) cursor.pos.y -= fieldSize.y;

    console.log(cursor)
    draw();
}

function onKeyUp(e) {
    switch (e.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
        default:
            cursor.isHolding = false;
            break;
    }
    draw();
}

init();
