/**
 * @typedef {typeof Value} ValueConstructor
 */

/**
 * Числовое значение
 */
export class Value
{
	/** @type {number} */
	value = 0;
	/** @type {number} */
	fractionDigits = 0;
	/** @type {boolean} */
	negative = false;
	/** @type {boolean} */
	withDot = false;
	
	/**
	 * Создаёт числовое значение
	 * 
	 * @param {string | number} [value] Новое значение
	 */
	constructor( value )
	{
		if ( value )
		{
			this.set( value );
		}
	}
	
	/**
	 * Возвращает примитивное значение
	 */
	valueOf()
	{
		return this.value * (
			this.negative
			? -1
			: 1
		);
	}
	
	/**
	 * Возвращает строковое представление
	 */
	toString()
	{
		let asString = this.valueOf().toFixed( this.fractionDigits );
		
		if ( this.withDot && !asString.includes( '.' ) )
		{
			asString += '.';
		}
		
		if ( this.negative && asString[0] !== '-' )
		{
			asString = '-' + asString;
		}
		
		return asString;
	}
	
	/**
	 * Устанавливает значение
	 * 
	 * @param {string | number} value Новое значение
	 */
	set( value )
	{
		if ( typeof value === 'number' )
		{
			this._setFromNumber( value );
		}
		else
		{
			this._setFromString( value );
		}
	}
	
	/**
	 * Возвращает знак числа: отрицательное или нет
	 */
	getNegative()
	{
		return this.negative;
	}
	
	/**
	 * Устанавливает знак числа: отрицательное или нет
	 * 
	 * @param {boolean} state Число отрицательное?
	 */
	setNegative( state = true )
	{
		this.negative = state;
	}
	
	/**
	 * Устанавливает наличие точки в числе
	 * 
	 * @param {boolean} state Число с точкой?
	 */
	setDot( state = true )
	{
		this.withDot = state;
	}
	
	/**
	 * Устанавливает значение из числа
	 * 
	 * @private
	 * @param {number} value Новое значение
	 */
	_setFromNumber( value )
	{
		const asString = String( value );
		const dotIndex = asString.indexOf( '.' );
		
		if ( dotIndex === -1 )
		{
			this.fractionDigits = 0;
			this.withDot = false;
		}
		else
		{
			this.fractionDigits = asString.length - dotIndex - 1;
			this.withDot = true;
		}
		
		this.negative = value < 0;
		this.value = Math.abs( value );
	}
	
	/**
	 * Устанавливает значение из строки
	 * 
	 * @private
	 * @param {string} value Новое значение
	 */
	_setFromString( value )
	{
		if ( value === '' )
		{
			this.fractionDigits = 0;
			this.withDot = false;
			this.negative = false;
			this.value = 0;
			
			return;
		}
		
		const dotIndex = value.indexOf( '.' );
		
		if ( dotIndex === -1 )
		{
			this.fractionDigits = 0;
			this.withDot = false;
		}
		else
		{
			this.fractionDigits = value.length - dotIndex - 1;
			this.withDot = true;
		}
		
		this.negative = value[0] === '-';
		this.value = Math.abs( Number( value ) );
	}
}
