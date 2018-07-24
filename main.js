function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
let grid;
let scale = 10; // величина одной клетки
// канвасим
let canvas = document.createElement('canvas');
canvas.width = 1890;
canvas.height = 990;
canvas = document.body.appendChild(canvas);
let cols = canvas.width / scale;
let rows = canvas.height / scale;
let ctx = canvas.getContext('2d');
// канвасим
function init() {
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
    render();
}

function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * scale;
            let y = j * scale;
            if (grid[i][j] == 1) {                
                ctx.fillStyle = '#fff';
                ctx.fillRect(x, y, scale - 1, scale - 1); // -1 чтобы выделялось
            }
        }
    }
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j]; // считаем новых соседей 
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row]; // не считать себя за соседа 
        }
    }
    sum -= grid[x][y];
    return sum;
}
init();
let refresh = setInterval(render, 100);
