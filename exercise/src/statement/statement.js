const {generatePerformances, getTotalAmount, getTotalCredit} = require('./getStatementData')

const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format;

function getColumnResult(performance) {
  return ` ${performance.name}: ${format(performance.amount / 100)} (${performance.audience} seats)\n`;
}

function getColumnHTMLResult(performance) {
  return ` <tr><td>${performance.name}</td><td>${performance.audience}</td><td>${format(performance.amount / 100)}</td></tr>\n`;
}

function getResult(customer, performances, totalAmount, credits) {
  let result = `Statement for ${customer}\n`;
  performances.map((performance) => {
    result += getColumnResult(performance);
  })
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${credits} credits \n`;
  return result;
}

function getHTMLResult(customer, performances, totalAmount, credits) {
  let result = `<h1>Statement for ${customer}</h1>\n`;
  result += '<table>\n' + '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  performances.map((performance) => {
    result += getColumnHTMLResult(performance);
  })
  result += '</table>\n' +
    `<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n` +
    `<p>You earned <em>${credits}</em> credits</p>`;
  return result;
}

function statement(invoice, plays, printHTML) {
  const performances = generatePerformances(invoice.performances, plays);
  const amount = getTotalAmount(performances);
  const credit = getTotalCredit(performances);
  if (printHTML) {
    return getHTMLResult(invoice.customer, performances, amount, credit);
  } else {
    return getResult(invoice.customer, performances, amount, credit);
  }
}

module.exports = {
  statement,
};
