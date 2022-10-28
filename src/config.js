export default {
  endpoint: "wss://kusama.rpc.robonomics.network/",
  subscription: "4GgRRojuoQwKCZP9wkB69ZxJY4JprmHtpzEzqJLjnqu4jk1r",
  api:
    process.env.NODE_ENV === "production"
      ? "https://lk-api.robonomics.academy"
      : "http://localhost:3000"
};
