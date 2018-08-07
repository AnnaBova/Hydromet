
  

## Installation

  

```bash

npm install

npm start

```

  

Init DB

```bash

cd db

npm run init

```

  # Примечание
Если вы будете обновлять библиотеки в node_modules просьба для корректной работы добавить в файл который находиться  `node_modules/convert-svg-core/src/Converter.js`. Изменение нужно сделать на 273 строке. 

```bash
if (!this[_browser]) {

this[_browser] =  await  puppeteer.launch([_options].puppeteer);

this[_page] =  await  this[_browser].newPage();

}
```   
Привести её к такому виду
```bash
if (!this[_browser]) {

this[_browser] =  await  puppeteer.launch({...this[_options].puppeteer, args: ['--no-sandbox', '--disable-setuid-sandbox']});

this[_page] =  await  this[_browser].newPage();

}
```   

`open localhost:3001`
