function fun(tree) {
  if (tree == null) { return false; }
  const arr = [];

  function handle(obj) {
    if (obj.left || obj.right) {
      if (obj.left) handle(obj.left);
      if (obj.right) handle(obj.right);
    } else {
      arr.push(obj.val);
    }
  }
  handle(tree);

  let n = 0;
  const len = arr.length;
  for (let i = 0; i < len - 1; i += 1) {
    const m = arr[i + 1] - arr[i];
    if (m < 1) return false;
    if (i === 0) { n = m; } else if (m !== n) { return false; }
    return true;
  }
}

fun({
  left: {
    left: {
      val: 1,
    },
    right: {
      left: { val: 3 },
      right: { val: 5 },
      val: 9,
    },
    val: 6,
  },
  right: {
    val: 7,
  },
  val: 4,
});
