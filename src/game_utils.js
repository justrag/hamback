export const dieRoll = () => 1 + Math.floor(Math.random() * 6);
export const getKeyByValue = (object, value) =>
       Object.keys(object).find(key => object[key] === value);
