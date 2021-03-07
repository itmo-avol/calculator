/**
 * @typedef { import( './Display' ).Display } Display
 */
/**
 * @typedef { import( './Value' ).ValueConstructor } ValueConstructor
 */
/**
 * @typedef { import( './Value' ).Value } Value
 */

/**
 * Возможные значения текущей операции
 * @enum {number}
 */
const Operation = {
	NONE: 0,
	ADDITION: 1,
	SUBTRACTION: 2,
	MULTIPLICATION: 3,
	DIVISION: 4,
};

/**
 * Калькулятор
 */
export class Calculator
{
	/** @type {Display} */
	display;
	/** @type {ValueConstructor} */
	Value;
	/** @type {number} */
	operation = Operation.NONE;
	/** @type {Value} */
	value;
	/** @type {Value | null} */
	memory = null;
	/** @type {boolean} */
	edit = true;
	
	/**
	 * Калькулятор
	 * 
	 * @param {Display} display Экран для отображения результата
	 * @param {ValueConstructor} Value Конструктор объектов значения
	 */
	constructor( display, Value )
	{
		this.display = display;
		this.Value = Value;
		this.value = new Value();
		
		this.updateDisplay();
	}
	
	/**
	 * Обновляет отображаемое значение
	 */
	updateDisplay()
	{
		this.display.setValue( String( this.value ) );
	}
	
	/**
	 * Сбрасывает состояние калькулятора
	 */
	clear()
	{
		this.operation = Operation.NONE;
		this.value = new this.Value();
		this.memory = null;
		this.edit = true;
		
		this.updateDisplay();
	}
	
	/**
	 * Удаляет последний символ
	 */
	backspace()
	{
		this._prepareEdit();
		this.value.set( String( this.value ).slice( 0, -1 ) );
		this.updateDisplay();
	}
	
	/**
	 * Выполняет вычисление текущего значения, если необходимо
	 */
	calculate()
	{
		if ( !this.memory )
		{
			return;
		}
		
		let numberA = Number( this.memory );
		const numberB = Number( this.value );
		
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
		
		this.operation = Operation.NONE;
		this.edit = false;
		this.value = new this.Value( numberA );
		this.memory = null;
		
		this.updateDisplay();
	}
	
	/**
	 * Добавляет новую цифру к значению калькулятора
	 * 
	 * @param {string} value Добавляемая цифра
	 */
	addDigit( value )
	{
		if ( !/^\d$/.test( value ) )
		{
			throw new Error( `Incorrect number value "${value}".` );
		}
		
		this._prepareEdit();
		
		// Чтобы не потерять -0
		const negative = this.value.getNegative();
		
		this.value.set( String( this.value ) + value );
		this.value.setNegative( negative );
		
		this.updateDisplay();
	}
	
	/**
	 * Ставит десятичный разделитель
	 */
	period()
	{
		this._prepareEdit();
		this.value.setDot();
		this.updateDisplay();
	}
	
	/**
	 * Изменяет знак числа
	 */
	changeSign()
	{
		this.value.setNegative( !this.value.getNegative() );
		this.edit = true;
		this.updateDisplay();
	}
	
	/**
	 * Вычисляет квадратный корень
	 */
	squareRoot()
	{
		this.calculate();
		this.value = new this.Value(
			Math.sqrt( Number( this.value ) ),
		);
		this.updateDisplay();
	}
	
	/**
	 * Выполняет сложение
	 */
	addition()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.ADDITION;
	}
	
	/**
	 * Выполняет вычитание
	 */
	subtraction()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.SUBTRACTION;
	}
	
	/**
	 * Выполняет умножение
	 */
	multiplication()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.MULTIPLICATION;
	}
	
	/**
	 * Выполняет деление
	 */
	division()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.DIVISION;
	}
	
	/**
	 * Подготавливает к редактированию значения на экране
	 * 
	 * @private
	 */
	_prepareEdit()
	{
		if (
			!this.edit
			&& ( this.operation === Operation.NONE )
		)
		{
			this.clear();
		}
	}
}
