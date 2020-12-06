let canvas = document.getElementById('canvas');
let width = canvas.width;
let height = canvas.height;
let ctx = canvas.getContext('2d');

let image = ctx.createImageData(width, height);

async function main() {
    let asd = 0.01
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let i = x * (width * 4) + y * 4;
            let xx = ((y / width) * 4 - 2) / 1;
            let yy = ((x / width) * 4 - 2) / 1;
            let a = calculate(xx,yy);

            if (a === -1) {
                image.data[i + 0] = 0;
                image.data[i + 1] = 0;
                image.data[i + 2] = 0;
                image.data[i + 3] = 255;
            }
            else {
                image.data[i + 0] = a * 1;
                image.data[i + 1] = a * 2;
                image.data[i + 2] = a * 4;
                image.data[i + 3] = 255;
            }
        }
    }

    ctx.putImageData(image, 20, 20);

    update();
}

function calculate(x, y) {
    let z = [0, 0]
    let c = [x, y]

    for (let i = 0; i < 255; i++) {
        let z2 = [
            z[0]*z[0] - z[1]*z[1],
            z[0]*z[1] + z[1]*z[0]
        ];
        z = [
            z2[0] + c[0],
            z2[1] + c[1]
        ];
        if (z[0]*z[0] + z[1]*z[1] > 4) {

            return i
        }
    }
    return -1;
}

async function update() {
    let asd = 2
    let s = 1;
    while(s <= 50) {
        await sleep(100);
        console.log(image)
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let i = x * (width * 4) + y * 4;
                let xx = ((y / width) * 4 - 2 - s / 0.6) / (s + 1);
                let yy = ((x / width) * 4 - 2) / (s + 1);
                let a = calculate(xx,yy);

                if (a === -1) {
                    image.data[i + 0] = 0;
                    image.data[i + 1] = 0;
                    image.data[i + 2] = 0;
                    image.data[i + 3] = 255;
                }
                else {
                    image.data[i + 0] = a * 1;
                    image.data[i + 1] = a * 2;
                    image.data[i + 2] = a * 4;
                    image.data[i + 3] = 255;
                }
            }
        }

        s++;
        ctx.putImageData(image, 20, 20);
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

main();