

function matrix(cols, rows) {  // Simulate the matrix
  let row = new Array(cols);
  
  for(let i=0; i<row.length; i++) {
    row[i] = new Array(rows);
  }
  
  return row;
}

let grid, cols, rows, res = 10;

function setup() {
  createCanvas(1800, 1200);
  
  cols = width/res;
  rows = height/res;
  
  grid = matrix(cols, rows);
  
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      grid[i][j] = floor(random(2)); // bitmap
    }
  }
  
}

function draw() {
  background(0);

  for(let i=0; i<cols; i++) {
    for(j=0; j<rows; j++) {
      let x = i * res;
      let y = j * res;

      if(grid[i][j]==1) {
        r = random(255); // r is a random number between 0 - 255
        g = random(100,200); // g is a random number betwen 100 - 200
        b = random(100); // b is a random number between 0 - 100
        a = random(200,255); // a is a random number between 200 - 255
  
        fill(r, g, b, a); // 255 -> black
        
        noStroke();
        rect(x, y, res-1, res-1);
      }
    }
  }
  
  let next = matrix(cols, rows);
  
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      let state = grid[i][j];
      
      let sum = 0;
      let neig = countNeig(grid, i, j);
      
      if(state==0 && neig==3) {
        next[i][j] = 1;
      }
      else if(state==1 && (neig<2 || neig>3)) {
        next[i][j] = 0;
      }
      else {
        next[i][j] = state;
      }
    }
  }
  
  grid = next;
}

function countNeig(grid, x, y) {
  let sum = 0;
  for(let i=-1; i<2; i++) {
    for(let j=-1; j<2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      
      sum += grid[col][row];
    }
  }
  
  sum -= grid[x][y];
  return sum;
}
