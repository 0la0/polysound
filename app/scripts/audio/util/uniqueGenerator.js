export default function generateUniqueId () {
  return Math.random() * Math.pow(2, 32 - 1) >>> 0;
}
