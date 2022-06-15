import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import "../../pages/sign-up/signUp.scss";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    username: Yup.string().required("닉네임을 입력하세요!"),
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .required("패스워드를 입력하세요!")
      .matches(
        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
        "적어도 특수문자와 숫자는 하나 포함해야 합니다!"
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
      .required("필수 입력 값입니다!"),
  });
  const submit = async (values) => {
    console.log(values);
    const { email, password, username } = values;
    try {
      await axios.post("http://13.125.145.83/api/register", {
        email,
        password,
        username,
      });
      toast.success("회원등록 완료하였습니다. 로그인 하세요😎", {
        position: "top-center",
        autoClose: 2000,
      });
      window.setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      toast.error("이미 존재하는 이메일입니다!", {
        position: "top-center",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
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
                <div className="input-label">닉네임</div>
                <TextField
                  value={values.username}
                  name="username"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="username" />
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
              <div className="input-forms-item">
                <div className="input-label">비밀번호 확인</div>
                <TextField
                  value={values.password2}
                  name="password2"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="password2" />
                </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                회원가입
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
