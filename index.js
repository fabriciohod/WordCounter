const path = require('path');
const myFs = require('./useFiles');

const filesPath = path.join(__dirname, './legendas/');
const symbols = [
	'.',
	'?',
	',',
	'"',
	'♪',
	'_',
	'-',
	'<i>',
	'</i>',
	'\r',
	'[',
	']',
	'(',
	')',
	'!',
];

const getPathFiles = (files) =>
	files.map((file) => filesPath + file);

const wordCountList = myFs.composition(
	myFs.readFolder,
	myFs.elementsEndOf('.srt'),
	getPathFiles,
	myFs.readFiles,
	myFs.joinElemnets,
	myFs.separateTextBy('\n'),
	myFs.removeInclude('-->'),
	myFs.removeNumbers,
	myFs.removeSymbols(symbols),
	myFs.joinElemnets,
	myFs.separateTextBy(' '),
	myFs.removeIfEmpty,
	myFs.groupElements,
	myFs.sortByNumericAttribute('qtd', 'desc')
)(filesPath);

wordCountList.then(console.log);
