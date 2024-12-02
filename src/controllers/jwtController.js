import jwt from "jsonwebtoken";
let refreshToken = [];

const logOut = (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(404);
  refreshToken = refreshToken.filter((item) => item != token);
  return res.sendStatus(200);
};

const getNewToken = (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(404);
  if (!refreshToken.includes(token)) return res.sendStatus(401);
  console.log(refreshToken);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    const newToken = generateTokenAccess(data);
    return res.send(newToken);
  });
};

const register = (req, res) => {
  const userName = req.body.username;
  let user = { name: userName };
  const token = generateTokenAccess(user);
  console.log(token);
  return res.json(token);
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data;
    // console.log(data);
    next();
  });
};

const generateTokenAccess = (data) => {
  console.log(data);
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const resetTokenAccessToken = jwt.sign(
    data,
    process.env.REFRESH_TOKEN_SECRET
  );
  refreshToken.push(resetTokenAccessToken);
  return {
    accessToken: accessToken,
    resetTokenAccessToken: resetTokenAccessToken,
  };
};

export { getNewToken, authenticateToken, logOut, register };
