function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = '';
}

function backspace() {
  let current = document.getElementById("display").value;
  document.getElementById("display").value = current.slice(0, -1);
}

function log(x) {
  return Math.log10(x);
}

function sin(x) {
  return Math.sin(toRadians(x));
}

function cos(x) {
  return Math.cos(toRadians(x));
}

function tan(x) {
  return Math.tan(toRadians(x));
}

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function calculate() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const spoken = event.results[0][0].transcript;
    document.getElementById("display").value = spoken.replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '*')
      .replace(/divided by/g, '/')
      .replace(/pi/g, 'Math.PI');
  };

  recognition.onerror = function (event) {
    alert("Speech recognition error: " + event.error);
  };
}

let chart;

function plotFunction() {
  const inputFunc = document.getElementById("functionInput").value;

  let xValues = [];
  let yValues = [];

  try {
    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x);
      let y = eval(inputFunc.replace(/x/g, `(${x})`));
      yValues.push(y);
    }

    if (chart) chart.destroy();

    const ctx = document.getElementById("graphCanvas").getContext("2d");
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: 'y = f(x)',
          data: yValues,
          borderColor: 'lime',
          borderWidth: 2,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'x'
            }
          },
          y: {
            title: {
              display: true,
              text: 'f(x)'
            }
          }
        }
      }
    });
  } catch (err) {
    alert("Invalid function! Try using Math functions like Math.sin(x), x*x, etc.");
  }
}