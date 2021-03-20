/**
 * Числовое значение
 */
export class Value
{
	private value: number = 0;
	private fractionDigits: number = 0;
	private negative: boolean = false;
	private withDot: boolean = false;
	
	/**
	 * Создаёт числовое значение
	 * 
	 * @param value Новое значение
	 */
	constructor( value?: string | number )
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
	 * @param value Новое значение
	 */
	set( value: string | number )
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
	 * @param state Число отрицательное?
	 */
	setNegative( state: boolean = true )
	{
		this.negative = state;
	}
	
	/**
	 * Устанавливает наличие точки в числе
	 * 
	 * @param state Число с точкой?
	 */
	setDot( state: boolean = true )
	{
		this.withDot = state;
	}
	
	/**
	 * Устанавливает значение из числа
	 * 
	 * @param value Новое значение
	 */
	private _setFromNumber( value: number )
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
	 * @param value Новое значение
	 */
	private _setFromString( value: string )
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

export type ValueConstructor = typeof Value;
