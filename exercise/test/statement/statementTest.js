const test = require('ava');
const {statement} = require('../../src/statement/statement');

const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
  'other': {
    'name': 'other',
    'type': 'other',
  }
};

test('Sample test', t => {
  t.true(true);
  t.is(1, 1);
  t.deepEqual({a: 1}, {a: 1});
});

test('Amount should be $0.00 when the performances is empty ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    'Amount owed is $0.00\n' +
    'You earned 0 credits \n');
});

test('Amount should be $400.00 when the performances is hamlet and audience is 30', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      }
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' Hamlet: $400.00 (30 seats)\n' +
    'Amount owed is $400.00\n' +
    'You earned 0 credits \n');
});

test('Amount should be $410.00 when the performances is hamlet and audience is 31', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 31,
      }
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' Hamlet: $410.00 (31 seats)\n' +
    'Amount owed is $410.00\n' +
    'You earned 1 credits \n');
});

test('Amount should be $360.00 when the performances is as-like and audience is 20', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 20,
      }
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' As You Like It: $360.00 (20 seats)\n' +
    'Amount owed is $360.00\n' +
    'You earned 4 credits \n');
});

test('Amount should be $360.00 when the performances is as-like and audience is 21', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 21,
      }
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' As You Like It: $468.00 (21 seats)\n' +
    'Amount owed is $468.00\n' +
    'You earned 4 credits \n');
});

test('Amount should be $360.00 when have three', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      }
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' Hamlet: $650.00 (55 seats)\n' +
    ' As You Like It: $580.00 (35 seats)\n' +
    ' Othello: $500.00 (40 seats)\n' +
    'Amount owed is $1,730.00\n' +
    'You earned 47 credits \n');
});

test('should throw error when the performances type is other', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'other',
        'audience': 40,
      }
    ],
  };

  try {
    statement(invoice, plays);
    t.fail()
  } catch (e) {
    t.deepEqual('unknown type: other', e.message)
  }
});

test('Amount should be $360.00 by HTML when have three', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      }
    ],
  };

  const result = statement(invoice, plays, true);

  t.is(result, '<h1>Statement for BigCo</h1>\n' +
    '<table>\n' +
    '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
    ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
    ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
    ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
    '</table>\n' +
    '<p>Amount owed is <em>$1,730.00</em></p>\n' +
    '<p>You earned <em>47</em> credits</p>');
});
