import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"

function Protected({onlyUnAuth = false, component}) {
  const user = useSelector((store) => store.user.user);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   console.log(isAuthChecked)
  //   return null
  // }

  if (onlyUnAuth && user) {
    const { from } = location.state || {form: {pathname: "/"}};
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}) => (
  <Protected onlyUnAuth={true} component={component} />
)