function add(str) {
    // when string is empty
    if(str === '') return 0;

    // check if string has \n and replace it with ,
    if(str.includes('\n')) str = str.replace('\n', ',');

    // spliting string into array using , delimiter
    const arrayOfNumbers = str.split(',');
    if(arrayOfNumbers.length === 1) return Number(arrayOfNumbers[0]);
    return arrayOfNumbers.map(Number).reduce((acc, val) => acc + val, 0);
}

export default add;