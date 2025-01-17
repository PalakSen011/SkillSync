export const PATH_LOGIN = "/login";
export const PATH_SIGNUP = "/signup";
export const PATH_HOMEPAGE = "/homepage";
export const PATH_RESETPASSWORD = "/reset-password";

<Routes>
  <Route index element={<SignIn />} />
  <Route path={PATH_LOGIN} element={<SignIn />} />
  <Route path={PATH_RESETPASSWORD} element={<ResetPassword />} />
  <Route element={<ProtectedRoute />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="courses" element={<Courses />} />
    <Route path="courses/add-new-course" element={<AddNewCourse />} />
    <Route path="user-management" element={<UserManagement />} />
  </Route>
  <Route path="*" element={<NotFound />} />
  <Route path={PATH_SIGNUP} element={<SignUp />} />
</Routes>;
