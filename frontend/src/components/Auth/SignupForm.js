import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';

import { SIGN_UP_REQUEST } from '../../reducers/user';
import Logo from '../Logo/AuthPage';

import './SignupForm.scss';

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signupDone } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password,
          nickname,
        },
      });
    },
    [email, nickname, password, passwordCheck]
  );

  useEffect(() => {
    if (signupDone) {
      history.push('/auth/login');
    }
  }, [signupDone]);

  return (
    <>
      <Logo />
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-input">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
              required
            />
            <i class="fas fa-check"></i>
          </div>
          <div className="form-input">
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={onChangeNickname}
              required
            />
            <i class="fas fa-check"></i>
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
              required
            />
            <i class="fas fa-check"></i>
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
            />
            <i class="fas fa-check"></i>
          </div>
          {passwordError && <span className="password-error">비밀번호가 일치하지 않습니다.</span>}
          <div className="form-button">
            <button className="local-button" type="submit">회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
