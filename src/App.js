import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllBlogs from './components/index';
import EditBlog from './components/blog/editblog';
import ForgotPassword from './components/accounts/forgot_password';
import ResetPassword from './components/accounts/reset_password';
import SignIn from './components/accounts/signin';
import SignUp from './components/accounts/signup';
import MyBlogs from './components/blog/myblogs';
import BlogDetail from './components/blogdetails';
import AddBlog from './components/blog/addblog';

const App = () => {
  // <Link to='/reset/'>Go to Aboutpage</Link>
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/api/accounts/reset/:uid/:token/" element={<ResetPassword />} />
        <Route path="/" element={<AllBlogs />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/blog_detail/:id" element={<BlogDetail />} />
        <Route path="/blog/:id" />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
