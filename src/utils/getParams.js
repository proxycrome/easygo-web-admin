/**
 * This is used to generate a custom URL param
 * @param params
 * @returns {string}
 */
 const getURLParams = params =>
 Object.keys(params).reduce((result, field) => {
   if (params[field]===0 || params[field] ) {
     result += result
       ? `&${field}=${params[field]}`
       : `?${field}=${params[field]}`;
   }
   return result;
 }, "");

 module.exports = getURLParams