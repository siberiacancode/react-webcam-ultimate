interface Window {
  msRequestAnimationFrame?: Window['requestAnimationFrame'];
  mozRequestAnimationFrame?: Window['requestAnimationFrame'];
  webkitRequestAnimationFrame?: Window['requestAnimationFrame'];
  msCancelAnimationFrame?: Window['cancelAnimationFrame'];
  mozCancelAnimationFrame?: Window['cancelAnimationFrame'];
  webkitCancelAnimationFrame?: Window['cancelAnimationFrame'];
}
