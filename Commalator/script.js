let TOTAL_W = 0;

function Sum() {
    let input = document.getElementById('value');

    const sum = input.value.split(",").map((x) => Number(x)).reduce((t, v) => t + v)

    if (Number.isNaN(sum) || !input.value) {
        alert('Please fill the form correctly!');
        input.value = "";

        return;
    }

    document.getElementById('total').innerHTML = sum;
}