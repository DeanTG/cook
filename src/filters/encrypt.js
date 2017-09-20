export default (phone) => {
  if (!phone) return;
  let arr = phone.toString().split('');
  arr.splice(3, 4, '*', '*', '*', '*');
  return arr.join('')
}
