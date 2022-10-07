/* 
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	    Amount
-------------       ------
Penny...............$0.01 (PENNY)
Nickel..............$0.05 (NICKEL)
Dime................$0.1 (DIME)
Quarter.............$0.25 (QUARTER)
Dollar..............$1 (ONE)
Five Dollars........$5 (FIVE)
Ten Dollars.........$10 (TEN)
Twenty Dollars......$20 (TWENTY)
One-hundred Dollars.$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {

    // Set currency conversion object and calculate total CID:
    const mapObj = { 'PENNY': 0.01, 'NICKEL': 0.05, 'DIME': 0.1, 'QUARTER': 0.25,
      'ONE': 1, 'FIVE': 5, 'TEN': 10, 'TWENTY': 20, 'ONE HUNDRED': 100 };
    const totalDrawer = cid.reduce((sum, item) => sum+=item[1], 0);
  
    // Calculate needed change and declare final change to give.
    let change = cash - price;
    let finalChange = [];
  
    // If needed change amount is more than total CID, return INSUFFICIENT_FUNDS.
    if (change > totalDrawer) return {status: "INSUFFICIENT_FUNDS", change: []};
  
    // If needed change amount is equal to total CID, return CLOSED
    if (change == totalDrawer) return {status: "CLOSED", change: [...cid]};
  
    // Calculate change, from higher currency value to lowest. Push it into final change array.
    cid.reverse().forEach((item) => {
      if (item[1] == 0) return;
      let currentChange = 0;
      let currencyValue = mapObj[item[0]];
      let currencyTotalAmount = item[1];
      while (change - currencyValue >= 0 && currencyTotalAmount > 0) {
        currentChange+=currencyValue;
        change = parseFloat(change - currencyValue).toFixed(2);
        currencyTotalAmount-=currencyValue;
      }
      if (currentChange == 0) return;
      finalChange.push([item[0], currentChange]);
    })
  
    // If there's still change left to give, it means there's INSUFFICIENT_FUNDS.
    if (change > 0) return {status: "INSUFFICIENT_FUNDS", change: []};
  
    // If there's no change left to give and there's still money on CID, return final change.
    return {status: "OPEN", change: finalChange};
  }
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);