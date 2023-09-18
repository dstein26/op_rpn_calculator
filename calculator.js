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
    for(let ii = 0; ii < tableOutput.rows.length-1; ii++)
    {
        tableOutput.rows[ii].cells[1].innerHTML = "";
		tableOutput.rows[ii].cells[3].innerHTML = "";
    }
	gInputCell.innerHTML = "";
}

function fillTable()	// Fill the table with the values from the stack
{

	clearOutputTable(); // Using this to clear values that have been popped from the stack
	for(let ii = 0; ii < inputNums.length; ii++)
	{
		const col = 1 + 2 * (ii%2);
		const row = 7 - Math.floor(ii / 2);
		tableOutput.rows[row].cells[col].innerHTML = inputNums.at(-(ii+1));
	}

}

function inputDigit(d)	// Input digits into the input cell of the display
{
	
	if ((d == ".") && (gInputCell.innerHTML == ""))
	{
		d = "0.";
	}
	else if ((d == ".") && (gInputCell.innerHTML.includes(".")))
	{
		return;
	}
    gInputCell.innerHTML += d;
}

function sendToStack()	// Send value from input cell to the stack
{	

	if((inputNums.length < gStackSize-2) && !(gInputCell.innerHTML == ""))
	{
		inputNums.push(parseFloat(gInputCell.innerHTML));
		gInputCell.innerHTML = "";
	}
	
	fillTable();
}

function enterToInputCell(a)
{
	gInputCell.innerHTML = a;
}

function dualOperations(a,b,op)	// Perform an operation on
{
	let res = -42;
	switch(op)
	{
		case "+":
			res = a+b;
			break;
		case "-":
			res =  a-b;
			break;
		case "*":
			res = a*b;
			break;
		case "/":
			res = a/b;
			break;
		case "^":
			res = Math.pow(a, b);
			break;
		default:
			console.log("Invalid dual operation: " + op)
	}

	return res;
}

function singleOperations(a, op)
{
	let res = -42;

	switch(op)
	{
		case "s":
			res = Math.sin(a);
			break;
		case "c":
			res = Math.cos(a);
			break;
		case "t":
			res = Math.tan(a);
			break;
		case "sqrt":
			res = Math.sqrt(a);
			break;
		case "sq":
			res = Math.pow(a, 2);
			break;
		default:
			console.log("Invalid single operator: " + op)
	}

	return res;
}

function operations(op)
{
	const dualOps = ["+", "-", "*", "/", "^"];
	const singleOps = ["s", "c", "t", "sqrt", "sq"];
	let b = 0.0;
	let a = 0.0;
	let result = -42.0
	
	// WARNING: Not yet protecting against nothing in the stack
	if (!(gInputCell.innerHTML == ""))
	{
		b = parseFloat(gInputCell.innerHTML);
	}
	else
	{
		b = inputNums.pop();
	}
	
	if(dualOps.includes(op))
	{
		a = inputNums.pop();
		result = dualOperations(a,b,op);
	}
	else if(singleOps.includes(op))
	{
		result = singleOperations(b, op);
	}

	clearOutputTable();
	fillTable();
	enterToInputCell(result);
	
}