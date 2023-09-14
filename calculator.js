console.log("Starting Calculator");

// Constants
const inputNums = [];	//Number stack for calculations
const gStackSize = 16;


// Get document elements
const tableOutput = document.getElementById("outputTable");
/* const nums = [document.getElementById("n0"),
    document.getElementById("n1"),
    document.getElementById("n2"),
    document.getElementById("n3"),
    document.getElementById("n4"),
    document.getElementById("n5"),
    document.getElementById("n6"),
    document.getElementById("n7"),
    document.getElementById("n8"),
    document.getElementById("n9")];

// Set up events
nums.forEach(function(b, n) { b.addEventListener("click", function() { inputDigit(n); } )}); */

// Setup the calculator
generateTable();

// Functions
function generateTable()	// Programatically generate the table for displaying input stack
{
	const tableRow = document.createElement("tr");
	tableRow.appendChild(document.createElement("td"));
	tableRow.appendChild(document.createElement("td"));
	
	for(let ii = gStackSize-1; ii >= 0; ii--)
	{
		let row = tableOutput.appendChild(tableRow.cloneNode(true));
		row.cells[0].innerHTML = ii + ".";
		row.cells[1].innerHTML = "";
	}
}

function clearAll() // Clear stack and output table
{
	clearStack();
	clearOutputTable();
}

function clearStack() // Clear the stack
{
	inputNums.length = 0;
}

function clearOutputTable()		// Clear the table n = number of rows to clear
{
    for(let ii = 0; ii < gStackSize; ii++)
    {
        tableOutput.rows[ii].cells[1].innerHTML = "";
    }
}

function fillTable()	// Fill the table with the values from the stack
{
	clearOutputTable(); // Using this to clear values that have been popped from the stack
	for(let ii = inputNums.length-1; ii >= 0; ii--)
	{
		tableOutput.rows[gStackSize + ii - inputNums.length-1].cells[1].innerHTML = inputNums[ii];
	}
}

function inputDigit(d)	// Input digits into the input cell of the display
{
	const inputCell = tableOutput.rows[tableOutput.rows.length - 1].cells[1];
	
	if ((d == ".") && (inputCell.innerHTML == ""))
	{
		d = "0.";
	}
	else if ((d == ".") && (inputCell.innerHTML.includes(".")))
	{
		return;
	}
	
    inputCell.innerHTML += d;
}

function sendToStack()	// Send value from input cell to the stack
{
	const inputCell = tableOutput.rows[gStackSize-1].cells[1];
	
	if((inputNums.length < gStackSize-2) && !(inputCell.innerHTML == ""))
	{
		inputNums.push(parseFloat(inputCell.innerHTML));
		inputCell.innerHTML = "";
	}
	
	fillTable();
}

function enterToInputCell(a)
{
	tableOutput.rows[gStackSize-1].cells[1].innerHTML = a;
}

function dualOperations(a,b,op)	// Perform an operation on
{
	switch(op)
	{
		case "+":
			return a+b
		case "-":
			return a-b
		case "*":
			return a*b
		case "/":
			return a/b
		case "^":
			return a^b
		default:
			console.log("Invalid math operation")
	}
}

function operations(op)
{
	const dualOps = ["+", "-", "*", "/", "^"];
	let b = 0.0;
	let a = 0.0;
	
	// WARNING: Not yet protecting against nothing in the stack
	if (!(tableOutput.rows[gStackSize-1].cells[1].innerHTML == ""))
	{
		b = parseFloat(tableOutput.rows[gStackSize-1].cells[1].innerHTML);
	}
	else
	{
		b = inputNums.pop();
	}
	
	if(dualOps.includes(op))
	{
		a = inputNums.pop();
		let result = dualOperations(a,b,op);
		clearOutputTable();
		fillTable();
		enterToInputCell(result);
	}
	
}