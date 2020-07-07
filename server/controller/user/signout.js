module.exports = {
  post: (req,res) => {
    // res.clearCookie(cookie, {path:'/'});
    res.clearCookie('token');
    res.redirect('/');
    res.end();
  }
}