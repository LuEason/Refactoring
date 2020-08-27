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
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = calculateTragedyAmount(perf);
      break;
    case 'comedy':
      thisAmount = calculateComedyAmount(perf);
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function calculateCredits(play, perf) {
  let thisCredits = 0;
  thisCredits += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type) {
    thisCredits += Math.floor(perf.audience / 5);
  }
  return thisCredits;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmountPerPerformance(play, perf);
    volumeCredits += calculateCredits(play, perf);

    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
