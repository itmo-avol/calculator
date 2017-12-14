import Calculator from './Calculator.js';
import Controls from './Controls.js';
import Display from './Display.js';

main();

function main()
{
	const outputElement = document.getElementById( 'display' );
	const display = new Display( outputElement );
	const calculator = new Calculator( display );
	const buttons = document.querySelectorAll( 'div.buttons>button' );
	
	new Controls( calculator, buttons );
}
