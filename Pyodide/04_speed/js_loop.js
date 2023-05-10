var total = 0;
var start_time = performance.now();
for (var i = 1; i <= 1000000; i++) {
    total += i;
}
var end_time = performance.now();
console.log('JavaScript:', total, 'in', ((end_time - start_time) / 1000).toFixed(6), 'seconds');