import Display from './Display.js';

/**
 * Возможные значения текущей операции.
 */
const Operation = {
	NONE: 0,
	ADDITION: 1,
	SUBTRACTION: 2,
	MULTIPLICATION: 3,
	DIVISION: 4,
};

/**
 * Калькулятор.
 */
class Calculator
{
	/**
	 * Калькулятор.
	 * 
	 * @param {Display} display Экран для отображения результата.
	 */
	constructor ( display )
	{
		/** @type {Display} */
		this.display = display;
		this.clear();
	}
	
	/**
	 * Сбрасывает состояние калькулятора.
	 */
	clear()
	{
		/** @type {number} */
		this.operation = Operation.NONE;
		/** @type {number} */
		this.numberA = 0;
		/** @type {number} */
		this.numberB = NaN;
		/** @type {string} */
		this.value = '';
		
		this.display.setValue( '0' );
	}
	
	/**
	 * Удаляет последний символ.
	 */
	backspace()
	{
		this.value = this.value.slice( 0, -1 );
		
		if ( this.value.length === 0 )
		{
			this.display.setValue( '0' );
		}
		else
		{
			this.display.setValue( this.value );
		}
	}
	
	/**
	 * Обновляет отображаемое значение.
	 */
	updateDisplay()
	{
		let numberToDisplay;
		
		if ( isNaN( this.numberA ) )
		{
			numberToDisplay = 0;
		}
		else if ( isNaN( this.numberB ) )
		{
			numberToDisplay = this.numberA;
		}
		else
		{
			numberToDisplay = this.numberB;
		}
		
		this.display.setValue(
			this.display.prepare( numberToDisplay )
		);
	}
	
	/**
	 * Выполняет вычисление текущего значения, если необходимо.
	 */
	calculate()
	{
		let numberA = this.numberA;
		const numberB = this.numberB;
		
		if (
			isNaN( numberA )
			|| isNaN( numberB )
		)
		{
			this.value = '';
			
			return;
		}
		
		switch ( this.operation )
		{
			case Operation.ADDITION:
				numberA += numberB;
				break;
			
			case Operation.SUBTRACTION:
				numberA -= numberB;
				break;
			
			case Operation.MULTIPLICATION:
				numberA *= numberB;
				break;
			
			case Operation.DIVISION:
				numberA /= numberB;
				break;
			
			case Operation.NONE:
				break;
			
			default:
				throw new Error( 'Unknown operation' );
		}
		
		this.numberA = numberA;
		this.numberB = NaN;
		this.operation = Operation.NONE;
		this.value = '';
		
		this.updateDisplay();
	}
	
	/**
	 * Добавляет новую цифру к значению калькулятора.
	 * 
	 * @param {string} value Добавляемая цифра.
	 */
	addDigit( value )
	{
		if ( !/^\d$/.test( value ) )
		{
			throw new Error( `Incorrect number value "${value}".` );
		}
		
		if (
			!this.value
			&& ( this.operation === Operation.NONE )
		)
		{
			this.clear();
		}
		
		if ( this.value === '0' )
		{
			this.value = value;
		}
		else
		{
			this.value += value;
		}
		
		this.display.setValue( this.value );
		
		if ( this.operation === Operation.NONE )
		{
			this.numberA = Number( this.value );
		}
		else
		{
			this.numberB = Number( this.value );
		}
	}
	
	/**
	 * Ставит десятичный разделитель.
	 */
	period()
	{
		if ( this.value.indexOf( '.' ) === -1 )
		{
			this.value += (
				( this.value.length === 0 )
				? '0.'
				: '.'
			);
			this.display.setValue( this.value );
		}
	}
	
	/**
	 * Изменяет знак числа.
	 */
	changeSign()
	{
		if ( this.value[0] === '-' )
		{
			this.value = this.value.substr( 1 );
		}
		else
		{
			this.value = '-' + this.value;
		}
		
		this.display.setValue( this.value );
		
		if ( this.value === '-' )
		{
			return;
		}
		
		if ( this.operation === Operation.NONE )
		{
			this.numberA = Number( this.value );
		}
		else
		{
			this.numberB = Number( this.value );
		}
	}
	
	/**
	 * Вычисляет квадратный корень.
	 */
	squareRoot()
	{
		this.calculate();
		this.numberA = Math.sqrt( this.numberA );
		this.updateDisplay();
	}
	
	/**
	 * Выполняет сложение.
	 */
	addition()
	{
		this.calculate();
		this.operation = Operation.ADDITION;
	}
	
	/**
	 * Выполняет вычитание.
	 */
	subtraction()
	{
		this.calculate();
		this.operation = Operation.SUBTRACTION;
	}
	
	/**
	 * Выполняет умножение.
	 */
	multiplication()
	{
		this.calculate();
		this.operation = Operation.MULTIPLICATION;
	}
	
	/**
	 * Выполняет деление.
	 */
	division()
	{
		this.calculate();
		this.operation = Operation.DIVISION;
	}
}

export {
	Calculator as default,
};
