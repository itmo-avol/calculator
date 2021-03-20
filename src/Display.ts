/**
 * Экран для отображения результата
 */
export class Display
{
	private output: HTMLElement;
	private maxChars: number;
	
	/**
	 * Экран для отображения результата
	 * 
	 * @param output Элемент для вывода результата
	 * @param maxChars Максимальное количество символов для отображения
	 */
	constructor( output: HTMLElement, maxChars: number )
	{
		this.output = output;
		this.maxChars = maxChars;
	}
	
	/**
	 * Устанавливает значение
	 * 
	 * @param value Новое значение
	 */
	setValue( value: string )
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
