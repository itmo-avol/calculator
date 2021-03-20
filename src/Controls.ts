import { Calculator } from './Calculator.js';

/**
 * Элементы управления калькулятором
 */
export class Controls
{
	calculator: Calculator;
	
	/**
	 * Элементы управления калькулятором
	 * 
	 * @param calculator Связанный калькулятор
	 * @param buttons Элементы управления
	 */
	constructor( calculator: Calculator, buttons: NodeListOf<Element> )
	{
		this.calculator = calculator;
		
		this._handleButtonClick = this._handleButtonClick.bind( this );
		
		for ( const button of buttons )
		{
			button.addEventListener( 'click', this._handleButtonClick );
		}
	}
	
	/**
	 * Выполняет указанное действие
	 * 
	 * @param action Выполняемое действие
	 * @param value Значение для действия
	 */
	doAction( action: string, value?: string )
	{
		switch ( action )
		{
			case 'addition':
				this.calculator.addition();
				break;
			
			case 'subtraction':
				this.calculator.subtraction();
				break;
			
			case 'multiplication':
				this.calculator.multiplication();
				break;
			
			case 'division':
				this.calculator.division();
				break;
			
			case 'square-root':
				this.calculator.squareRoot();
				break;
			
			case 'digit':
				if ( !value )
				{
					throw new Error( 'Digit action should be used with a value' );
				}
				
				this.calculator.addDigit( value );
				break;
			
			case 'period':
				this.calculator.period();
				break;
			
			case 'change-sign':
				this.calculator.changeSign();
				break;
			
			case 'calculate':
				this.calculator.calculate();
				break;
			
			case 'backspace':
				this.calculator.backspace();
				break;
			
			case 'clear':
				this.calculator.clear();
				break;
			
			default:
				throw new Error( `Unknown action "${action}"` );
		}
	}
	
	/**
	 * Обработчик нажатия на кнопки
	 */
	private _handleButtonClick( event: Event )
	{
		const target = event.target;
		
		if ( !( target instanceof HTMLButtonElement ) )
		{
			return;
		}
		
		const action = target.dataset.action || '';
		const value = target.dataset.value;
		this.doAction( action, value );
	}
}
