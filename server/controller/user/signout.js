module.exports = {
  post: (req,res) => {
    res.clearCookie(cookie, {path:'/'});
    res.redirect('/');
    res.end();
  }
}