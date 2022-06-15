import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import "../sign-up/signUp.scss";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { tokenState } from "../../recoil/store";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup.string().required("패스워드를 입력하세요!"),
  });
  const submit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await axios.post("http://13.125.145.83/api/login", {
        email,
        password,
      });
      await setToken(data["Access-Token"]);
      const redirectUrl = searchParams.get("redirectUrl");
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/");
      }
    } catch (e) {
      toast.error(
        <div>
          로그인에 실패하였습니다!
          <br />
          아이디와 패스워드를 확인해주세요!
        </div>,
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        nickname: "",
        password: "",
        password2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">이메일</div>
                <TextField
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <TextField
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
