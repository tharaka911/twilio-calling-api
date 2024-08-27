// callConfig.js
let callingEnable = true;

const getCallingEnable = () => callingEnable;
const setCallingEnable = (value) => {
    callingEnable = value;
};

module.exports = {
    getCallingEnable,
    setCallingEnable,
};
