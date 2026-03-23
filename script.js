let expression = '';

function updateDisplay() {
  const exprEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');

  exprEl.textContent = expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');

  if (expression === '') {
    resultEl.textContent = '0';
  }
}

function inputChar(char) {
  const operators = ['+', '-', '*', '/', '%'];
  const last = expression.slice(-1);

  // Replace trailing operator with new one
  if (operators.includes(char) && operators.includes(last)) {
    expression = expression.slice(0, -1) + char;
  } else {
    // Prevent multiple decimals in same number
    if (char === '.') {
      const parts = expression.split(/[\+\-\*\/\%]/);
      if (parts[parts.length - 1].includes('.')) return;
    }
    expression += char;
  }

  updateDisplay();
}

function clearAll() {
  expression = '';
  document.getElementById('result').textContent = '0';
  document.getElementById('expression').textContent = '';
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!expression) return;
  try {
    const result = eval(expression);
    document.getElementById('expression').textContent =
      expression.replace(/\*/g, '×').replace(/\//g, '÷') + ' =';
    expression = parseFloat(result.toFixed(10)).toString();
    document.getElementById('result').textContent = expression;
  } catch {
    document.getElementById('result').textContent = 'Error';
    expression = '';
  }
}

document.addEventListener('keydown', (e) => {
  if ('0123456789.+-*/%'.includes(e.key)) inputChar(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});
