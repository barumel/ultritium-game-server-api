function Route({
  path,
  method,
  func
}) {
  return Object.freeze({
    path,
    method,
    func
  });
}

module.exports = Route;
