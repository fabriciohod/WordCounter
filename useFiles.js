const fs = require('fs');

function composition(...fns) {
	return function (value) {
		return fns.reduce(async (acc, fn) => {
			if (Promise.resolve(acc) === acc)
				return fn(await acc);
			else return fn(acc);
		}, value);
	};
}

function readFiles(paths) {
	return Promise.all(paths.map((item) => readFileContent(item)));
}

function readFileContent(path) {
	return new Promise((resolve, reject) => {
		try {
			const content = fs.readFileSync(path, { encoding: 'utf-8' });
			resolve(content.toString());
		} catch (error) {
			reject(error);
		}
	});
}

function readFolder(path) {
	return new Promise((resolve) => {
		fs.readdir(path, (_, content) => {
			const arquivos = [];
			content.forEach(function (file) {
				arquivos.push(file);
			});
			resolve(arquivos);
		});
	});
}

function elementsEndOf(pattern) {
	return function (array) {
		return array.filter((el) => el.endsWith(pattern));
	};
}

function removeIfEmpty(array) {
	return array.filter((el) => el.trim());
}

function removeInclude(parao) {
	return function (array) {
		return array.filter((el) => !el.includes(parao));
	};
}

function removeNumbers(array) {
	return array.filter((el) => {
		const num = parseInt(el.trim());
		return num !== num;
	});
}

function removeSymbols(symbols) {
	return function (array) {
		return array.map((el) => {
			return symbols.reduce((acc, symbols) => {
				return acc.split(symbols).join('');
			}, el);
		});
	};
}

function joinElemnets(array) {
	return array.join(' ');
}

function separateTextBy(symbols) {
	return function (text) {
		return text.split(symbols);
	};
}

function sortByNumericAttribute(attr, order = 'asc') {
	return function (array) {
		const asc = (o1, o2) => o1[attr] - o2[attr];
		const desc = (o1, o2) => o2[attr] - o1[attr];
		return array.sort(order === 'asc' ? asc : desc);
	};
}

function groupElements(word) {
	return Object.values(
		word.reduce((acc, word) => {
			const el = word.toLowerCase();
			const qtd = acc[el] ? acc[el].qtd + 1 : 1;
			acc[el] = { word: el, qtd };
			return acc;
		}, {})
	);
}

module.exports = {
	composition,
	readFolder,
	elementsEndOf,
	readFiles,
	removeIfEmpty,
	removeInclude,
	removeNumbers,
	removeSymbols,
	joinElemnets,
	separateTextBy,
	groupElements,
	sortByNumericAttribute,
};
