function createResult(err, data) {
    const result = {};
    if (data) {
        result.status = true;
        result.data = data;
    } else {
        result.status = false;
        result.error = err;
    }
    return result;
    }

module.exports = {createResult}