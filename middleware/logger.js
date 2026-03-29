const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`\n[REQUEST]`);
  console.log(`  Timestamp : ${timestamp}`);
  console.log(`  Method    : ${req.method}`);
  console.log(`  URL       : ${req.originalUrl}`);
  console.log(`  IP        : ${req.ip}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`\n[RESPONSE]`);
    conso