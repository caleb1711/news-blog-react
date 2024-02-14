import React from 'react';
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
import About from './components/about';
import Contact from './components/contact';
import Privacy from './components/privacy';
import TermsandConditions from './components/terms';
import Disclaimer from './components/disclaimer';

const App = () => {
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<TermsandConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </Router>
  );
};

export default App;
