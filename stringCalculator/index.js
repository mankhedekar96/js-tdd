function add(str) {
    if(str === '') return 0;
    if(Number(str) !== NaN) return Number(str);
    return str.split(',').reduce((acc = 0, el) => acc += Number(el))
}

export default add;