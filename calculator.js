console.log("Starting Calculator");

// Constants
const inputNums = [];	//Number stack for calculations
const gStackSize = 16;


// Get document elements
const tableOutput = document.getElementById("outputTable");


// Setup the calculator
const gInputCell = generateTable();

// Functions
function generateTable()	// Programatically generate the table for displaying input stack
{
	tableOutput.innerHTML = "<p></p>"
	
	const tableRow = document.createElement("tr");
	tableRow.appendChild(document.createElement("td"));
	tableRow.appendChild(document.createElement("td"));
	tableRow.appendChild(document.createElement("td"));
	tableRow.appendChild(document.createElement("td"));

	

	for(let ii = (gStackSize); ii >= 1; ii = ii-2)
	{
		let row = tableOutput.appendChild(tableRow.cloneNode(true));
		row.cells[0].innerHTML = ii-1 + ".";
		row.cells[1].innerHTML = "" //ii*100;
		row.cells[2].innerHTML = ii + ".";
		row.cells[3].innerHTML = "" // ii/100
	}

	const inputRow = tableOutput.insertRow(8);
	const cell1 = inputRow.insertCell(0);
	cell1.innerHTML = ":"
	const inputCell = inputRow.insertCell(1);
	inputCell.colSpan = 3;
	inputCell.innerHTML;

	return inputCell;
	
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
	/*
    for(let ii = 0; ii < gStackSize; ii++)
    {
        tableOutput.rows[ii].cells[1].innerHTML = "";
    }
	*/
}

function fillTable()	// Fill the table with the values from the stack
{
	/*
	clearOutputTable(); // Using this to clear values that have been popped from the stack
	for(let ii = inputNums.length-1; ii >= 0; ii--)
	{
		tableOutput.rows[gStackSize + ii - inputNums.length-1].cells[1].innerHTML = String(inputNums[ii]).substring(0,16);
	}
	*/
}

function inputDigit(d)	// Input digits into the input cell of the display
{
	
	if ((d == ".") && (inputCell.innerHTML == ""))
	{
		d = "0.";
	}
	else if ((d == ".") && (inputCell.innerHTML.includes(".")))
	{
		return;
	}
    gInputCell.innerHTML += d;
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