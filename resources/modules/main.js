//Главный js файл (Для работы с одними стилями на разных страницах)

let coords = {
	'topLeft': [ '-3px', '1px' ],
	'topRight': [ '3px', '1px' ],
	'bottomLeft': [ '-3px', '-1px' ],
	'bottomRight': [ '3px', '-1px' ],
}

let coordsKeys = Object.keys( coords ) //ключи
let randIndex = Math.floor( Math.random() * (Object.keys( coords ).length) ); //рандомное число от 0 до длины объекта(4)
let height = coords[ coordsKeys[ randIndex ] ][ 0 ]
let side = coords[ coordsKeys[ randIndex ] ][ 1 ]

$('.hasSuperBorder').hover(
	() => {
		$('.hasSuperBorder:hover').css('text-shadow',`rgba( 255, 150, 0,1) ${height} ${side} 0`)

		//обновление переменных
		randIndex = Math.floor( Math.random() * (Object.keys( coords ).length) );
		height = coords[ coordsKeys[ randIndex ] ][ 0 ]
		side = coords[ coordsKeys[ randIndex ] ][ 1 ]
	},
	() => {
		$('.hasSuperBorder').css('text-shadow','none')
	}
)


// На момент инициализации скрипта кнопки .hasSuperBorder не существует. Вообще.
console.log( $('.hasSuperBorder') );
console.log(
	document.querySelector('.hasSuperBorder')
);
