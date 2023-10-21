function add(str) {
    // when string is empty
    if(str === '') return 0;

    // check if string has delimiter
    let delimiters;
    if(str.includes('//')) {
        delimiters = Array.from(new Set(str.split('\n')[0].slice(2).split('')));
        str = str.split('\n')[1];
    }
    if(delimiters) {
        for(let delimiter of delimiters) str = str.replaceAll(delimiter, ',');
    }

    // check if string has \n and replace it with ,
    if(str.includes('\n')) str = str.replaceAll('\n', ',');

    // spliting string into array using , delimiter
    const arrayOfNumbers = str.split(',').map(Number).filter(num => num <= 1000);

    // check if there are negatives
    const arrayOfNegatives = arrayOfNumbers.filter(num => num < 0);
    if(arrayOfNegatives.length) throw new Error("negatives not allowed : " + arrayOfNegatives.join(','));

    if(arrayOfNumbers.length === 1) return Number(arrayOfNumbers[0]);
    return arrayOfNumbers.reduce((acc, val) => acc + val, 0);
}

export default add;