let atm = {
    totalAmount: 50000,
    notes: {
        2000: 20,
        500: 10,
        200: 20,
        100: 50
    }
};

let account = {
    balance: 50000
};

let transactions = [];

function updateATMDisplay() {
    document.getElementById('note-2000').textContent = atm.notes[2000];
    document.getElementById('note-500').textContent = atm.notes[500];
    document.getElementById('note-200').textContent = atm.notes[200];
    document.getElementById('note-100').textContent = atm.notes[100];
    document.getElementById('account-balance').textContent = account.balance;
}

function withdrawAmount(amount) {
    if (amount % 100 !== 0 || amount > atm.totalAmount || amount > account.balance) {
        alert("Invalid amount OR Insufficient Amount Balance");
        return;
    }
    
    let withdrawn = {};
    [2000, 500, 200, 100].forEach(note => {
        let count = Math.min(Math.floor(amount / note), atm.notes[note]);
        if (count > 0) {
            withdrawn[note] = count;
            amount -= count * note;
            atm.notes[note] -= count;
        }
    });
    
    if (amount === 0) {
        transactions.push(withdrawn);
        account.balance -= Object.entries(withdrawn).reduce((acc, [note, count]) => acc + (note * count), 0);
        updateATMDisplay();
        displayTransaction(withdrawn);
    } else {
        alert("The ATM does not have sufficient notes to fulfill this withdrawal.");
    }
}

function displayTransaction(transaction) {
    let table = document.getElementById('transaction-table');
    table.innerHTML = `
        <tr>
            <th>Money(rs.)</th>
            <th>Count</th>
            <th>Total Amount</th>
        </tr>
    `;
    
    Object.entries(transaction).forEach(([note, count]) => {
        let row = table.insertRow();
        row.insertCell(0).textContent = `Rs. ${note}`;
        row.insertCell(1).textContent = count;
        row.insertCell(2).textContent = `Rs. ${note * count}`;
    });
}


document.getElementById('withdraw-btn').addEventListener('click', () => {
    let amount = parseInt(document.getElementById('withdraw-amount').value);
    withdrawAmount(amount);
});

updateATMDisplay();
