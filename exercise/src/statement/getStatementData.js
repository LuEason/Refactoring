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

function playFor(plays, perf) {
  return plays[perf.playID];
}

const getTotalAmount = (performances) => {
  return performances.reduce((total, performance) => {
    return total + performance.amount;
  }, 0)
}

const getTotalCredit = (performances) => {
  return performances.reduce((total, performance) => {
    return total + performance.credit;
  }, 0)
}

const generatePerformances = (performances, plays) => {
  return performances.map((performance) => {
    const play = playFor(plays, performance);
    return Object.assign({
      'amount': calculateAmountPerPerformance(play, performance),
      'credit': calculateCredits(play, performance),
      'name': play.name,
      'audience': performance.audience
    });
  })
}

module.exports = {
  generatePerformances,
  getTotalAmount,
  getTotalCredit
};
