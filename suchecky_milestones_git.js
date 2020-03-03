// Milestone 2

document.getElementById('x-val').innerText = 8;
document.getElementById('y-val').innerText = 21;

// Milestone 3

let lst = [0, 1];
function math(nr) {
  for (let i = 2; i < nr; i++) {
    lst[i] = lst[i - 2] + lst[i - 1];
    lst.push(lst[i]);
  }
  return lst[nr - 1] + lst[nr - 2];
}
document.getElementById('x-val').innerText = 9;
document.getElementById('y-val').innerText = math(9);

// ...
