const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format;

function calculateTragedyAmount(perf) {
  let amount = 40000;
  if (perf.audience > 30) {
    amount += 1000 * (perf.audience - 30);
  }
  return amount;
}

function calculateComedyAmount(perf) {
  let amount = 30000;
  if (perf.audience > 20) {
    amount += 10000 + 500 * (perf.audience - 20);
  }
  amount += 300 * perf.audience;
  return amount;
}

function calculateAmountPerPerformance(play, perf) {
  switch (play.type) {
    case 'tragedy':
      return calculateTragedyAmount(perf);
    case 'comedy':
      return calculateComedyAmount(perf);
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
}

function calculateCredits(play, perf) {
  let thisCredits = 0;
  thisCredits += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type) {
    thisCredits += Math.floor(perf.audience / 5);
  }
  return thisCredits;
}

function getColumnResult(name, amount, audience) {
  return ` ${name}: ${format(amount / 100)} (${audience} seats)\n`;
}

function getResult(customer, allColumnResult, totalAmount, credits) {
  let result = `Statement for ${customer}\n`;
  result += allColumnResult;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${credits} credits \n`;
  return result;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let credits = 0;
  let allColumnResult = '';
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmountPerPerformance(play, perf);
    credits += calculateCredits(play, perf);

    allColumnResult += getColumnResult(play.name, thisAmount, perf.audience);
    totalAmount += thisAmount;
  }
  return getResult(invoice.customer, allColumnResult, totalAmount, credits);
}

module.exports = {
  statement,
};
