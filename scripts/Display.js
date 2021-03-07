/**
 * Экран для отображения результата
 */
export class Display
{
	/** @type {HTMLElement} */
	output;
	/** @type {number} */
	maxChars;
	
	/**
	 * Экран для отображения результата
	 * 
	 * @param {HTMLElement} output Элемент для вывода результата
	 * @param {number} maxChars Максимальное количество символов для отображения
	 */
	constructor( output, maxChars )
	{
		this.output = output;
		this.maxChars = maxChars;
	}
	
	/**
	 * Устанавливает значение
	 * 
	 * @param {string} value Новое значение
	 */
	setValue( value )
	{
		if ( value.length <= this.maxChars )
		{
			this.output.textContent = value;
			
			return;
		}
		
		const asNumber = Number( value );
		
		if ( isNaN( asNumber ) )
		{
			this.output.textContent = 'NaN';
			
			return;
		}
		
		// Количество символов в числе, помимо чисел ('-', '+', 'e').
		const nonNumericCharsCount = 3;
		
		this.output.textContent = asNumber.toPrecision( this.maxChars - nonNumericCharsCount );
	}
}
