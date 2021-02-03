function drawString(ctx, text, posX, posY,
	textColor, fontSize, font,
	rotation, align, inline) {
        return;
	var lines = text.split("\n");
	if (!rotation) rotation = 0;
	if (!font) font = "'serif'";
	if (!fontSize) fontSize = 16;
	if (!textColor) textColor = '#000000';
	if (!align) align = "start";
	ctx.save();
	ctx.font = fontSize + "px " + font;
	ctx.fillStyle = textColor;
	ctx.textAlign = align;
	posY = inline ? posY : posY + fontSize;
	ctx.translate(posX, posY);
	ctx.rotate(rotation * Math.PI / 180);
	for (i = 0; i < lines.length; i++) {
		ctx.fillText(lines[i], 0, i * fontSize);
	}
	ctx.restore();
}


function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

/* 
    ### Examples:
    var vec = Vector.fromArray([42,21]);
    vec.toString();
    // => x:42, y:21
*/
Vector.fromArray = function (arr) {
    return new Victor(arr[0] || 0, arr[1] || 0);
};

/*
    ### Examples:
    var vec = Victor.fromObject({ x: 42, y: 21 });
    vec.toString();
    // => x:42, y:21
*/
Vector.fromObject = function (obj) {
    return new Vector(obj.x || 0, obj.y || 0);
};

/*
    ### Examples:
    var vec = new Vector(10,20).clone();
    vec.addScalar(40);
    vec.toString();
    // => x:50, y:60
*/
Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
};


Vector.prototype.toString = function () {
    return 'x:' + this.x + ', y:' + this.y;
};



Vector.prototype.add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
};
Vector.prototype.addScalar = function (scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
};


Vector.prototype.subtract = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
};
Vector.prototype.subtractScalar = function (scalar) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
};


Vector.prototype.multiply = function (vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
};
Vector.prototype.multiplyScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};


Vector.prototype.divide = function (vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
};
Vector.prototype.divideScalar = function (scalar) {
    if (scalar !== 0) {
        this.x /= scalar;
        this.y /= scalar;
    } else {
        this.x = 0;
        this.y = 0;
    }
    return this;
};


