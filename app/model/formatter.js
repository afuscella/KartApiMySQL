/**
 * Module instantiation
 */
module.exports = {
    isNumber : isNumber
}

/**
 * Is value a number?
 * @value
 */
function isNumber(value) {
    if (isNaN(value)) {
        return false;
    }
    return true;
}