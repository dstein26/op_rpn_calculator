console.log("Starting Calculator");

// Constants
const inputNums = [];

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
/* clearOutputTable(); */

// Functions
function clearOutputTable()
{
    for(let ii = 0; ii < tableOutput.rows.length; ii++)
    {
        tableOutput.rows[ii].cells[1].innerHTML = "";
    }
}

function inputDigit(d)
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