Vector.prototype.dot = function (vec2) {
    return this.x * vec2.x + this.y * vec2.y;
};
Vector.prototype.cross = function (vec2) {
    return (this.x * vec2.y) - (this.y * vec2.x);
};
Vector.prototype.projectOnto = function (vec2) {
    let coeff = ((this.x * vec2.x) + (this.y * vec2.y)) / ((vec2.x * vec2.x) + (vec2.y * vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};
Vector.prototype.projectLengthOnto = function (vec2) {
    let dotProduct = this.dot(vec2);
    let len = vec2.length();
    return dotProduct / len;
};


Vector.prototype.setAngle = function (angle) {
    let length = this.length();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
};
Vector.prototype.setAngleDeg = function (angle) {
    let length = this.length();
    angle = this.deg2rad(angle);
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
};

Vector.prototype.getAngle = function () {
    return Math.atan2(this.y, this.x);
};
Vector.prototype.getAngleDeg = function () {
    return this.rad2deg(this.getAngle());
};

/* 
    ### Examples:
    var v1 = new Vector(10,0);
    v1.rotateDeg(90);

    v1.toString();
    // => x:0, y:10

    v1.rotateDeg(90);

    v1.toString();
    // => x:-10, y:0
*/
Vector.prototype.rotate = function (angle) {
    let new_x = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
    let new_y = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

    this.x = new_x;
    this.y = new_y;
    return this;
    /* y error, but why?
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.y * Math.cos(angle) + this.x * Math.sin(angle);
    */
};
Vector.prototype.rotateDeg = function (angle) {
    angle = this.deg2rad(angle);
    this.rotate(angle);
};

/* 
    ### Examples:
    var v1 = new Vector(10,0);
    v1.rotateToDeg(90);

    v1.toString();
    // => x:0, y:10

    v1.rotateToDeg(90);

    v1.toString();
    // => x:0, y:10
*/
Vector.prototype.rotateTo = function (rotation) {
    this.rotate(rotation - this.getAngle());
};
Vector.prototype.rotateToDeg = function (rotation) {
    rotation = this.deg2rad(rotation);
    this.rotateTo(rotation);
};

/* 
    ### Examples:
    var center = new Vector(50, 50);
    var p1 = new Vector(75,50);

    p1.rotateRefPointDeg(90, center);
    p1.toString();
    // => x:50, y:75

    p1.rotateRefPointDeg(90, center);
    p1.toString();
    // => x:25, y:50
*/
Vector.prototype.rotateRefPoint = function (angle, refP) {
    let new_x = (this.x - refP.x) * Math.cos(angle) - (this.y - refP.y) * Math.sin(angle) + refP.x;
    let new_y = (this.y - refP.y) * Math.cos(angle) + (this.x - refP.x) * Math.sin(angle) + refP.y;
    this.x = new_x;
    this.y = new_y;
};
Vector.prototype.rotateRefPointDeg = function (angle, refP) {
    angle = this.deg2rad(angle);
    this.rotateRefPoint(angle, refP);
};

/* 
    ### Examples:
    var center = new Vector(50, 50);
    var p1 = new Vector(75,50);

    p1.rotateToRefPointDeg(90, center);
    p1.toString();
    // => x:50, y:75

    p1.rotateToRefPointDeg(90, center);
    p1.toString();
    // => x:50, y:75
*/
Vector.prototype.rotateToRefPoint = function (rotation, refP) {
    let angle = rotation - Math.atan2(this.y - refP.y, this.x - refP.x);// this.position angle to refP 

    let new_x = (this.x - refP.x) * Math.cos(angle) - (this.y - refP.y) * Math.sin(angle) + refP.x;
    let new_y = (this.y - refP.y) * Math.cos(angle) + (this.x - refP.x) * Math.sin(angle) + refP.y;
    this.x = new_x;
    this.y = new_y;
};
Vector.prototype.rotateToRefPointDeg = function (rotation, refP) {
    rotation = this.deg2rad(rotation);
    this.rotateToRefPoint(rotation, refP);
};


Vector.prototype.setLength = function (len) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
};

Vector.prototype.length = function () {
    return Math.sqrt(this.lengthSq());
};
Vector.prototype.lengthSq = function () {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.normalize = function () {
    let length = this.length();

    if (length === 0) {
        this.x = 1;
        this.y = 0;
    } else {
        this.divideScalar(length);
    }
    return this;
};
Vector.prototype.norm = Vector.prototype.normalize;

Vector.prototype.normalL = function () {
    return new Vector(-this.y, this.x);
};
Vector.prototype.normalR = function () {
    return new Vector(this.y, -this.x);
};

Vector.prototype.unfloat = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
};
Vector.prototype.toFixed = function (precision) {
    if (typeof precision === 'undefined') { precision = 8; }
    this.x = this.x.toFixed(precision);
    this.y = this.y.toFixed(precision);
    return this;
};

Vector.prototype.rad2deg = function (rad) {
    return rad * 180 / Math.PI;
};
Vector.prototype.deg2rad = function (deg) {
    return deg * Math.PI / 180;
};



function Firework(x, y, tx, ty, color) {
    this.name = 'Firework';
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, -random(0, 30));
    this.acc = new Vector(0, 0);
    this.angle = random(0, 360);
    this.speed = random(150, 300);

    this.accSp = new Vector(0, -randomInt(5, 10));

    this.friction = 1;

    this.hue = color;
    this.saturation = 100;
    this.lightness = randomInt(50, 80);
    this.alpha = random(40, 100) / 100;

    this.tail = [
        new Vector(x, y),
        new Vector(x, y),
        new Vector(x, y)
    ];

    this.radius = 2;

    this.showTarget = false;
    this.target = new Vector(tx, ty);
    this.targetRadius = 5;
    this.CollisionRadius = 5;

    this.IsDead = false;
    this.flag = 0;

    this.vel = this.target.clone().subtract(this.pos).norm().multiplyScalar(this.speed);
}

Firework.prototype.applyForce = function (force) {
    this.acc.add(force);
}

Firework.prototype.update = function (dt) {

    this.tail.pop();
    this.tail.unshift(this.pos.clone());

    this.applyForce(this.accSp);
    this.vel.add(this.acc);
    this.vel.multiplyScalar(this.friction);
    this.pos.add(this.vel.clone().multiplyScalar(dt));
    this.acc.multiplyScalar(0);

    this.CheckLife();
}

