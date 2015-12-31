export default function generateUniqueId () {
  return Math.random() * Math.pow(2, 16) >> 4;
}
