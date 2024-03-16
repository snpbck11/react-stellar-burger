import { useSelector } from "../../hooks";
import { Navigate, useLocation } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { FC } from "react";

interface IOnlyUnAuthProps {
  component: JSX.Element;
};

interface IProtectedProps extends IOnlyUnAuthProps {
  onlyUnAuth: boolean;
};

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.user.user);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <ThreeDots />
  };

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  };

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  };

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<IOnlyUnAuthProps> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);