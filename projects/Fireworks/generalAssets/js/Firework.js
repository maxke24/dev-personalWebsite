let colors = [[23, 222, 238], [255, 127, 80], [255, 65, 98], [242, 229, 11], [33, 178, 12], [128, 0, 0], [139, 0, 0],
    [165, 42, 42],
    [178, 34, 34],
    [220, 20, 60],
    [255, 0, 0],
    [255, 99, 71],
    [255, 127, 80],
    [205, 92, 92],
    [240, 128, 128],
    [233, 150, 122],
    [250, 128, 114],
    [255, 160, 122],
    [255, 69, 0],
    [255, 140, 0],
    [255, 165, 0],
    [255, 215, 0],
    [184, 134, 11],
    [218, 165, 32],
    [238, 232, 170],
    [189, 183, 107],
    [240, 230, 140],
    [128, 128, 0],
    [255, 255, 0],
    [154, 205, 50],
    [85, 107, 47],
    [107, 142, 35],
    [124, 252, 0],
    [127, 255, 0],
    [173, 255, 47],
    [0, 100, 0],
    [0, 128, 0],
    [34, 139, 34],
    [0, 255, 0],
    [50, 205, 50],
    [144, 238, 144],
    [152, 251, 152],
    [143, 188, 143],
    [0, 250, 154],
    [0, 255, 127],
    [46, 139, 87],
    [102, 205, 170],
    [60, 179, 113],
    [32, 178, 170],
    [47, 79, 79],
    [0, 128, 128],
    [0, 139, 139],
    [0, 255, 255],
    [0, 255, 255],
    [224, 255, 255],
    [0, 206, 209],
    [64, 224, 208],
    [72, 209, 204],
    [175, 238, 238],
    [127, 255, 212],
    [176, 224, 230],
    [95, 158, 160],
    [70, 130, 180],
    [100, 149, 237],
    [0, 191, 255],
    [30, 144, 255],
    [173, 216, 230],
    [135, 206, 235],
    [135, 206, 250],
    [25, 25, 112],
    [0, 0, 128],
    [0, 0, 139],
    [0, 0, 205],
    [0, 0, 255],
    [65, 105, 225],
    [138, 43, 226],
    [75, 0, 130],
    [72, 61, 139],
    [106, 90, 205],
    [123, 104, 238],
    [147, 112, 219],
    [139, 0, 139],
    [148, 0, 211],
    [153, 50, 204],
    [186, 85, 211],
    [128, 0, 128],
    [216, 191, 216],
    [221, 160, 221],
    [238, 130, 238]];

class Firework {
    constructor() {

        let color = colors[Math.floor(Math.random() * colors.length)];
        this.color = [color[0], color[1], color[2]];
        this.firework = new Particle(random(width), height, this.color, true);
        this.exploded = false;
        this.particles = [];
    }

    done() {
        return this.exploded && this.particles.length === 0;
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (let i = 0; i < 100; i++) {
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.color);
            this.particles.push(p);
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        }
        this.particles.forEach(particle => {
            particle.show();
        })
    }
}
