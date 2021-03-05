import { Calculator } from './Calculator.js';
import { Controls } from './Controls.js';
import { Display } from './Display.js';
import { Value } from './Value.js';

main();

function main()
{
	const outputElement = document.getElementById( 'display' );
	
	if ( !outputElement )
	{
		return;
	}
	
	const display = new Display( outputElement, 12 );
	const calculator = new Calculator( display, Value );
	const buttons = document.querySelectorAll( 'div.buttons>button' );
	
	new Controls( calculator, buttons );
}
