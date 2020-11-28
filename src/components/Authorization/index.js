import React, { useState } from "react";
import { 
  StyledAuthorization, AuthText, 
  BtnAuth, ErrorBlock, 
  SpinnerForButton, BoxForSpinner, WrapperError } from './style';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import { login } from '../../redux/features/authorization';
import spinner from '../../icons/spinner.svg';
import { TitlePage } from '../styled/Lib'
// import Icon from '../Icon';

const Authorization = () => {
  const dispacth = useDispatch();

  const showPass = useSelector(state => state.authorization.showPass);
  const error = useSelector(state => state.authorization.error);
  const authorizing = useSelector(state => state.authorization.authorizing);

  const [text, setText] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    dispacth(login(text, pass));
  }

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 13 && !token) {
  //     handleLogin();
  //   }
  // }

  return (
    <StyledAuthorization>
      <TitlePage>
        Авторизация
      </TitlePage>
        <Input
          value={text}
          onChange={setText}
          textAlign={"center"}
          placeHolder="Введите логин"
        />
        <Input
          value={pass}
          onChange={setPass}
          type={showPass ? 'text': 'password'}
          textAlign={"center"}
          placeHolder="Введите пароль"
        />
      {/*<Icon />*/}
      <BtnAuth>
        <WrapperError>
          {error && !authorizing && (
            <ErrorBlock>
              Неверный логин или пароль
            </ErrorBlock>
          )}
        </WrapperError>
        {authorizing && (
          <BoxForSpinner>
            <SpinnerForButton 
              src={spinner} alt="loading" />
          </BoxForSpinner>
        )}
        <Button 
          onClick={handleLogin}
          disabled={authorizing}
          authorizing={authorizing}
        >
          Войти
        </Button>
      </BtnAuth>
    </StyledAuthorization>
  )
}

export default Authorization;