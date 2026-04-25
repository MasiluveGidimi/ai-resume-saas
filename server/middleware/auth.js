export default function auth(req, res, next) {
  req.user = { id: "69dc8f4dfcc196d47f84cb05" };
  next();
}