let TOTAL_W = 0;

function Sum() {
    let input = document.getElementById('value');
    let total = document.getElementById('total');

    const sum = input.value.split(",").map((x) => Number(x)).reduce((t, v) => t + v)

    if (Number.isNaN(sum) || !input.value) {
        alert('Please fill the form correctly!');
        input.value = "";
        total.innerHTML = "0"
        return;
    }

    total.innerHTML = sum;
}