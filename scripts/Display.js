// @ts-check

/**
 * Экран для отображения результата
 */
export class Display
{
	/** @type {HTMLElement} */
	output;
	
	/**
	 * Экран для отображения результата
	 * 
	 * @param {HTMLElement} output Элемент для вывода результата
	 */
	constructor( output )
	{
		this.output = output;
	}
	
	/**
	 * Устанавливает значение
	 * 
	 * @param {string} value Новое значение
	 */
	setValue( value )
	{
		this.output.textContent = value;
	}
	
	/**
	 * Подготавливает число к отображения на экране
	 * 
	 * @param {number} number Число для отображения
	 * @returns {string}
	 */
	prepare( number )
	{
		return number.toPrecision( 11 )
			.replace( /(?:\.0*|(\.\d+?)0*)$/, '$1' );
	}
}