Firework.prototype.render = function (ctx) {
    ctx.save();
    let color = 'hsla(' + this.hue + ',' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';

    if (this.showTarget) {
        ctx.beginPath();
        ctx.arc(this.target.x, this.target.y, this.targetRadius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    FillCircle(ctx, this.pos.x, this.pos.y, this.radius, color);

    let randomTail = this.tail[randomInt(0, this.tail.length - 1)];
    DrawLine(ctx, randomTail, this.pos, this.radius, color);

    ctx.restore();
}

Firework.prototype.CheckLife = function () {
    if (this.IsDead) return;

    if (this.pos.y < 0) {
        this.IsDead = true;
    }

    if (CircleToCircle(this.pos, this.CollisionRadius, this.target, this.CollisionRadius) ||
        this.vel.y > 0) {
        this.IsDead = true;

        CreateParticle(this.pos.x, this.pos.y, this.hue, randomInt(100, 500));
        if (randomInt(0, 1000) < 200) {
            CreateParticle(this.pos.x, this.pos.y, random(0, 360), randomInt(300, 800));
        }
    }
}

//---------------------

function CreateFirework() {
    let sx = random(width * 0.1, width * 0.9);
    let sy = height;
    let ex = sx;
    let ey = random(height * 0.1, height * 3 / 4);

    fireworks.push(new Firework(sx, sy, ex, ey, random(0, 360)));
}


function Particle(x, y, color, maxSpeed) {
    this.name = 'Particle';
    this.pos = new Vector(x, y);
    this.vel = new Vector(1, 0);
    this.acc = new Vector(0, 0);
    this.angle = random(0, 360);

    this.minSp = 150;
    this.maxSp = ((maxSpeed | 0) < this.minSp) ? this.minSp : maxSpeed;
    this.speed = random(10, this.maxSp);

    this.vel.setAngleDeg(this.angle);
    this.vel.setLength(this.speed);

    this.hue = color + randomInt(-10, 10);
    this.saturation = 100;
    this.lightness = randomInt(50, 80);
    this.alpha = random(40, 100) / 100;
    this.decay = random(10, 50) / 1000; // alpha 衰減

    this.flickerDensity = 10;

    this.wind = random(-12, 12);
    this.friction = 0.99;

    this.radius = randomInt(1, 3);

    this.tail = [
        new Vector(x, y),
        new Vector(x, y),
        new Vector(x, y)
    ];

    this.IsDead = false;
}

Particle.prototype.applyForce = function (force) {
    this.acc.add(force);
}

Particle.prototype.update = function (dt) {
    if (this.IsDead) return;

    this.tail.pop();
    this.tail.unshift(this.pos.clone());

    this.vel.add(this.acc);
    this.vel.multiplyScalar(this.friction);
    this.pos.add(this.vel.clone().multiplyScalar(dt));
    this.acc.multiplyScalar(0);

    this.alpha -= this.decay;

    this.CheckLife();
}

Particle.prototype.render = function (ctx) {
    ctx.save();

    let color = 'hsla(' + this.hue + ',' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
    let randomTail = this.tail[randomInt(0, this.tail.length - 1)];
    /*
    FillCircle(ctx, this.pos.x, this.pos.y, this.radius, color);

    FillCircle(ctx, randomTail.x, randomTail.y, this.radius, color);
    */
    DrawLine(ctx, randomTail, this.pos, this.radius, color);


    if (this.flickerDensity > 0) {
        let inverseDensity = 50 - this.flickerDensity;
        if (randomInt(0, inverseDensity) == inverseDensity) {
            let randomAlpha = random(50, 100) / 100;
            let color = 'hsla(' + this.hue + ',' + this.saturation + '%, ' + this.lightness + '%, ' + randomAlpha + ')';
            FillCircle(ctx, this.pos.x, this.pos.y, (this.radius + randomInt(0, 3)) * 0.5, color);
        }
    }

    ctx.restore();
}

Particle.prototype.CheckLife = function () {
    let condition1 = this.alpha > 0;
    let condition2 = this.pos.x - this.radius < 0 || this.pos.x + this.radius > width ||
        this.pos.y - this.radius < 0 || this.pos.y + this.radius > height;
    this.IsDead = !condition1 || condition2;
}

//---------------------------------------------


function CreateParticle(x, y, color, num) {
    let speed = randomInt(0, num * 0.9);// 決定這次爆炸的最大範圍
    while (num--) {
        particles.push(new Particle(x, y, color, speed));
    }
}

//------------------------------------------------


function FillCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
function DrawLine(ctx, pos1, pos2, w, color) {
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}

function CircleToCircle(pos1, r1, pos2, r2) {
    let d = new Vector(pos2.x - pos1.x, pos2.y - pos1.y);
    return d.lengthSq() <= Math.pow(r1 + r2, 2);
}



///----main start
var ctx,
    width,
    height;
var animation,
    lastTime = 0,
    Timesub = 0,
    DeltaTime = 0,
    loop = true;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#222";
var keys = {}, mousePos = {};

window.onload = function () {
    // ctx = CreateDisplay("myCanvas");
    // width = ctx.canvas.width; height = ctx.canvas.height;


    // document.addEventListener("keydown", keydown, false);
    // document.addEventListener("keyup", keyup, false);
    // document.addEventListener("mousedown", mousedown, false);
    // document.addEventListener("mouseup", mouseup, false);
    // document.addEventListener("mousemove", mousemove, false);
    // window.addEventListener("resize", resize);

    // main();

}

// ----------------------------------------------------------
function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = 'rgba(34,34,34,' + clearAlpha + ')';
    ctx.fillRect(0, 0, width, height);
    //--------Begin-----------

    update(DeltaTime);
    draw(ctx);

    //--------End---------------
    let str1 = "Fps: " + 1000 / Timesub, str2 = "Timesub: " + Timesub, str3 = "DeltaTime: " + DeltaTime;
    drawString(ctx, str1 + "\n" + str2 + "\n" + str3,
        0, height - 31,
        "rgba(255,255,255,0.3)", 10, "consolas",
        0, 0, 0);
    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}
//-------------------------------------------------------
var clearAlpha = 0.3;

var particles = [];
var fireworks = [];
var gravity = new Vector(0, 3);

var backImg = new Image();   // Create new img element
backImg.src = 'assets/skyline.png'; // Set source path
var scaleY, imgHeight, startY;

window.main = function main() {
    console.log("Start");

    ctx = CreateDisplay("myCanvas");
    width = ctx.canvas.width; height = ctx.canvas.height;

    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);
    window.addEventListener("resize", resize);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';


    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}


