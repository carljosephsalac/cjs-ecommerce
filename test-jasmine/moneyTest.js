import toCents from "../javascripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('convert cents into dollar', () => {
    expect(toCents(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
    expect(toCents(0)).toEqual('0.00');
  });
  it('round up to the nearest cent', () => {
    expect(toCents(2000.5)).toEqual('20.01');
  });
});