function update(dt) {
    if (random(0, 1000) < 80) {
        CreateFirework();
    }

    for (particle of particles) {
        particle.applyForce(gravity);
        particle.update(dt);
    }

    for (firework of fireworks) {
        //firework.applyForce(gravity);
        firework.update(dt);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].IsDead) {
            particles.splice(i, 1);
        }
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
        if (fireworks[i].IsDead) {
            fireworks.splice(i, 1);
        }
    }
}

function draw(ctx) {
    drawBackground(ctx);

    for (particle of particles) {
        particle.render(ctx);
    }

    for (firework of fireworks) {
        firework.render(ctx);
    }


}

function drawBackground(ctx) {
    if (backImg.src != '') {
        scaleY = width / backImg.width;
        imgHeight = backImg.height * scaleY;
        startY = (height - imgHeight) * 6 / 7;
        ctx.drawImage(backImg, 0, startY, width, imgHeight);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, startY + imgHeight, width, (height - startY));
    }
    let fontSize = height / 20;
    let str1 = "Happy New Year !";
    //let offPos = new Vector(0, Math.tan(new Date().getTime() / 1000) * 30);
    let offPos = new Vector(0, Math.sin(new Date().getTime() / 1000) * 30);
    let fontPos1 = new Vector(
        width / 2 - str1.length * fontSize * 0.3 + offPos.x,
        height / 3 + offPos.y
    );
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 15;
    drawString(ctx, str1,
        fontPos1.x, fontPos1.y,
        "rgba(255,255,0,1)", fontSize, "orbitron",
        0, 0, 0);
    let str2 = "2018";
    let fontPos2 = new Vector(
        width / 2 - str2.length * fontSize * 0.3 + offPos.x,
        height / 3 + fontSize + offPos.y
    );
    drawString(ctx, str2,
        fontPos2.x, fontPos2.y,
        "rgba(255,255,0,1)", fontSize, "orbitron",
        0, 0, 0);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 0;
}
//---evnt---
function keydown(e) {
    keys[e.keyCode] = true;
}

function keyup(e) {
    delete keys[e.keyCode];
}

function mousedown(e) {
    CreateParticle(e.clientX, e.clientY, randomInt(0, 360), randomInt(100, 500));
    if (randomInt(0, 1000) < 300) {
        CreateParticle(e.clientX, e.clientY, randomInt(0, 360), randomInt(300, 800));
    }
}

function mouseup(e) {

}

function mousemove(e) {
    mousePos.x = e.clientX - ctx.canvas.offsetLeft
    mousePos.y = e.clientY - ctx.canvas.offsetTop;

}

function resize() {
    width = ctx.canvas.width = window.innerWidth;
    height = ctx.canvas.height = window.innerHeight;
}

//----tool-------
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//---------------------
function CreateDisplay(id, width, height, border) {
    let canvas = document.createElement("canvas");
    let style_arr = [
        "display: block;",
        "margin: 0 auto;",
        "background: #FFF;",
        "padding: 0;",
        "display: block;"
    ];
    canvas.id = id;
    canvas.width = width | 0;
    canvas.height = height | 0;

    if (border) style_arr.push("border:1px solid #000;");

    if (!width && !height) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    canvas.style.cssText = style_arr.join("");
    document.querySelector('#fireworks').appendChild(canvas)
    // document.body.appendChild(canvas);

    return canvas.getContext("2d");
}